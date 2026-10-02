import { createFileRoute, Link } from "@tanstack/react-router";
import heroChildrenAsset from "@/assets/hero-children.jpg.asset.json";
import keillaAsset from "@/assets/keilla-foto.jpg.asset.json";
import { campaigns } from "@/data/campaigns";
import { useDonation } from "@/components/site/DonationProvider";
import { useVolunteer } from "@/components/site/VolunteerProvider";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Instituto AFAS — Ame Fazendo Ação Solidária no interior de Goiás" },
      { name: "description", content: "Instituto AFAS: cuidado integral para crianças, adolescentes e famílias, com programas de saúde física, mental, socioemocional e espiritual." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = campaigns.slice(0, 3);
  const { openDonation } = useDonation();
  const { openVolunteer } = useVolunteer();
  return (
    <>
      {/* Hero */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-5 sm:px-6 overflow-hidden">
        {/* Ambient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 size-72 sm:size-96 rounded-full bg-primary/20 blur-3xl animate-float-slow"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 -left-24 size-64 sm:size-80 rounded-full bg-secondary/20 blur-3xl animate-float-slower"
        />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          <div className="lg:col-span-7 animate-reveal">
            <div className="inline-block px-3 py-1 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest rounded mb-5 sm:mb-6">
              Porque quem ama, faz. AFAS.
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] sm:leading-[0.9] mb-6 sm:mb-8 text-balance">
              Transformando o futuro no <span className="text-primary">coração de Goiás.</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-[54ch] leading-relaxed mb-4 text-pretty">
              O Instituto AFAS promove cuidado integral a crianças, adolescentes e suas famílias,
              com programas voltados à saúde física, mental, socioemocional e espiritual.
            </p>
            <p className="text-sm sm:text-base font-semibold text-primary mb-8 sm:mb-10">
              Transformando vidas com Amor e Ação.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <Link
                to="/campanhas"
                className="text-center bg-foreground text-background px-6 sm:px-8 py-4 font-bold rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Conheça nossos programas
              </Link>
              <button
                type="button"
                onClick={openVolunteer}
                className="text-center px-6 sm:px-8 py-4 border border-border font-bold rounded-lg hover:bg-card hover:-translate-y-0.5 transition-all"
              >
                Seja um voluntário
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 animate-reveal [animation-delay:200ms]">
            <img
              src={heroChildrenAsset.url}
              alt="Crianças atendidas pelo Instituto AFAS no interior de Goiás"
              width={1024}
              height={1280}
              className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              ["01/", "8+ Anos", "Atuando no interior"],
              ["02/", "500+", "Cestas entregues/mês"],
              ["03/", "12", "Especialistas voluntários"],
              ["04/", "2.5k", "Crianças impactadas"],
            ].map(([n, big, label], i) => (
              <Reveal key={n} delay={i * 100} className="space-y-2">
                <div className="font-mono text-sm text-primary">{n}</div>
                <div className="text-3xl sm:text-5xl font-extrabold tracking-tighter">{big}</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 sm:py-32 px-5 sm:px-6 bg-card border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-2xl mb-12 sm:mb-16">
            <div className="inline-block px-3 py-1 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest rounded mb-5">
              Nossa essência
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-balance">
              Missão, Visão e Valores
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <Reveal className="bg-background border border-border rounded-2xl p-7 sm:p-10 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="font-mono text-sm text-primary">01/</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Missão</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Amar com ação, cuidar, servir e transformar.
              </p>
            </Reveal>
            <Reveal delay={120} className="bg-background border border-border rounded-2xl p-7 sm:p-10 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="font-mono text-sm text-primary">02/</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Visão</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Ser uma casa de cuidado e desenvolvimento integral, que transforma o futuro de
                crianças e de suas famílias por meio do amor e da ação, da solidariedade e
                espiritualidade.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-6 sm:mb-8">
              Valores e Princípios
            </h3>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {[
                "Amor é Ação",
                "Integralidade do Ser",
                "Acolher e Servir",
                "Vida com Propósito",
                "Humanidade",
                "Alegria",
                "Princípios Cristãos",
                "Proteção, Justiça e Educação",
                "Desenvolvimento Humano",
                "Transformação",
              ].map((valor) => (
                <span
                  key={valor}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 bg-background border border-border rounded-full text-sm sm:text-base font-bold hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all"
                >
                  {valor}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 sm:py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <Reveal className="flex flex-col sm:flex-row sm:flex-wrap gap-6 sm:justify-between sm:items-end mb-12 sm:mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter mb-4">
                Nossos Programas
              </h2>
              <p className="text-background/60 text-base sm:text-lg">
                Ações contínuas que levam alimento, saúde mental e suporte jurídico para quem mais
                precisa.
              </p>
            </div>
            <Link
              to="/campanhas"
              className="self-start border-b border-primary text-primary font-bold pb-1 hover:text-background transition-colors"
            >
              Ver todas as ações
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}>
                <Link to="/campanhas" className="group block">
                  <div className="w-full aspect-[4/3] rounded-xl mb-6 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                    {c.tag}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{c.title}</h3>
                  <p className="text-background/60 text-sm leading-relaxed mb-4">{c.short}</p>
                  <div className="h-1 bg-background/10 w-full overflow-hidden">
                    <div
                      className="h-full bg-primary origin-left transition-transform duration-1000 group-hover:scale-x-100"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder / Institutional */}
      <section className="py-20 sm:py-32 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <Reveal className="order-2 lg:order-1">
              <img
                src={keillaAsset.url}
                alt="Keilla, fundadora do Instituto AFAS"
                width={1000}
                height={1000}
                loading="lazy"
                className="w-full aspect-square object-contain rounded-full border-[8px] sm:border-[12px] border-card shadow-2xl bg-card p-6 sm:p-10"
              />
            </Reveal>
            <Reveal delay={150} className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Uma missão liderada pelo amor.
              </h2>
              <div className="space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
                <p>
                  O Instituto AFAS nasceu do desejo da <strong className="text-foreground">Keilla</strong>{" "}
                  de mudar a realidade local. O que começou como uma iniciativa individual cresceu
                  para se tornar uma rede de proteção essencial em Goiás.
                </p>
                <p>
                  Hoje, contamos com uma equipe multidisciplinar de nutricionistas, psicólogos e
                  advogados que doam seu tempo e expertise para garantir que o desenvolvimento
                  dessas crianças seja pleno e protegido.
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/10 grid place-items-center text-primary font-bold italic">
                  K
                </div>
                <div>
                  <p className="font-bold">Keilla</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Fundadora & Liderança
                  </p>
                </div>
              </div>
              <Link to="/sobre" className="inline-block border-b border-primary text-primary font-bold pb-1 story-link">
                Conheça nossa história →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 px-5 sm:px-6">
        <Reveal className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tighter mb-10 sm:mb-12 text-balance">
            Sua ajuda muda realidades.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={openDonation}
              className="w-full md:w-auto bg-primary text-primary-foreground px-10 sm:px-12 py-5 sm:py-6 text-lg font-bold rounded-full hover:scale-105 transition-transform"
            >
              Quero ser um Doador
            </button>
            <button
              type="button"
              onClick={openVolunteer}
              className="w-full md:w-auto text-center border border-foreground px-10 sm:px-12 py-5 sm:py-6 text-lg font-bold rounded-full hover:bg-foreground hover:text-background transition-colors"
            >
              Quero ser Voluntário
            </button>
          </div>
        </Reveal>
      </section>
    </>
  );
}