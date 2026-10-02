import { createFileRoute } from "@tanstack/react-router";
import keillaAsset from "@/assets/keilla-foto.jpg.asset.json";
import volunteersAsset from "@/assets/volunteers.jpg.asset.json";
import { useDonation } from "@/components/site/DonationProvider";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "O Instituto — Instituto AFAS" },
      { name: "description", content: "Conheça o Instituto AFAS e seu trabalho de cuidado integral com crianças, adolescentes e famílias por meio de saúde física, mental, socioemocional e espiritual." },
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
            O Instituto AFAS — Ame Fazendo Ação Solidária — promove cuidado integral a crianças,
            adolescentes e suas famílias em situação de maior fragilidade socioeconômica e emocional.
          </p>
          <p className="mt-5 text-sm sm:text-base font-semibold text-primary">
            Porque quem ama, faz. AFAS. — Transformando vidas com Amor e Ação.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-5 sm:px-6">
        <Reveal className="max-w-5xl mx-auto">
          <img
            src={volunteersAsset.url}
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
        <div className="max-w-5xl mx-auto">
          <Reveal className="max-w-3xl mb-10 sm:mb-14">
            <div className="font-mono text-sm text-primary mb-3">02/</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-5">
              Um olhar integral para o ser humano
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              Nossos programas têm como base a Psicologia Transpessoal e integram quatro dimensões
              essenciais da vida humana: saúde física, mental, socioemocional e espiritual. O trabalho
              busca acolhimento, proteção, desenvolvimento humano e sentido de vida, guiado pelo Amor
              em Ação e por princípios e valores cristãos.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["Corpo", "Saúde física e bem-estar, considerando os aspectos biológicos."],
              ["Mente", "Educação e desenvolvimento intelectual, com foco nos aspectos mentais e cognitivos."],
              ["Socioemocional", "Apoio psicológico e emocional, integrando aspectos psicológicos e sociais."],
              ["Espiritual", "Valores, princípios e propósito de vida, contemplando os aspectos espirituais."],
            ].map(([title, desc], i) => (
              <Reveal
                key={title}
                delay={i * 90}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
                  Pilar 0{i + 1}
                </div>
                <h3 className="text-xl font-extrabold mb-3">{title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
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
            <div className="font-mono text-sm text-primary">03/</div>
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
              ["Missão", "Amar com ação, cuidando, servindo e transformando realidades por meio de programas integrados."],
              ["Visão", "Promover desenvolvimento integral de crianças, adolescentes e famílias, fortalecendo corpo, mente, dimensão socioemocional e espiritual."],
              ["Valores", "Acolhimento, proteção, desenvolvimento humano, sentido de vida, Amor em Ação e princípios cristãos."],
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