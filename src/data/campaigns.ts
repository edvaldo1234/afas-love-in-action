import campaignFoodAsset from "@/assets/campaign-food.jpg.asset.json";
import campaignPsychAsset from "@/assets/campaign-psych.jpg.asset.json";
import campaignLegalAsset from "@/assets/campaign-legal.jpg.asset.json";
import campaignWorkshopAsset from "@/assets/campaign-workshop.jpg.asset.json";
import campaignSchoolAsset from "@/assets/campaign-school.jpg.asset.json";
import logoAmorQueNutri from "@/assets/logo-amor-que-nutri.jpg.asset.json";
import logoAcalmaMente from "@/assets/logo-acalmamente.jpg.asset.json";
import logoVozDoSilencio from "@/assets/logo-voz-do-silencio.jpg.asset.json";

export type Campaign = {
  slug: string;
  title: string;
  tag: string;
  short: string;
  description: string;
  image: string;
  status: "Ativa" | "Sazonal" | "Contínua";
  progress: number;
  program?: {
    name: string;
    logo?: string;
    intro: string;
    howItWorks: string[];
    whoCanParticipate: string[];
    howToHelp: string[];
  };
};

export const campaigns: Campaign[] = [
  {
    slug: "combate-a-fome",
    title: "Amor que Nutre",
    tag: "Saúde Física e Nutrição",
    short: "Educação nutricional, distribuição de alimentos e cursos para promover saúde e bem-estar.",
    description:
      "Programa de cuidado com a saúde física por meio de educação nutricional, distribuição de alimentos e cursos, fortalecendo famílias em situação de vulnerabilidade.",
    image: campaignFoodAsset.url,
    status: "Ativa",
    progress: 75,
    program: {
      name: "Amor que Nutri",
      logo: logoAmorQueNutri.url,
      intro:
        "Programa voltado para promover a saúde física, alimentação saudável e educação nutricional. Atua na distribuição de alimentos através do Mercado Solidário, acompanhamento nutricional e cursos na área, ajudando a promover saúde, combater a fome e a desnutrição.",
      howItWorks: [
        "Distribuição periódica de alimentos para famílias de baixa renda cadastradas e acompanhadas por profissionais da saúde.",
        "Acesso ao “Mercado Solidário Amor Que Nutre” para escolha dos alimentos que a família necessita.",
        "Oficinas e cursos conduzidos por profissionais da área de nutrição, alimentação e afins.",
        "Acompanhamento e suporte para melhorar a qualidade da alimentação das famílias.",
      ],
      whoCanParticipate: [
        "Famílias em situação de vulnerabilidade socioeconômica.",
        "Crianças, adolescentes e rede familiar atendidos pelo projeto.",
        "Responsáveis interessados em melhorar a alimentação familiar.",
      ],
      howToHelp: [
        "Doações de alimentos ou valores para abastecer o Mercado Solidário.",
        "Ser voluntário nutricionista e afins ou educador da área da alimentação.",
        "Parcerias com mercados, padarias, restaurantes e outras empresas do setor alimentar.",
      ],
    },
  },
  {
    slug: "apoio-psicologico",
    title: "ACALMAmente",
    tag: "Saúde Mental",
    short: "Atendimento psicológico e terapêutico para crianças, adolescentes e adultos.",
    description:
      "Atendimento psicológico e terapêutico com foco em saúde mental e socioemocional, acolhendo crianças, adolescentes, adultos e famílias.",
    image: campaignPsychAsset.url,
    status: "Contínua",
    progress: 60,
    program: {
      name: "AcalmaMente",
      logo: logoAcalmaMente.url,
      intro:
        "Programa voltado para a promoção do bem-estar mental e socioemocional de crianças, adolescentes e de suas famílias. Por meio de atendimento psicológico e apoio terapêutico, fortalece o equilíbrio emocional e o desenvolvimento de habilidades para o enfrentamento dos desafios do dia a dia.",
      howItWorks: [
        "Atendimento realizado por psicólogos qualificados.",
        "Sessões individualizadas, em grupos e em família.",
        "Estratégias terapêuticas adaptadas para cada necessidade.",
        "Acompanhamento contínuo para fortalecimento emocional.",
      ],
      whoCanParticipate: [
        "Crianças e adolescentes atendidos pelo projeto.",
        "Pais, mães e responsáveis que precisam de apoio emocional.",
        "Comunidade em geral mediante triagem feita pela instituição.",
        "Pessoas encaminhadas pela rede pública e órgãos parceiros.",
      ],
      howToHelp: [
        "Contribua financeiramente para ampliar o atendimento gratuito.",
        "Voluntariado para psicólogos e profissionais da área da saúde mental.",
        "Doe materiais terapêuticos e livros para apoio psicológico.",
        "Estudantes da área podem atuar como estagiários não remunerados.",
      ],
    },
  },
  {
    slug: "assessoria-juridica",
    title: "Voz do Silêncio",
    tag: "Proteção e Amparo",
    short: "Proteção, amparo e encaminhamento de vítimas de violência e abuso.",
    description:
      "Programa de identificação, acolhimento, proteção e encaminhamento de crianças, adolescentes e outras vítimas de violência, abuso e situações de vulnerabilidade.",
    image: campaignLegalAsset.url,
    status: "Contínua",
    progress: 40,
    program: {
      name: "Voz do Silêncio",
      logo: logoVozDoSilencio.url,
      intro:
        "Iniciativa voltada para a identificação, acolhimento e encaminhamento de crianças, adolescentes e outras vítimas de violência doméstica, abuso e outras formas de vulnerabilidade, atuando na detecção de sinais silenciosos de sofrimento infanto-juvenil. Por meio de escuta qualificada e suporte psicológico, buscamos garantir que cada criança e adolescente tenha sua voz ouvida e protegida.",
      howItWorks: [
        "Identificação de sinais de vulnerabilidade por equipe treinada.",
        "Acolhimento e suporte terapêutico para superação de traumas.",
        "Encaminhamento responsável aos órgãos de proteção social e jurídica.",
        "Palestras e ações educativas de conscientização, prevenção e identificação de violação de direitos (Maio Laranja).",
      ],
      whoCanParticipate: [
        "Crianças, adolescentes e pessoas vítimas de violência e abuso.",
        "Famílias e mulheres que buscam orientação, suporte e proteção social.",
        "Pessoas e casos encaminhados pela rede pública e órgãos parceiros.",
      ],
      howToHelp: [
        "Voluntariado para psicólogos, assistentes sociais e profissionais do direito.",
        "Patrocínio para expansão dos atendimentos e dos programas.",
        "Doação de materiais lúdicos, pedagógicos e de apoio ao acolhimento infanto-juvenil.",
        "Seja um multiplicador: compartilhe nossas publicações e programas nas redes sociais. Isso salva vidas!",
      ],
    },
  },
  {
    slug: "oficinas-criativas",
    title: "Raízes",
    tag: "Espiritualidade e Propósito",
    short: "Aconselhamento espiritual, princípios e propósito de vida com base na Psicologia Transpessoal.",
    description:
      "Programa voltado ao fortalecimento de valores, princípios, espiritualidade e propósito de vida a partir de uma visão integral do ser humano.",
    image: campaignWorkshopAsset.url,
    status: "Ativa",
    progress: 80,
    program: {
      name: "Raízes",
      intro:
        "Iniciativa fundamentada na Psicologia Transpessoal, abordagem científica que reconhece a espiritualidade como parte essencial e inseparável do ser humano, ao lado da mente, das emoções e do corpo. A partir desse olhar integral, o programa oferece fortalecimento dos valores e princípios cristãos, aconselhamento espiritual e orientação para a descoberta de um propósito de vida pleno e equilibrado.",
      howItWorks: [
        "Aconselhamento espiritual comunitário, familiar, individual e em grupo, fundamentado em princípios cristãos.",
        "Encontros, workshops e momentos reflexivos sobre propósito e sentido da vida.",
        "Atividades lúdicas para crianças e adolescentes focadas em virtudes e valores.",
        "Abordagem integral integrada à psicologia transpessoal.",
      ],
      whoCanParticipate: [
        "Crianças e adolescentes, juntamente com suas famílias e rede de apoio.",
        "Pessoas que buscam autoconhecimento, fortalecimento emocional e descoberta de um propósito de vida.",
        "Famílias e membros da comunidade que desejam desenvolver a espiritualidade através de valores humanos e princípios éticos.",
      ],
      howToHelp: [
        "Voluntariado para profissionais da psicologia, teologia e áreas afins.",
        "Ajude a promover encontros e workshops.",
        "Doação de materiais educativos e livros sobre valores, princípios e espiritualidade.",
        "Seja um multiplicador: compartilhe nossas publicações e programas nas redes sociais. Isso salva vidas!",
      ],
    },
  },
  {
    slug: "level-up",
    title: "Level Up",
    tag: "Educação",
    short: "Ensino e suporte educacional, incluindo aulas de inglês com professores qualificados.",
    description:
      "Programa de ensino e suporte educacional que amplia oportunidades de aprendizagem, incluindo aulas de inglês com professores qualificados.",
    image: campaignSchoolAsset.url,
    status: "Contínua",
    progress: 55,
  },
];