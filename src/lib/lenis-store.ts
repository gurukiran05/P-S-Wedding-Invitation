import type Lenis from 'lenis';

// Shared handle to the active Lenis instance (previously stashed on window.lenis,
// which collides with lenis's own global Window typing).
let activeLenis: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  activeLenis = lenis;
}

export function getLenis(): Lenis | null {
  return activeLenis;
}
