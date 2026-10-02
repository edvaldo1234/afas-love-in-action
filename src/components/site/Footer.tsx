import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/afas-logo-stacked.png.asset.json";

export function Footer() {
  return (
    <footer className="py-14 sm:py-24 px-5 sm:px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-left">
          <div className="sm:col-span-2">
            <img
              src={logoAsset.url}
              alt="Instituto AFAS — Ame Fazendo Ação Solidária"
              className="h-24 sm:h-32 w-auto mb-4"
            />
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Ame Fazendo Ação Solidária. Organização sem fins lucrativos dedicada à infância no
              interior de Goiás há mais de 8 anos.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold uppercase text-[10px] tracking-widest text-primary mb-4">Navegue</p>
            <Link to="/sobre" className="tap-target flex items-center text-sm hover:text-primary transition-colors">O Instituto</Link>
            <Link to="/campanhas" className="tap-target flex items-center text-sm hover:text-primary transition-colors">Programas</Link>
            <Link to="/equipe" className="tap-target flex items-center text-sm hover:text-primary transition-colors">Equipe</Link>
            <Link to="/contato" className="tap-target flex items-center text-sm hover:text-primary transition-colors">Contato</Link>
          </div>

          <div className="space-y-2">
            <p className="font-bold uppercase text-[10px] tracking-widest text-primary mb-4">Contato</p>
            <a href="https://www.instagram.com/institutoafas/" target="_blank" rel="noreferrer" className="tap-target flex items-center text-sm hover:text-primary transition-colors">Instagram</a>
            <p className="min-h-11 flex items-center text-sm break-all">contato@institutoafas.org</p>
            <p className="min-h-11 flex items-center text-sm">Interior de Goiás — Brasil</p>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 mt-10 sm:mt-12 border-t border-border text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-muted-foreground leading-relaxed">
          © {new Date().getFullYear()} Instituto AFAS. Dignidade e amor no Cerrado.
        </div>
      </div>
    </footer>
  );
}
