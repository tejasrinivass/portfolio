// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('skill-progress')) {
                animateSkillBar(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections for fade-in animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    // Observe skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// Counter animation for statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Skill bar animation
function animateSkillBar(element) {
    const width = element.getAttribute('data-width');
    setTimeout(() => {
        element.style.width = width + '%';
    }, 300);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent;
        typeWriter(roleElement, originalText, 80);
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Cursor trail effect
let mouseTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }
    
    updateTrail();
});

function updateTrail() {
    // Remove existing trail elements
    document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
    
    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: ${8 - (index * 0.5)}px;
            height: ${8 - (index * 0.5)}px;
            background: rgba(102, 126, 234, ${0.8 - (index * 0.08)});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${point.x}px;
            top: ${point.y}px;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(trail);
        
        // Remove trail element after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.style.opacity = '0';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 300);
            }
        }, 100);
    });
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const animateElements = document.querySelectorAll('.about-card, .stat-card, .skill-category, .project-card, .contact-card');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(element);
    });
}

// Enhanced intersection observer for scroll animations
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.about-card, .stat-card, .skill-category, .project-card, .contact-card');
    animatedElements.forEach(element => {
        enhancedObserver.observe(element);
    });
});

// Smooth page loading
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add dynamic background particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float ${duration}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        createParticle(container); // Create new particle
    }, duration * 1000);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Add developer vibes with code-like effects
function addDeveloperVibes() {
    // Add typing effect to role text
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const text = roleElement.textContent;
        roleElement.textContent = '';
        roleElement.classList.add('code-typing');
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                roleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                roleElement.classList.remove('code-typing');
            }
        }
        setTimeout(typeWriter, 1000);
    }

    // Add matrix background effect
    createMatrixBackground();

    // Add enhanced hover effects
    const cards = document.querySelectorAll('.project-card, .certification-card, .achievement-item, .timeline-content');
    cards.forEach(card => {
        card.classList.add('enhanced-hover');
    });

    // Add glow effects to important elements
    const glowElements = document.querySelectorAll('.profile-card, .stat-card, .skill-category');
    glowElements.forEach(element => {
        element.classList.add('developer-glow');
    });

    // Add pulse effects to floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        icon.classList.add('pulse-effect');
    });
}

// Create matrix background effect
function createMatrixBackground() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-bg';
    document.body.appendChild(matrixContainer);

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = characters[Math.floor(Math.random() * characters.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 10 + 5) + 's';
        char.style.animationDelay = Math.random() * 5 + 's';
        
        matrixContainer.appendChild(char);
        
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 15000);
    }

    // Create matrix characters periodically
    setInterval(createMatrixChar, 200);
}

// Enhanced scroll animations with developer vibes
function addEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('float-up');
                
                // Add special effects for different elements
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
                
                if (entry.target.classList.contains('certification-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.timeline-item, .certification-card, .achievement-item, .project-card');
    animatedElements.forEach(element => {
        enhancedObserver.observe(element);
    });
}

// Add code-like cursor effect
function addCodeCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'code-cursor';
    cursor.innerHTML = '|';
    cursor.style.cssText = `
        position: fixed;
        color: #667eea;
        font-family: 'Courier New', monospace;
        font-size: 20px;
        font-weight: bold;
        pointer-events: none;
        z-index: 10000;
        animation: blink 1s infinite;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
}

// Initialize all developer vibes
document.addEventListener('DOMContentLoaded', () => {
    addDeveloperVibes();
    addEnhancedScrollAnimations();
    addCodeCursor();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
}, 100));

// Add loading screen
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-content {
            text-align: center;
            color: #fff;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(102, 126, 234, 0.3);
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
}

// Initialize loading screen
createLoadingScreen();