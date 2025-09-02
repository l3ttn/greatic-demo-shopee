// GreaTIC Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Animate elements on scroll
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
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .use-case, .metric, .roadmap-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Counter animation for metrics
    const counters = document.querySelectorAll('.metric-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const hasPlus = target.includes('+');
        const isMsUnit = target.includes('ms');
        
        let numericTarget;
        if (isPercentage) {
            numericTarget = parseFloat(target.replace('%', ''));
        } else if (hasPlus) {
            numericTarget = parseInt(target.replace('+', ''));
        } else if (isMsUnit) {
            numericTarget = parseInt(target.replace('ms', ''));
        } else {
            numericTarget = parseFloat(target);
        }
        
        if (isNaN(numericTarget)) return;
        
        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            let displayValue;
            if (isPercentage) {
                displayValue = current.toFixed(1) + '%';
            } else if (hasPlus) {
                displayValue = Math.floor(current) + '+';
            } else if (isMsUnit) {
                displayValue = Math.floor(current) + 'ms';
            } else if (current >= 1) {
                displayValue = Math.floor(current).toString();
            } else {
                displayValue = current.toFixed(1);
            }
            
            element.textContent = displayValue;
        }, 40);
    }
    
    // Form handling
    const form = document.querySelector('.cta-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual endpoint)
            setTimeout(() => {
                // Show success message
                showNotification('✅ Solicitação enviada! Entraremos em contato em breve.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Track event (if you have analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'engagement',
                        'event_label': 'beta_access_request'
                    });
                }
            }, 2000);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#EE4D2D'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 600;
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Discord mockup interactive effects
    const mockupDiscord = document.querySelector('.mockup-discord');
    if (mockupDiscord) {
        mockupDiscord.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
        });
        
        mockupDiscord.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg) scale(1)';
        });
    }
    
    // Particle effect for hero section (optional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(238, 77, 45, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
        
        // Add CSS animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translateY(-10px) translateX(-5px);
                        opacity: 0.5;
                    }
                    75% {
                        transform: translateY(-30px) translateX(15px);
                        opacity: 0.8;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Copy to clipboard functionality
    const codeElements = document.querySelectorAll('code');
    codeElements.forEach(code => {
        code.style.cursor = 'pointer';
        code.title = 'Clique para copiar';
        
        code.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                showNotification('📋 Copiado para a área de transferência!', 'success');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = this.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('📋 Copiado para a área de transferência!', 'success');
            });
        });
    });
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalHTML = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalHTML.length) {
                if (originalHTML.charAt(i) === '<') {
                    // Skip HTML tags
                    const tagEnd = originalHTML.indexOf('>', i);
                    heroTitle.innerHTML += originalHTML.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    heroTitle.innerHTML += originalHTML.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    }
    
    // Status indicator simulation
    const statusIndicators = document.querySelectorAll('.status-online');
    statusIndicators.forEach(indicator => {
        // Add pulsing effect
        indicator.style.animation = 'pulse 2s ease-in-out infinite';
    });
    
    // Add pulse animation CSS
    if (!document.getElementById('status-styles')) {
        const style = document.createElement('style');
        style.id = 'status-styles';
        style.textContent = `
            @keyframes pulse {
                0% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.7;
                }
                100% {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Mock real-time updates for demo
    function simulateRealTimeUpdates() {
        const offerCard = document.querySelector('.offer-card');
        if (!offerCard) return;
        
        setInterval(() => {
            // Add subtle glow effect to show "live" updates
            offerCard.style.boxShadow = '0 0 20px rgba(238, 77, 45, 0.3)';
            setTimeout(() => {
                offerCard.style.boxShadow = '';
            }, 1000);
        }, 30000); // Every 30 seconds
    }
    
    simulateRealTimeUpdates();
    
    console.log('🤖 GreaTIC Landing Page loaded successfully!');
    console.log('📊 Sistema operacional e monitorando ofertas...');
});