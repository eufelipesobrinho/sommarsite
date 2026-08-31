import { useState, useEffect, lazy, Suspense } from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { persistTrafficParams } from './checkoutUrl';

type Page = 'vendas' | 'obrigado';

const SalesPage = lazy(() => import('./SalesPage'));

const salesFallback = (
  <div className="min-h-screen bg-black flex items-center justify-center text-white font-sora text-sm">
    Carregando...
  </div>
);

function resolvePageFromPath(pathname: string): Page {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/obrigado') return 'obrigado';
  return 'vendas';
}

/** Redireciona rotas legadas (/oficial, /diagnostico) para a raiz, preservando query string. */
function redirectLegacyPaths() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/oficial' || path === '/diagnostico') {
    const search = window.location.search;
    window.history.replaceState({}, '', `/${search}`);
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window === 'undefined') return 'vendas';
    redirectLegacyPaths();
    return resolvePageFromPath(window.location.pathname);
  });

  useEffect(() => {
    redirectLegacyPaths();
    persistTrafficParams();

    const handleLocation = () => {
      redirectLegacyPaths();
      setCurrentPage(resolvePageFromPath(window.location.pathname));
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  useEffect(() => {
    persistTrafficParams();
  }, [currentPage]);

  // Pixel / CAPI
  useEffect(() => {
    const PIXEL_ID = '1650440006207697';
    const CAPI_TOKEN =
      'EAB4hda1l5Q0BRXIWNYaekyTJ2LraBp2e3o8Mw3UCYrVgZAKmDVmNClZC98nUeBRFePBRuslzWrjpQfK6lsOsAd2sgvRIUm7Y0ZA7EpHtchZBFqs06aNW6ObZBvd0ZAv5mki2FvLiGuDDmKyE47u42fGOYBxNE8xsHPMi5vr4Yxk3bQo6X04CYZBSiLJVIG5tdlRIgZDZD';
    const isPurchase = currentPage === 'obrigado';

    const fireTracking = () => {
      const globalWindow = window as Window & { fbq?: (...args: unknown[]) => void };
      try {
        if (globalWindow.fbq) {
          if (isPurchase) {
            globalWindow.fbq('track', 'Purchase', { value: 297, currency: 'BRL' });
          } else {
            globalWindow.fbq('track', 'PageView');
          }
        }
      } catch {
        // WebView Android / Instagram
      }

      fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: isPurchase ? 'Purchase' : 'PageView',
              event_time: Math.floor(Date.now() / 1000),
              action_source: 'website',
              event_source_url: window.location.href,
              ...(isPurchase ? { custom_data: { value: 297, currency: 'BRL' } } : {}),
            },
          ],
        }),
      }).catch(() => {});
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(fireTracking, { timeout: 3000 });
    } else {
      timeoutId = setTimeout(fireTracking, 2000);
    }

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [currentPage]);

  if (currentPage === 'obrigado') {
    return (
      <div className="min-h-screen bg-[#040404] text-[#e5e5e5] font-sora flex flex-col justify-between selection:bg-[#22C55E]/30">
        <header className="border-b border-border/60 bg-[#040404]/80 backdrop-blur-md py-4 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 flex items-center gap-3">
            <img src="/favicon.jpg" alt="Logo" className="w-9 h-9 rounded-xl object-contain" />
            <span className="text-xl font-extrabold uppercase tracking-wider text-white">
              Sommar<span className="text-[#22C55E]">App</span>
            </span>
          </div>
        </header>

        <main className="flex-1 py-16 px-4 max-w-2xl mx-auto w-full text-center flex flex-col justify-center items-center">
          <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] rounded-full flex items-center justify-center mb-6 shadow-xl animate-pulse">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-white mb-3 tracking-tight">
            Pagamento confirmado. <span className="text-gradient">Agora crie sua conta.</span>
          </h1>
          <p className="text-sm font-medium text-muted-foreground mb-8">
            Use o mesmo e-mail do checkout. É assim que o acesso libera automaticamente.
          </p>

          <div className="w-full text-left p-6 rounded-2xl gradient-border mb-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase mb-1">
                  1) Cakto → 2) Cadastro → 3) Acesso
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Crie sua conta em{' '}
                  <a
                    href="https://app.sommarapp.com.br/cadastro"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#22C55E] underline underline-offset-2"
                  >
                    app.sommarapp.com.br/cadastro
                  </a>{' '}
                  com o <strong className="text-white">mesmo e-mail</strong> do checkout. A Cakto também
                  envia o comprovante — confira o spam se não aparecer.
                </p>
                <a
                  href="https://app.sommarapp.com.br/cadastro"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl"
                >
                  Criar minha conta
                </a>
              </div>
            </div>
          </div>

          <div className="w-full text-left p-6 rounded-2xl gradient-border mb-8 bg-[#0a0a0a]/50">
            <h4 className="text-xs font-extrabold text-white uppercase mb-3 tracking-wider">
              Dúvidas? Fale direto comigo:
            </h4>
            <a
              href="https://wa.me/5586999568422"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-transform hover:scale-[1.01]"
            >
              Falar com o Suporte
            </a>
          </div>
        </main>

        <footer className="border-t border-border py-6 text-center text-[10px] font-bold text-white/30 bg-black/40">
          © 2026 Sommar App. Todos os direitos reservados.
        </footer>
      </div>
    );
  }

  return (
    <Suspense fallback={salesFallback}>
      <SalesPage />
    </Suspense>
  );
}
