// File: version-2/script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const mobileToggle = document.getElementById('mobileToggle');
    const navbarNav = document.getElementById('navbarNav');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu when hamburger button is clicked
    mobileToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navbarNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu
            navbarNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to target if it's an anchor link
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Close mobile menu when clicking outside the navbar
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target)) {
            navbarNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle logo error (if logo.webp doesn't exist)
    const logo = document.getElementById('logo');
    logo.addEventListener('error', function() {
        this.style.display = 'none';
        // Replace with a text logo fallback
        const textLogo = document.createElement('div');
        textLogo.innerHTML = 'AETHERBLOOM';
        textLogo.style.fontWeight = '800';
        textLogo.style.fontSize = '18px';
        textLogo.style.color = 'var(--brand-primary)';
        textLogo.style.letterSpacing = '1px';
        this.parentNode.appendChild(textLogo);
    });

    // Navbar scroll behavior - subtle hide/show
    let lastScrollY = window.scrollY;
    let isScrolling = false;

    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrolling down - hide navbar
                    navbar.classList.add('hidden');
                } else {
                    // Scrolling up - show navbar
                    navbar.classList.remove('hidden');
                }
                
                lastScrollY = currentScrollY;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Close mobile menu on window resize if switching to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbarNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
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
            document.body.style.overflow = '';
        }
    });

    // Action buttons hover enhancement
    const actionButtons = document.querySelectorAll('.btn');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-1px)';
        });
    });

    // Smooth scroll for action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Hero section functionality
    const heroCalculatorBtn = document.getElementById('heroCalculatorBtn');
    const heroSecondaryBtn = document.querySelector('.btn-hero-secondary');
    
    if (heroCalculatorBtn) {
        // Add click animation
        heroCalculatorBtn.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'translateY(-1px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
            
            // Here you would typically open a calculator modal or navigate to calculator page
            console.log('Opening cost calculator...');
            
            // For demo purposes, you can add a simple alert or modal
            showCalculatorModal();
        });

        // Enhanced hover effects for hero button
        heroCalculatorBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(45, 74, 62, 0.5)';
        });

        heroCalculatorBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(45, 74, 62, 0.3)';
        });
    }

    // Secondary button hover effects
    if (heroSecondaryBtn) {
        heroSecondaryBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 30px rgba(242, 196, 168, 0.4)';
        });

        heroSecondaryBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px)';
            this.style.boxShadow = 'none';
        });
    }

    // Simple calculator modal function (placeholder)
    function showCalculatorModal() {
        // This is a simple placeholder - in a real implementation you'd create a proper modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 12px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;

        modalContent.innerHTML = `
            <h3 style="margin-bottom: 20px; color: var(--text-dark);">Cost Calculator</h3>
            <p style="margin-bottom: 30px; color: var(--text-medium);">
                Calculate your potential savings with Aetherbloom's BPO solutions.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: var(--brand-primary); color: white; border: none; 
                           padding: 12px 24px; border-radius: 6px; cursor: pointer;">
                Coming Soon - Close
            </button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Add fade in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Add active state management for navigation
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Update active navigation on scroll (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavigation, 50);
    });

    // Initialize navigation state
    updateActiveNavigation();

    // Intersection Observer for animations (if you want to add scroll animations later)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations (you can add this class to elements you want to animate)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});