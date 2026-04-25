import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';

const DEFAULT_DURATION_MS = 2600;

export type ToastTone = 'default' | 'error';

type ShowOptions = {
  durationMs?: number;
  tone?: ToastTone;
};

type ToastContextValue = {
  show: (message: string, options?: ShowOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastState = {
  id: number;
  message: string;
  tone: ToastTone;
};

type Props = {
  children: ReactNode;
};

export function ToastProvider({ children }: Props) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const counterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback<ToastContextValue['show']>((message, options) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    counterRef.current += 1;
    const id = counterRef.current;
    const tone = options?.tone ?? 'default';
    const durationMs = options?.durationMs ?? DEFAULT_DURATION_MS;
    setToast({ id, message, tone });
    timerRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, durationMs);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast ? <ToastView message={toast.message} tone={toast.tone} /> : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
}

type ToastViewProps = {
  message: string;
  tone: ToastTone;
};

function ToastView({ message, tone }: ToastViewProps) {
  const isError = tone === 'error';
  return createPortal(
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      style={{
        animation: isError
          ? 'toast-in-right 0.18s ease-out'
          : 'toast-in 0.18s ease-out',
        boxShadow: '0 8px 24px -6px rgba(11, 18, 32, 0.3)',
      }}
      className={cn(
        'pointer-events-none fixed top-6 z-[1000] flex items-center gap-2 whitespace-nowrap rounded-card bg-ink-900 py-2.5 pr-[18px] text-[13px] font-medium text-white',
        isError
          ? 'right-6 border-l-[3px] border-red-500 pl-3.5'
          : 'left-1/2 -translate-x-1/2 pl-[18px]',
      )}
    >
      {message}
    </div>,
    document.body,
  );
}
