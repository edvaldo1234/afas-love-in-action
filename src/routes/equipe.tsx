import { createFileRoute, Link } from "@tanstack/react-router";
import volunteersAsset from "@/assets/volunteers.jpg.asset.json";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/equipe")({
  head: () => ({
    meta: [
      { title: "Equipe — Instituto AFAS" },
      { name: "description", content: "Equipe multidisciplinar de voluntários: nutricionistas, psicólogos e advogados a serviço da infância goiana." },
      { property: "og:title", content: "Equipe — Instituto AFAS" },
      { property: "og:description", content: "Profissionais voluntários cuidando de crianças no interior de Goiás." },
    ],
  }),
  component: EquipePage,
});

const specialties = [
  {
    n: "01/",
    title: "Nutrição",
    desc: "Nutricionistas planejam cestas equilibradas e acompanham o desenvolvimento físico das crianças atendidas.",
  },
  {
    n: "02/",
    title: "Psicologia",
    desc: "Psicólogos clínicos oferecem escuta e tratamento contínuo para crianças que enfrentam traumas e perdas.",
  },
  {
    n: "03/",
    title: "Direito",
    desc: "Advogados garantem orientação jurídica gratuita em direito de família, benefícios e proteção à criança.",
  },
  {
    n: "04/",
    title: "Voluntariado",
    desc: "Mais de 40 voluntários da comunidade que organizam eventos, distribuições e oficinas semanais.",
  },
];

function EquipePage() {
  return (
    <>
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto animate-reveal">
          <div className="inline-block px-3 py-1 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest rounded mb-5 sm:mb-6">
            Equipe
          </div>
          <h1 className="text-[clamp(2.25rem,10vw,3.75rem)] sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6 sm:mb-8 text-balance">
            Profissionais movidos por <span className="text-primary">propósito.</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl text-pretty">
            Liderada por Keilla, nossa equipe reúne especialistas que doam tempo e expertise para
            entregar mais do que assistência — entregar cuidado integral.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-12 sm:pb-16">
        <Reveal className="max-w-7xl mx-auto">
          <img
            src={volunteersAsset.url}
            alt="Equipe voluntária do Instituto AFAS"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full aspect-[4/3] sm:aspect-[3/2] object-cover rounded-2xl"
          />
        </Reveal>
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-x-16 gap-y-12 sm:gap-y-16">
          {specialties.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 120} className="rounded-2xl border border-border bg-card p-6 md:rounded-none md:border-x-0 md:border-b-0 md:bg-transparent md:p-0 md:pt-8">
              <div className="font-mono text-sm text-primary mb-4">{s.n}</div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tighter mb-4">{s.title}</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-card border-y border-border">
        <Reveal className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tighter">
            Quer somar com sua especialidade?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Aceitamos voluntários de todas as áreas — da logística ao direito, da psicologia ao
            ensino. Se você tem tempo e vontade de transformar, tem espaço no AFAS.
          </p>
          <Link
            to="/contato"
            className="w-full sm:w-auto min-h-14 inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 sm:py-5 font-bold rounded-full hover:scale-105 active:scale-[0.98] transition-transform"
          >
            Quero ser voluntário
          </Link>
        </Reveal>
      </section>
    </>
  );
}