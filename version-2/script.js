// File: navbar-script.js

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
        textLogo.innerHTML = 'LOGO';
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
});