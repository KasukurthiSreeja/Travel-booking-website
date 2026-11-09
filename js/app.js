// Main Application JavaScript

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('globetrot_user') !== null;
}

// Get current user data
function getCurrentUser() {
    const userData = localStorage.getItem('globetrot_user');
    return userData ? JSON.parse(userData) : null;
}

// Logout function
function logout() {
    localStorage.removeItem('globetrot_user');
    localStorage.removeItem('globetrot_current_booking');
    
    // Redirect to home page if on protected page
    const protectedPages = ['booking.html', 'dashboard.html', 'payment.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        window.location.href = 'index.html';
    } else {
        // Reload current page to update UI
        window.location.reload();
    }
}

// Check if route requires authentication and redirect if needed
function checkAuthRequired() {
    const protectedPages = ['booking.html', 'dashboard.html', 'payment.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isAuthenticated()) {
        // Save intended destination for redirect after login
        localStorage.setItem('redirect_after_login', currentPage);
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Calculate nights between two dates
function calculateNights(checkIn, checkOut) {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Set minimum date for date inputs to today
function setMinDatesForToday() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = today;
    });
}

// Generate a unique booking reference
function generateBookingReference() {
    const prefix = 'GT';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomNum}`;
}

// Show notification
function showNotification(message, type = 'success') {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles if not already in CSS
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .notification {
                padding: 12px 20px;
                border-radius: 6px;
                color: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                opacity: 0;
                transform: translateX(50px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .notification-success {
                background-color: var(--success);
            }
            
            .notification-error {
                background-color: var(--error);
            }
            
            .notification-info {
                background-color: var(--info);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
                opacity: 0.8;
                transition: opacity 0.2s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add click event to close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Initialize application
function initApp() {
    // Set minimum date for any date inputs on the page
    setMinDatesForToday();
    
    // Check if route requires authentication
    checkAuthRequired();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);