// Booking Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    if (!checkAuthRequired()) return;
    
    // Get destination from URL
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = urlParams.get('destination');
    
    if (!destinationId) {
        // No destination specified, redirect to destinations page
        window.location.href = 'destinations.html';
        return;
    }
    
    // Get destination data
    const destination = getDestinationById(destinationId);
    if (!destination) {
        // Invalid destination ID, redirect to destinations page
        window.location.href = 'destinations.html';
        return;
    }
    
    // Store selected destination in local storage
    localStorage.setItem('globetrot_selected_destination', JSON.stringify(destination));
    
    // Initialize booking UI
    initBookingUI(destination);
    
    // Set up event listeners for booking steps
    setupBookingSteps();
    
    // Load accommodations for this destination
    loadAccommodations(destinationId);
});

// Initialize the booking UI with destination info
function initBookingUI(destination) {
    // Update destination info section
    const destinationInfo = document.getElementById('destination-info');
    if (destinationInfo) {
        destinationInfo.innerHTML = `
            <div class="destination-info-image">
                <img src="${destination.image}" alt="${destination.name}">
            </div>
            <div class="destination-info-content">
                <h3>${destination.name}, ${destination.country}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${capitalizeFirstLetter(destination.region)}</p>
            </div>
        `;
    }
    
    // Set minimum date for date inputs to today
    setMinDatesForToday();
    
    // Set default check-in and check-out dates (today + 1 month, and today + 1 month + 7 days)
    const today = new Date();
    const checkInDefault = new Date(today);
    checkInDefault.setMonth(today.getMonth() + 1);
    
    const checkOutDefault = new Date(checkInDefault);
    checkOutDefault.setDate(checkInDefault.getDate() + 7);
    
    const checkInInput = document.getElementById('check-in-date');
    const checkOutInput = document.getElementById('check-out-date');
    
    if (checkInInput) {
        checkInInput.valueAsDate = checkInDefault;
    }
    
    if (checkOutInput) {
        checkOutInput.valueAsDate = checkOutDefault;
    }
    
    // Set up check-in/check-out date validation
    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', function() {
            // Ensure check-out date is after check-in date
            if (checkOutInput.value && new Date(checkInInput.value) >= new Date(checkOutInput.value)) {
                const newCheckOutDate = new Date(checkInInput.value);
                newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
                checkOutInput.valueAsDate = newCheckOutDate;
            }
            
            // Update minimum date for check-out
            const minCheckOut = new Date(checkInInput.value);
            minCheckOut.setDate(minCheckOut.getDate() + 1);
            checkOutInput.min = minCheckOut.toISOString().split('T')[0];
        });
    }
}

// Set up event listeners for booking steps
function setupBookingSteps() {
    // Step navigation buttons
    const nextToStep2Btn = document.getElementById('next-to-step-2');
    const backToStep1Btn = document.getElementById('back-to-step-1');
    const nextToStep3Btn = document.getElementById('next-to-step-3');
    const backToStep2Btn = document.getElementById('back-to-step-2');
    const completeBookingBtn = document.getElementById('complete-booking');
    
    // Step 1 -> Step 2
    if (nextToStep2Btn) {
        nextToStep2Btn.addEventListener('click', function() {
            if (validateTripDetails()) {
                goToStep(2);
            }
        });
    }
    
    // Step 2 -> Step 1
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', function() {
            goToStep(1);
        });
    }
    
    // Step 2 -> Step 3
    if (nextToStep3Btn) {
        nextToStep3Btn.addEventListener('click', function() {
            if (validateAccommodation()) {
                updateBookingSummary();
                goToStep(3);
            }
        });
    }
    
    // Step 3 -> Step 2
    if (backToStep2Btn) {
        backToStep2Btn.addEventListener('click', function() {
            goToStep(2);
        });
    }
    
    // Complete booking (Step 3 -> Payment)
    if (completeBookingBtn) {
        completeBookingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (validatePaymentDetails()) {
                saveBookingData();
                window.location.href = 'payment.html';
            }
        });
    }
}

// Navigate to a specific booking step
function goToStep(stepNumber) {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.getAttribute('data-step')) <= stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Update step content visibility
    const stepContents = document.querySelectorAll('.booking-step');
    stepContents.forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    
    // Scroll to top of booking content
    document.querySelector('.booking-content').scrollIntoView({ behavior: 'smooth' });
}

