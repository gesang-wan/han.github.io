// 滚动触发动画效果
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

// 监听滚动事件
window.addEventListener('scroll', animateOnScroll);

// 页面加载时执行一次，确保可见元素有动画效果
window.addEventListener('load', animateOnScroll);

// 平滑滚动到锚点
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新导航链接的激活状态
                updateActiveNavLink(targetId);
            }
        });
    });
}

// 更新导航链接的激活状态
function updateActiveNavLink(targetId) {
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.removeAttribute('aria-current');
        
        if (link.getAttribute('href') === targetId) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

// 监听滚动事件，更新导航链接的激活状态
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        
        if (link.getAttribute('href') === currentSection) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

// 表单验证
function validateForm() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单的表单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // 表单提交成功提示
            alert('留言发送成功！');
            form.reset();
        });
    }
}

// 导航栏滚动效果
function navScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (pageYOffset > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        });
    }
}

// 图片懒加载增强
function enhanceLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // 初始状态设置为半透明
        this.style.opacity = '0.5';
        this.style.transition = 'opacity 0.3s ease';
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    smoothScroll();
    validateForm();
    navScrollEffect();
    enhanceLazyLoading();
    updateNavOnScroll(); // 初始更新一次
    
    // 监听滚动事件，更新导航链接状态
    window.addEventListener('scroll', updateNavOnScroll);
});

// 阻止右键菜单（可选，保护内容）
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// 阻止文本选择（可选，保护内容）
// document.addEventListener('selectstart', function(e) {
//     e.preventDefault();
// });

// 添加页面加载动画
window.addEventListener('load', function() {
    // 页面加载完成后，移除加载动画
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});
