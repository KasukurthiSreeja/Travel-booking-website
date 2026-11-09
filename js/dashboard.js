// Dashboard Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    if (!checkAuthRequired()) return;
    
    // Load user data
    loadUserData();
    
    // Load user bookings
    loadUserBookings();
    
    // Load saved destinations
    loadSavedDestinations();
    
    // Set up dashboard tabs
    setupDashboardTabs();
    
    // Set up account settings form
    setupAccountSettingsForm();
});

// Load and display user data
function loadUserData() {
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    const profileNameField = document.getElementById('profile-name');
    const profileEmailField = document.getElementById('profile-email');
    
    const user = getCurrentUser();
    if (!user) return;
    
    // Update user info in the sidebar
    if (userNameElement) {
        userNameElement.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    if (userEmailElement) {
        userEmailElement.textContent = user.email;
    }
    
    // Fill account settings form
    if (profileNameField) {
        profileNameField.value = `${user.firstName} ${user.lastName}`;
    }
    
    if (profileEmailField) {
        profileEmailField.value = user.email;
    }
}

// Load and display user bookings
function loadUserBookings() {
    const upcomingTripsContainer = document.getElementById('upcoming-trips-container');
    const pastTripsContainer = document.getElementById('past-trips-container');
    const noUpcomingTripsMessage = document.getElementById('no-upcoming-trips');
    const noPastTripsMessage = document.getElementById('no-past-trips');
    
    if (!upcomingTripsContainer || !pastTripsContainer) return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    // Get user bookings
    const bookings = JSON.parse(localStorage.getItem(`globetrot_bookings_${user.email}`)) || [];
    
    // Current date for comparison
    const currentDate = new Date();
    
    // Filter bookings into upcoming and past
    const upcomingBookings = bookings.filter(booking => 
        new Date(booking.checkOut) >= currentDate
    );
    
    const pastBookings = bookings.filter(booking => 
        new Date(booking.checkOut) < currentDate
    );
    
    // Render upcoming trips
    if (upcomingBookings.length > 0) {
        let upcomingHtml = '';
        
        upcomingBookings.forEach(booking => {
            upcomingHtml += createTripCardHtml(booking, 'upcoming');
        });
        
        upcomingTripsContainer.innerHTML = upcomingHtml;
        
        if (noUpcomingTripsMessage) {
            noUpcomingTripsMessage.classList.add('hidden');
        }
    } else {
        if (noUpcomingTripsMessage) {
            noUpcomingTripsMessage.classList.remove('hidden');
        }
    }
    
    // Render past trips
    if (pastBookings.length > 0) {
        let pastHtml = '';
        
        pastBookings.forEach(booking => {
            pastHtml += createTripCardHtml(booking, 'past');
        });
        
        pastTripsContainer.innerHTML = pastHtml;
        
        if (noPastTripsMessage) {
            noPastTripsMessage.classList.add('hidden');
        }
    } else {
        if (noPastTripsMessage) {
            noPastTripsMessage.classList.remove('hidden');
        }
    }
}

// Create HTML for a trip card
function createTripCardHtml(booking, type) {
    const destination = booking.destination;
    const accommodation = booking.accommodation;
    const priceDetails = booking.priceDetails;
    
    // Determine status class and text
    let statusClass, statusText;
    
    if (type === 'upcoming') {
        statusClass = 'status-confirmed';
        statusText = 'Confirmed';
    } else {
        statusClass = 'status-completed';
        statusText = 'Completed';
    }
    
    return `
        <div class="trip-card">
            <div class="trip-image">
                <img src="${destination.image}" alt="${destination.name}">
            </div>
            <div class="trip-content">
                <div class="trip-header">
                    <div class="trip-title">
                        <h3>${destination.name}, ${destination.country}</h3>
                        <div class="trip-dates">
                            <i class="fas fa-calendar-alt"></i> ${formatDate(booking.checkIn)} - ${formatDate(booking.checkOut)}
                        </div>
                    </div>
                    <div class="trip-status ${statusClass}">${statusText}</div>
                </div>
                
                <div class="trip-details">
                    <div class="trip-detail">
                        <div class="trip-detail-label">Accommodation</div>
                        <div class="trip-detail-value">${accommodation.name}</div>
                    </div>
                    <div class="trip-detail">
                        <div class="trip-detail-label">Duration</div>
                        <div class="trip-detail-value">${priceDetails.nights} Nights</div>
                    </div>
                    <div class="trip-detail">
                        <div class="trip-detail-label">Booking Reference</div>
                        <div class="trip-detail-value">${booking.reference}</div>
                    </div>
                </div>
                
                <div class="trip-actions">
                    ${type === 'upcoming' ? `
                        <button class="btn btn-primary">Manage Booking</button>
                        <button class="btn btn-secondary">View Itinerary</button>
                        <button class="btn btn-secondary view-receipt" data-ref="${booking.reference}">View Receipt</button>
                    ` : `
                        <button class="btn btn-secondary view-receipt" data-ref="${booking.reference}">View Receipt</button>
                        <button class="btn btn-secondary">Book Again</button>
                    `}
                </div>
            </div>
        </div>
    `;
}

// Load and display saved destinations (wishlist)
function loadSavedDestinations() {
    const savedDestinationsContainer = document.getElementById('saved-destinations-container');
    const noSavedMessage = document.getElementById('no-saved-destinations');
    
    if (!savedDestinationsContainer) return;
    
    // Get saved destinations from localStorage
    const wishlist = JSON.parse(localStorage.getItem('globetrot_wishlist') || '[]');
    
    if (wishlist.length > 0) {
        let html = '';
        
        wishlist.forEach(destinationId => {
            const destination = getDestinationById(destinationId);
            if (destination) {
                html += `
                    <div class="saved-destination-card">
                        <div class="saved-destination-image">
                            <img src="${destination.image}" alt="${destination.name}">
                            <div class="remove-saved" data-id="${destination.id}">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                        <div class="saved-destination-content">
                            <h3>${destination.name}, ${destination.country}</h3>
                            <div class="saved-destination-meta">
                                <i class="fas fa-tag"></i> ${capitalizeFirstLetter(destination.type)}
                            </div>
                            <div class="saved-destination-actions">
                                <a href="booking.html?destination=${destination.id}" class="btn btn-primary btn-sm">Book Now</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        savedDestinationsContainer.innerHTML = html;
        
        // Add event listeners for remove buttons
        const removeButtons = savedDestinationsContainer.querySelectorAll('.remove-saved');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const destId = this.getAttribute('data-id');
                removeFromWishlist(destId);
            });
        });
        
        if (noSavedMessage) {
            noSavedMessage.classList.add('hidden');
        }
    } else {
        if (noSavedMessage) {
            noSavedMessage.classList.remove('hidden');
        }
    }
}

// Remove a destination from the wishlist
function removeFromWishlist(destinationId) {
    // Get current wishlist
    let wishlist = JSON.parse(localStorage.getItem('globetrot_wishlist') || '[]');
    
    // Remove the destination
    wishlist = wishlist.filter(id => id !== destinationId);
    
    // Save updated wishlist
    localStorage.setItem('globetrot_wishlist', JSON.stringify(wishlist));
    
    // Reload saved destinations
    loadSavedDestinations();
    
    showNotification('Destination removed from wishlist', 'info');
}

// Set up dashboard tabs
function setupDashboardTabs() {
    const tabLinks = document.querySelectorAll('.dashboard-nav a');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tabLinks.forEach(tabLink => {
                tabLink.parentElement.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tabs
            const tabs = document.querySelectorAll('.dashboard-tab');
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Set up account settings form
function setupAccountSettingsForm() {
    const accountForm = document.getElementById('account-settings-form');
    
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('profile-name').value.trim();
            const phone = document.getElementById('profile-phone').value.trim();
            const address = document.getElementById('profile-address').value.trim();
            
            // Basic validation
            if (!fullName) {
                showNotification('Please enter your name', 'error');
                return;
            }
            
            // Split full name into first and last name
            const nameParts = fullName.split(' ');
            let firstName = nameParts[0];
            let lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
            
            // Get current user
            const user = getCurrentUser();
            if (!user) return;
            
            // Update user data
            user.firstName = firstName;
            user.lastName = lastName;
            user.phone = phone;
            user.address = address;
            
            // Save updated user data
            localStorage.setItem('globetrot_user', JSON.stringify(user));
            
            // Update user display name in sidebar
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.textContent = `${firstName} ${lastName}`;
            }
            
            showNotification('Profile updated successfully', 'success');
        });
    }
}