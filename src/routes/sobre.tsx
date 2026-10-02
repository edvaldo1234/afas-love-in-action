import { createFileRoute } from "@tanstack/react-router";
import keillaAsset from "@/assets/keilla-foto.jpg.asset.json";
import volunteers from "@/assets/volunteers.jpg";
import { useDonation } from "@/components/site/DonationProvider";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "O Instituto — Instituto AFAS" },
      { name: "description", content: "Conheça a história do Instituto AFAS, fundado por Keilla, atuando há mais de 8 anos no interior de Goiás." },
      { property: "og:title", content: "O Instituto — Instituto AFAS" },
      { property: "og:description", content: "Mais de 8 anos transformando vidas no interior goiano." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  const { openDonation } = useDonation();
  return (
    <>
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto animate-reveal">
          <div className="inline-block px-3 py-1 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest rounded mb-5 sm:mb-6">
            O Instituto
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6 sm:mb-8 text-balance">
            Amor que se traduz em <span className="text-primary">ação concreta.</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl text-pretty">
            O Instituto AFAS — Ame Fazendo Ação Solidária — é uma organização sem fins lucrativos
            que há mais de 8 anos atende crianças e famílias em situação de vulnerabilidade no
            interior de Goiás.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <Reveal className="max-w-5xl mx-auto">
          <img
            src={volunteers}
            alt="Voluntários do Instituto AFAS organizando doações"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full aspect-[3/2] object-cover rounded-2xl"
          />
        </Reveal>
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <Reveal className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 sm:gap-12">
          <div className="md:col-span-1">
            <div className="font-mono text-sm text-primary mb-2">01/</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Nossa história</h2>
          </div>
          <div className="md:col-span-2 space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
            <p>
              Tudo começou com a inquietação da <strong className="text-foreground">Keilla</strong>{" "}
              ao ver de perto a realidade de famílias do interior goiano. O que era uma ação
              individual de distribuição de alimentos cresceu, ano após ano, para se tornar uma
              rede organizada de cuidado.
            </p>
            <p>
              Em mais de 8 anos de atuação ininterrupta, o instituto consolidou parcerias locais,
              formou uma equipe multidisciplinar de voluntários e estruturou programas que vão
              muito além da assistência emergencial.
            </p>
            <p>
              Hoje, o AFAS é referência regional em acolhimento integral à infância — combinando
              segurança alimentar, saúde mental, suporte jurídico e atividades educativas em um
              único projeto de transformação social.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-card border-y border-border">
        <Reveal className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <img
            src={keillaAsset.url}
            alt="Keilla, fundadora do Instituto AFAS"
            width={1000}
            height={1000}
            loading="lazy"
            className="w-full aspect-square object-contain rounded-2xl bg-card"
          />
          <div className="space-y-5 sm:space-y-6">
            <div className="font-mono text-sm text-primary">02/</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Liderança que inspira
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              Keilla é o coração e o motor do instituto. À frente da equipe há quase uma década,
              ela articula voluntários, mobiliza doadores e mantém viva a missão diária de cuidar
              de quem mais precisa.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              Sua liderança transformou um sonho em uma rede de proteção que envolve dezenas de
              voluntários e atende centenas de crianças todos os meses.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {[
              ["Missão", "Promover dignidade e oportunidade para crianças do interior de Goiás através de ações solidárias contínuas."],
              ["Visão", "Ser referência regional em proteção integral à infância, articulando voluntariado qualificado e impacto comunitário."],
              ["Valores", "Amor, ação, transparência, escuta ativa e compromisso com o desenvolvimento humano de cada criança atendida."],
            ].map(([title, desc], i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="font-mono text-sm text-primary mb-4">{title}</div>
                <p className="text-base sm:text-lg leading-relaxed">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-foreground text-background">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter mb-8">
            Faça parte dessa história.
          </h2>
          <button
            type="button"
            onClick={openDonation}
            className="inline-block bg-primary text-primary-foreground px-10 py-5 font-bold rounded-full hover:scale-105 transition-transform"
          >
            Quero apoiar
          </button>
        </Reveal>
      </section>
    </>
  );
}