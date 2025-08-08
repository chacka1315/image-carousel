function carouselManager() {
  const slides = document.querySelector('#slides');
  const diapo = slides.querySelectorAll('.slides-item');
  const nextBtn = document.querySelector('#nextBtn');
  const previousBtn = document.querySelector('#previousBtn');
  const navDots = document.querySelectorAll('#carousel-nav-dots>span');
  const main = document.querySelector('main');

  nextBtn.addEventListener('click', () => goToNextSlideItem());
  previousBtn.addEventListener('click', () => goToPreviousSlideItem());
  main.addEventListener('click', (e) => {
    const targetedDot = e.target.closest('span.nav-dot');
    if (targetedDot) {
      index = Number(targetedDot.dataset.id);
      jumpToSlideItem(index);
    }
  });

  const slideWidth = 400;
  let index = 0;
  const fiveSecond = 1000 * 5;
  navDots[0].classList.add('fillDot');

  const jumpToSlideItem = (index) => {
    slides.style.transform = `translateX(${-index * slideWidth}px)`;
    styleNavDots(index);
    clearTimeout(timeout);
    startTimeout();
  };

  const goToNextSlideItem = () => {
    index = (index + 1) % diapo.length;
    slides.style.transform = `translateX(${-index * slideWidth}px)`;
    styleNavDots(index);
    clearTimeout(timeout);
    startTimeout();
  };

  const goToPreviousSlideItem = () => {
    index = (index - 1 + diapo.length) % diapo.length;
    slides.style.transform = `translateX(${-index * slideWidth}px)`;
    styleNavDots(index);
    clearTimeout(timeout);
    startTimeout();
  };

  const styleNavDots = (index) => {
    navDots.forEach((dot, i) => {
      index === i
        ? dot.classList.add('fillDot')
        : dot.classList.remove('fillDot');
    });
  };

  let timeout;
  const startTimeout = () => {
    timeout = setTimeout(() => {
      goToNextSlideItem();
      startTimeout();
    }, fiveSecond);
  };
  startTimeout();
}

export default carouselManager;
