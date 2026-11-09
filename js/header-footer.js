// Header and Footer Module

document.addEventListener('DOMContentLoaded', function() {
    // Load header
    const header = document.getElementById('header');
    if (header) {
        loadHeader(header);
    }
    
    // Load footer
    const footer = document.getElementById('footer');
    if (footer) {
        loadFooter(footer);
    }
});

// Load header content
function loadHeader(headerElement) {
    headerElement.innerHTML = `
        <div class="header-container container">
            <div class="logo">
                <a href="index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" x2="22" y1="12" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <h1>GlobeTrot</h1>
                </a>
            </div>
            
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <i class="fas fa-bars"></i>
            </button>
            
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="destinations.html" class="nav-link">Destinations</a></li>
                <li><a href="gallery.html" class="nav-link">Gallery</a></li>
                <li><a href="about.html" class="nav-link">About</a></li>
                <li><a href="contact.html" class="nav-link">Contact</a></li>
            </ul>
            
            <div class="nav-actions">
                <div id="auth-buttons"></div>
            </div>
        </div>
    `;
    
    // Add active class to current page in nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = headerElement.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Update auth buttons based on authentication state
    updateAuthButtons();
    
    // Handle mobile menu toggle
    const mobileMenuToggle = headerElement.querySelector('.mobile-menu-toggle');
    const navMenu = headerElement.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!headerElement.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
}

// Load footer content
function loadFooter(footerElement) {
    footerElement.innerHTML = `
        <div class="container">
            <div class="footer-container">
                <div class="footer-column">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" x2="22" y1="12" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <h1>GlobeTrot</h1>
                    </div>
                    <p class="mt-4">Your gateway to extraordinary travel experiences. We provide curated destinations and seamless booking for unforgettable adventures.</p>
                </div>
                
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="destinations.html">Destinations</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Support</h3>
                    <ul class="footer-links">
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Booking Terms</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Contact</h3>
                    <ul class="footer-links">
                        <li><i class="fas fa-map-marker-alt"></i> 123 Travel Avenue, New York</li>
                        <li><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
                        <li><i class="fas fa-envelope"></i> info@globetrot.com</li>
                    </ul>
                    <div class="newsletter-mini mt-4">
                        <form>
                            <input type="email" placeholder="Your email">
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} GlobeTrot. All rights reserved.</p>
                <div class="footer-social">
                    <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-pinterest"></i></a>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for footer elements
    const newsletterForm = footerElement.querySelector('.newsletter-mini form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value.trim() !== '') {
            showNotification('Thanks for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        }
    });
}

// Update authentication buttons based on login status
function updateAuthButtons() {
    const authButtonsContainer = document.getElementById('auth-buttons');
    if (!authButtonsContainer) return;
    
    if (isAuthenticated()) {
        const user = getCurrentUser();
        
        authButtonsContainer.innerHTML = `
            <a href="dashboard.html" class="btn btn-secondary">
                <i class="fas fa-user-circle"></i>
                ${user.firstName}
            </a>
            <button id="logout-btn" class="btn btn-primary">Logout</button>
        `;
        
        // Add event listener to logout button
        document.getElementById('logout-btn').addEventListener('click', function() {
            logout();
        });
    } else {
        authButtonsContainer.innerHTML = `
            <a href="login.html" class="btn btn-secondary">Login</a>
            <a href="signup.html" class="btn btn-primary">Sign Up</a>
        `;
    }
}