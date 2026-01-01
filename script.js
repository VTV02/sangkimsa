// Particles Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class StarParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const backgroundParticles = [];
for (let i = 0; i < 100; i++) {
    backgroundParticles.push(new StarParticle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Floating Hearts
function createFloatingHeart() {
    const heartsContainer = document.getElementById('floating-hearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createFloatingHeart, 2000);

// Typewriter Effect
function typewriter(element, text, speed = 50) {
    element.textContent = '';
    element.classList.remove('hidden');
    element.classList.add('typing');
    
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing');
        }
    }
    type();
}

// Message Button Handler
const messageBtn = document.getElementById('message-btn');
const messageText = document.getElementById('message-text');

const romanticMessage = "Năm cũ đã qua, năm mới đang đến. Anh chỉ muốn nói với em rằng, em là điều tuyệt vời nhất trong cuộc đời anh. Mỗi khoảnh khắc bên em đều là một món quà quý giá. Năm 2026 này, anh mong được cùng em viết nên những câu chuyện đẹp hơn, tạo thêm nhiều kỷ niệm ngọt ngào, và yêu em nhiều hơn nữa. Em là tất cả những gì anh cần. Yêu em! ❤️";

messageBtn.addEventListener('click', () => {
    messageBtn.style.display = 'none';
    typewriter(messageText, romanticMessage, 30);
});

// Memory Cards Animation (IntersectionObserver)
const memoryCards = document.querySelectorAll('.memory-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

memoryCards.forEach(card => {
    cardObserver.observe(card);
});

// Old Fireworks Effect - Removed (now using cinematic surprise)
// The old fireworks-canvas element was replaced with surprise-fireworks-canvas
// This code is kept for reference but commented out to prevent errors

/*
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;
*/

class Firework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.distance = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2));
        this.traveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = Math.random() * 50 + 50;
        this.targetRadius = 1;
    }

    update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        
        if (this.targetRadius < 8) {
            this.targetRadius += 0.3;
        } else {
            this.targetRadius = 1;
        }
        
        this.speed *= this.acceleration;
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        const startX = this.coordinates[this.coordinates.length - 1][0];
        const startY = this.coordinates[this.coordinates.length - 1][1];
        this.traveled = Math.sqrt(Math.pow(this.x - startX, 2) + Math.pow(this.y - startY, 2));
        
        if (this.traveled >= this.distance - 5) {
            createFireworkParticles(this.targetX, this.targetY);
            fireworks.splice(index, 1);
        } else {
            this.x += vx;
            this.y += vy;
        }
    }

    draw() {
        fwCtx.beginPath();
        fwCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        fwCtx.lineTo(this.x, this.y);
        fwCtx.strokeStyle = `hsl(${Math.random() * 60 + 280}, 100%, ${this.brightness}%)`;
        fwCtx.stroke();
        
        fwCtx.beginPath();
        fwCtx.arc(this.targetX, this.targetY, this.targetRadius, 0, Math.PI * 2);
        fwCtx.stroke();
    }
}

class FireworkParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 10 + 2;
        this.friction = 0.95;
        this.gravity = 1;
        this.hue = Math.random() * 60 + 280;
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.005;
    }

    update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
        
        if (this.alpha <= this.decay) {
            fireworkParticles.splice(index, 1);
        }
    }

    draw() {
        fwCtx.beginPath();
        fwCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        fwCtx.lineTo(this.x, this.y);
        fwCtx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        fwCtx.stroke();
    }
}

let fireworks = [];
let fireworkParticles = [];
let animationId;

function createFireworkParticles(x, y) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        fireworkParticles.push(new FireworkParticle(x, y));
    }
}

function animateFireworks() {
    requestAnimationFrame(animateFireworks);
    fwCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    fwCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    fireworks.forEach((firework, index) => {
        firework.draw();
        firework.update(index);
    });
    
    fireworkParticles.forEach((particle, index) => {
        particle.draw();
        particle.update(index);
    });
}

// ===========================================
// CINEMATIC SURPRISE CONTROLLER
// Multi-stage emotional experience
// ===========================================

