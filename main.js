document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando carrusel...');

    const config = {
        interval: 5000,
        currentIndex: 0
    };

    const slides = [
        {
            title: 'Somos DevCode',
            text: 'Desarrollamos el software que tu negocio necesita para crecer. Ideas hechas código, soluciones hechas realidad.',
            backgroundImage: './assets/img/hero1.jpg'
        },
        {
            title: 'Innovación y Tecnología', 
            text: 'Combinamos las últimas tecnologías con metodologías ágiles para ofrecer soluciones de vanguardia.',
            backgroundImage: './assets/img/hero2.jpg'
        },
        {
            title: 'Equipo Especializado',
            text: 'Nuestro equipo de desarrolladores está comprometido con la excelencia y la entrega de proyectos de calidad.',
            backgroundImage: './assets/img/hero3.jpg'
        }
    ];

    const heroSection = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-image .card-img-overlay');

    if (!heroSection) {
        console.error('ERROR: No se encontró .hero-image');
        return;
    }

    if (!heroContent) {
        console.error('ERROR: No se encontró .card-img-overlay');
        return;
    }

    console.log('Elementos del carrusel encontrados');

    function createCarousel() {
        heroContent.innerHTML = '';
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'carousel-slides';
        slidesContainer.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
        `;
        slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slideElement.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: ${index === 0 ? '1' : '0'};
                transition: opacity 0.8s ease-in-out;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            slideElement.innerHTML = `
                <div class="text-center mx-5">
                    <h1 class="card-title display-4 fw-bold my-5">${slide.title}</h1>
                    <p class="card-text fs-5 p-4">${slide.text}</p>
                </div>
            `;
            
            slidesContainer.appendChild(slideElement);
        });
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        indicatorsContainer.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        `;

        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background-color: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'};
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
            indicator.setAttribute('data-index', index);
            
            indicator.addEventListener('click', function() {
                goToSlide(parseInt(this.getAttribute('data-index')));
            });
            
            indicatorsContainer.appendChild(indicator);
        });
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-prev';
        prevButton.innerHTML = '<i class="bi bi-chevron-left"></i>';
        prevButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.3);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: background-color 0.3s ease;
        `;

        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-next';
        nextButton.innerHTML = '<i class="bi bi-chevron-right"></i>';
        nextButton.style.cssText = prevButton.style.cssText;
        nextButton.style.left = '';
        nextButton.style.right = '20px';
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        heroContent.appendChild(slidesContainer);
        heroContent.appendChild(indicatorsContainer);
        heroContent.appendChild(prevButton);
        heroContent.appendChild(nextButton);

        updateBackground();
        
        console.log('Carrusel creado exitosamente');
    }

    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;

        const currentSlide = document.querySelector('.carousel-slide.active');
        const currentIndicator = document.querySelector('.carousel-indicator.active');
        
        if (currentSlide) currentSlide.style.opacity = '0';
        if (currentIndicator) currentIndicator.style.backgroundColor = 'rgba(255,255,255,0.5)';

        setTimeout(() => {
            if (currentSlide) currentSlide.classList.remove('active');
            if (currentIndicator) currentIndicator.classList.remove('active');

            const newSlide = document.querySelectorAll('.carousel-slide')[index];
            const newIndicator = document.querySelectorAll('.carousel-indicator')[index];

            if (newSlide) {
                newSlide.classList.add('active');
                newSlide.style.opacity = '1';
            }
            if (newIndicator) {
                newIndicator.classList.add('active');
                newIndicator.style.backgroundColor = 'white';
            }

            config.currentIndex = index;
            updateBackground();
        }, 50);
    }

    function nextSlide() {
        const nextIndex = (config.currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (config.currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    function updateBackground() {
        const currentSlide = slides[config.currentIndex];
        heroSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${currentSlide.backgroundImage}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundRepeat = 'no-repeat';
        
        console.log(`Background actualizado: ${currentSlide.backgroundImage}`);
    }

    let autoPlayInterval;

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, config.interval);
        console.log('AutoPlay iniciado');
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            console.log('AutoPlay detenido');
        }
    }

    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);

    createCarousel();
    startAutoPlay();

    console.log('Carrusel completamente inicializado');
});