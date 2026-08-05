import { useState, useEffect, type ReactNode, type ComponentType } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Lock,
  Play,
  Mic,
  Layers,
  BarChart3,
  Calendar,
  Heart,
  Users,
  EyeOff,
  ListChecks,
} from 'lucide-react';
import {
  CAKTO_ANNUAL,
  CAKTO_MONTHLY,
  buildCaktoCheckoutUrl,
  persistTrafficParams,
} from './checkoutUrl';

const PRIMARY_CTA =
  'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-[#22C55E]/25 hover:scale-[1.02] active:scale-[0.99] transition-transform duration-200';

const HERO_VIDEO_ID = 'GGlxoUvdROw';
const HERO_VIDEO_EMBED = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;

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

function scrollToPricing() {
  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
}

function FeatureShot({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="absolute inset-4 rounded-3xl bg-[#22C55E]/[0.08] blur-2xl pointer-events-none"
        aria-hidden
      />
      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-1.5 shadow-[0_28px_56px_-14px_rgba(0,0,0,0.85)] overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={780}
          height={1688}
          className="w-full h-auto rounded-xl object-contain"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority
            ? { fetchPriority: 'high' as const }
            : { fetchPriority: 'low' as const })}
        />
      </div>
    </div>
  );
}

function FeatureBlock({
  eyebrow,
  title,
  description,
  bullets,
  image,
  imageAlt,
  reverse = false,
  icon: Icon,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20 border-b border-border/40">
      <div
        className={`grid md:grid-cols-2 gap-10 md:gap-14 items-center ${
          reverse ? '' : ''
        }`}
      >
        <div
          className={`space-y-4 text-center md:text-left ${
            reverse ? 'md:order-2' : ''
          }`}
        >
          <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-2.5 py-1 rounded-md uppercase tracking-widest inline-flex items-center gap-1.5">
            <Icon className="w-3 h-3" /> {eyebrow}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium max-w-md mx-auto md:mx-0">
            {description}
          </p>
          <ul className="flex flex-col gap-2.5 pt-2 text-[11px] sm:text-xs font-medium text-white/85 text-left max-w-md mx-auto md:mx-0">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={reverse ? 'md:order-1' : ''}>
          <FeatureShot src={image} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}

export default function SalesPage() {
  const [heroVideoActive, setHeroVideoActive] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [annualHref, setAnnualHref] = useState(CAKTO_ANNUAL);
  const [monthlyHref, setMonthlyHref] = useState(CAKTO_MONTHLY);

  useEffect(() => {
    persistTrafficParams();
    setAnnualHref(buildCaktoCheckoutUrl(CAKTO_ANNUAL));
    setMonthlyHref(buildCaktoCheckoutUrl(CAKTO_MONTHLY));

    document.title =
      'Sommar App — Sistema Operacional de Finanças, Produtividade e Estilo de Vida';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Sommar App: separe pessoal e empresarial, automatize com Marinho IA e domine finanças, tarefas e hábitos em um único sistema operacional para autônomos e empreendedores.',
    );
  }, []);

  const faqs = [
    {
      q: 'Para quem é o Sommar App?',
      a: 'Para autônomos, freelancers, MEIs e empreendedores que precisam organizar finanças pessoais e do negócio, tarefas, hábitos e bem-estar em um só lugar — sem planilhas e sem apps fragmentados.',
    },
    {
      q: 'O que é o Marinho IA?',
      a: 'Seu consultor 24/7 dentro do app. Envie áudio ou texto para registrar gastos, criar tarefas, receber alertas de boletos e tirar dúvidas operacionais — sem preencher planilhas.',
    },
    {
      q: 'Como funciona a garantia de 7 dias?',
      a: 'Você tem 7 dias de garantia incondicional. Se não for para você, solicite o reembolso na plataforma de pagamento e receba 100% do valor de volta, sem burocracia.',
    },
    {
      q: 'Como recebo o acesso?',
      a: 'Assim que o pagamento for confirmado pela Cakto, você recebe um e-mail com seu login para acessar o app em app.sommarapp.com.br.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#040404] text-[#e5e5e5] font-sora selection:bg-[#22C55E]/30 overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#040404]/85 border-b border-border/40">
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
          <button
            type="button"
            onClick={scrollToPricing}
            className={`${PRIMARY_CTA} text-[10px] sm:text-xs px-4 sm:px-5 py-2.5 sm:py-3`}
          >
            Assinar Agora <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <main className="pt-20 sm:pt-24">
        {/* HERO */}
        <section className="relative max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-14 text-center">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.14),_transparent_50%)] pointer-events-none"
            aria-hidden
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22C55E]/25 bg-[#22C55E]/[0.07] mb-6">
              <Sparkles className="w-3 h-3 text-[#22C55E]" />
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white/85">
                Sistema Operacional para Autônomos & Empreendedores
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[2.75rem] font-extrabold uppercase tracking-tight text-white leading-[1.12] mb-5 max-w-3xl mx-auto">
              O Sistema Operacional que Falta no Seu{' '}
              <span className="text-[#22C55E]">Negócio e na Sua Vida.</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Separe o Pessoal do Empresarial em 1 clique, automatize lançamentos por áudio ou
              texto com o Marinho IA e domine suas finanças, tarefas e hábitos em um único lugar.
            </p>

            <div className="max-w-2xl mx-auto w-full mb-8 rounded-2xl border border-border bg-[#0a0a0a] p-2 shadow-2xl card-glow">
              <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden bg-black">
                {heroVideoActive ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full border-0"
                    src={HERO_VIDEO_EMBED}
                    title="Demonstração Sommar App"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setHeroVideoActive(true)}
                    className="absolute inset-0 w-full h-full group cursor-pointer"
                    aria-label="Reproduzir vídeo Sommar App"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${HERO_VIDEO_ID}/hqdefault.jpg`}
                      alt=""
                      width={480}
                      height={360}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-colors">
                      <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#22C55E] to-[#4ADE80] flex items-center justify-center shadow-xl shadow-[#22C55E]/30 group-hover:scale-105 transition-transform">
                        <Play
                          className="w-6 h-6 sm:w-7 sm:h-7 text-black ml-0.5"
                          fill="currentColor"
                          aria-hidden
                        />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToPricing}
              className={`${PRIMARY_CTA} w-full sm:w-auto text-xs sm:text-sm px-10 py-5 shadow-2xl shadow-[#22C55E]/20`}
            >
              Garantir Meu Acesso ao Sommar <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-3 text-[10px] text-muted-foreground font-medium">
              7 dias de garantia incondicional · Acesso imediato após o pagamento
            </p>

            <div className="mt-12 max-w-sm mx-auto">
              <FeatureShot
                src={ASSETS.hero}
                alt="Visão geral do dashboard Sommar App"
                priority
              />
            </div>
          </div>
        </section>

        {/* 1. MARINHO IA */}
        <section className="border-t border-border/40 bg-white/[0.015] py-16 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                <Mic className="w-3 h-3" /> Marinho IA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4 leading-tight">
                Consultor 24/7.{' '}
                <span className="text-[#22C55E]">Esqueça as planilhas complexas.</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed font-medium">
                Basta mandar um áudio ou texto. O Marinho registra gastos, cria tarefas, notifica
                boletos a vencer e tira dúvidas operacionais — direto no chat do app.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <FeatureShot src={ASSETS.marinho} alt="Marinho IA Super-Agente" />
              <FeatureShot
                src={ASSETS.notifications}
                alt="Central de notificações proativas do Marinho"
              />
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto mt-10 text-[11px] sm:text-xs font-medium text-white/85">
              {[
                'Lançamentos por áudio ou texto corrido',
                'Criação de tarefas pelo chat',
                'Alertas de boletos e vencimentos',
                'Dúvidas operacionais respondidas na hora',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 p-3 rounded-xl border border-border bg-[#060606]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. PESSOAL VS BUSINESS / CONTEXTOS */}
        <FeatureBlock
          eyebrow="Contextos"
          icon={Layers}
          title={
            <>
              O fim da mistura entre a conta de casa e o{' '}
              <span className="text-[#22C55E]">caixa da empresa.</span>
            </>
          }
          description="Troque de contexto em 1 clique. Prolabore e operação ficam 100% organizados — dados, cores, temas e métricas separados para Pessoal e Business."
          bullets={[
            'Troca instantânea entre Pessoal e Empresarial',
            '12 cores de temas e navegação sob medida',
            'Lucro, margem e fluxo sem misturar contas',
          ]}
          image={ASSETS.themes}
          imageAlt="Customização de temas e contextos Pessoal vs Business"
        />

        {/* 2b. TAREFAS */}
        <FeatureBlock
          eyebrow="Tarefas"
          icon={ListChecks}
          reverse
          title={
            <>
              Gestão de tarefas no ritmo de quem{' '}
              <span className="text-[#22C55E]">opera o próprio negócio.</span>
            </>
          }
          description="Organize entregas, follow-ups e rotinas do dia a dia no mesmo sistema das suas finanças — com workspaces claros para o que é pessoal e o que é da empresa."
          bullets={[
            'Listas e workspaces para Pessoal e Business',
            'Prioridades e status sem apps extras',
            'Tudo conectado ao seu fluxo operacional',
          ]}
          image={ASSETS.workspaces}
          imageAlt="Gestão de tarefas e workspaces Sommar App"
        />

        {/* 3. COCKPIT + PDF */}
        <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20 border-b border-border/40">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3" /> Cockpit Financeiro
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
              Controle total sobre cada centavo e{' '}
              <span className="text-[#22C55E]">assinaturas anualizadas.</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed font-medium">
              Mapeie gastos por dia, receba alertas de assinaturas sem uso e exporte relatórios em
              PDF quando precisar prestar contas — a si mesmo ou ao contador.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <FeatureShot src={ASSETS.cockpit} alt="Cockpit financeiro Sommar App" />
            <FeatureShot
              src={ASSETS.subscriptions}
              alt="Assinaturas, insights e relatório PDF"
            />
          </div>
        </section>

        {/* 4. TAREFAS, HÁBITOS, CALENDÁRIO */}
        <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20 border-b border-border/40">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Produtividade
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
              Produtividade de alto nível para quem{' '}
              <span className="text-[#22C55E]">constrói o próprio caminho.</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed font-medium">
              Visão unificada de compromissos e tracker de hábitos com sequências (streaks) — para
              manter a disciplina que o negócio exige.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <FeatureShot src={ASSETS.calendar} alt="Calendário e agenda unificados" />
            <FeatureShot src={ASSETS.habits} alt="Tracker de hábitos e streaks" />
          </div>
        </section>

        {/* 5. BEM-ESTAR + PRIVACIDADE */}
        <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20 border-b border-border/40">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
              <Heart className="w-3 h-3" /> Bem-estar & Privacidade
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
              Acompanhe seu ritmo de energia e mantenha{' '}
              <span className="text-[#22C55E]">total privacidade.</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed font-medium">
              Registro de humor, dial de sono e o Modo Olhinho para ocultar dados sensíveis em
              locais públicos.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <FeatureShot src={ASSETS.wellness} alt="Bem-estar, humor e sono" />
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-bold text-white/80 uppercase tracking-wider">
            <EyeOff className="w-4 h-4 text-[#22C55E]" />
            Modo Olhinho — oculte saldos e valores em um toque
          </div>
        </section>

        {/* 6. WORKSPACES COMPARTILHADOS */}
        <FeatureBlock
          eyebrow="Colaboração"
          icon={Users}
          reverse
          title={
            <>
              Divida a gestão com sua{' '}
              <span className="text-[#22C55E]">família ou sócios.</span>
            </>
          }
          description="Compartilhe finanças e tarefas para até 5 pessoas. Hábitos e bem-estar permanecem estritamente privados — cada um no seu espaço."
          bullets={[
            'Até 5 membros por workspace',
            'Finanças e tarefas compartilháveis',
            'Hábitos e bem-estar sempre privados',
          ]}
          image={ASSETS.shared}
          imageAlt="Workspaces compartilhados Sommar App"
        />

        {/* PLANOS */}
        <section
          id="planos"
          className="border-t border-border bg-white/[0.02] py-20 sm:py-24 px-4 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[10px] font-extrabold text-[#22C55E] border border-[#22C55E]/20 bg-[#22C55E]/5 px-3 py-1 rounded-full uppercase tracking-widest">
                Acesso ao Sommar App
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-4">
                Escolha seu plano e{' '}
                <span className="text-[#22C55E]">entre no sistema operacional.</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed font-medium">
                Acesso completo a finanças, Marinho IA, produtividade, hábitos e bem-estar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto items-stretch">
              {/* Anual — destaque */}
              <div className="p-6 rounded-2xl border-2 border-[#22C55E] bg-[#060606] flex flex-col justify-between relative shadow-xl card-glow sm:order-2 sm:scale-[1.02] sm:-my-1">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                  Mais vendido · Economia de 37%
                </span>

                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider mt-1">
                    Plano Anual
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Recomendado — melhor custo-benefício.
                  </p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-xs font-bold text-muted-foreground">R$</span>
                      <span className="text-4xl font-extrabold text-[#22C55E] tracking-tight">
                        297,00
                      </span>
                      <span className="text-[10px] font-bold text-neutral-500"> /ano</span>
                    </div>
                    <p className="text-[10px] text-[#22C55E] font-bold mt-2 uppercase tracking-wider">
                      ou 12x de R$ 29,64
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
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      7 dias de garantia de reembolso
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href={annualHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`${PRIMARY_CTA} w-full text-center text-[10px] sm:text-[11px] py-4 shadow-xl shadow-[#22C55E]/20`}
                  >
                    Assinar Plano Anual <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Mensal */}
              <div className="p-6 rounded-2xl border border-border bg-[#060606] flex flex-col justify-between sm:order-1">
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                    Plano Mensal
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Flexibilidade com renovação mensal.
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
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                      7 dias de garantia de reembolso
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href={monthlyHref}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-border bg-white/[0.03] text-white font-extrabold text-[11px] uppercase tracking-widest py-4 rounded-xl hover:bg-white/[0.06] transition-colors"
                  >
                    Assinar Plano Mensal
                  </a>
                </div>
              </div>
            </div>

            {/* Garantia */}
            <div className="mt-12 p-6 max-w-xl mx-auto rounded-2xl gradient-border flex flex-col items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">
                Garantia incondicional de 7 dias
              </h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Teste o Sommar App sem risco. Não gostou? Devolvemos 100% do valor — sem perguntas.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-[10px] text-[#22C55E] font-bold uppercase tracking-wider pt-1">
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Checkout seguro Cakto
                </span>
                <span>✓ Reembolso total</span>
                <span>✓ Risco zero</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-white/[0.01] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                Perguntas <span className="text-[#22C55E]">Frequentes</span>
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

        {/* CTA FINAL */}
        <section className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="p-8 rounded-2xl border border-[#22C55E]/15 bg-gradient-to-b from-[#22C55E]/[0.04] to-transparent space-y-4">
            <h3 className="text-xl font-extrabold text-white uppercase">
              Pronto para operar no{' '}
              <span className="text-[#22C55E]">próximo nível?</span>
            </h3>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto">
              Finanças, produtividade e estilo de vida — um sistema só. Com garantia de 7 dias.
            </p>
            <button
              type="button"
              onClick={scrollToPricing}
              className={`${PRIMARY_CTA} text-xs px-8 py-4`}
            >
              Quero o Sommar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
