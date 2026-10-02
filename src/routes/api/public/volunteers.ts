import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const DEFAULT_NOTIFY_EMAIL = "sede.institutoafas@gmail.com";

const volunteerSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome completo.").max(120),
  city: z.string().trim().min(2, "Informe a cidade.").max(100),
  state: z.string().trim().length(2, "Informe a UF com 2 letras.").transform((value) => value.toUpperCase()),
  phone: z.string().trim().min(8, "Informe um WhatsApp válido.").max(24),
  email: z.string().trim().email("Informe um e-mail válido.").max(160),
  age: z.coerce.number().int().min(1, "Idade inválida.").max(120, "Idade inválida."),
  profession: z.string().trim().max(120).optional().default(""),
  program: z.string().trim().min(2, "Selecione um programa.").max(120),
  availability: z.string().trim().min(2, "Informe a disponibilidade.").max(120),
  experience: z.string().trim().max(1000).optional().default(""),
  motivation: z.string().trim().max(1500).optional().default(""),
  consent: z.boolean().refine((value) => value === true, {
    message: "É necessário autorizar o uso dos dados.",
  }),
  company: z.string().max(200).optional().default(""),
});

export const Route = createFileRoute("/api/public/volunteers")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;

        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
        }

        const parsed = volunteerSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            {
              ok: false,
              error: parsed.error.issues[0]?.message ?? "Confira os dados da ficha.",
            },
            { status: 400 },
          );
        }

        const data = parsed.data;

        if (data.company) {
          return Response.json({ ok: true });
        }

        const smtpUser = process.env.SMTP_USER || DEFAULT_NOTIFY_EMAIL;
        const smtpPass = process.env.SMTP_PASS;
        const notifyEmail = process.env.VOLUNTEER_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
        const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
        const smtpPort = Number(process.env.SMTP_PORT || "465");
        const smtpSecure = (process.env.SMTP_SECURE || "true") !== "false";

        if (!smtpUser || !smtpPass) {
          console.error("[volunteers] SMTP credentials are not configured");
          return Response.json(
            {
              ok: false,
              error:
                "O envio da ficha está temporariamente indisponível. A equipe do Instituto precisa concluir a configuração do e-mail.",
            },
            { status: 503 },
          );
        }

        try {
          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const submittedAt = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            dateStyle: "long",
            timeStyle: "short",
          });

          const subject = `[AFAS] Nova ficha de voluntário — ${data.name}`;

          await transporter.sendMail({
            from: {
              name: "Instituto AFAS — Site",
              address: smtpUser,
            },
            to: notifyEmail,
            replyTo: data.email,
            subject,
            text: buildTextEmail(data, submittedAt),
            html: buildHtmlEmail(data, submittedAt),
          });

          return Response.json({ ok: true });
        } catch (error) {
          console.error("[volunteers] email send failed", error);
          return Response.json(
            {
              ok: false,
              error:
                "Não foi possível enviar a ficha agora. Tente novamente em alguns minutos.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});

type VolunteerData = z.infer<typeof volunteerSchema>;

function buildTextEmail(data: VolunteerData, submittedAt: string) {
  return [
    "NOVA FICHA DE VOLUNTARIADO — INSTITUTO AFAS",
    "",
    `Nome: ${data.name}`,
    `Idade: ${data.age}`,
    `Cidade/UF: ${data.city} / ${data.state}`,
    `WhatsApp: ${data.phone}`,
    `E-mail: ${data.email}`,
    `Profissão/área: ${data.profession || "Não informado"}`,
    `Programa de interesse: ${data.program}`,
    `Disponibilidade: ${data.availability}`,
    "",
    "Experiência com voluntariado:",
    data.experience || "Não informado",
    "",
    "Motivação:",
    data.motivation || "Não informado",
    "",
    `Ficha enviada em: ${submittedAt}`,
    "Consentimento para uso dos dados: Sim",
  ].join("\n");
}

function buildHtmlEmail(data: VolunteerData, submittedAt: string) {
  const row = (label: string, value: string | number) =>
    `<tr><td style="padding:10px;border-bottom:1px solid #eee;font-weight:700;width:190px">${escapeHtml(label)}</td><td style="padding:10px;border-bottom:1px solid #eee">${escapeHtml(String(value))}</td></tr>`;

  return `
    <div style="font-family:Arial,sans-serif;color:#172033;max-width:720px;margin:0 auto">
      <div style="padding:24px;background:#f6edf3;border-radius:16px 16px 0 0">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#c94883;font-weight:700">
          Instituto AFAS
        </div>
        <h1 style="margin:8px 0 0;font-size:26px">Nova ficha de voluntariado</h1>
      </div>
      <div style="border:1px solid #eee;border-top:0;padding:20px;border-radius:0 0 16px 16px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${row("Nome", data.name)}
          ${row("Idade", data.age)}
          ${row("Cidade / UF", `${data.city} / ${data.state}`)}
          ${row("WhatsApp", data.phone)}
          ${row("E-mail", data.email)}
          ${row("Profissão / área", data.profession || "Não informado")}
          ${row("Programa de interesse", data.program)}
          ${row("Disponibilidade", data.availability)}
          ${row("Enviada em", submittedAt)}
        </table>

        <h2 style="font-size:17px;margin:24px 0 8px">Experiência com voluntariado</h2>
        <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(data.experience || "Não informado")}</p>

        <h2 style="font-size:17px;margin:24px 0 8px">Motivação</h2>
        <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(data.motivation || "Não informado")}</p>

        <p style="margin:24px 0 0;font-size:12px;color:#687386">
          A pessoa autorizou o uso destes dados exclusivamente para análise do voluntariado e contato pelo Instituto AFAS.
          Para responder diretamente ao candidato, basta usar “Responder” neste e-mail.
        </p>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });
}
