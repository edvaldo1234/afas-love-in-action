import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/afas-logo-stacked.png.asset.json";

export function Footer() {
  return (
    <footer className="py-16 sm:py-24 px-5 sm:px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-left">
          <div className="col-span-2">

            <img
              src={logoAsset.url}
              alt="Instituto AFAS — Ame Fazendo Ação Solidária"
              className="h-28 sm:h-32 w-auto mb-4"
            />
            <p className="text-muted-foreground max-w-sm">
              Ame Fazendo Ação Solidária. Cuidado integral para crianças, adolescentes e famílias,
              transformando vidas com Amor e Ação.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-bold uppercase text-[10px] tracking-widest text-primary">Navegue</p>
            <Link to="/sobre" className="block text-sm hover:text-primary">O Instituto</Link>
            <Link to="/campanhas" className="block text-sm hover:text-primary">Programas</Link>
            <Link to="/equipe" className="block text-sm hover:text-primary">Equipe</Link>
            <Link to="/contato" className="block text-sm hover:text-primary">Contato</Link>
          </div>
          <div className="space-y-3">
            <p className="font-bold uppercase text-[10px] tracking-widest text-primary">Siga-nos</p>
            <a href="https://www.instagram.com/institutoafas/" target="_blank" rel="noreferrer" className="block text-sm hover:text-primary">Instagram</a>
            <p className="text-sm">sede.institutoafas@gmail.com</p>
            <p className="text-sm">+55 (62) 99394-4050</p>
            <p className="text-sm">Interior de Goiás — Brasil</p>
          </div>
        </div>
        <div className="pt-12 mt-12 border-t border-border text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Instituto AFAS. Dignidade e amor no Cerrado.
        </div>
      </div>
    </footer>
  );
}