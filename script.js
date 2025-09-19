// App Download Page JavaScript
// File: script.js

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initScreenshotSlider();
    initDownloadTracking();
    initAnimations();
    initParallaxEffects();
    initTypingEffect();
    initStatCounters();
}

// Mobile Navigation Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu visibility
        navMenu.classList.toggle('active', isMenuOpen);
        
        // Animate hamburger bars
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (isMenuOpen) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
        
        // Toggle body scroll
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                mobileMenuBtn.click();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuBtn.click();
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects (Header background, fade-in animations)
function initScrollEffects() {
    const header = document.querySelector('.header');
    const fadeElements = document.querySelectorAll('.feature-card, .review-card, .screenshot-item');
    
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        
        // Header background opacity
        if (header) {
            const opacity = Math.min(scrollY / 100, 0.95);
            header.style.background = `rgba(10, 10, 10, ${opacity})`;
        }
        
        // Fade in elements on scroll
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Initial check
    updateScrollEffects();
}

// Screenshot Slider Functionality
function initScreenshotSlider() {
    const slider = document.querySelector('.screenshots-slider');
    const screenshots = document.querySelectorAll('.screenshot-item');
    
    if (!slider || screenshots.length === 0) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Mouse events for desktop
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Auto-scroll functionality
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 250, behavior: 'smooth' });
            }
        }, 4000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Start auto-scroll on load, pause on interaction
    startAutoScroll();
    
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
    slider.addEventListener('touchstart', stopAutoScroll);
}

// Download Button Tracking
function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('app-store') ? 'iOS' : 'Android';
            
            // Analytics tracking (replace with your analytics service)
            trackDownload(platform);
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate download or redirect
            setTimeout(() => {
                // Replace with actual app store URLs
                if (platform === 'iOS') {
                    window.open('https://apps.apple.com/app/yourapp', '_blank');
                } else {
                    window.open('https://play.google.com/store/apps/details?id=com.yourapp', '_blank');
                }
            }, 200);
        });
    });
}

// Analytics tracking function
function trackDownload(platform) {
    // Replace with your actual analytics implementation
    console.log(`Download initiated for ${platform}`);
    
    // Example: Google Analytics 4
    // gtag('event', 'download_initiated', {
    //     platform: platform,
    //     page_title: document.title
    // });
    
    // Example: Custom analytics
    // fetch('/api/track-download', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ platform, timestamp: Date.now() })
    // });
}

// Intersection Observer for animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .review-card, .hero-visual');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Parallax Effects for Hero Section
function initParallaxEffects() {
    const heroVisual = document.querySelector('.hero-visual');
    const phoneImage = document.querySelector('.phone-image');
    
    if (!heroVisual || !phoneImage) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        phoneImage.style.transform = `translateY(${rate}px)`;
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const textWithoutSpans = titleElement.textContent;
    
    // Only run typing effect on desktop
    if (window.innerWidth > 768) {
        titleElement.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < textWithoutSpans.length) {
                if (textWithoutSpans.charAt(i) === '[' && originalText.includes('<span class="gradient-text">')) {
                    // Start gradient text
                    const gradientStart = originalText.indexOf('<span class="gradient-text">');
                    const gradientEnd = originalText.indexOf('</span>') + 7;
                    const gradientText = originalText.substring(gradientStart, gradientEnd);
                    titleElement.innerHTML += gradientText;
                    i = textWithoutSpans.indexOf(']') + 1;
                } else {
                    titleElement.innerHTML += textWithoutSpans.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Animated Counter for Statistics
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, '')) || 0;
    const suffix = text.replace(/[\d,]/g, '');
    const duration = 2000;
    const increment = number / (duration / 16);
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (displayValue >= 1000000) {
            displayValue = Math.floor(displayValue / 1000000) + 'M';
        } else if (displayValue >= 1000) {
            displayValue = Math.floor(displayValue / 1000) + 'K';
        }
        
        element.textContent = displayValue + suffix;
    }, 16);
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenuBtn = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuBtn && navMenu && navMenu.classList.contains('active')) {
            mobileMenuBtn.click();
        }
    }
});

// Performance Optimization: Debounced Resize Handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reinitialize elements that depend on viewport size
        initParallaxEffects();
    }, 250);
});

// Preload Critical Images
function preloadImages() {
    const imageUrls = [
        'assets/images/phone-mockup.png',
        'assets/images/logo.png',
        'assets/images/screenshot-1.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initSmoothScrolling,
        trackDownload
    };
}

// Terminal-style loading effect for development
console.log(`
downloading
`);
