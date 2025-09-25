/* =============================================
   INICIALIZAÇÃO DAS PARTÍCULAS NO BACKGROUND
   ============================================= */

/**
 * Configura e inicializa o efeito de partículas no header
 * usando a biblioteca particles.js
 */
particlesJS("particles-js", {
    "particles": {
        "number": { 
            "value": 80, 
            "density": { 
                "enable": true, 
                "value_area": 800 
            } 
        },
        "color": { 
            "value": "#4cc9f0" 
        },
        "shape": { 
            "type": "circle" 
        },
        "opacity": { 
            "value": 0.5, 
            "random": true 
        },
        "size": { 
            "value": 3, 
            "random": true 
        },
        "line_linked": { 
            "enable": true, 
            "distance": 150, 
            "color": "#4cc9f0", 
            "opacity": 0.4, 
            "width": 1 
        },
        "move": { 
            "enable": true, 
            "speed": 3, 
            "direction": "none", 
            "random": true, 
            "straight": false, 
            "out_mode": "out" 
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { 
                "enable": true, 
                "mode": "repulse" 
            },
            "onclick": { 
                "enable": true, 
                "mode": "push" 
            }
        }
    }
});

/* =============================================
   EFEITO DE DIGITAÇÃO NO TAGLINE
   ============================================= */

/**
 * Simula o efeito de digitação no slogan do header
 */
const initTypingEffect = () => {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        // Inicia o efeito após 1.5 segundos
        setTimeout(typeWriter, 1500);
    }
};

/* =============================================
   SCROLL SUAVE PARA LINKS INTERNOS
   ============================================= */

/**
 * Configura scroll suave para todos os links internos (#)
 */
const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove todas as classes 'active'
            document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));

            // Adiciona a classe apenas no link clicado
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
};

/* =============================================
   DESTAQUE DO MENU ATIVO CONFORME SCROLL
   ============================================= */

/**
 * Atualiza o item ativo do menu conforme a seção visível
 */
const setupActiveMenu = () => {
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        let minDistance = window.innerHeight;

        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < minDistance) {
                minDistance = rect.top;
                currentSectionId = section.getAttribute('id');
            }
        });

        // Remove todas as classes antes de adicionar uma nova
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
};


/* =============================================
   INICIALIZAÇÃO GERAL
   ============================================= */

/**
 * Função principal que inicializa todos os componentes
 */
const init = () => {
    initTypingEffect();
    setupSmoothScroll();
    setupActiveMenu();
    
    // Dispara o evento scroll ao carregar para destacar a seção inicial
    window.addEventListener('load', () => {
        window.dispatchEvent(new Event('scroll'));
    });
};

// Inicia tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);

