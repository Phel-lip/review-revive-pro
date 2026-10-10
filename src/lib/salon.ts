import heroAsset from "@/assets/am-hero-upload.png.asset.json";
const hero = heroAsset.url;
import corteAsset from "@/assets/service-corte-refined.jpg.asset.json";
const corte = corteAsset.url;
import finalizacaoAsset from "@/assets/service-escova-refined.jpg.asset.json";
const finalizacao = finalizacaoAsset.url;
import tratamentoAsset from "@/assets/am-fashion-result.jpg.asset.json";
const tratamento = tratamentoAsset.url;
import luzesAsset from "@/assets/service-luzes-refined.jpg.asset.json";
const luzes = luzesAsset.url;
import unhasAsset from "@/assets/service-unhas-refined.jpg.asset.json";
const unhas = unhasAsset.url;

// Single source of truth for salon details (verified on the official Instagram bio).
export const SALON = {
  name: "A.M Cabelos & Produções",
  shortName: "A.M",
  city: "Araguaína · TO",
  hours: "Segunda a sábado · 8h10 às 19h",
  whatsapp: "5563992577702",
  whatsappLabel: "(63) 99257-7702",
  instagram: "https://www.instagram.com/a.m_cabelos/",
  instagramHandle: "@a.m_cabelos",
  heroImg: hero,
};

export type Category = "Cortes" | "Finalização" | "Tratamentos" | "Luzes" | "Unhas";

export type Service = {
  id: string;
  title: string;
  category: Category;
  copy: string;
  cta: string;
  img: string;
  pros: string[];
  source: string;
  alt?: string;
  details?: string[];
};

export const SERVICES: Service[] = [
  { id: "luzes", title: "Luzes & mechas", category: "Luzes", copy: "Ilumine o visual com mechas que destacam o comprimento e emolduram o rosto. Converse com o salão sobre o tom e o efeito que você deseja.", details: ["Iluminação", "Cor & contraste"], cta: "Solicitar luzes", img: luzes, alt: "Mechas claras e contraste na raiz, na A.M Cabelos & Produções", pros: [], source: SALON.instagram },
  { id: "corte", title: "Corte feminino", category: "Cortes", copy: "Renove o corte, ajuste o comprimento e valorize o caimento dos fios. Do cuidado com as pontas à mudança de visual, escolha seu próximo corte com o salão.", details: ["Comprimento", "Caimento & movimento"], cta: "Solicitar corte", img: corte, alt: "Cabelo castanho com pontas modeladas na A.M Cabelos & Produções", pros: [], source: "https://www.instagram.com/a.m_cabelos/reel/DLLUKQnyqlD/" },
  { id: "hidratacao", title: "Escova Fashion Gold", category: "Tratamentos", copy: "Conheça a Escova Fashion Gold oferecida pelo salão, com fios alinhados e brilho no resultado. Consulte a avaliação indicada para o seu cabelo e os cuidados após o serviço.", details: ["Alinhamento dos fios", "Brilho"], cta: "Consultar Fashion Gold", img: tratamento, alt: "Resultado final da Escova Fashion Gold em cabelo longo e alinhado, com brilho", pros: [], source: "https://www.instagram.com/a.m_cabelos/reel/Cpm8j0xgy3Z/" },
  { id: "finalizacao", title: "Escova & finalização", category: "Finalização", copy: "Uma finalização para valorizar seu cabelo: comprimento alinhado, pontas modeladas e movimento. Combine com o salão o acabamento que mais combina com você.", details: ["Pontas modeladas", "Acabamento"], cta: "Solicitar escova", img: finalizacao, alt: "Cabelo castanho com pontas modeladas na A.M Cabelos & Produções", pros: [], source: "https://www.instagram.com/a.m_cabelos/reel/DK48qv3ArTP/" },
  { id: "unhas", title: "Unhas decoradas", category: "Unhas", copy: "Cor e detalhes para completar o seu visual. Conheça as unhas decoradas do salão e consulte as opções de esmaltação e desenhos disponíveis.", details: ["Esmaltação", "Decoração"], cta: "Solicitar unhas", img: unhas, alt: "Unhas rosa com detalhes dourados na A.M Cabelos & Produções", pros: [], source: "https://www.instagram.com/stories/highlights/17900970487755591/" },
];

export const CATEGORIES: ("Todos" | Category)[] = ["Todos", "Cortes", "Finalização", "Tratamentos", "Luzes", "Unhas"];
export const MARQUEE_ITEMS = ["CABELOS", "CORTES", "ESCOVA", "FINALIZAÇÃO", "HIDRATAÇÃO", "ACIDIFICAÇÃO"];
// Within verified opening hours (8h10–19h).
export const PERIODS = ["Manhã (8h10–12h)", "Tarde (12h–16h)", "Fim da tarde (16h–19h)"];
export const NO_PREF = "Sem preferência";

export function fmtDate(d: string) {
  if (!d) return "A combinar";
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

export function todayLocal(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function buildWhatsAppUrl(o: { service: string; pro: string; date: string; period: string; notes: string }) {
  const lines = [
    `Olá, ${SALON.name}! Gostaria de solicitar um horário:`,
    ``,
    `• Serviço: ${o.service}`,
    `• Profissional: ${o.pro || NO_PREF}`,
    `• Data preferida: ${fmtDate(o.date)}`,
    `• Período preferido: ${o.period || "A combinar"}`,
    ...(o.notes.trim() ? [`• Observação: ${o.notes.trim()}`] : []),
    ``,
    `Aguardo a confirmação da disponibilidade.`,
  ];
  return `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
