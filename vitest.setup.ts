import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia. gsap/ScrollTrigger call it at plugin
// registration time (not just inside our own gsap.matchMedia() usage), so any
// component importing gsap needs this polyfilled before it renders.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom also has no ResizeObserver. Components that measure real layout (e.g. the
// immersive zone sizing itself off measured content height) only need this to not
// throw under test - the geometry itself isn't meaningfully testable in jsdom.
if (typeof window !== "undefined" && !window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
