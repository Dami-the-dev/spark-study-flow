import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X, Share } from 'lucide-react';

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const DISMISS_KEY = 'sparkstudy_install_dismissed';

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;

const InstallPrompt = () => {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [showIos, setShowIos] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    const dismissed = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() - dismissed < 3 * 24 * 60 * 60 * 1000) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    const installed = () => setVisible(false);
    window.addEventListener('appinstalled', installed);

    const ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua)) {
      setShowIos(true);
      setVisible(true);
    }
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === 'accepted') setVisible(false);
    else dismiss();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-xl border border-border bg-card p-4 shadow-lg animate-in slide-in-from-bottom">
      <div className="flex items-start gap-3">
        <img src="/icon-192.png" alt="Spark Study" className="h-12 w-12 rounded-lg" />
        <div className="flex-1">
          <p className="font-poppins font-semibold text-foreground">Install Spark Study</p>
          {showIos && !deferred ? (
            <p className="text-sm text-muted-foreground">
              Tap <Share className="inline h-4 w-4" /> Share, then "Add to Home Screen".
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Add the app to your home screen for quick access.</p>
          )}
        </div>
        <button onClick={dismiss} aria-label="Close" className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>
      {deferred && (
        <div className="mt-3 flex gap-2">
          <Button className="flex-1" onClick={install}>
            <Download className="h-4 w-4 mr-2" /> Install
          </Button>
          <Button variant="outline" onClick={dismiss}>Not now</Button>
        </div>
      )}
    </div>
  );
};

export default InstallPrompt;
