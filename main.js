// SmartSpace - Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimation();
    initCounterAnimation();
    initProductSlider();
    initScrollAnimations();
    initParticles();
    initDarkMode();
    initChatbot();
});

// Hero Background Animation with p5.js
function initHeroAnimation() {
    const heroCanvas = document.getElementById('hero-canvas');
    if (!heroCanvas) return;

    // Create p5.js sketch for hero background
    const heroSketch = (p) => {
        let particles = [];
        let connections = [];
        
        p.setup = () => {
            const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            canvas.parent('hero-canvas');
            
            // Create particles representing IoT devices
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                let particle = particles[i];
                
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(212, 175, 55, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
                
                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    let other = particles[j];
                    let distance = p.dist(particle.x, particle.y, other.x, other.y);
                    
                    if (distance < 100) {
                        let alpha = p.map(distance, 0, 100, 0.3, 0);
                        p.stroke(212, 175, 55, alpha * 255);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                }
            }
        };
        
        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
    };
    
    new p5(heroSketch);
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    };
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Product Slider
function initProductSlider() {
    const slider = document.getElementById('featured-products');
    if (!slider) return;
    
    new Splide(slider, {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            768: {
                perPage: 1,
            }
        }
    }).mount();
}

// Scroll Animations
function initScrollAnimations() {
    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply to elements
    const elementsToAnimate = document.querySelectorAll('.neumorphic, .product-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
}

// Floating Particles
function initParticles() {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 6000);
    };
    
    // Create particles periodically
    setInterval(createParticle, 800);
}

// Dark Mode Toggle (Auto-detect time)
function initDarkMode() {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    // Auto-switch based on time
    if (isNight) {
        document.body.classList.add('dark');
    }
    
    // Manual toggle button (if exists)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    }
}

// Chatbot Functionality
function initChatbot() {
    window.toggleChat = () => {
        // Simple chatbot toggle
        const chatbot = document.querySelector('.chatbot');
        if (chatbot.classList.contains('active')) {
            chatbot.classList.remove('active');
        } else {
            chatbot.classList.add('active');
            showChatMessage();
        }
    };
    
    function showChatMessage() {
        // Create chat popup
        const popup = document.createElement('div');
        popup.className = 'fixed bottom-100 left-30 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs z-50';
        popup.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div>
                    <h4 class="font-bold mb-1">مساعد SmartSpace</h4>
                    <p class="text-sm text-gray-300">مرحباً! كيف يمكنني مساعدتك اليوم؟ هل تريد معرفة المزيد عن منتجاتنا أو استخدام محاكي التصميم؟</p>
                    <div class="flex space-x-2 mt-3">
                        <button onclick="window.location.href='products.html'" class="bg-yellow-500 text-black px-3 py-1 rounded text-xs">المنتجات</button>
                        <button onclick="window.location.href='designer.html'" class="bg-gray-600 text-white px-3 py-1 rounded text-xs">المصمم</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Remove popup after 10 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 10000);
    }
}

// Product Search and Filter (for products page)
function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const products = document.querySelectorAll('.product-item');
    
    if (!searchInput) return;
    
    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const selectedPrice = priceFilter ? priceFilter.value : 'all';
        
        products.forEach(product => {
            const title = product.querySelector('.product-title').textContent.toLowerCase();
            const category = product.dataset.category;
            const price = parseInt(product.dataset.price);
            
            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            const matchesPrice = selectedPrice === 'all' || 
                (selectedPrice === 'low' && price < 225000) ||
                (selectedPrice === 'medium' && price >= 225000 && price < 675000) ||
                (selectedPrice === 'high' && price >= 675000);
            
            if (matchesSearch && matchesCategory && matchesPrice) {
                product.style.display = 'block';
                anime({
                    targets: product,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            } else {
                product.style.display = 'none';
            }
        });
    };
    
    searchInput.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (priceFilter) priceFilter.addEventListener('change', filterProducts);
}

// Product Comparison
function initProductComparison() {
    const compareButtons = document.querySelectorAll('.compare-btn');
    const compareList = [];
    const maxCompare = 4;
    
    compareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            
            if (compareList.includes(productId)) {
                // Remove from comparison
                const index = compareList.indexOf(productId);
                compareList.splice(index, 1);
                button.textContent = 'قارن';
                button.classList.remove('bg-yellow-500', 'text-black');
                button.classList.add('bg-gray-600', 'text-white');
            } else if (compareList.length < maxCompare) {
                // Add to comparison
                compareList.push(productId);
                button.textContent = 'إزالة من المقارنة';
                button.classList.remove('bg-gray-600', 'text-white');
                button.classList.add('bg-yellow-500', 'text-black');
            } else {
                alert(`يمكنك مقارنة ${maxCompare} منتجات كحد أقصى`);
            }
            
            updateCompareCounter();
        });
    });
    
    function updateCompareCounter() {
        const counter = document.getElementById('compare-counter');
        if (counter) {
            counter.textContent = compareList.length;
        }
    }
}

// 3D Room Designer (for designer page)
function initRoomDesigner() {
    const designerCanvas = document.getElementById('designer-canvas');
    if (!designerCanvas) return;
    
    // Simple 3D room designer using Three.js would go here
    // For now, we'll create a placeholder interface
    const designerInterface = `
        <div class="h-96 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">SmartSpace Designer</h3>
                <p class="text-gray-400 mb-4">رفع صورة 360 درجة لغرفتك أو اختيار قالب جاهز</p>
                <div class="flex space-x-4 justify-center">
                    <button class="neumorphic px-4 py-2 text-yellow-400">رفع صورة</button>
                    <button class="glassmorphic px-4 py-2 text-white">قوالب جاهزة</button>
                </div>
            </div>
        </div>
    `;
    
    designerCanvas.innerHTML = designerInterface;
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuad',
            complete: () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }
        });
    }, 3000);
}

// Initialize page-specific functions
if (window.location.pathname.includes('products.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        initProductSearch();
        initProductComparison();
    });
}

if (window.location.pathname.includes('designer.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        initRoomDesigner();
    });
}

// Export functions for global use
window.SmartSpace = {
    showNotification,
    toggleChat: window.toggleChat
};