import { createFileRoute } from "@tanstack/react-router";
import { campaigns } from "@/data/campaigns";
import { useDonation } from "@/components/site/DonationProvider";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/campanhas")({
  head: () => ({
    meta: [
      { title: "Programas — Instituto AFAS" },
      { name: "description", content: "Conheça os programas essenciais e complementares do Instituto AFAS, além dos eventos, campanhas sazonais e parcerias do AFAS Sustentável." },
      { property: "og:title", content: "Programas — Instituto AFAS" },
      { property: "og:description", content: "Programas contínuos que transformam a vida de crianças no interior de Goiás." },
    ],
  }),
  component: CampanhasPage,
});

const complementaryPrograms = [
  {
    name: "Amor que Cresce",
    description: "Apoio a gestantes, planejamento familiar e kits para recém-nascidos.",
  },
  {
    name: "Level Up",
    description: "Ensino e suporte educacional, incluindo aulas de inglês com professores qualificados.",
  },
  {
    name: "Direito de Amar",
    description: "Atendimento jurídico para a rede familiar da criança, adolescente e população em geral.",
  },
  {
    name: "Meu Pijama Pijaminha",
    description: "Fortalecimento da identidade e autoconfiança infanto-juvenil, com a doação do pijama como objeto simbólico do programa.",
  },
] as const;

const fixedEvents = [
  {
    name: "Amor em Cada Peça",
    description: "Bazar solidário realizado de forma semestral ou anual.",
  },
  {
    name: "Oxente, Ajuda aí",
    description: "Festa do Milho, evento junino com temática caipira.",
  },
] as const;

function CampanhasPage() {
  const { openDonation } = useDonation();
  return (
    <>
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto animate-reveal">
          <div className="inline-block px-3 py-1 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest rounded mb-5 sm:mb-6">
            Programas
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6 sm:mb-8 text-balance max-w-4xl">
            Onde sua doação <span className="text-primary">vira impacto.</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl text-pretty">
            Os programas do AFAS atuam de forma integrada no cuidado físico, mental, socioemocional
            e espiritual de crianças, adolescentes e famílias, com ações de proteção, desenvolvimento
            humano e fortalecimento do sentido de vida.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12 sm:mb-16">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
              Programas Essenciais
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter">
              Cuidado integral em quatro frentes
            </h2>
          </Reveal>
          <div className="space-y-16 sm:space-y-24">
          {campaigns.map((c, i) => (
            <Reveal
              as="article"
              key={c.slug}
              className={`grid md:grid-cols-2 gap-8 sm:gap-12 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <img
                src={c.image}
                alt={c.title}
                width={800}
                height={600}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
              />
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="font-mono text-sm text-primary">
                    0{i + 1}/
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-border rounded">
                    {c.tag}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    {c.status}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter">{c.title}</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
                  {c.description}
                </p>
                {c.program && (
                  <div className="space-y-5 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-7">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1">
                        Programa social
                      </div>
                      {c.program.logo && (
                        <img
                          src={c.program.logo}
                          alt={`Logo do programa ${c.program.name}`}
                          width={320}
                          height={320}
                          loading="lazy"
                          className="w-28 sm:w-36 h-auto rounded-xl mb-4"
                        />
                      )}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        {c.program.name}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                        {c.program.intro}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                        <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">
                          Como funciona?
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                          {c.program.howItWorks.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                        <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">
                          Quem pode participar?
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                          {c.program.whoCanParticipate.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                      <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">
                        Como ajudar?
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                        {c.program.howToHelp.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    <span>Progresso</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="h-1 bg-border w-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openDonation}
                  className="inline-block bg-foreground text-background px-8 py-4 font-bold rounded-lg hover:-translate-y-0.5 transition-transform"
                >
                  Apoiar este programa
                </button>
              </div>
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-5 sm:px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-3xl mb-10 sm:mb-14">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
              Programas Complementares
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter mb-5">
              Apoio que acompanha diferentes fases da vida
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Além dos programas essenciais, o AFAS mantém frentes de apoio à gestação, educação,
              orientação jurídica e fortalecimento da identidade de crianças e adolescentes.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {complementaryPrograms.map((program, i) => (
              <Reveal
                key={program.name}
                delay={i * 90}
                className="rounded-2xl border border-border bg-background p-6 sm:p-7"
              >
                <div className="font-mono text-xs text-primary mb-4">0{i + 5}/</div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-3">
                  {program.name}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-3xl mb-10 sm:mb-14">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
              AFAS Sustentável
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter mb-5">
              Mobilização, eventos e parcerias
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A sustentabilidade das ações também passa por eventos próprios, campanhas sazonais
              e alianças com empresas, profissionais liberais e órgãos públicos.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <Reveal className="rounded-2xl border border-border p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-5">Eventos fixos</h3>
              <div className="space-y-5">
                {fixedEvents.map((event) => (
                  <div key={event.name}>
                    <p className="font-bold">{event.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="rounded-2xl border border-border p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-5">Campanhas sazonais</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Ações pontuais ligadas a datas comemorativas e estações do ano, como Páscoa,
                campanha de roupas de inverno, Dia das Crianças, Natal e outras mobilizações.
              </p>
            </Reveal>

            <Reveal delay={200} className="rounded-2xl border border-border p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-5">Parcerias comerciais</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Alianças com empresas, profissionais liberais locais e regionais e órgãos públicos
                ajudam a ampliar o alcance e a continuidade das ações do Instituto AFAS.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}