// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // ===== 數字計數動畫 =====
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // 使用 Intersection Observer 觸發計數
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ===== 浮動粒子背景 =====
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = posX + '%';
            particle.style.top = posY + '%';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            particle.style.opacity = Math.random() * 0.3 + 0.2;
            
            container.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ===== 標籤懸停效果增強 =====
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== 圖片放大功能 =====
    const images = document.querySelectorAll('.project img, .portfolio-item img');
    
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.setAttribute('role', 'button');
    overlay.setAttribute('aria-label', '點擊關閉放大圖片');
    document.body.appendChild(overlay);

    function toggleImageExpansion(img) {
        const isExpanded = img.classList.toggle('is-expanded');
        
        if (isExpanded) {
            overlay.style.display = 'block';
            overlay.currentImage = img;
            document.body.style.overflow = 'hidden';
            img.setAttribute('aria-expanded', 'true');
        } else {
            overlay.style.display = 'none';
            overlay.currentImage = null;
            document.body.style.overflow = '';
            img.setAttribute('aria-expanded', 'false');
        }
    }

    images.forEach(img => {
        img.setAttribute('tabindex', '0');
        img.setAttribute('aria-expanded', 'false');
        img.setAttribute('role', 'button');
        
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleImageExpansion(img);
        });

        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleImageExpansion(img);
            }
        });
    });

    overlay.addEventListener('click', () => {
        if (overlay.currentImage) {
            toggleImageExpansion(overlay.currentImage);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.currentImage) {
            toggleImageExpansion(overlay.currentImage);
        }
    });

    // ===== 平滑捲動 =====
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
    
    // ===== 導覽列滾動效果 =====
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    console.log('✅ 個人網站載入完成 - 所有互動效果已啟用');
});