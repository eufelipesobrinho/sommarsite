import { useState, useEffect, useRef, type ReactNode, type PointerEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Lock,
  Mic,
  Layers,
  Camera,
  X,
} from 'lucide-react';
import {
  CAKTO_ANNUAL,
  CAKTO_MONTHLY,
  buildCaktoCheckoutUrl,
  persistTrafficParams,
} from './checkoutUrl';

const PRIMARY_CTA =
  'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-[#22C55E]/25 hover:scale-[1.02] active:scale-[0.99] transition-transform duration-200';

const SECONDARY_CTA =
  'inline-flex items-center justify-center gap-2 border border-border bg-white/[0.03] text-white font-extrabold uppercase tracking-widest rounded-xl hover:bg-white/[0.06] transition-colors';

const EMAIL_MICROCOPY =
  'Use no checkout o e-mail com o qual você vai criar a conta no Sommar. É assim que o acesso libera automaticamente.';

const CADASTRO_URL = 'https://app.sommarapp.com.br/cadastro';

const PAGE_TITLE = 'Sommar — Controle o mês sem planilha, com IA que lança por voz e foto';
const PAGE_DESCRIPTION =
  'Salário, casa e renda extra no mesmo app — sem misturar. Marinho IA lança gastos por texto, voz ou comprovante. Relatório em PDF. Pessoal e profissional separados.';

const ASSETS = {
  hero: '/01-visao-geral-dashboard.jpg',
  cockpit: '/02-cockpit-financeiro.jpg',
  workspaces: '/03-gestao-tarefas-workspaces.jpg',
  calendar: '/04-calendario-unificado.jpg',
  habits: '/05-tracker-habitos-streaks.jpg',
  wellness: '/06-bem-estar-humor-sono.jpg',
  subscriptions: '/07-assinaturas-insights-pdf.jpg',
  themes: '/08-customizacao-temas-navegacao.jpg',
  shared: '/09-workspaces-compartilhados.jpg',
  notifications: '/10-central-notificacoes-marinho.jpg',
  marinho: '/11-marinho-ia-super-agente.jpg',
} as const;

type Testimonial = {
  quote: string;
  author: string;
};

const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'O cockpit financeiro e a exportação em PDF facilitam demais na hora de prestar contas. Simples, direto e sem firula.',
    author: 'Pedro',
  },
  {
    quote:
      'Consegui finalmente separar minhas despesas de casa das despesas do dia a dia. Só isso já valeu 10x o valor do plano.',
    author: 'Ágabo',
  },
  {
    quote:
      'A IA Marinho integrada direto no app mudou meu jogo. Mando áudio, texto ou foto do gasto ali mesmo no chat interno e tudo já entra categorizado no financeiro.',
    author: 'José',
  },
  {
    quote:
      'Passando pra agradecer por ter me apresentado o sommar. O sommar tem me ajudado muito principalmente na gestão da minha clínica online, tem me ajudado a separar entradas, saídas, investimentos pra clínica, pagamento pessoal. Fora que o auxílio da inteligência artificial dentro do aplicativo tem me ajudado a otimizar meu tempo ao preencher as informações nas categorias de forma rápida e eficiente. Realmente uma ferramenta me mudou minha maneira de gerir meu negócio! Parabéns pela criação do aplicativo.',
    author: 'Marta',
  },
  {
    quote:
      'O Sommar App tem me ajudado a gerenciar minhas finanças de forma fácil e tecnológica. Lá eu sei quanto eu vou ter de déficit, ou de lucro, assim eu não me perco com meu dinheiro e ajuda a pessoa a ter educação financeira. Realmente é um app muito bom.',
    author: 'Nicholas',
  },
];

const LEAD_PORTRAITS = [
  {
    title: 'CLT',
    text: 'O salário cai no dia 5. Sete dias depois, o rastro se perdeu em PIX, cartão e “só dessa vez”.',
  },
  {
    title: 'Autônomo',
    text: 'Você emite nota e mistura cliente com conta de luz. No fim do mês, não sabe o que sobrou de verdade.',
  },
  {
    title: 'Os dois',
    text: 'Emprego e um segundo fluxo no mesmo Nubank. A casa e o trabalho viram uma conta só.',
  },
] as const;