// Validate trip details form
function validateTripDetails() {
    const checkInInput = document.getElementById('check-in-date');
    const checkOutInput = document.getElementById('check-out-date');
    
    if (!checkInInput.value) {
        showNotification('Please select a check-in date', 'error');
        return false;
    }
    
    if (!checkOutInput.value) {
        showNotification('Please select a check-out date', 'error');
        return false;
    }
    
    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);
    
    if (checkInDate >= checkOutDate) {
        showNotification('Check-out date must be after check-in date', 'error');
        return false;
    }
    
    // Store trip details in temporary booking object
    const booking = {
        checkIn: checkInInput.value,
        checkOut: checkOutInput.value,
        adults: document.getElementById('adults').value,
        children: document.getElementById('children').value,
        specialRequests: document.getElementById('special-requests').value,
        destination: JSON.parse(localStorage.getItem('globetrot_selected_destination'))
    };
    
    // Save to local storage temporarily
    localStorage.setItem('globetrot_current_booking', JSON.stringify(booking));
    
    return true;
}

// Load accommodations for a destination
function loadAccommodations(destinationId) {
    const accommodationsContainer = document.getElementById('accommodations-list');
    if (!accommodationsContainer) return;
    
    const destinationAccommodations = getAccommodationsForDestination(destinationId);
    
    if (destinationAccommodations.length === 0) {
        accommodationsContainer.innerHTML = `
            <p class="no-accommodations">No accommodations available for this destination.</p>
        `;
        return;
    }
    
    let html = '';
    destinationAccommodations.forEach(accommodation => {
        html += `
            <div class="accommodation-card" data-id="${accommodation.id}">
                <div class="accommodation-image">
                    <img src="${accommodation.image}" alt="${accommodation.name}">
                </div>
                <div class="accommodation-content">
                    <h3>${accommodation.name}</h3>
                    <div class="accommodation-features">
                        ${accommodation.features.map(feature => `
                            <div class="accommodation-feature">
                                <i class="fas fa-check"></i> ${feature}
                            </div>
                        `).join('')}
                    </div>
                    <div class="accommodation-rating">
                        <div class="stars">
                            ${getStarsHTML(accommodation.rating)}
                        </div>
                        <div class="reviews">${accommodation.reviews} reviews</div>
                    </div>
                    <div class="accommodation-price">
                        ${formatCurrency(accommodation.price)} <span class="price-per-night">per night</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    accommodationsContainer.innerHTML = html;
    
    // Add click event to accommodation cards
    const accommodationCards = accommodationsContainer.querySelectorAll('.accommodation-card');
    accommodationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            accommodationCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
        });
    });
}

// Generate HTML for star ratings
function getStarsHTML(rating) {
    let html = '';
    
    // Full stars
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    
    // Half star if needed
    if (rating % 1 >= 0.5) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    
    return html;
}

// Validate accommodation selection
function validateAccommodation() {
    const selectedAccommodation = document.querySelector('.accommodation-card.selected');
    
    if (!selectedAccommodation) {
        showNotification('Please select an accommodation', 'error');
        return false;
    }
    
    // Get the selected accommodation ID
    const accommodationId = selectedAccommodation.getAttribute('data-id');
    
    // Get destination ID from current booking
    const currentBooking = JSON.parse(localStorage.getItem('globetrot_current_booking'));
    const destinationId = currentBooking.destination.id;
    
    // Find the accommodation object
    const accommodationsList = getAccommodationsForDestination(destinationId);
    const accommodation = accommodationsList.find(acc => acc.id === accommodationId);
    
    if (!accommodation) {
        showNotification('Invalid accommodation selection', 'error');
        return false;
    }
    
    // Update current booking with selected accommodation
    currentBooking.accommodation = accommodation;
    localStorage.setItem('globetrot_current_booking', JSON.stringify(currentBooking));
    
    return true;
}

// Update booking summary in step 3
function updateBookingSummary() {
    const summaryContainer = document.getElementById('booking-summary');
    if (!summaryContainer) return;
    
    const booking = JSON.parse(localStorage.getItem('globetrot_current_booking'));
    if (!booking) return;
    
    const destination = booking.destination;
    const accommodation = booking.accommodation;
    
    // Calculate nights
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    // Calculate prices
    const accommodationTotal = accommodation.price * nights;
    const destinationPrice = destination.price * parseInt(booking.adults);
    const childrenPrice = destination.price * 0.7 * parseInt(booking.children); // 30% discount for children
    
    const subtotal = accommodationTotal + destinationPrice + childrenPrice;
    const taxesFees = subtotal * 0.12; // Assume 12% taxes and fees
    const total = subtotal + taxesFees;
    
    summaryContainer.innerHTML = `
        <div class="summary-section">
            <h3>Trip Details</h3>
            <div class="summary-detail">
                <span>Destination</span>
                <span>${destination.name}, ${destination.country}</span>
            </div>
            <div class="summary-detail">
                <span>Dates</span>
                <span>${formatDate(booking.checkIn)} - ${formatDate(booking.checkOut)} (${nights} nights)</span>
            </div>
            <div class="summary-detail">
                <span>Guests</span>
                <span>${booking.adults} Adults${booking.children > 0 ? `, ${booking.children} Children` : ''}</span>
            </div>
        </div>
        
        <div class="summary-section">
            <h3>Accommodation</h3>
            <div class="summary-detail">
                <span>Property</span>
                <span>${accommodation.name}</span>
            </div>
            <div class="summary-detail">
                <span>Rate</span>
                <span>${formatCurrency(accommodation.price)} per night</span>
            </div>
        </div>
        
        <div class="summary-section">
            <h3>Price Details</h3>
            <div class="summary-detail">
                <span>Accommodation (${nights} nights)</span>
                <span>${formatCurrency(accommodationTotal)}</span>
            </div>
            <div class="summary-detail">
                <span>Travel Package (${booking.adults} Adults)</span>
                <span>${formatCurrency(destinationPrice)}</span>
            </div>
            ${booking.children > 0 ? `
                <div class="summary-detail">
                    <span>Travel Package (${booking.children} Children)</span>
                    <span>${formatCurrency(childrenPrice)}</span>
                </div>
            ` : ''}
            <div class="summary-detail">
                <span>Taxes & Fees (12%)</span>
                <span>${formatCurrency(taxesFees)}</span>
            </div>
            <div class="summary-detail total">
                <span>Total</span>
                <span>${formatCurrency(total)}</span>
            </div>
        </div>
    `;
    
    // Store price details in the booking object
    booking.priceDetails = {
        accommodationTotal,
        destinationPrice,
        childrenPrice,
        subtotal,
        taxesFees,
        total,
        nights
    };
    
    localStorage.setItem('globetrot_current_booking', JSON.stringify(booking));
}

// Validate payment details
function validatePaymentDetails() {
    const cardName = document.getElementById('card-name');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    
    if (!cardName.value.trim()) {
        showNotification('Please enter the name on card', 'error');
        cardName.focus();
        return false;
    }
    
    if (!cardNumber.value.trim() || !isValidCardNumber(cardNumber.value)) {
        showNotification('Please enter a valid card number', 'error');
        cardNumber.focus();
        return false;
    }
    
    if (!expiryDate.value.trim() || !isValidExpiryDate(expiryDate.value)) {
        showNotification('Please enter a valid expiry date (MM/YY)', 'error');
        expiryDate.focus();
        return false;
    }
    
    if (!cvv.value.trim() || !isValidCVV(cvv.value)) {
        showNotification('Please enter a valid CVV code', 'error');
        cvv.focus();
        return false;
    }
    
    return true;
}

// Simple card number validation (for demo purposes)
function isValidCardNumber(cardNumber) {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    return /^\d{16}$/.test(cleanNumber);
}

// Simple expiry date validation (for demo purposes)
function isValidExpiryDate(expiryDate) {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        return false;
    }
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // Jan = 1
    
    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(year, 10);
    
    // Check if month is valid
    if (expiryMonth < 1 || expiryMonth > 12) {
        return false;
    }
    
    // Check if date is in the future
    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        return false;
    }
    
    return true;
}

// Simple CVV validation (for demo purposes)
function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Save booking data for payment processing
function saveBookingData() {
    const booking = JSON.parse(localStorage.getItem('globetrot_current_booking'));
    if (!booking) return;
    
    // Generate booking reference
    booking.reference = generateBookingReference();
    
    // Add booking date
    booking.bookingDate = new Date().toISOString();
    
    // Add booking status
    booking.status = 'pending';
    
    // Save updated booking data
    localStorage.setItem('globetrot_current_booking', JSON.stringify(booking));
    
    // For a real app, you would send this data to a server for payment processing
}