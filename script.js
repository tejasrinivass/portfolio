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

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            // Custom smooth scrolling with easing
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 1000; // 1 second
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const progressPercentage = Math.min(progress / duration, 1);
                
                // Easing function (ease-in-out)
                const ease = progressPercentage < 0.5 
                    ? 2 * progressPercentage * progressPercentage 
                    : 1 - Math.pow(-2 * progressPercentage + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);
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

// Matrix background effect
function createMatrixEffect() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-bg';
    document.body.appendChild(matrixContainer);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * window.innerWidth + 'px';
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

// Enhanced scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Add stagger effect for grouped elements
                const siblings = entry.target.parentNode.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling.classList.contains('reveal') || 
                        sibling.classList.contains('reveal-left') || 
                        sibling.classList.contains('reveal-right') || 
                        sibling.classList.contains('reveal-scale')) {
                        setTimeout(() => {
                            sibling.classList.add('active');
                        }, index * 100);
                    }
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// Terminal-like typing effect
function createTerminalEffect(element, commands, speed = 50) {
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentCommand = commands[commandIndex];
        
        if (isDeleting) {
            element.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = speed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentCommand.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typeSpeed = 500; // Pause before next command
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Code syntax highlighting effect
function addSyntaxHighlighting() {
    const codeElements = document.querySelectorAll('.code-style');
    
    codeElements.forEach(element => {
        let text = element.textContent;
        
        // Simple syntax highlighting
        text = text.replace(/\b(function|const|let|var|if|else|for|while|return)\b/g, '<span style="color: #ff6b6b;">$1</span>');
        text = text.replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #4ecdc4;">$1</span>');
        text = text.replace(/(['"`])(.*?)\1/g, '<span style="color: #95e1d3;">$1$2$1</span>');
        text = text.replace(/\/\/(.*?)$/gm, '<span style="color: #6c757d; font-style: italic;">//$1</span>');
        
        element.innerHTML = text;
    });
}

// Enhanced particle system
function createEnhancedParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * window.innerWidth;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: 100vh;
            animation: particleFloat ${duration}s linear ${delay}s infinite;
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// Glitch effect for text
function addGlitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    function glitch() {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        element.textContent = glitchedText;
        
        setTimeout(() => {
            element.textContent = originalText;
        }, 50);
    }
    
    element.addEventListener('mouseenter', () => {
        const glitchInterval = setInterval(glitch, 100);
        setTimeout(() => clearInterval(glitchInterval), 500);
    });
}

// Initialize all enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize matrix effect (subtle)
    if (window.innerWidth > 768) {
        createMatrixEffect();
    }
    
    // Initialize scroll reveal
    initScrollReveal();
    
    // Initialize enhanced particles
    createEnhancedParticles();
    
    // Add syntax highlighting
    addSyntaxHighlighting();
    
    // Add glitch effect to titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => addGlitchEffect(title));
    
    // Terminal typing effect for role
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const commands = [
            'Computer Science Engineer',
            'Data Analyst',
            'Cloud Enthusiast',
            'Java Developer'
        ];
        createTerminalEffect(roleElement, commands, 100);
    }
    
    // Add reveal classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('reveal');
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    const cards = document.querySelectorAll('.skill-category, .project-card, .certification-card, .achievement-card, .education-card');
    cards.forEach((card, index) => {
        card.classList.add('reveal-scale');
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Enhanced cursor trail with developer theme
let mouseTrailEnhanced = [];
const trailLengthEnhanced = 15;

document.addEventListener('mousemove', (e) => {
    mouseTrailEnhanced.push({ 
        x: e.clientX, 
        y: e.clientY, 
        time: Date.now() 
    });
    
    if (mouseTrailEnhanced.length > trailLengthEnhanced) {
        mouseTrailEnhanced.shift();
    }
    
    updateEnhancedTrail();
});

function updateEnhancedTrail() {
    document.querySelectorAll('.cursor-trail-enhanced').forEach(el => el.remove());
    
    mouseTrailEnhanced.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail-enhanced';
        
        const age = Date.now() - point.time;
        const opacity = Math.max(0, 1 - age / 1000);
        const size = Math.max(2, 12 - (index * 0.8));
        
        trail.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(102, 126, 234, ${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${point.x}px;
            top: ${point.y}px;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 ${size * 2}px rgba(102, 126, 234, ${opacity * 0.5});
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.style.opacity = '0';
                trail.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 300);
            }
        }, 100);
    });
}

// Konami code easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg: Matrix rain effect
        document.body.style.background = '#000';
        showNotification('🎉 Developer mode activated! Matrix effect enabled.', 'success');
        
        // Intensify matrix effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const matrixContainer = document.querySelector('.matrix-bg');
                if (matrixContainer) {
                    matrixContainer.style.opacity = '0.3';
                }
            }, i * 50);
        }
        
        konamiCode = [];
    }
});