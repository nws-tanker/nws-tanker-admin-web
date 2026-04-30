import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';

const SPACING = 4;
const PANEL_MAX_HEIGHT = 260;
const MIN_PANEL_HEIGHT = 120;

/**
 * Viewport-relative position for an overlay panel anchored to a trigger.
 * Either `top` or `bottom` is set (never both) — `bottom` is used when we
 * flip the panel above the trigger because there isn't enough room below.
 */
export type PanelPosition = {
  left: number;
  width: number;
  maxHeight: number;
} & ({ top: number; bottom?: undefined } | { top?: undefined; bottom: number });

/**
 * Tracks the position of a popover panel relative to a trigger element.
 * Picks the side with more room (below preferred when both fit) and caps
 * the panel's max-height so it never overflows the viewport. Re-measures
 * on `resize` and ancestor `scroll` (capture phase) so the panel tracks
 * the trigger when the user scrolls inside a parent container.
 */
export function usePanelPosition(
  open: boolean,
  triggerRef: RefObject<HTMLElement | null>,
): PanelPosition | null {
  const [position, setPosition] = useState<PanelPosition | null>(null);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const update = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - SPACING;
      const spaceAbove = rect.top - SPACING;
      const placeAbove =
        spaceBelow < Math.min(PANEL_MAX_HEIGHT, 200) && spaceAbove > spaceBelow;
      const maxHeight = Math.min(
        PANEL_MAX_HEIGHT,
        Math.max(placeAbove ? spaceAbove : spaceBelow, MIN_PANEL_HEIGHT),
      );
      const left = rect.left;
      const width = Math.max(rect.width, 200);
      if (placeAbove) {
        setPosition({
          left,
          width,
          maxHeight,
          bottom: window.innerHeight - rect.top + SPACING,
        });
      } else {
        setPosition({
          left,
          width,
          maxHeight,
          top: rect.bottom + SPACING,
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, triggerRef]);

  // Reset position when the panel closes so the next open re-measures fresh.
  useEffect(() => {
    if (!open) setPosition(null);
  }, [open]);

  return position;
}

/** Inline style object the panel can spread directly. */
export function panelPositionStyle(pos: PanelPosition): React.CSSProperties {
  const { left, width, maxHeight } = pos;
  return {
    position: 'fixed',
    left,
    minWidth: width,
    maxHeight,
    ...(pos.top !== undefined ? { top: pos.top } : { bottom: pos.bottom }),
  };
}
