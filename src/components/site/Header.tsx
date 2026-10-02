import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/afas-logo-horizontal.png.asset.json";
import { useDonation } from "@/components/site/DonationProvider";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "O Instituto" },
  { to: "/campanhas", label: "Programas" },
  { to: "/equipe", label: "Equipe" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { openDonation } = useDonation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0 tap-target flex items-center" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="Instituto AFAS — Ame Fazendo Ação Solidária"
            className="h-9 md:h-12 w-auto max-w-[190px] md:max-w-none object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="tap-target flex items-center hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openDonation}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-all"
          >
            Doar Agora
          </button>
        </div>

        <button
          type="button"
          className="md:hidden tap-target size-11 rounded-full border border-border bg-card/80 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-background/98 backdrop-blur-xl mobile-menu-in border-t border-border">
          <div className="h-full px-5 py-6 flex flex-col overflow-y-auto">
            <div className="flex flex-col">
              {links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="tap-target py-4 border-b border-border text-2xl font-extrabold tracking-tight flex items-center justify-between"
                  activeProps={{ className: "text-primary" }}
                >
                  <span>{l.label}</span>
                  <span className="text-sm font-mono text-muted-foreground">0{i + 1}</span>
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <p className="text-sm text-muted-foreground mb-4">
                Sua contribuição ajuda a manter os programas do Instituto AFAS.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openDonation();
                }}
                className="w-full min-h-14 bg-primary text-primary-foreground px-6 rounded-full text-base font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
              >
                Quero fazer uma doação
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
