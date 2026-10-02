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
        <Link to="/" className="flex items-center gap-2">
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
          className="md:hidden text-sm font-medium uppercase"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="px-6 py-5 flex flex-col gap-4 text-sm font-medium uppercase tracking-wider">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="hover:text-primary transition-colors"
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
              className="mt-1 bg-primary text-primary-foreground px-5 py-3 rounded-full hover:bg-primary/90 transition-all"
            >
              Doar Agora
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}