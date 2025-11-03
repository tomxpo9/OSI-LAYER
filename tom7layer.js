// Matrix Rain Effect
function createMatrixRain() {
    const container = document.getElementById('matrixRain');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 10 + 10) + 's';
        column.style.animationDelay = Math.random() * 5 + 's';
        column.textContent = chars[Math.floor(Math.random() * chars.length)];
        container.appendChild(column);
    }
}

// Create Floating Orbs
function createOrbs() {
    const colors = [
        'radial-gradient(circle, rgba(0,255,255,0.8), transparent)',
        'radial-gradient(circle, rgba(255,0,255,0.8), transparent)',
        'radial-gradient(circle, rgba(0,255,136,0.8), transparent)'
    ];
    
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.style.width = (Math.random() * 200 + 100) + 'px';
        orb.style.height = orb.style.width;
        orb.style.background = colors[Math.floor(Math.random() * colors.length)];
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        orb.style.animationDuration = (Math.random() * 20 + 15) + 's';
        orb.style.animationDelay = Math.random() * 5 + 's';
        orb.style.filter = 'blur(60px)';
        document.body.appendChild(orb);
    }
}

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// Active Navigation
function updateActiveNav() {
    const sections = document.querySelectorAll('.layer-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
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
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// Animate cards on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.network-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Add icon rotation on hover
document.querySelectorAll('.card-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(360deg) scale(1.1)';
        this.style.transition = 'transform 0.6s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Initialize
window.addEventListener('load', () => {
    createMatrixRain();
    createOrbs();
    animateOnScroll();
});

window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateActiveNav();
});

// Parallax effect for layer numbers
window.addEventListener('scroll', () => {
    document.querySelectorAll('.layer-number').forEach(num => {
        const speed = 0.5;
        const yPos = -(window.scrollY * speed);
        num.style.transform = `translateX(-50%) translateY(${yPos}px) rotate(${window.scrollY * 0.1}deg)`;
    });
});