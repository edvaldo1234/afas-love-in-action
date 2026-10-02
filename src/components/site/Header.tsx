import { Link } from "@tanstack/react-router";
import { useState } from "react";
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

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="Instituto AFAS — Ame Fazendo Ação Solidária"
            className="h-10 sm:h-12 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-primary transition-colors"
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
          className="md:hidden min-h-11 flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span>{open ? "Fechar" : "Menu"}</span>
          <span className="relative block w-5 h-4" aria-hidden>
            <span
              className={`absolute left-0 top-[3px] h-[2px] w-5 bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-[3px] h-[2px] w-5 bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden bg-background transition-all duration-500 ease-out motion-reduce:transition-none ${
          open
            ? "max-h-[420px] opacity-100 translate-y-0 border-t border-border"
            : "max-h-0 opacity-0 -translate-y-2 border-t border-transparent pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="px-6 py-5 flex flex-col gap-1 text-sm font-medium uppercase tracking-wider">
          {links.map((l, index) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`py-3 border-b border-border/60 hover:text-primary transition-all duration-300 ease-out motion-reduce:transition-none ${
                open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
              style={{ transitionDelay: open ? `${70 + index * 55}ms` : "0ms" }}
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openDonation();
            }}
            className={`mt-4 bg-primary text-primary-foreground px-5 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 ease-out motion-reduce:transition-none ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
            style={{ transitionDelay: open ? "350ms" : "0ms" }}
          >
            Doar Agora
          </button>
        </div>
      </div>
    </nav>
  );
}
