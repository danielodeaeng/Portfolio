// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(#1a365d, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(#1a365d, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Contact form handling with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Submit to EmailJS
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // EmailJS send parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // contact forum using EmailJS
        emailjs.send('service_9ncpqhv', 'template_0bfow9t', templateParams, 'F3TRD-z45ht2rylq2')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showNotification('Oops! There was a problem submitting your form. Please try again.', 'error');
            })
            .finally(function() {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifs
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // notif element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#38b2ac' : type === 'error' ? '#e53e3e' : '#1a365d'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Typing animation for hero title
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

// effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Project card hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill category hover
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading class to body
document.body.classList.add('loading');

// Preloader styles
const preloaderStyles = `
    .loading {
        overflow: hidden;
    }
    
    .loaded {
        overflow: auto;
    }
    
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .preloader.hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .preloader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid #e2e8f0;
        border-top: 3px solid #38b2ac;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Add preloader styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = preloaderStyles;
document.head.appendChild(styleSheet);

// Create and add preloader
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = '<div class="preloader-spinner"></div>';
document.body.appendChild(preloader);

// Hide preloader when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add active class to current section in navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add CSS for active nav link
const activeNavStyles = `
    .nav-link.active {
        color: #38b2ac !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;

const activeStyleSheet = document.createElement('style');
activeStyleSheet.textContent = activeNavStyles;
document.head.appendChild(activeStyleSheet); 

// Interactive Hint for 3D Model
function showModelHint() {
    const modelContainer = document.querySelector('.project-showcase');
    
    if (!modelContainer) {
        console.log('Model container not found');
        return;
    }
    
    console.log('Showing model hint...');
    
    // hint element with touch/tap icon and ripples
    const hint = document.createElement('div');
    hint.className = 'model-hint';
    hint.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Ripple 1 (outer) -->
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(56, 178, 172, 0.6)" stroke-width="2">
                <animate attributeName="r" from="20" to="40" dur="1.5s" begin="0s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Ripple 2 (middle) -->
            <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(56, 178, 172, 0.8)" stroke-width="2">
                <animate attributeName="r" from="15" to="30" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Touch point (center dot) -->
            <circle cx="50" cy="50" r="8" fill="white">
                <animate attributeName="r" from="8" to="10" dur="0.6s" begin="0s" repeatCount="indefinite" 
                         keyTimes="0;0.5;1" values="8;10;8"/>
            </circle>
            
            <!-- Inner glow -->
            <circle cx="50" cy="50" r="12" fill="none" stroke="white" stroke-width="1.5" opacity="0.7"/>
        </svg>
    `;
    
    modelContainer.appendChild(hint);
    console.log('Hint element added to DOM');
    
    // Remove hint after animation completes
    setTimeout(() => {
        if (hint.parentNode) {
            hint.remove();
            console.log('Hint removed from DOM');
        }
    }, 3500);
}

// Call the function when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        showModelHint();
    }, 1500);
});


// Hero 3D Project Swap

(() => {
    const modelEl = document.getElementById("heroModel");
    const prevBtn = document.querySelector(".proj-prev");
    const nextBtn = document.querySelector(".proj-next");

    if (!modelEl || !prevBtn || !nextBtn) return;

    // assets 
    const models = [
        "assets/Fyp_Conveyor.glb",
        "assets/8cyl.glb",
        "assets/robot.glb",
        "assets/Alloy.glb",
        "assets/6ax.glb",
    ];

    let index = 0;
    const intervalMs = 5000;
    let timer = null;

    function setModel(i) {
        // Fade out quickly swap src fade back in
        modelEl.classList.add("is-fading");

        window.setTimeout(() => {
            modelEl.setAttribute("src", models[i]);
            modelEl.classList.remove("is-fading");
        }, 220);
    }

    function next() {
        index = (index + 1) % models.length;
        setModel(index);
    }

    function prev() {
        index = (index - 1 + models.length) % models.length;
        setModel(index);
    }

    function startAuto() {
        stopAuto();
        timer = window.setInterval(next, intervalMs);
    }

    function stopAuto() {
        if (timer) window.clearInterval(timer);
        timer = null;
    }

    // Buttons
    nextBtn.addEventListener("click", () => {
        stopAuto();
        next();
        startAuto();
    });

    prevBtn.addEventListener("click", () => {
        stopAuto();
        prev();
        startAuto();
    });

    // keyboard arrows
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            stopAuto(); next(); startAuto();
        }
        if (e.key === "ArrowLeft") {
            stopAuto(); prev(); startAuto();
        }
    });

    // pause auto-rotate when user interacts with the model
    modelEl.addEventListener("pointerdown", stopAuto);
    modelEl.addEventListener("pointerup", startAuto);

    // Start on whatever is currently set in HTML
    index = Math.max(0, models.indexOf(modelEl.getAttribute("src"))) || 0;
    startAuto();
})();


// Image Auto-Switch
(() => {
    const cards = document.querySelectorAll('.timeline-item.hover-reveal');
    
    cards.forEach(card => {
        const images = card.querySelectorAll('.hover-reveal__img');
        if (images.length < 2) return;
        
        let currentIndex = 0;
        let interval = null;
        
        // Switch to next image
        function switchImage() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }
        
        // Start switching when hovering over the card
        card.addEventListener('mouseenter', () => {
            currentIndex = 0;
            images.forEach((img, i) => {
                img.classList.toggle('active', i === 0);
            });
            
            // Switch every 2 seconds
            interval = setInterval(switchImage, 2000);
        });
        
        // Stop switching when mouse leaves
        card.addEventListener('mouseleave', () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
            
            // Reset to first image
            images.forEach((img, i) => {
                img.classList.toggle('active', i === 0);
            });
        });
    });


    // TYPEWRITER EFFECT
    document.addEventListener('DOMContentLoaded', function() {
        var typed = new Typed('#typed', {
            strings: [
                'Automation/Robotics Engineer',
                'PLC Programmer',
                'HMI &amp; SCADA Developer ',
                '3D printing &amp; CAD enthusiest',
                'Team Player',
                'Kinesthetic Learner',
                'Problem Solver',
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    });
})();