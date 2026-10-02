import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type VolunteerContextValue = {
  openVolunteer: () => void;
};

const VolunteerContext = createContext<VolunteerContextValue | null>(null);

export function useVolunteer() {
  const context = useContext(VolunteerContext);
  if (!context) {
    throw new Error("useVolunteer deve ser usado dentro de <VolunteerProvider>");
  }
  return context;
}

const programs = [
  "Voz do Silêncio",
  "Amor que Nutre",
  "ACALMAmente",
  "Raízes",
  "Amor que Cresce",
  "Level Up",
  "Direito de Amar",
  "Meu Pijama Pijaminha",
  "Eventos e ações do AFAS Sustentável",
  "Onde houver maior necessidade",
] as const;

const availabilityOptions = [
  "Durante a semana — manhã",
  "Durante a semana — tarde",
  "Durante a semana — noite",
  "Finais de semana",
  "Horários flexíveis",
] as const;

type FormState = {
  name: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  age: string;
  profession: string;
  program: string;
  availability: string;
  experience: string;
  motivation: string;
  consent: boolean;
  company: string;
};

const initialForm: FormState = {
  name: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  age: "",
  profession: "",
  program: "",
  availability: "",
  experience: "",
  motivation: "",
  consent: false,
  company: "",
};

export function VolunteerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openVolunteer = useCallback(() => {
    setForm(initialForm);
    setStatus("form");
    setError(null);
    setLoading(false);
    setOpen(true);
  }, []);

  const updateField = <K extends keyof FormState,>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.consent) {
      setError("É necessário autorizar o uso dos dados para que a equipe possa entrar em contato.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/public/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(body?.error ?? "Não foi possível enviar sua ficha agora.");
      }

      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar sua ficha agora.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-base outline-none transition-shadow focus:ring-2 focus:ring-ring";

  return (
    <VolunteerContext.Provider value={{ openVolunteer }}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-1.5rem)] max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl p-5 sm:p-7">
          {status === "success" ? (
            <div className="py-6 sm:py-10 text-center">
              <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary/10 text-2xl text-primary">
                ✓
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Ficha enviada!
                </DialogTitle>
                <DialogDescription className="mx-auto max-w-md text-sm sm:text-base leading-relaxed">
                  Obrigado pelo interesse em fazer parte do Instituto AFAS. Sua ficha foi encaminhada
                  para a equipe, que poderá entrar em contato pelo WhatsApp ou e-mail informado.
                </DialogDescription>
              </DialogHeader>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-7 w-full sm:w-auto rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Concluir
              </button>
            </div>
          ) : (
            <>
              <DialogHeader className="pr-7 text-left">
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Ficha de voluntariado
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base leading-relaxed">
                  Conte um pouco sobre você. Essas informações serão usadas pela equipe do Instituto
                  AFAS exclusivamente para analisar o voluntariado e entrar em contato.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="volunteer-name" className="text-sm font-medium">
                      Nome completo *
                    </label>
                    <input
                      id="volunteer-name"
                      required
                      autoComplete="name"
                      maxLength={120}
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className={inputClass}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volunteer-city" className="text-sm font-medium">
                      Cidade *
                    </label>
                    <input
                      id="volunteer-city"
                      required
                      maxLength={100}
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className={inputClass}
                      placeholder="Sua cidade"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volunteer-state" className="text-sm font-medium">
                      Estado (UF) *
                    </label>
                    <input
                      id="volunteer-state"
                      required
                      maxLength={2}
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
                      className={inputClass}
                      placeholder="GO"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volunteer-phone" className="text-sm font-medium">
                      WhatsApp *
                    </label>
                    <input
                      id="volunteer-phone"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={24}
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={inputClass}
                      placeholder="(62) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volunteer-email" className="text-sm font-medium">
                      E-mail *
                    </label>
                    <input
                      id="volunteer-email"
                      required
                      type="email"
                      autoComplete="email"
                      maxLength={160}
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={inputClass}
                      placeholder="voce@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volunteer-age" className="text-sm font-medium">
                      Idade *
                    </label>
                    <input
                      id="volunteer-age"
                      required
                      type="number"
                      inputMode="numeric"
                      min={14}
                      max={100}
                      value={form.age}
                      onChange={(e) => updateField("age", e.target.value)}
                      className={inputClass}
                      placeholder="Ex.: 28"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="volunteer-profession" className="text-sm font-medium">
                      Profissão / área de atuação
                    </label>
                    <input
                      id="volunteer-profession"
                      maxLength={120}
                      value={form.profession}
                      onChange={(e) => updateField("profession", e.target.value)}
                      className={inputClass}
                      placeholder="Ex.: Psicologia, Direito, Educação..."
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="volunteer-program" className="text-sm font-medium">
                      Em qual programa gostaria de atuar? *
                    </label>
                    <select
                      id="volunteer-program"
                      required
                      value={form.program}
                      onChange={(e) => updateField("program", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Selecione um programa</option>
                      {programs.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="volunteer-availability" className="text-sm font-medium">
                      Disponibilidade *
                    </label>
                    <select
                      id="volunteer-availability"
                      required
                      value={form.availability}
                      onChange={(e) => updateField("availability", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Selecione sua disponibilidade</option>
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="volunteer-experience" className="text-sm font-medium">
                      Já teve experiência com voluntariado?
                    </label>
                    <textarea
                      id="volunteer-experience"
                      rows={3}
                      maxLength={1000}
                      value={form.experience}
                      onChange={(e) => updateField("experience", e.target.value)}
                      className={inputClass}
                      placeholder="Conte brevemente sua experiência, se houver."
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="volunteer-motivation" className="text-sm font-medium">
                      Por que você gostaria de fazer parte do AFAS?
                    </label>
                    <textarea
                      id="volunteer-motivation"
                      rows={4}
                      maxLength={1500}
                      value={form.motivation}
                      onChange={(e) => updateField("motivation", e.target.value)}
                      className={inputClass}
                      placeholder="Conte para a equipe o que motivou seu interesse."
                    />
                  </div>
                </div>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="volunteer-company">Empresa</label>
                  <input
                    id="volunteer-company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                  />
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                    className="mt-1 size-4 shrink-0 accent-primary"
                  />
                  <span>
                    Autorizo o Instituto AFAS a utilizar os dados desta ficha exclusivamente para
                    análise do voluntariado e contato comigo. *
                  </span>
                </label>

                {error && (
                  <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-primary px-6 py-4 font-extrabold tracking-wide text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "ENVIANDO FICHA..." : "ENVIAR FICHA"}
                </button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </VolunteerContext.Provider>
  );
}
