// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('form-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (nombre && telefono && email && mensaje) {
                // Simulación de envío
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos del formulario.');
            }
        });
    }
    
    // Carrusel de imágenes
    function initializeCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        let currentSlide = 0;
        let autoSlideInterval;
        let isAutoPlaying = true;
        
        // Función para mostrar slide específico
        function showSlide(n) {
            // Ocultar todos los slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remover clase active de todos los dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Ajustar índice si es necesario
            if (n >= slides.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = n;
            }
            
            // Mostrar slide actual
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Función para siguiente slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Función para slide anterior
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Iniciar auto slide
        function startAutoSlide() {
            if (isAutoPlaying) {
                autoSlideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
            }
        }
        
        // Detener auto slide
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Event listeners para botones
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }
        
        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        // Pausar auto slide al hacer hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', function() {
                isAutoPlaying = false;
                stopAutoSlide();
            });
            
            carouselContainer.addEventListener('mouseleave', function() {
                isAutoPlaying = true;
                startAutoSlide();
            });
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            }
        });
        
        // Iniciar carrusel
        showSlide(currentSlide);
        startAutoSlide();
        
        // Retornar funciones para uso externo si es necesario
        return {
            nextSlide,
            prevSlide,
            showSlide,
            stopAutoSlide,
            startAutoSlide
        };
    }
    
    // Inicializar carrusel
    const carousel = initializeCarousel();
    
    // Chatbot
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    // Abrir/cerrar chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
            // Pausar carrusel cuando el chatbot está abierto
            if (chatbotContainer.classList.contains('active')) {
                carousel.stopAutoSlide();
            } else {
                carousel.startAutoSlide();
            }
        });
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
            carousel.startAutoSlide();
        });
    }
    
    // Enviar mensaje al chatbot
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Agregar mensaje del usuario
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simular respuesta del bot después de un breve retraso
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        
        messageDiv.appendChild(messageP);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll al final
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Respuestas predefinidas
        if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas tardes') || lowerMessage.includes('buenas')) {
            return '¡Hola! Soy tu asistente virtual de Alto Plagas Chile. ¿En qué puedo ayudarte? Puedo informarte sobre nuestros servicios, precios, horarios de atención y más.';
        }
        
        if (lowerMessage.includes('precio') || lowerMessage.includes('cuesta') || lowerMessage.includes('costo') || lowerMessage.includes('valor')) {
            return 'Los precios varían según el tipo de servicio, la extensión del área a tratar y la gravedad de la plaga. Ofrecemos evaluación gratuita y presupuesto personalizado sin compromiso. ¿Qué tipo de plaga necesitas controlar?';
        }
        
        if (lowerMessage.includes('servicio') || lowerMessage.includes('tratamiento') || lowerMessage.includes('fumigación') || lowerMessage.includes('control')) {
            return 'Ofrecemos servicios especializados en:\n\n• Control de roedores (ratas, ratones)\n• Control de insectos (cucarachas, hormigas, arañas)\n• Fumigación residencial y comercial\n• Desinsectación profesional\n• Servicios de emergencia 24/7\n\n¿Qué tipo de plaga te preocupa?';
        }
        
        if (lowerMessage.includes('roedor') || lowerMessage.includes('rata') || lowerMessage.includes('ratón') || lowerMessage.includes('ratones')) {
            return 'Para el control de roedores utilizamos métodos seguros y efectivos. El tratamiento incluye:\n\n• Inspección detallada\n• Identificación de puntos de acceso\n• Colocación estratégica de cebos\n• Sellado de posibles entradas\n• Seguimiento y garantía\n\nTodos nuestros productos son seguros para mascotas cuando se aplican correctamente.';
        }
        
        if (lowerMessage.includes('insecto') || lowerMessage.includes('cucaracha') || lowerMessage.includes('hormiga') || lowerMessage.includes('araña') || lowerMessage.includes('insectos')) {
            return 'Nuestros tratamientos para insectos son específicos para cada tipo de plaga:\n\n• Cucarachas: Gel y aerosol profesional\n• Hormigas: Cebos y barreras perimetrales\n• Arañas: Tratamiento focalizado\n• Otros insectos: Productos especializados\n\nTodos nuestros productos son de baja toxicidad y seguros cuando se aplican correctamente.';
        }
        
        if (lowerMessage.includes('garantía') || lowerMessage.includes('seguro') || lowerMessage.includes('funciona') || lowerMessage.includes('efectivo')) {
            return '✅ Todos nuestros servicios incluyen garantía. Si el problema persiste después del tratamiento, realizamos revisión y retratamiento sin costo adicional.\n\nNuestros métodos tienen un 98% de efectividad comprobada y utilizamos productos de última generación.';
        }
        
        if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('email') || lowerMessage.includes('llamar') || lowerMessage.includes('whatsapp')) {
            return '📞 **Teléfono:** +56 9 1234 5678\n📧 **Email:** info@altoplagaschile.cl\n📍 **Horario:** Lunes a Viernes: 8:00 - 20:00 hrs | Sábados: 9:00 - 14:00 hrs\n🚨 **Emergencias:** Atención 24/7\n\n¿Te gustaría que te contactemos?';
        }
        
        if (lowerMessage.includes('urgente') || lowerMessage.includes('emergencia') || lowerMessage.includes('ahora') || lowerMessage.includes('inmediat')) {
            return '🚨 **Para situaciones urgentes**, contamos con servicio de emergencia las 24 horas. Llámanos al +56 9 1234 5678 y te atenderemos de inmediato.\n\nNuestro equipo está listo para ayudarte en cualquier momento.';
        }
        
        if (lowerMessage.includes('gracias') || lowerMessage.includes('thank') || lowerMessage.includes('bye') || lowerMessage.includes('chao') || lowerMessage.includes('adiós')) {
            return '¡De nada! Estamos aquí para ayudarte. No dudes en contactarnos si necesitas más información. ¡Que tengas un excelente día! 🌟';
        }
        
        if (lowerMessage.includes('horario') || lowerMessage.includes('cuándo') || lowerMessage.includes('disponible') || lowerMessage.includes('tiempo')) {
            return '⏰ **Horario de atención:**\n• Lunes a Viernes: 8:00 - 20:00 hrs\n• Sábados: 9:00 - 14:00 hrs\n• Domingos: Solo emergencias\n\nPara servicios programados, podemos coordinar según tu disponibilidad.';
        }
        
        if (lowerMessage.includes('zona') || lowerMessage.includes('ubicación') || lowerMessage.includes('donde') || lowerMessage.includes('sector') || lowerMessage.includes('comuna')) {
            return '📍 Ofrecemos servicio a domicilio en **todo Chile**. Trabajamos en:\n\n• Región Metropolitana\n• Región de Valparaíso\n• Región del Biobío\n• Y todas las regiones del país\n\n¿En qué comuna o sector te encuentras?';
        }
        
        // Respuesta por defecto
        return '🤔 Entiendo que tienes una consulta. Para brindarte información más precisa y personalizada, te recomiendo contactar directamente a nuestro equipo especializado al +56 9 1234 5678.\n\n¿Hay algo específico sobre nuestros servicios que te gustaría conocer?';
    }
    
    // Efecto de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar a elementos que queremos animar
    const animatedElements = document.querySelectorAll('.servicio-card, .nosotros-content, .contacto-content');
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
    
    // Preload de imágenes del carrusel para mejor experiencia
    function preloadCarouselImages() {
        const imageUrls = [
            'img/control-de-plagas-1.jpg',
            'img/control-de-plagas-2.jpg',
            'img/control-de-plagas-3.jpg',
            'img/control-de-plagas-4.jpg',
            'img/control-de-plagas-5.jpg'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Preload de imágenes cuando la página esté cargada
    window.addEventListener('load', preloadCarouselImages);
});

// Función global para control manual del carrusel (opcional)
window.carruselControl = {
    siguiente: function() {
        const carrusel = document.querySelector('.carousel-container');
        if (carrusel) {
            const nextBtn = carrusel.querySelector('.carousel-next');
            if (nextBtn) nextBtn.click();
        }
    },
    anterior: function() {
        const carrusel = document.querySelector('.carousel-container');
        if (carrusel) {
            const prevBtn = carrusel.querySelector('.carousel-prev');
            if (prevBtn) prevBtn.click();
        }
    },
    irASlide: function(numeroSlide) {
        const dots = document.querySelectorAll('.dot');
        if (dots[numeroSlide]) {
            dots[numeroSlide].click();
        }
    }
};