class SurpriseController {
    constructor() {
        this.surpriseBtn = document.getElementById('surprise-btn');
        this.cinematic = document.getElementById('surprise-cinematic');
        this.stage1 = document.getElementById('surprise-stage1');
        this.stage2 = document.getElementById('surprise-stage2');
        this.stage3 = document.getElementById('surprise-stage3');
        this.stage4 = document.getElementById('surprise-stage4');
        
        // Stage 1 elements
        this.overlayDark = document.querySelector('.surprise-overlay-dark');
        this.stage1Text = document.querySelector('.surprise-stage1-text');
        
        // Stage 2 elements
        this.zoomContainer = document.querySelector('.surprise-zoom-container');
        this.glowHeart = document.querySelector('.surprise-glow-heart');
        this.stage2Text = document.getElementById('surprise-stage2-text');
        this.particlesCanvas = document.getElementById('surprise-particles-canvas');
        this.particlesCtx = null;
        
        // Stage 3 elements
        this.fireworksCanvas = document.getElementById('surprise-fireworks-canvas');
        this.fireworksCtx = null;
        this.goldenBurst = document.querySelector('.surprise-golden-burst');
        this.heartsContainer = document.getElementById('surprise-hearts-container');
        this.sparklesContainer = document.getElementById('surprise-sparkles-container');
        
        // Stage 4 elements
        this.finalFireworks = document.getElementById('surprise-final-fireworks');
        this.finalFireworksCtx = null;
        
        // Animation state
        this.currentStage = 0;
        this.particles = [];
        this.fireworks = [];
        this.fireworkParticles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        if (this.particlesCanvas) {
            this.particlesCtx = this.particlesCanvas.getContext('2d');
            this.resizeCanvas(this.particlesCanvas, this.particlesCtx);
        }
        if (this.fireworksCanvas) {
            this.fireworksCtx = this.fireworksCanvas.getContext('2d');
            this.resizeCanvas(this.fireworksCanvas, this.fireworksCtx);
        }
        if (this.finalFireworks) {
            this.finalFireworksCtx = this.finalFireworks.getContext('2d');
            this.resizeCanvas(this.finalFireworks, this.finalFireworksCtx);
        }
        
        window.addEventListener('resize', () => this.handleResize());
        
        if (this.surpriseBtn) {
            this.surpriseBtn.addEventListener('click', () => this.start());
        }
    }
    
