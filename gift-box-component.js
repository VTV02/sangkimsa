// ============================================
// GIFT BOX COMPONENT - JavaScript
// Reusable animated gift box controller
// ============================================

class GiftBox {
    constructor(containerElement, config = {}) {
        this.container = containerElement;
        this.config = {
            type: config.type || 'message', // 'message' | 'image' | 'qr'
            content: config.content || '',
            imageSrc: config.imageSrc || '',
            qrSrc: config.qrSrc || '',
            qrText: config.qrText || 'Quét mã này để lì xì cho bé nha ❤️',
            onOpened: config.onOpened || null,
            ...config
        };
        
        this.isOpened = false;
        this.isOpening = false;
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Create structure if not exists
        if (!this.container.querySelector('.gift-box-wrapper')) {
            this.createStructure();
        }
        
        // Setup event listeners
        this.setupEvents();
        
        // Setup content
        this.setupContent();
    }
    
    createStructure() {
        const wrapper = document.createElement('div');
        wrapper.className = 'gift-box-wrapper';
        
        const glow = document.createElement('div');
        glow.className = 'gift-box-glow';
        
        const lightBurst = document.createElement('div');
        lightBurst.className = 'gift-box-light-burst';
        
        const shadow = document.createElement('div');
        shadow.className = 'gift-box-shadow';
        
        const bottom = document.createElement('div');
        bottom.className = 'gift-box-bottom';
        
        const lid = document.createElement('div');
        lid.className = 'gift-box-lid';
        
        const ribbonH = document.createElement('div');
        ribbonH.className = 'gift-box-ribbon-h';
        
        const ribbonV = document.createElement('div');
        ribbonV.className = 'gift-box-ribbon-v';
        
        const bow = document.createElement('div');
        bow.className = 'gift-box-bow';
        bow.innerHTML = `
            <div class="bow-loop bow-loop-left"></div>
            <div class="bow-center"></div>
            <div class="bow-loop bow-loop-right"></div>
        `;
        
        const particles = document.createElement('div');
        particles.className = 'gift-box-particles';
        
        const content = document.createElement('div');
        content.className = 'gift-box-content';
        
        lid.appendChild(ribbonH);
        lid.appendChild(ribbonV);
        lid.appendChild(bow);
        
        wrapper.appendChild(glow);
        wrapper.appendChild(lightBurst);
        wrapper.appendChild(shadow);
        wrapper.appendChild(bottom);
        wrapper.appendChild(lid);
        wrapper.appendChild(particles);
        wrapper.appendChild(content);
        
        this.container.appendChild(wrapper);
        
        this.contentElement = content;
        this.particlesElement = particles;
        this.lightBurstElement = lightBurst;
    }
    
    setupContent() {
        if (!this.contentElement) return;
        
        switch (this.config.type) {
            case 'message':
                this.contentElement.classList.add('message');
                this.contentElement.innerHTML = `<div>${this.config.content}</div>`;
                break;
                
            case 'image':
                this.contentElement.classList.add('image');
                const img = document.createElement('img');
                img.src = this.config.imageSrc;
                img.alt = 'Gift content';
                this.contentElement.appendChild(img);
                break;
                
            case 'qr':
                this.contentElement.classList.add('qr');
                this.contentElement.innerHTML = `
                    <div class="gift-box-qr-code">
                        <img src="${this.config.qrSrc}" alt="QR Code">
                    </div>
                    <div class="gift-box-qr-text">${this.config.qrText}</div>
                `;
                break;
        }
    }
    
    setupEvents() {
        if (this.isOpened) return;
        
        // Bind handlers if not already bound
        if (!this.handleTouchStart) {
            this.handleTouchStart = (e) => {
                if (this.isOpened || this.isOpening) return;
                e.preventDefault();
                e.stopPropagation();
                this.handleTap();
            };
        }
        
        if (!this.handleClick) {
            this.handleClick = (e) => {
                if (this.isOpened || this.isOpening) return;
                e.preventDefault();
                e.stopPropagation();
                this.handleTap();
            };
        }
        
        // Touch events
        this.container.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        
        // Click events
        this.container.addEventListener('click', this.handleClick);
        
        // Prevent double-tap zoom
        if (!this.lastTouchEnd) {
            this.lastTouchEnd = 0;
            this.handleTouchEnd = (e) => {
                const now = Date.now();
                if (now - this.lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                this.lastTouchEnd = now;
            };
            this.container.addEventListener('touchend', this.handleTouchEnd, false);
        }
    }
    
    handleTap() {
        if (this.isOpened || this.isOpening) return;
        
        // Tap feedback
        this.container.classList.add('tapping');
        setTimeout(() => {
            this.container.classList.remove('tapping');
        }, 300);
        
        // Open box
        setTimeout(() => {
            this.open();
        }, 200);
    }
    
    open() {
        if (this.isOpened || this.isOpening) return;
        
        this.isOpening = true;
        this.container.classList.add('opening');
        
        // Create particles
        this.createParticles();
        
        // After animation completes
        setTimeout(() => {
            this.isOpening = false;
            this.isOpened = true;
            this.container.classList.remove('opening');
            this.container.classList.add('opened');
            
            // Callback
            if (this.config.onOpened && typeof this.config.onOpened === 'function') {
                this.config.onOpened(this.config.type);
            }
        }, 1000);
    }
    
    createParticles() {
        if (!this.particlesElement) return;
        
        const symbols = ['❤️', '💕', '✨', '💖', '💫', '🌟'];
        const count = 15;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'gift-box-particle';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            const angle = (Math.PI * 2 * i) / count;
            const distance = 100 + Math.random() * 60;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.animationDelay = (Math.random() * 0.4) + 's';
            
            this.particlesElement.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
        
        // Create landing particles when text lands
        setTimeout(() => {
            this.createLandingParticles();
        }, 1600);
    }
    
    createLandingParticles() {
        if (!this.particlesElement || !this.contentElement) return;
        
        const hearts = ['❤️', '💕', '💖'];
        const count = 8;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'gift-box-particle gift-landing-particle';
            particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            const angle = (Math.PI * 2 * i) / count;
            const distance = 60 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 80;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.left = '50%';
            particle.style.top = '163%';
            particle.style.animationDelay = (i * 0.05) + 's';
            particle.style.animationDuration = '1.5s';
            
            this.particlesElement.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
    
    // Public method to programmatically open
    openBox() {
        this.open();
    }
    
    // Reset box (for testing/reuse)
    reset() {
        this.isOpened = false;
        this.isOpening = false;
        this.container.classList.remove('opened', 'opening');
        this.setupEvents();
    }
}

// Factory function for easy creation
function createGiftBox(containerSelector, config) {
    const container = typeof containerSelector === 'string' 
        ? document.querySelector(containerSelector)
        : containerSelector;
    
    if (!container) {
        console.error('GiftBox container not found');
        return null;
    }
    
    return new GiftBox(container, config);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GiftBox, createGiftBox };
}

