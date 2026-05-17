// PREVIEW ONLY — delete with src/pages/preview/ when real implementation begins.

import { useEffect, useState } from 'react';

export function usePreviewLoader(ms = 1200) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(id);
  }, [ms]);
  return ready;
}