const AGITATION = [
  'Você evita abrir o banco porque já sabe que vai doer — e mesmo assim não sabe o porquê.',
  'O cartão fecha e a fatura é sempre “maior do que você lembrava”.',
  'Assinaturas que você esqueceu continuam saindo. Ninguém te avisa o custo anual.',
  'Em casa, a conversa vira “a gente ganha bem, por que não sobra?”.',
  'Se tem renda extra, o lucro do bico vira padaria, Uber e boleto — e você chama isso de “deu zero”, sem ter conta.',
  'Você promete “mês que vem eu controlo”. Mês que vem é igual.',
] as const;

const FALSE_EXITS = [
  {
    title: 'A planilha',
    text: 'Pede disciplina que o mês não tem. No dia corrido, você não abre o Sheets.',
  },
  {
    title: 'O extrato do banco',
    text: 'É uma lista. Não é orçamento, não é meta, não é “isso vence amanhã”, não é relatório para o casal.',
  },
  {
    title: 'Três apps ao mesmo tempo',
    text: 'Finanças + tarefas + hábitos é o jeito de não usar nenhum.',
  },
  {
    title: '“Eu guardo na cabeça”',
    text: 'Funciona até o terceiro PIX do dia.',
  },
] as const;

const STACK_ITEMS = [
  'Consultor de IA (texto, voz e foto de comprovante), com confirmação antes de salvar',
  'Financeiro completo: contas, cartões, parcelas, recorrências, PIX, boleto',
  'Dois mundos isolados: casa e trabalho — use um ou os dois',
  'Mapa de calor, categorias, ritmo do mês, o que vence em 7 dias',
  'Detetive de assinaturas: quanto elas pesam no mês e no ano',
  'Relatório em PDF (geral ou só financeiro)',
  'Tarefas, prioridades e calendário',
  'Hábitos com sequência',
  'Metas em reais, com barra de progresso',
  'Humor e sono (privados, só seus)',
  'Casa ou equipe: até 5 pessoas no workspace; rotina íntima continua só sua',
  'Modo privacidade, tema claro/escuro, módulos que você liga ou esconde',
  'Central de ajuda e suporte no WhatsApp',
  'E-book Lucro Real (bônus)',
] as const;

const FOR_YOU = [
  'O salário (ou a receita) entra e você perde o rastro em poucos dias',
  'Você é CLT e quer só a vida pessoal organizada',
  'Você é autônomo e mistura cliente com conta de casa',
  'Você tem emprego e um segundo fluxo e precisa de duas gavetas, não de duas planilhas',
  'Vocês são um casal que quer ver o financeiro da casa sem abrir o diário um do outro',
  'Você já desistiu de app que pede 12 campos para um café',
] as const;

const NOT_FOR_YOU = [
  'Você quer que o banco importe o extrato sozinho (o Sommar lança com você — por voz, foto ou toque)',
  'Você precisa de contabilidade fiscal, DAS, nota, Folha (isso é contador, não este app)',
  'Você não pretende abrir o celular nem para confirmar um lançamento',
] as const;

const PRODUCT_PROOF = [
  {
    eyebrow: 'Marinho',
    title: 'Você não preenche formulário. Você confirma.',
    description:
      '“Gastei 80 no almoço.” Card de confirmação. Voz e câmera no rodapé. Nada grava sem você.',
    image: ASSETS.marinho,
    imageAlt: 'Marinho IA no Sommar App',
  },
  {
    eyebrow: 'Financeiro',
    title: 'O mês deixa de ser uma lista e vira um mapa.',
    description: 'Mapa de calor, onde foi o dinheiro, carrossel dos meses, próximos pagamentos.',
    image: ASSETS.cockpit,
    imageAlt: 'Cockpit financeiro Sommar App',
  },
  {
    eyebrow: 'Contas e cartões',
    title: 'O lançamento já nasce na conta certa.',
    description: 'Saldo, limite, fechamento, vencimento — cada contexto no seu lugar.',
    image: ASSETS.themes,
    imageAlt: 'Contextos Pessoal e Business no Sommar',
  },
  {
    eyebrow: 'Relatório PDF',
    title: 'O mês inteiro numa página.',
    description: 'Capa executiva, assinaturas, gastos por membro e por cartão. Para você ou para o casal.',
    image: ASSETS.subscriptions,
    imageAlt: 'Relatório PDF e assinaturas Sommar App',
  },
  {
    eyebrow: 'Calendário',
    title: 'O vencimento encontra o compromisso.',
    description: 'Tarefa, hábito e boleto no mesmo dia — sem app extra.',
    image: ASSETS.calendar,
    imageAlt: 'Calendário unificado Sommar App',
  },
  {
    eyebrow: 'Privacidade',
    title: 'Abre no trabalho. Ninguém lê sua vida.',
    description: 'Toque no olho. Valores — e, se quiser, descrições — viram ••••••.',
    image: ASSETS.wellness,
    imageAlt: 'Bem-estar e modo privacidade Sommar App',
  },
] as const;

