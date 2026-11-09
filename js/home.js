// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    initHeroSlider();
    
    // Initialize Testimonial Slider
    initTestimonialSlider();
    
    // Handle Search Form Submission
    initSearchForm();
    
    // Newsletter Form Submission
    initNewsletterForm();
});

// Initialize Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Add click event to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Initialize Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.t-indicator');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!testimonials.length) return;
    
    let currentTestimonial = 0;
    let testimonialInterval = setInterval(nextTestimonial, 6000);
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected testimonial and indicator
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            prevTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 6000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            nextTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 6000);
        });
    }
    
    // Add click event to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            testimonialInterval = setInterval(nextTestimonial, 6000);
        });
    });
}

// Initialize Search Form
function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const destination = document.getElementById('destination').value;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const guests = document.getElementById('guests').value;
            
            // Validate dates
            if (new Date(checkIn) >= new Date(checkOut)) {
                showNotification('Check-out date must be after check-in date', 'error');
                return;
            }
            
            // Create search object
            const searchParams = {
                destination,
                checkIn,
                checkOut,
                guests
            };
            
            // Store search parameters in localStorage
            localStorage.setItem('globetrot_search', JSON.stringify(searchParams));
            
            // Redirect to destinations page with search query
            window.location.href = `destinations.html?search=${encodeURIComponent(destination)}`;
        });
    }
}

// Initialize Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulate subscription - in a real app, you would send this to a server
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }
}