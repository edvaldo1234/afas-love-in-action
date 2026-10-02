import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// E-mail que recebe o aviso de cada nova intenção de doação.
// Para alterar, basta trocar o endereço abaixo.
const NOTIFY_EMAIL = "pix.amefazendo@gmail.com";

const donationSchema = z.object({
  name: z.string().trim().min(2, "Nome inválido").max(120),
  amount: z.coerce.number().positive("Valor inválido").max(1_000_000),
});

export const Route = createFileRoute("/api/public/donations")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Corpo inválido" }, { status: 400 });
        }

        const parsed = donationSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" },
            { status: 400 },
          );
        }

        const { name, amount } = parsed.data;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error } = await supabaseAdmin
          .from("donation_intents")
          .insert({ donor_name: name, amount });

        if (error) {
          console.error("[donations] insert error", error);
          return Response.json({ ok: false, error: "Erro ao registrar" }, { status: 500 });
        }

        // Aviso por e-mail (melhor esforço — não bloqueia a doação se falhar).
        try {
          await sendDonationNotice({ name, amount });
        } catch (e) {
          console.error("[donations] email notice failed", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});

async function sendDonationNotice({ name, amount }: { name: string; amount: number }) {
  const origin = process.env.PUBLIC_SITE_URL || process.env.SUPABASE_URL?.replace(".supabase.co", "");
  const sendUrl = `${origin ?? ""}/lovable/email/transactional/send`;
  if (!origin) return; // infra de e-mail ainda não configurada

  const now = new Date();
  const data = now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const hora = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const valor = amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  await fetch(sendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-key": process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    },
    body: JSON.stringify({
      templateName: "donation-notice",
      recipientEmail: NOTIFY_EMAIL,
      idempotencyKey: `donation-${now.getTime()}`,
      templateData: { donorName: name, amount: valor, date: data, time: hora },
    }),
  });
}