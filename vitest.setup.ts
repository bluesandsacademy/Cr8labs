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
