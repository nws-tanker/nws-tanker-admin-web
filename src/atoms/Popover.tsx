import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';

const GAP = 8;

type Align = 'start' | 'end';

type Props = {
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  align?: Align;
  width?: number;
  children: ReactNode;
};

type Position = { top: number; left: number };

export function Popover({
  open,
  triggerRef,
  onClose,
  align = 'start',
  width,
  children,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    const update = () => {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const panelWidth = width ?? panel?.offsetWidth ?? rect.width;
      const left = align === 'end' ? rect.right - panelWidth : rect.left;
      setPosition({ top: rect.bottom + GAP, left });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, triggerRef, align, width]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      )
        return;
      onClose();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      className="fixed z-[300]"
      style={{
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        width,
        visibility: position ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
