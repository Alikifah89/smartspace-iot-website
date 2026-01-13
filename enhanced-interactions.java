/* SmartSpace Enhanced Interactions - Core JavaScript */
/* يجمع: Advanced Interactions + Performance + Accessibility */

class SmartSpaceEnhanced {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollProgress();
        this.initTouchInteractions();
        this.initIntersectionObserver();
        this.initMobileMenu();
        this.initSwiperGestures();
        this.initPerformanceOptimizations();
        this.initAccessibilityFeatures();
    }

    // ====== Scroll Progress Bar ======
    initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            progressBar.style.width = `${progress}%`;
        }, { passive: true });
    }

    // ====== Mobile Menu Toggle ======
    initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const closeBtn = document.querySelector('.mobile-menu-close');

        if (!toggle || !menu || !overlay) return;

        const openMenu = () => {
            menu.classList.add('active');
            overlay.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', openMenu);
        closeBtn?.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ====== Swipe Gestures ======
    initSwiperGestures() {
        const swipeContainers = document.querySelectorAll('.swipe-container');
        
        swipeContainers.forEach(container => {
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            
            container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            }, { passive: true });
            
            container.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
                const diffX = currentX - startX;
                
                const swipeItems = container.querySelectorAll('.swipe-item');
                swipeItems.forEach(item => {
                    item.style.transform = `translateX(${diffX}px)`;
                });
            }, { passive: true });
            
            container.addEventListener('touchend', () => {
                isDragging = false;
                const diffX = currentX - startX;
                const threshold = 100;
                
                // Reset position
                const swipeItems = container.querySelectorAll('.swipe-item');
                swipeItems.forEach(item => {
                    item.style.transform = 'translateX(0)';
                });
                
                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        this.handleSwipeRight(container);
                    } else {
                        this.handleSwipeLeft(container);
                    }
                }
            });
        });
    }

    handleSwipeLeft(container) {
        console.log('Swiped left on:', container);
        // Add navigation logic here
    }

    handleSwipeRight(container) {
        console.log('Swiped right on:', container);
        // Add navigation logic here
    }

    // ====== Touch Feedback ======
    initTouchInteractions() {
        const touchElements = document.querySelectorAll('.touch-feedback');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                const ripple = document.createElement('div');
                const rect = element.getBoundingClientRect();
                
                ripple.style.position = 'absolute';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.background = 'rgba(212, 175, 55, 0.3)';
                ripple.style.borderRadius = '50%';
                ripple.style.left = `${touch.clientX - rect.left - 10}px`;
                ripple.style.top = `${touch.clientY - rect.top - 10}px`;
                ripple.style.pointerEvents = 'none';
                ripple.style.transform = 'scale(0)';
                ripple.style.zIndex = '1000';
                
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);
                
                ripple.animate([
                    { transform: 'scale(0)', opacity: 0.5 },
                    { transform: 'scale(10)', opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                }).onfinish = () => ripple.remove();
            }, { passive: true });
        });
    }

    // ====== Intersection Observer for Lazy Loading ======
    initIntersectionObserver() {
        const lazyElements = document.querySelectorAll('.lazy-load');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });
        
        lazyElements.forEach(el => observer.observe(el));
    }

    // ====== Performance Optimizations ======
    initPerformanceOptimizations() {
        // Debounced scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.optimizeScroll();
            }, 100);
        }, { passive: true });

        // Debounced resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.optimizeResize();
            }, 250);
        }, { passive: true });
    }

    optimizeScroll() {
        // Update animations based on scroll
        this.updateParallaxElements();
    }

    optimizeResize() {
        // Recalculate layouts on resize
        this.updateGridLayouts();
    }

    updateParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const speed = element.dataset.parallaxSpeed || 0.5;
            const rate = scrolled * -speed;
            element.style.transform = `translateY(${rate}px)`;
        });
    }

    updateGridLayouts() {
        const grids = document.querySelectorAll('.grid-golden, .grid-asymmetric');
        grids.forEach(grid => {
            grid.style.display = 'none';
            grid.offsetHeight; // Trigger reflow
            grid.style.display = '';
        });
    }

    // ====== Morphing Animations ======
    initMorphingAnimations() {
        const morphElements = document.querySelectorAll('[data-morph]');
        
        morphElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.morphShape(element, 'hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.morphShape(element, 'normal');
            });
        });
    }

    morphShape(element, state) {
        const morphType = element.dataset.morph;
        const normalRadius = '20px';
        
        switch(morphType) {
            case 'circle':
                element.style.borderRadius = state === 'hover' ? '50%' : normalRadius;
                break;
n            case 'waves':
                element.style.borderRadius = state === 'hover' ? 
                    '50% 50% 50% 50% / 60% 60% 40% 40%' : normalRadius;
                break;
            case 'organic':
                element.style.borderRadius = state === 'hover' ?
                    '30% 70% 70% 30% / 30% 30% 70% 70%' : normalRadius;
                break;
        }
    }

    // ====== Keyboard Navigation ======
    initAccessibilityFeatures() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    // Close mobile menu if open
                    const menu = document.querySelector('.mobile-menu');
                    if (menu?.classList.contains('active')) {
                        menu.classList.remove('active');
                        document.querySelector('.mobile-menu-overlay')?.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    break;
            }
        });

        // Announce to screen reader
        this.initScreenReaderSupport();
    }

    initScreenReaderSupport() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
        
        this.announce = (message) => {
            liveRegion.textContent = message;
        };
    }

    // ====== Lazy Loading Images ======
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    
                    img.onload = () => {
                        img.classList.add('fade-in');
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ====== Scroll to Top ======
    initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'fixed bottom-24 left-6 w-12 h-12 bg-gold text-black rounded-full shadow-lg opacity-0 invisible transition-all duration-300 z-40';
        scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        }, { passive: true });
    }
}

// ====== Initialize on DOM Ready ======
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 1000);
        }, 1500);
    }

    // Initialize enhanced features
    new SmartSpaceEnhanced();
});

// ====== Global Utility Functions ======
window.showNotification = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-500 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('translate-x-0'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
};

// ====== Service Worker Registration (Optional) ======
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}