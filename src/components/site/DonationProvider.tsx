import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import pixQr from "@/assets/pix-afas.png.asset.json";

type DonationContextValue = {
  openDonation: () => void;
};

const DonationContext = createContext<DonationContextValue | null>(null);

export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) throw new Error("useDonation deve ser usado dentro de <DonationProvider>");
  return ctx;
}

type Step = "form" | "qr";

export function DonationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openDonation = useCallback(() => {
    setStep("form");
    setName("");
    setAmount("");
    setError(null);
    setOpen(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const numericAmount = Number(amount.replace(",", "."));

    if (trimmedName.length < 2) {
      setError("Informe seu nome.");
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Informe um valor válido.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/public/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, amount: numericAmount }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Não foi possível gerar a doação.");
      }
      setStep("qr");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DonationContext.Provider value={{ openDonation }}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-1.5rem)] max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl p-5 sm:p-6">
          {step === "form" ? (
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tighter">
                  Fazer uma doação
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Preencha seus dados para gerar o QR Code PIX do Instituto AFAS.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label htmlFor="donor-name" className="text-sm font-medium">
                    Nome do doador
                  </label>
                  <input
                    id="donor-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    maxLength={120}
                    className="w-full min-h-12 rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="donor-amount" className="text-sm font-medium">
                    Valor da doação (R$)
                  </label>
                  <input
                    id="donor-amount"
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="Ex: 50,00"
                    className="w-full min-h-12 rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-12 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? "Gerando..." : "Gerar doação"}
                </button>
              </form>
            </>
          ) : (
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tighter">
                  Escaneie o QR Code PIX
                </DialogTitle>
                <DialogDescription>
                  Obrigado, {name.trim().split(" ")[0]}! Use o app do seu banco para concluir o PIX.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center gap-4 pt-2">
                <img
                  src={pixQr.url}
                  alt="QR Code PIX do Instituto AFAS"
                  className="w-[min(16rem,78vw)] max-w-full rounded-xl border border-border"
                  width={519}
                  height={648}
                />
                <p className="text-center text-sm text-muted-foreground leading-relaxed">
                  Após realizar o PIX, envie o comprovante para confirmar sua doação. Muito obrigado
                  por ajudar o Instituto AFAS.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full min-h-12 rounded-full border border-border px-6 py-3 font-bold transition-all hover:bg-card active:scale-[0.98]"
                >
                  Fechar
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DonationContext.Provider>
  );
}
