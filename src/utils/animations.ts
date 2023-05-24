export const animateIn = (element: Element, done: () => void) => {
  const a = element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 250,
    easing: 'ease-out',
  });
  void a.finished.then(() => done());
};

export const animateOut = (element: Element, done: () => void) => {
  const a = element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 250,
    easing: 'ease-out',
  });
  void a.finished.then(() => done());
};
