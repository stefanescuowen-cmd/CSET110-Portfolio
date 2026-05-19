document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar-menu');
    const menuLinks = sidebar ? sidebar.querySelectorAll('a') : [];

    const openMenu = () => {
        if (hamburger && sidebar) {
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'Close menu');
            sidebar.classList.add('active');
            sidebar.setAttribute('aria-hidden', 'false');
            document.body.classList.add('menu-open');
        }
    };

    const closeMenu = () => {
        if (hamburger && sidebar) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open menu');
            sidebar.classList.remove('active');
            sidebar.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('menu-open');
        }
    };

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
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
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
            return dot;
        });

        if (prevButton) {
            prevButton.addEventListener('click', () => showSlide(activeIndex - 1));
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => showSlide(activeIndex + 1));
        }

        showSlide(0);
    });

    const cursorShadow = document.querySelector('.cursor-shadow');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (cursorShadow && !reducedMotion && !coarsePointer) {
        window.addEventListener('pointermove', (event) => {
            cursorShadow.classList.add('visible');
            cursorShadow.style.left = `${event.clientX}px`;
            cursorShadow.style.top = `${event.clientY}px`;
        });

        document.querySelectorAll('a, button, input, textarea').forEach((element) => {
            element.addEventListener('pointerenter', () => cursorShadow.classList.add('cursor-pop'));
            element.addEventListener('pointerleave', () => cursorShadow.classList.remove('cursor-pop'));
        });

        document.addEventListener('mouseleave', () => {
            cursorShadow.classList.remove('visible');
        });
    }
});
