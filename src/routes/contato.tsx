import { createFileRoute } from "@tanstack/react-router";
import { useDonation } from "@/components/site/DonationProvider";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e Doações — Instituto AFAS" },
      { name: "description", content: "Fale com o Instituto AFAS, doe ou seja voluntário. Atuamos no interior de Goiás há mais de 8 anos." },
      { property: "og:title", content: "Contato — Instituto AFAS" },
      { property: "og:description", content: "Apoie o Instituto AFAS com doações ou voluntariado." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const { openDonation } = useDonation();
  return (
    <>
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto animate-reveal">
          <div className="inline-block px-3 py-1 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest rounded mb-5 sm:mb-6">
            Contato
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6 sm:mb-8 text-balance">
            Vamos <span className="text-primary">construir juntos.</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl text-pretty">
            Doe, seja voluntário ou apenas mande um oi. Toda forma de apoio fortalece a rede de
            cuidado que mantemos no interior de Goiás.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          <Reveal className="border border-border rounded-2xl p-7 sm:p-10 space-y-6 bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="font-mono text-sm text-primary">01/</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter">Quero doar</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sua contribuição financeira mantém as cestas básicas, os atendimentos e as oficinas
              acontecendo todos os meses.
            </p>
            <div className="space-y-3 pt-4 border-t border-border text-sm">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">E-mail</div>
                <div className="font-bold break-words">sede.institutoafas@gmail.com</div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                <div className="font-bold">+55 (62) 99394-4050</div>
              </div>
            </div>
            <button
              type="button"
              onClick={openDonation}
              className="w-full sm:w-auto inline-block bg-primary text-primary-foreground px-6 py-3 font-bold rounded-full hover:bg-primary/90 transition-all"
            >
              Gerar doação
            </button>
          </Reveal>

          <Reveal delay={120} className="border border-border rounded-2xl p-7 sm:p-10 space-y-6 bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="font-mono text-sm text-primary">02/</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter">Quero ser voluntário</h2>
            <p className="text-muted-foreground leading-relaxed">
              Profissionais de saúde, educação, direito ou qualquer área são bem-vindos. Mande
              uma mensagem contando como pode ajudar.
            </p>
            <a
              href="https://wa.me/556293944050?text=Ol%C3%A1,%20gostaria%20de%20ser%20volunt%C3%A1rio(a)%20do%20Instituto%20AFAS%20e%20quero%20saber%20como%20posso%20contribuir"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto text-center inline-block bg-foreground text-background px-6 py-3 font-bold rounded-lg"
            >
              Falar pelo WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16 grid sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">E-mail</div>
            <div className="break-words">sede.institutoafas@gmail.com</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Onde estamos</div>
            <div>Interior de Goiás — Brasil</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Redes</div>
            <a href="https://www.instagram.com/institutoafas/" target="_blank" rel="noreferrer" className="hover:text-primary">
              @institutoafas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}