    resizeCanvas(canvas, ctx) {
        if (!canvas || !ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    handleResize() {
        this.resizeCanvas(this.particlesCanvas, this.particlesCtx);
        this.resizeCanvas(this.fireworksCanvas, this.fireworksCtx);
        this.resizeCanvas(this.finalFireworks, this.finalFireworksCtx);
    }
    
    start() {
        if (this.surpriseBtn) this.surpriseBtn.style.display = 'none';
        if (this.cinematic) this.cinematic.classList.remove('hidden');
        
        // Stage 1: Tension Build (2.5s)
        this.stage1Sequence();
    }
    
    // ========== STAGE 1: TENSION BUILD ==========
    stage1Sequence() {
        this.currentStage = 1;
        if (this.stage1) this.stage1.classList.remove('hidden');
        
        // Darken overlay
        setTimeout(() => {
            if (this.overlayDark) this.overlayDark.classList.add('active');
        }, 100);
        
        // Show text
        setTimeout(() => {
            if (this.stage1Text) {
                this.stage1Text.classList.add('visible');
            }
        }, 800);
        
        // Transition to Stage 2
        setTimeout(() => {
            this.stage2Sequence();
        }, 2500);
    }
    
    // ========== STAGE 2: EMOTIONAL REVEAL ==========
    stage2Sequence() {
        this.currentStage = 2;
        if (this.stage1) this.stage1.classList.add('hidden');
        if (this.stage2) this.stage2.classList.remove('hidden');
        
        // Start slow particles
        this.initSlowParticles();
        
        // Zoom effect
        setTimeout(() => {
            if (this.zoomContainer) this.zoomContainer.classList.add('zoomed');
        }, 500);
        
        // Typewriter text
        const message = "Cảm ơn em vì đã ở bên anh suốt một năm qua…";
        this.typewriterEffect(this.stage2Text, message, 50, () => {
            if (this.stage2Text) this.stage2Text.classList.add('typing');
        });
        
        // Transition to Stage 3
        setTimeout(() => {
            this.stage3Sequence();
        }, 6000);
    }
    
    // ========== STAGE 3: EXPLOSION MOMENT ==========
    stage3Sequence() {
        this.currentStage = 3;
        if (this.stage2) this.stage2.classList.add('hidden');
        if (this.stage3) this.stage3.classList.remove('hidden');
        
        // Screen shake
        if (this.cinematic) {
            this.cinematic.classList.add('shake');
            setTimeout(() => {
                this.cinematic.classList.remove('shake');
            }, 500);
        }
        
        // Golden burst
        setTimeout(() => {
            if (this.goldenBurst) this.goldenBurst.classList.add('explode');
        }, 100);
        
        // Massive fireworks
        this.createMassiveFireworks();
        
        // Hearts explosion
        this.createHeartsExplosion();
        
        // Sparkles
        this.createSparkles();
        
        // Transition to Stage 4
        setTimeout(() => {
            this.stage4Sequence();
        }, 4000);
    }
    
    // ========== STAGE 4: FINAL PROMISE ==========
    stage4Sequence() {
        this.currentStage = 4;
        if (this.stage3) this.stage3.classList.add('hidden');
        if (this.stage4) this.stage4.classList.remove('hidden');
        
        // Slower fireworks
        this.createFinalFireworks();
        
        // Message already animated via CSS
    }
    
    // ========== HELPER FUNCTIONS ==========
    
    typewriterEffect(element, text, speed, callback) {
        if (!element) return;
        element.textContent = '';
        element.classList.remove('hidden');
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        };
        type();
    }
    
    initSlowParticles() {
        if (!this.particlesCtx || !this.particlesCanvas) return;
        
        this.particles = [];
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.particlesCanvas.width,
                y: Math.random() * this.particlesCanvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
        
        this.animateSlowParticles();
    }
    
    animateSlowParticles() {
        if (this.currentStage !== 2 || !this.particlesCtx || !this.particlesCanvas) return;
        
        this.particlesCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.particlesCtx.fillRect(0, 0, this.particlesCanvas.width, this.particlesCanvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0) particle.x = this.particlesCanvas.width;
            if (particle.x > this.particlesCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.particlesCanvas.height;
            if (particle.y > this.particlesCanvas.height) particle.y = 0;
            
            this.particlesCtx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
            this.particlesCtx.beginPath();
            this.particlesCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.particlesCtx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animateSlowParticles());
    }
    
    createMassiveFireworks() {
        if (!this.fireworksCtx || !this.fireworksCanvas) return;
        
        const fireworkCount = 25;
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                const startX = Math.random() * this.fireworksCanvas.width;
                const startY = this.fireworksCanvas.height;
                const targetX = Math.random() * this.fireworksCanvas.width;
                const targetY = Math.random() * (this.fireworksCanvas.height * 0.6) + 100;
                this.fireworks.push(new CinematicFirework(startX, startY, targetX, targetY));
            }, i * 150);
        }
        
        this.animateMassiveFireworks();
    }
    
    animateMassiveFireworks() {
        if (this.currentStage !== 3 || !this.fireworksCtx || !this.fireworksCanvas) return;
        
        this.fireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.fireworksCtx.fillRect(0, 0, this.fireworksCanvas.width, this.fireworksCanvas.height);
        
        this.fireworks.forEach((fw, i) => {
            fw.update(i, this);
            fw.draw(this.fireworksCtx);
        });
        
        this.fireworkParticles.forEach((p, i) => {
            p.update(i, this);
            p.draw(this.fireworksCtx);
        });
        
        requestAnimationFrame(() => this.animateMassiveFireworks());
    }
    
    createHeartsExplosion() {
        const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
        const count = 150;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'surprise-heart-particle';
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '50%';
                heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
                heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
                heart.style.animationDelay = (Math.random() * 0.5) + 's';
                
                if (this.heartsContainer) {
                    this.heartsContainer.appendChild(heart);
                }
                
                setTimeout(() => heart.remove(), 5000);
            }, i * 20);
        }
    }
    
    createSparkles() {
        const count = 200;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'surprise-sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = '50%';
                sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
                sparkle.style.animationDelay = (Math.random() * 0.3) + 's';
                
                if (this.sparklesContainer) {
                    this.sparklesContainer.appendChild(sparkle);
                }
                
                setTimeout(() => sparkle.remove(), 5000);
            }, i * 15);
        }
    }
    
    createFinalFireworks() {
        if (!this.finalFireworksCtx || !this.finalFireworks) return;
        
        const finalFireworks = [];
        const finalParticles = [];
        
        const animate = () => {
            this.finalFireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.finalFireworksCtx.fillRect(0, 0, this.finalFireworks.width, this.finalFireworks.height);
            
            if (Math.random() < 0.1 && finalFireworks.length < 5) {
                const startX = Math.random() * this.finalFireworks.width;
                const startY = this.finalFireworks.height;
                const targetX = Math.random() * this.finalFireworks.width;
                const targetY = Math.random() * (this.finalFireworks.height * 0.5) + 100;
                finalFireworks.push(new CinematicFirework(startX, startY, targetX, targetY));
            }
            
            finalFireworks.forEach((fw, i) => {
                fw.update(i, { fireworkParticles: finalParticles });
                fw.draw(this.finalFireworksCtx);
            });
            
            finalParticles.forEach((p, i) => {
                p.update(i, { fireworkParticles: finalParticles });
                p.draw(this.finalFireworksCtx);
            });
            
            if (this.currentStage === 4) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

// Cinematic Firework Class
class CinematicFirework {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.distance = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2));
        this.traveled = 0;
        this.coordinates = [];
        for (let i = 0; i < 3; i++) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.speed = 3;
        this.acceleration = 1.06;
        this.hue = Math.random() * 60 + 280;
        this.brightness = Math.random() * 50 + 50;
    }
    
    update(index, controller) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.acceleration;
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        const startX = this.coordinates[this.coordinates.length - 1][0];
        const startY = this.coordinates[this.coordinates.length - 1][1];
        this.traveled = Math.sqrt(Math.pow(this.x - startX, 2) + Math.pow(this.y - startY, 2));
        
        if (this.traveled >= this.distance - 5) {
            this.createParticles(controller);
            controller.fireworks.splice(index, 1);
        } else {
            this.x += vx;
            this.y += vy;
        }
    }
    
    createParticles(controller) {
        const count = 40;
        for (let i = 0; i < count; i++) {
            controller.fireworkParticles.push(new CinematicParticle(this.targetX, this.targetY, this.hue));
        }
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

class CinematicParticle {
    constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        for (let i = 0; i < 5; i++) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 12 + 3;
        this.friction = 0.96;
        this.gravity = 1.2;
        this.hue = hue + Math.random() * 20 - 10;
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update(index, controller) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
        
        if (this.alpha <= this.decay) {
            controller.fireworkParticles.splice(index, 1);
        }
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Initialize Surprise Controller
let surpriseController;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        surpriseController = new SurpriseController();
    });
} else {
    surpriseController = new SurpriseController();
}

