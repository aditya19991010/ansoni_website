// Portfolio Website JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');
    
    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const navList = navMenu.querySelector('.nav__list');
            if (navList) {
                navList.classList.toggle('show');
                navToggle.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navList = navMenu.querySelector('.nav__list');
            if (navList) {
                navList.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Fix hero buttons
    const viewWorkBtn = document.querySelector('.hero__buttons .btn--primary');
    const downloadCvBtn = document.querySelector('.hero__buttons .btn--outline');
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = projectsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
            
            // Show notification about CV
            showNotification('Please contact me via the form below to request my CV.', 'info');
        });
    }

    // Fix social media links
    const socialLinks = document.querySelectorAll('.social-link, .social__links .btn');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.includes('github.com/aditya19991010') || href.includes('linkedin.com/aditya-naman-soni'))) {
                // Links already have target="_blank", they should work
                return true;
            }
        });
    });

    // Header background change on scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'var(--color-surface)';
                header.style.boxShadow = 'var(--shadow-sm)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'rgba(252, 252, 249, 0.95)';
                header.style.boxShadow = 'none';
                header.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once on load

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.education__item, .experience__item, .project__card, .skill__category, .achievement__item, .publication__item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate required fields
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:ansoni.work10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.open(mailtoLink, '_blank');
            
            // Show success message
            showNotification('Thank you for your message! Your email client should open now.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" style="background: none; border: none; font-size: 20px; cursor: pointer; margin-left: 10px;">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            max-width: 400px;
            transition: all var(--duration-normal) var(--ease-standard);
            transform: translateX(100%);
            display: flex;
            align-items: center;
        `;

        // Add type-specific colors
        if (type === 'success') {
            notification.style.borderLeft = '4px solid var(--color-success)';
        } else if (type === 'error') {
            notification.style.borderLeft = '4px solid var(--color-error)';
        } else if (type === 'info') {
            notification.style.borderLeft = '4px solid var(--color-primary)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeButton = notification.querySelector('.notification__close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            });
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Make showNotification globally available
    window.showNotification = showNotification;

    // Skill tags hover effect enhancement
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Project cards hover effect enhancement
    const projectCards = document.querySelectorAll('.project__card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-card-border)';
        });
    });

    // Achievement items hover effect enhancement
    const achievementItems = document.querySelectorAll('.achievement__item');
    achievementItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-card-border)';
        });
    });

    // Typing effect for hero tagline
    function typeWriter(element, text, delay = 50) {
        if (!element) return;
        
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        
        type();
    }

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTagline = document.querySelector('.hero__tagline');
        if (heroTagline) {
            const originalText = heroTagline.textContent;
            typeWriter(heroTagline, originalText, 30);
        }
    }, 1000);

    // Scroll to top functionality
    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            border: none;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            transition: all var(--duration-normal) var(--ease-standard);
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            box-shadow: var(--shadow-lg);
        `;

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
                scrollBtn.style.transform = 'translateY(0)';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
                scrollBtn.style.transform = 'translateY(10px)';
            }
        });
    }

    createScrollToTopButton();

    // Loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity to 0 and transition
        img.style.opacity = '0';
        img.style.transition = 'opacity var(--duration-normal) var(--ease-standard)';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Dynamic year update in footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer__content p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
    }

    // Keyboard navigation accessibility
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        const navList = navMenu ? navMenu.querySelector('.nav__list') : null;
        if (e.key === 'Escape' && navList && navList.classList.contains('show')) {
            navList.classList.remove('show');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    // Form validation enhancement
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = 'var(--color-border)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
    });

    // Console message for developers
    console.log('🚀 Portfolio website loaded successfully!');
    console.log('👨‍💻 Designed and developed for Aditya Naman Soni');
    console.log('🔬 Explorer of Computational Biology domain');
    
    // Performance optimization: Lazy load sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-loaded');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Error handling for any uncaught errors
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Service worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here for PWA features
        console.log('Service Worker support detected');
    });
}
