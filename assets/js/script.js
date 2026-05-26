document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar-menu');
    const closeBtn = sidebar ? sidebar.querySelector('.close-btn') : null;
    const menuLinks = sidebar ? sidebar.querySelectorAll('a') : [];

    const openMenu = () => {
        if (hamburger && sidebar) {
            hamburger.setAttribute('aria-expanded', 'true');
            sidebar.classList.add('active');
            sidebar.setAttribute('aria-hidden', 'false');
            document.body.classList.add('menu-open');
        }
    };

    const closeMenu = () => {
        if (hamburger && sidebar) {
            hamburger.setAttribute('aria-expanded', 'false');
            sidebar.classList.remove('active');
            sidebar.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('menu-open');
        }
    };

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', openMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    menuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    const slideshows = document.querySelectorAll('[data-slideshow]');

    slideshows.forEach((slideshow) => {
        const slides = Array.from(slideshow.querySelectorAll('.slide'));
        const prevButton = slideshow.querySelector('.prev-slide');
        const nextButton = slideshow.querySelector('.next-slide');
        const dotsContainer = slideshow.querySelector('.slide-dots');
        let activeIndex = 0;
        let autoplay;
        const shouldAutoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!slides.length || !dotsContainer) {
            return;
        }

        const showSlide = (index) => {
            activeIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === activeIndex);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === activeIndex);
            });
        };

        const dots = slides.map((slide, index) => {
            const dot = document.createElement('button');
            const slideTitle = slide.querySelector('strong');

            dot.className = 'slide-dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', `Show ${slideTitle ? slideTitle.textContent : 'project'} slide`);
            dot.addEventListener('click', () => {
                showSlide(index);
                restartAutoplay();
            });
            dotsContainer.appendChild(dot);
            return dot;
        });

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                showSlide(activeIndex - 1);
                restartAutoplay();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                showSlide(activeIndex + 1);
                restartAutoplay();
            });
        }

        const startAutoplay = () => {
            if (!shouldAutoplay) {
                return;
            }

            stopAutoplay();
            autoplay = window.setInterval(() => {
                showSlide(activeIndex + 1);
            }, 4500);
        };

        const stopAutoplay = () => {
            window.clearInterval(autoplay);
        };

        const restartAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        slideshow.addEventListener('pointerenter', stopAutoplay);
        slideshow.addEventListener('pointerleave', startAutoplay);
        slideshow.addEventListener('focusin', stopAutoplay);
        slideshow.addEventListener('focusout', startAutoplay);

        showSlide(0);
        startAutoplay();
    });

    const goTopBtn = document.getElementById('goTopBtn');

    if (goTopBtn) {
        goTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