// Final Countdown and Message
let countdownShown = false;

function showCountdown() {
    if (countdownShown) return;
    countdownShown = true;
    
    const countdown = document.getElementById('countdown');
    const finalMessage = document.getElementById('final-message');
    const countdownNumbers = countdown.querySelectorAll('.countdown-number');
    
    countdown.classList.remove('hidden');
    
    let currentNumber = 0;
    function showNumber() {
        if (currentNumber < countdownNumbers.length) {
            countdownNumbers.forEach((num, index) => {
                num.style.display = index === currentNumber ? 'block' : 'none';
            });
            currentNumber++;
            setTimeout(showNumber, 1000);
        } else {
            countdown.classList.add('hidden');
            setTimeout(() => {
                finalMessage.classList.remove('hidden');
                createFinalHearts();
            }, 500);
        }
    }
    showNumber();
}

// Scroll to final section trigger
const finalSection = document.getElementById('final-section');
const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countdownShown) {
            showCountdown();
        }
    });
}, { threshold: 0.3 });

finalObserver.observe(finalSection);

// Final Hearts
function createFinalHearts() {
    const finalHeartsContainer = document.getElementById('final-hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'final-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        finalHeartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    setInterval(createHeart, 500);
    
    // Create initial batch
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Window resize handlers
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // SurpriseController handles its own canvas resizing
});

// Gallery Configuration
// File gallery-list.js sẽ được tự động tạo bởi generate-gallery.ps1 hoặc generate-gallery.js
// galleryItems được định nghĩa trong gallery-list.js (load trước script.js) như window.galleryItems
// Nếu gallery-list.js không tồn tại, tạo mảng rỗng
if (typeof window.galleryItems === 'undefined') {
    window.galleryItems = [];
}

// Sử dụng biến galleryItems từ window
const galleryItems = window.galleryItems;

// Gallery Functionality
const galleryGrid = document.getElementById('gallery-grid');
const galleryPlaceholder = document.getElementById('gallery-placeholder');

