// File: version-1/script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const mobileToggle = document.getElementById('mobileToggle');
    const navbarNav = document.getElementById('navbarNav');

    // Toggle mobile menu when hamburger button is clicked
    mobileToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Close mobile menu when clicking outside the navbar
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');
        if (!navbar.contains(event.target)) {
            navbarNav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Handle logo error (if logo.webp doesn't exist)
    const logo = document.getElementById('logo');
    logo.addEventListener('error', function() {
        this.style.display = 'none';
        // Replace with a text logo fallback
        const textLogo = document.createElement('div');
        textLogo.innerHTML = 'Aetherbloom';
        textLogo.style.fontWeight = 'bold';
        textLogo.style.fontSize = '20px';
        textLogo.style.color = 'var(--brand-primary)';
        this.parentNode.appendChild(textLogo);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar (hide on scroll down, show on scroll up)
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Close mobile menu on window resize if switching to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbarNav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Keyboard accessibility for mobile menu
    mobileToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navbarNav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Add focus trap for mobile menu accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusable = element.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Apply focus trap when mobile menu is active
    const navbar = document.querySelector('.navbar');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('active')) {
                trapFocus(navbar);
            }
        });
    });

    observer.observe(navbarNav, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Services section functionality
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceMockups = document.querySelectorAll('.service-mockup');

    // Handle service link clicks for future modal/detail view functionality
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the service type from the href
            const serviceType = this.getAttribute('href').substring(1);
            
            // For now, just log the interaction - this can be extended for modals/detail pages
            console.log(`Service clicked: ${serviceType}`);
            
            // Add a subtle feedback animation
            this.style.transform = 'translateX(4px)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 150);
            
            // Future: Open modal or navigate to service detail page
            // showServiceModal(serviceType);
        });
    });

    // Intersection Observer for services section animations
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const servicesObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered animation to service cards
                    const cards = entry.target.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, observerOptions);

        servicesObserver.observe(servicesSection);

        // Initially hide cards for animation
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // Animation functions for reuse
    const animationFunctions = {
        // Typing effect for chat bubbles
        typingEffect: (element, text, speed = 30) => {
            // Clear any existing intervals
            if (element.typingInterval) {
                clearInterval(element.typingInterval);
            }
            
            element.textContent = '';
            let i = 0;
            element.typingInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(element.typingInterval);
                    element.typingInterval = null;
                }
            }, speed);
        },

        // Progress bar animation
        animateProgress: (progressElement) => {
            progressElement.style.transition = 'none';
            progressElement.style.width = '0%';
            setTimeout(() => {
                progressElement.style.transition = 'width 1.5s ease-in-out';
                progressElement.style.width = '75%';
            }, 50);
        },

        // Document processing animation
        animateDocuments: (container) => {
            const docStatuses = container.querySelectorAll('.doc-status');
            docStatuses.forEach((status, index) => {
                setTimeout(() => {
                    if (status.classList.contains('processing')) {
                        status.textContent = '✓';
                        status.classList.remove('processing');
                        status.classList.add('processed');
                        setTimeout(() => {
                            status.textContent = '⏳';
                            status.classList.remove('processed');
                            status.classList.add('processing');
                        }, 1500);
                    }
                }, index * 300);
            });
        },

        // Sales pipeline counter animation
        animateSalesNumbers: (container) => {
            const stageCounts = container.querySelectorAll('.stage-count');
            stageCounts.forEach(count => {
                const targetNumber = parseInt(count.textContent);
                let currentNumber = 0;
                count.textContent = '0';
                
                const countInterval = setInterval(() => {
                    currentNumber += Math.ceil(targetNumber / 20);
                    if (currentNumber >= targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(countInterval);
                    }
                    count.textContent = currentNumber;
                }, 50);
            });
        }
    };

    // Enhanced mockup animations for better interactivity
    serviceMockups.forEach(mockup => {
        // Define keyframes if not already defined
        if (!document.querySelector('#animation-keyframes')) {
            const style = document.createElement('style');
            style.id = 'animation-keyframes';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `;
            document.head.appendChild(style);
        }
    });

    // Setup hover animations for each service card type
    serviceCards.forEach(card => {
        const mockup = card.querySelector('.service-mockup');
        
        // Enhanced hover effects with specific animations per card type
        card.addEventListener('mouseenter', function() {
            // General mockup hover effect
            if (mockup) {
                mockup.style.transform = 'scale(1.05) translateY(-2px)';
                mockup.style.transition = 'transform 0.3s ease';
            }

            // Trigger specific animations based on card type
            if (card.querySelector('.customer-support-mockup')) {
                // Customer Support: Restart chat typing animation
                const bubbles = card.querySelectorAll('.chat-bubble');
                bubbles.forEach((bubble, index) => {
                    const originalText = bubble.getAttribute('data-text') || bubble.textContent;
                    bubble.setAttribute('data-text', originalText);
                    setTimeout(() => {
                        animationFunctions.typingEffect(bubble, originalText);
                    }, index * 600);
                });
            }
            
            else if (card.querySelector('.technical-support-mockup')) {
                // Technical Support: Restart progress bar animation
                const progressFill = card.querySelector('.progress-fill');
                if (progressFill) {
                    animationFunctions.animateProgress(progressFill);
                }
                
                // Add pulse to status indicator
                const statusIndicator = card.querySelector('.status-indicator');
                if (statusIndicator) {
                    statusIndicator.style.animation = 'pulse 1s ease-in-out 3';
                }
            }
            
            else if (card.querySelector('.back-office-mockup')) {
                // Back Office: Animate document processing
                const mockupContent = card.querySelector('.mockup-content');
                if (mockupContent) {
                    animationFunctions.animateDocuments(mockupContent);
                }
            }
            
            else if (card.querySelector('.sales-support-mockup')) {
                // Sales Support: Animate number counters
                const mockupContent = card.querySelector('.mockup-content');
                if (mockupContent) {
                    animationFunctions.animateSalesNumbers(mockupContent);
                }
            }
        });

        card.addEventListener('mouseleave', function() {
            // Reset mockup animation
            if (mockup) {
                mockup.style.transform = 'scale(1) translateY(0)';
            }
            
            // Reset any pulsing animations
            const statusIndicator = card.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.style.animation = '';
            }
        });
    });

    // Initial scroll-triggered animations (keep existing functionality)
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => animationFunctions.animateProgress(progressFill), 500);
                }
            });
        }, { threshold: 0.5 });

        const technicalCard = progressFill.closest('.service-card');
        if (technicalCard) {
            progressObserver.observe(technicalCard);
        }
    }

    // Initial chat bubble animation on scroll
    const chatBubbles = document.querySelectorAll('.chat-bubble');
    if (chatBubbles.length > 0) {
        // Store original text for each bubble
        chatBubbles.forEach(bubble => {
            bubble.setAttribute('data-text', bubble.textContent);
        });

        const chatObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bubbles = entry.target.querySelectorAll('.chat-bubble');
                    bubbles.forEach((bubble, index) => {
                        const originalText = bubble.getAttribute('data-text');
                        setTimeout(() => {
                            animationFunctions.typingEffect(bubble, originalText);
                        }, index * 1000);
                    });
                }
            });
        }, { threshold: 0.5 });

        const customerCard = chatBubbles[0].closest('.service-card');
        if (customerCard) {
            chatObserver.observe(customerCard);
        }
    }
});