function scrollToPricing() {
  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
}

function ScrollCta({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={scrollToPricing} className={className}>
      {children}
    </button>
  );
}

function EmailNote({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[10px] sm:text-[11px] text-muted-foreground font-medium leading-relaxed ${className}`}>
      {EMAIL_MICROCOPY}
    </p>
  );
}

function PhoneMockup({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px]">
      <div
        className="absolute inset-3 rounded-[36px] bg-[#22C55E]/[0.06] blur-xl pointer-events-none"
        aria-hidden
      />
      <div className="relative rounded-[36px] border-[5px] border-zinc-800 bg-zinc-950 shadow-2xl shadow-green-950/20 p-0">
        <div className="rounded-[30px] overflow-hidden bg-black">
          <img
            src={src}
            alt={alt}
            width={390}
            height={844}
            className="w-full h-auto object-contain object-top block"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            {...(priority
              ? { fetchPriority: 'high' as const }
              : { fetchPriority: 'low' as const })}
          />
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  ariaHidden = false,
}: Testimonial & { ariaHidden?: boolean }) {
  return (
    <article
      aria-hidden={ariaHidden || undefined}
      className="w-[min(85vw,22rem)] sm:w-[24rem] h-[26rem] sm:h-[24rem] shrink-0 p-5 rounded-xl border border-white/10 bg-[#060606] flex flex-col text-left shadow-lg shadow-black/20"
    >
      <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed flex-1 overflow-y-auto pr-1">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-4 pt-3 border-t border-white/10 text-[11px] font-extrabold text-[#22C55E] uppercase tracking-wider shrink-0">
        — {author}
      </p>
    </article>
  );
}

function SocialProofMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const resumeTimer = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let raf = 0;
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current) {
        el.scrollLeft += 0.55;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
  };

  const scheduleResume = () => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 2200);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    pause();
    draggingRef.current = true;
    dragStartX.current = event.clientX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = dragStartScroll.current - (event.clientX - dragStartX.current);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    const el = scrollerRef.current;
    if (el) el.releasePointerCapture(event.pointerId);
    scheduleResume();
  };

  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-[#060606] border-y border-white/[0.06] py-14 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 text-center mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Quem usou, organizou a vida e não quer mais saber de planilhas complexas
        </h2>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20 bg-gradient-to-r from-[#060606] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20 bg-gradient-to-l from-[#060606] to-transparent"
          aria-hidden
        />

        <div
          ref={scrollerRef}
          className="no-scrollbar overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={pause}
          onTouchStart={pause}
          onTouchEnd={scheduleResume}
        >
          <ul className="flex items-stretch gap-4 w-max px-4 py-1">
            {loop.map((item, index) => (
              <li key={`${item.author}-${index}`}>
                <TestimonialCard
                  quote={item.quote}
                  author={item.author}
                  ariaHidden={index >= TESTIMONIALS.length}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function SalesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [annualHref, setAnnualHref] = useState(CAKTO_ANNUAL);
  const [monthlyHref, setMonthlyHref] = useState(CAKTO_MONTHLY);

  useEffect(() => {
    persistTrafficParams();
    setAnnualHref(buildCaktoCheckoutUrl(CAKTO_ANNUAL));
    setMonthlyHref(buildCaktoCheckoutUrl(CAKTO_MONTHLY));

    document.title = PAGE_TITLE;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', PAGE_DESCRIPTION);
  }, []);

  const faqs = [
    {
      q: 'Preciso ter empresa?',
      a: 'Não. O modo Pessoal cobre salário, casa, cartão, metas, rotina. O Business é opcional: renda extra, PJ, clientes, empresa.',
    },
    {
      q: 'CLT pode usar?',
      a: 'Sim. A maior parte do app foi feita para a vida — não para o CNPJ.',
    },
    {
      q: 'A IA lança coisa errada?',
      a: 'Não sem você. Todo lançamento, tarefa ou hábito passa por um card de confirmação.',
    },
    {
      q: 'Funciona por voz e por foto?',
      a: 'Sim. Texto, microfone, galeria ou câmera do comprovante.',
    },
    {
      q: 'Meu marido, esposa ou sócio pode entrar?',
      a: 'Sim, até 5 pessoas por contexto. Hábitos, humor e sono continuam privados.',
    },
    {
      q: 'Vou expor valor no trabalho?',
      a: 'Toque no olho. Valores (e, se quiser, descrições) viram ••••••.',
    },
    {
      q: 'É app da loja?',
      a: 'É PWA: abre no celular, você instala na tela inicial. Não depende da App Store nem da Play Store.',
    },
    {
      q: 'Por que o mesmo e-mail?',
      a: 'O pagamento na Cakto libera a conta Sommar pelo e-mail. Se cadastro e checkout forem e-mails diferentes, o acesso não destrava sozinho.',
    },
    {
      q: 'Tem teste grátis?',
      a: 'Não. Você assina e entra no produto completo. Há 7 dias para pedir reembolso diretamente pela Cakto se o Sommar não for o sistema da sua vida.',
    },
    {
      q: 'O que acontece depois que eu pago?',
      a: '1) Checkout Cakto → 2) Cadastro no app com o mesmo e-mail → 3) Acesso liberado.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#040404] text-[#e5e5e5] font-sora selection:bg-[#22C55E]/30 overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#040404]">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/favicon.jpg"
              alt="Sommar App"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain"
            />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight">
              <span className="text-[#22C55E]">Sommar</span>{' '}
              <span className="text-white">App</span>
            </span>
          </div>
          <ScrollCta className={`${PRIMARY_CTA} text-[10px] sm:text-xs px-4 sm:px-5 py-2.5 sm:py-3`}>
            Assinar o Sommar <ArrowRight className="w-3.5 h-3.5" />
          </ScrollCta>
        </div>
      </header>

      <main className="pt-16 sm:pt-20">
        {/* 1. HERO */}
        <section className="relative max-w-5xl mx-auto px-4 pt-4 sm:pt-6 pb-12 text-center">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.14),_transparent_50%)] pointer-events-none"
            aria-hidden
          />
          <div className="relative">
            <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#22C55E] mb-5">
              O salário cai. Sete dias depois, você não sabe para onde foi.
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.15] mb-5 max-w-3xl mx-auto">
              Pare de descobrir o mês no vermelho. O Sommar mostra o que entra, o que sai e o que
              sobra — e um consultor de IA lança por você.
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Fale “gastei 80 no almoço”, mande a foto do comprovante ou digite. O Marinho monta o
              lançamento. Você confirma. Está feito. Serve se você é CLT, autônomo, ou os dois: vida
              pessoal de um lado, renda extra ou empresa do outro — se você tiver.
            </p>

            <div className="max-w-2xl mx-auto w-full mb-8 rounded-2xl border border-border bg-[#0a0a0a] p-2 shadow-2xl card-glow">
              <video
                src="/videos/vídeo-head.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto rounded-xl shadow-2xl bg-black border border-white/10"
              >
                Seu navegador não suporta a reprodução de vídeo.
              </video>
            </div>

            <ScrollCta
              className={`${PRIMARY_CTA} w-full sm:w-auto text-xs sm:text-sm px-10 py-5 shadow-2xl shadow-[#22C55E]/20`}
            >
              Assinar o Sommar <ArrowRight className="w-4 h-4" />
            </ScrollCta>
            <p className="mt-3 text-[10px] text-muted-foreground font-medium">
              Acesso imediato após o pagamento · mesmo e-mail no checkout e no app
            </p>
            <EmailNote className="mt-2 max-w-md mx-auto" />

            <div className="mt-8 flex justify-center">
              <PhoneMockup
                src={ASSETS.hero}
                alt="Visão geral do dashboard Sommar App"
                priority
              />
            </div>
          </div>
        </section>

        {/* 2. LEAD */}
        <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16 border-t border-border/40">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Você não é desorganizado. Você está ocupado.
            </h2>
            <p className="text-sm text-muted-foreground mt-4 font-medium leading-relaxed">
              O dinheiro entra na conta e some em PIX, cartão, boleto, mercado, ifood, mensalidade,
              “só dessa vez”. No fim do mês sobra a pergunta que ninguém gosta de fazer em voz alta:{' '}
              <span className="text-white font-bold">para onde foi?</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEAD_PORTRAITS.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-border bg-[#060606] text-left"
              >
                <h3 className="text-[11px] font-extrabold text-[#22C55E] uppercase tracking-widest mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto mt-8 text-center">
            Planilha você já abriu. Durou duas semanas. O app do banco mostra transação. Não mostra{' '}
            <span className="text-white font-bold">vida</span>. E nenhum dos dois separa “o que é da
            casa” do “o que é do trabalho”. O Sommar existe para essa bagunça ter um dono.
          </p>
        </section>

        {/* 3. AGITAÇÃO */}
        <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16 border-t border-border/40">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight text-center mb-8 leading-tight">
            Enquanto o mês não tem sistema, ele te cobra em silêncio
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {AGITATION.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-[#060606] text-left"
              >
                <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed max-w-2xl mx-auto mt-8 text-center">
            Não é falta de caráter. É falta de um lugar único, rápido o bastante para você usar de
            verdade — inclusive no ônibus, falando, sem formulário de 12 campos.
          </p>
        </section>

        {/* 4. FALSAS SAÍDAS */}
        <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16 border-t border-border/40">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight text-center mb-3 leading-tight">
            O que você já tentou não acompanha o jeito que você vive
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-xl mx-auto mb-8 font-medium">
            O que falta não é mais um lugar para digitar número.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FALSE_EXITS.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-border bg-[#060606] text-left"
              >
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wide mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. MECANISMO */}
        <section className="max-w-5xl mx-auto px-4 py-14 sm:py-20 border-t border-border/40">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Um único aplicativo. Duas peças que os outros não juntam.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="p-6 rounded-2xl border border-[#22C55E]/20 bg-[#060606] text-left">
              <span className="text-[10px] font-extrabold text-[#22C55E] uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
                <Mic className="w-3 h-3" /> 1. Marinho
              </span>
              <h3 className="text-lg font-extrabold text-white mb-3">O consultor de IA</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                Você fala, escreve ou manda a foto do comprovante. Ele extrai valor, data,
                estabelecimento. Mostra um card. Você confirma. Só então grava. Não é um chatbot de
                palpite. É operação: lançar, consultar saldo, criar tarefa, marcar hábito.
              </p>
              <div className="flex items-center gap-3 mt-4 text-[10px] font-bold uppercase tracking-wider text-white/70">
                <span className="inline-flex items-center gap-1">
                  <Mic className="w-3 h-3 text-[#22C55E]" /> Voz
                </span>
                <span className="inline-flex items-center gap-1">
                  <Camera className="w-3 h-3 text-[#22C55E]" /> Foto
                </span>
                <span>Texto</span>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-[#22C55E]/20 bg-[#060606] text-left">
              <span className="text-[10px] font-extrabold text-[#22C55E] uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
                <Layers className="w-3 h-3" /> 2. Dois contextos
              </span>
              <h3 className="text-lg font-extrabold text-white mb-3">Pessoal e Business, separados</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                Cada modo tem contas, cartões, categorias, metas e histórico próprios. O Marinho no
                Pessoal não enxerga o Business — e vice-versa. Se você é CLT, o Pessoal é o Sommar. Se
                você tem bico, MEI, PJ ou empresa, o Business existe para essa segunda vida não
                contaminar a casa.
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed text-center max-w-2xl mx-auto">
            Em cima disso: o mapa do mês, o que vence nos próximos 7 dias, as assinaturas que comem a
            renda, o PDF, a agenda, os hábitos, o humor e o sono — e um olho que esconde os valores se
            alguém encostar no celular.
          </p>
          <div className="mt-8 flex justify-center">
            <ScrollCta className={`${PRIMARY_CTA} text-xs sm:text-sm px-8 py-4`}>
              Assinar o Sommar <ArrowRight className="w-4 h-4" />
            </ScrollCta>
          </div>
        </section>

        {/* 6. COMO FUNCIONA */}
        <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16 border-t border-border/40">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight text-center mb-8">
            Três passos. Sem teste fantasma.
          </h2>
          <ol className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                n: '1',
                title: 'Assine',
                text: 'Escolha o plano anual ou mensal no checkout. Use o e-mail que será o do app.',
              },
              {
                n: '2',
                title: 'Crie a conta',
                text: `Cadastro em ${CADASTRO_URL.replace('https://', '')} com esse mesmo e-mail. O acesso libera sozinho.`,
              },
              {
                n: '3',
                title: 'Lance o primeiro gasto',
                text: 'Fale com o Marinho ou mande a foto. Confirme. O mês começou a ter sistema.',
              },
            ].map((step) => (
              <li
                key={step.n}
                className="p-5 rounded-xl border border-border bg-[#060606] text-left"
              >
                <span className="text-[#22C55E] font-extrabold text-lg">{step.n}</span>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wide mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-[11px] text-muted-foreground text-center mt-6 font-medium">
            Você entra no produto completo no minuto em que o pagamento confirma.
          </p>
        </section>

        {/* 7. PROVA DO PRODUTO */}
        <section className="border-t border-border/40 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight text-center mb-12">
              O mês na palma da mão — telas reais
            </h2>
            <div className="flex flex-col gap-16">
              {PRODUCT_PROOF.map((block, index) => (
                <div
                  key={block.eyebrow}
                  className={`grid md:grid-cols-2 gap-10 items-center ${
                    index % 2 === 1 ? '' : ''
                  }`}
                >
                  <div className={`space-y-3 text-center md:text-left ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-2.5 py-1 rounded-md uppercase tracking-widest inline-flex items-center gap-1.5">
                      {block.eyebrow}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                      {block.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                      {block.description}
                    </p>
                  </div>
                  <div className={`flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <PhoneMockup src={block.image} alt={block.imageAlt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. STACK */}
        <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16 border-t border-border/40">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight text-center mb-8">
            Tudo isso no mesmo sistema.
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2.5 max-w-3xl mx-auto">
            {STACK_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 p-3 rounded-xl border border-border bg-[#060606] text-[11px] sm:text-xs font-medium text-white/85 text-left"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center gap-3">
            <ScrollCta className={`${PRIMARY_CTA} text-xs sm:text-sm px-8 py-4`}>
              Assinar o Sommar <ArrowRight className="w-4 h-4" />
            </ScrollCta>
            <EmailNote className="max-w-md text-center" />
          </div>
        </section>

        {/* 9. PARA QUEM É */}
        <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16 border-t border-border/40">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight text-center mb-8">
            Para quem é — e para quem não é
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl border border-[#22C55E]/25 bg-[#060606]">
              <h3 className="text-sm font-extrabold text-[#22C55E] uppercase tracking-wide mb-4">
                É para você se
              </h3>
              <ul className="flex flex-col gap-2.5">
                {FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/85 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-[#060606]">
              <h3 className="text-sm font-extrabold text-white/70 uppercase tracking-wide mb-4">
                Não é para você se
              </h3>
              <ul className="flex flex-col gap-2.5">
                {NOT_FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground font-medium">
                    <X className="w-3.5 h-3.5 text-white/35 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 10. PROVA SOCIAL — após mecanismo, antes de #planos */}
        <SocialProofMarquee />

        {/* 11. PREÇOS */}
        <section
          id="planos"
          className="border-t-2 border-[#22C55E]/40 bg-gradient-to-b from-[#022c22] via-[#040404] to-[#040404] py-20 sm:py-24 px-4 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Um sistema. Um preço.{' '}
                <span className="text-[#22C55E]">Sem surpresa no app.</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed font-medium">
                Separar um app de finanças + um de tarefas + um de hábitos já passa disso. Aqui é um
                só — com IA que lança.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto items-stretch">
              <div className="p-6 rounded-2xl border-2 border-[#22C55E] bg-[#060606] flex flex-col justify-between relative shadow-xl card-glow sm:order-2 sm:scale-[1.02] sm:-my-1">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                  Melhor custo-benefício
                </span>

                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider mt-1">
                    Plano Anual
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Menos que muita assinatura que você esqueceu de cancelar — e o Sommar ainda te
                    mostra quais são elas.
                  </p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-xs font-bold text-muted-foreground">R$</span>
                      <span className="text-4xl font-extrabold text-[#22C55E] tracking-tight">
                        297,00
                      </span>
                      <span className="text-[10px] font-bold text-neutral-500"> à vista /ano</span>
                    </div>
                    <p className="text-[10px] text-[#22C55E] font-bold mt-2 uppercase tracking-wider">
                      ~R$ 24,75/mês
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5 border-t border-border/40 pt-5 text-[11px] text-white/90 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      Acesso total ao Sommar App
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      Marinho IA ilimitado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      Todos os módulos e atualizações
                    </li>
                  </ul>
                </div>

                <div className="pt-6 space-y-3">
                  <a
                    href={annualHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`${PRIMARY_CTA} w-full text-center text-[10px] sm:text-[11px] py-4 shadow-xl shadow-[#22C55E]/20`}
                  >
                    Assinar o anual <ArrowRight className="w-4 h-4" />
                  </a>
                  <EmailNote />
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-[#060606] flex flex-col justify-between sm:order-1">
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                    Plano Mensal
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Para quem quer começar no mês e decidir depois.
                  </p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-muted-foreground">R$</span>
                      <span className="text-4xl font-extrabold text-white tracking-tight">
                        39,90
                      </span>
                      <span className="text-[10px] font-bold text-neutral-500"> /mês</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5 border-t border-border/40 pt-5 text-[11px] text-white/80 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      Acesso completo ao app
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      Marinho IA e todos os módulos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      Renovação mensal
                    </li>
                  </ul>
                </div>

                <div className="pt-6 space-y-3">
                  <a
                    href={monthlyHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`${SECONDARY_CTA} w-full text-[11px] py-4`}
                  >
                    Assinar o mensal
                  </a>
                  <EmailNote />
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 max-w-xl mx-auto rounded-2xl border border-border bg-[#060606] text-center">
              <p className="text-[11px] sm:text-xs text-white/85 font-medium leading-relaxed">
                1) Checkout Cakto → 2) Crie sua conta em{' '}
                <a
                  href={CADASTRO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#22C55E] underline underline-offset-2"
                >
                  app.sommarapp.com.br/cadastro
                </a>{' '}
                com o mesmo e-mail → 3) Acesso liberado em segundos.
              </p>
            </div>

            <div className="mt-8 p-6 max-w-xl mx-auto rounded-2xl gradient-border flex flex-col items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">
                Sete dias para ver se o mês cabe no Sommar
              </h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Você assina, entra no app completo e usa. Se não for o sistema da sua vida, peça o
                reembolso diretamente pela Cakto dentro do prazo de 7 dias.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-[10px] text-[#22C55E] font-bold uppercase tracking-wider pt-1">
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Checkout seguro Cakto
                </span>
                <span>Reembolso pela Cakto</span>
              </div>
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
        <section className="border-t border-border bg-white/[0.01] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Perguntas <span className="text-[#22C55E]">frequentes</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {faqs.map((item, index) => (
                <div
                  key={item.q}
                  className="border border-border bg-[#060606] rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveFaq((current) => (current === index ? null : index))
                    }
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-white uppercase tracking-wide hover:bg-white/[0.01]"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#22C55E] transition-transform duration-200 ${
                        activeFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === index && (
                    <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/30 bg-white/[0.005]">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. FECHAMENTO */}
        <section className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="p-8 rounded-2xl border border-[#22C55E]/15 bg-gradient-to-b from-[#22C55E]/[0.04] to-transparent space-y-4">
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              O mês não vai organizar a si mesmo. Ou você continua descobrindo o estrago no dia do
              vencimento, ou você instala o sistema hoje: fala o gasto, confirma, e passa a ver o
              mapa.
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Seu próximo mês pode ter{' '}
              <span className="text-[#22C55E]">dono.</span>
            </h3>
            <ScrollCta className={`${PRIMARY_CTA} text-xs px-8 py-4`}>
              Assinar o Sommar <ArrowRight className="w-4 h-4" />
            </ScrollCta>
            <ScrollCta className={`${SECONDARY_CTA} text-[10px] px-6 py-3`}>
              Prefiro o mensal
            </ScrollCta>
          </div>
        </section>

        {/* 14. P.S. */}
        <section className="max-w-2xl mx-auto px-4 pb-16 text-center">
          <p className="text-[11px] sm:text-xs text-muted-foreground font-medium leading-relaxed">
            <span className="text-white font-bold">P.S.</span> O diferencial não é “mais um
            financeiro”. É o Marinho: você fala, manda a foto, confirma — e o Pessoal não se mistura
            com o profissional. Use o mesmo e-mail no pagamento e no cadastro. É a única regra que o
            sistema não perdoa.
          </p>
        </section>
      </main>

      <footer className="border-t border-border py-6 bg-black text-center text-[10px] text-neutral-500 font-medium">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <img
            src="/favicon.jpg"
            alt=""
            className="w-5 h-5 rounded-md object-contain opacity-80"
            aria-hidden
          />
          <span>© 2026 Sommar App. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
}