function createGalleryItem(src, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', index);
    
    const isVideo = /\.(mp4|webm|ogg)$/i.test(src);
    item.setAttribute('data-type', isVideo ? 'video' : 'image');
    
    if (isVideo) {
        const video = document.createElement('video');
        video.src = src;
        video.muted = true;
        video.loop = true;
        video.addEventListener('mouseenter', () => video.play());
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
        item.appendChild(video);
        
        const playIcon = document.createElement('div');
        playIcon.className = 'gallery-item-play';
        playIcon.innerHTML = '▶';
        item.appendChild(playIcon);
    } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Kỷ niệm ${index + 1}`;
        img.loading = 'lazy';
        item.appendChild(img);
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-item-overlay';
    item.appendChild(overlay);
    
    item.addEventListener('click', () => openLightbox(index));
    
    return item;
}

function loadGallery() {
    // Hide placeholder initially if there are items
    if (galleryItems.length === 0) {
        if (galleryPlaceholder) {
            galleryPlaceholder.classList.remove('hidden');
        }
        if (galleryGrid) {
            galleryGrid.style.display = 'none';
        }
        return;
    }
    
    if (galleryPlaceholder) {
        galleryPlaceholder.classList.add('hidden');
    }
    if (galleryGrid) {
        galleryGrid.style.display = 'grid';
    }
    
    galleryItems.forEach((src, index) => {
        const item = createGalleryItem(src, index);
        galleryGrid.appendChild(item);
    });
    
    // Animate gallery items on scroll
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.getAttribute('data-index'));
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        galleryObserver.observe(item);
    });
}

// Lightbox Functionality
let lightbox, lightboxImage, lightboxVideo, lightboxClose, lightboxPrev, lightboxNext;

function initLightboxElements() {
    lightbox = document.getElementById('lightbox');
    lightboxImage = document.getElementById('lightbox-image');
    lightboxVideo = document.getElementById('lightbox-video');
    lightboxClose = document.getElementById('lightbox-close');
    lightboxPrev = document.getElementById('lightbox-prev');
    lightboxNext = document.getElementById('lightbox-next');
    
    // Setup event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

let currentLightboxIndex = 0;

function openLightbox(index) {
    if (!lightbox || !lightboxImage || !lightboxVideo) {
        console.error('Lightbox elements not found');
        return;
    }
    
    currentLightboxIndex = index;
    const src = galleryItems[index];
    const isVideo = /\.(mp4|webm|ogg|mov|avi)$/i.test(src);
    
    if (isVideo) {
        lightboxImage.classList.add('hidden');
        lightboxVideo.classList.remove('hidden');
        const source = lightboxVideo.querySelector('source');
        if (source) {
            source.src = src;
            source.type = src.endsWith('.mp4') ? 'video/mp4' : 
                         src.endsWith('.webm') ? 'video/webm' : 'video/ogg';
        } else {
            lightboxVideo.src = src;
        }
        lightboxVideo.load();
        lightboxVideo.play().catch(e => console.log('Video play error:', e));
    } else {
        lightboxVideo.classList.add('hidden');
        lightboxVideo.pause();
        const source = lightboxVideo.querySelector('source');
        if (source) source.src = '';
        lightboxImage.classList.remove('hidden');
        lightboxImage.src = src;
    }
    
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateLightboxButtons();
}

function closeLightbox() {
    if (!lightbox || !lightboxVideo) return;
    
    lightbox.classList.add('hidden');
    lightboxVideo.pause();
    const source = lightboxVideo.querySelector('source');
    if (source) {
        source.src = '';
    }
    lightboxVideo.src = '';
    document.body.style.overflow = '';
}

function showNext() {
    if (currentLightboxIndex < galleryItems.length - 1) {
        currentLightboxIndex++;
        openLightbox(currentLightboxIndex);
    }
}

function showPrev() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        openLightbox(currentLightboxIndex);
    }
}

function updateLightboxButtons() {
    if (!lightboxPrev || !lightboxNext) return;
    lightboxPrev.style.display = currentLightboxIndex === 0 ? 'none' : 'flex';
    lightboxNext.style.display = currentLightboxIndex === galleryItems.length - 1 ? 'none' : 'flex';
}

// Initialize lightbox on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightboxElements);
} else {
    initLightboxElements();
}

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    }
});

// Initialize gallery on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGallery);
} else {
    loadGallery();
}

// Smooth scroll behavior
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

