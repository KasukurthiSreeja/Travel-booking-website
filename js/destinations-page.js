// Destinations Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load all destinations
    loadDestinations();
    
    // Set up filter event listeners
    setupFilters();
    
    // Handle URL parameters for search or view
    handleUrlParams();
});

// Load and render destinations
function loadDestinations() {
    const container = document.getElementById('destinations-container');
    if (!container) return;
    
    // Show loading state
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading destinations...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        renderDestinations(destinations);
    }, 800);
}

// Render destinations to the container
function renderDestinations(destinationsToShow) {
    const container = document.getElementById('destinations-container');
    if (!container) return;
    
    if (destinationsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No destinations found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button id="reset-filters" class="btn btn-primary">Reset Filters</button>
            </div>
        `;
        
        document.getElementById('reset-filters').addEventListener('click', resetFilters);
        return;
    }
    
    let html = '';
    destinationsToShow.forEach(destination => {
        html += `
            <div class="destination-card" data-id="${destination.id}">
                <div class="destination-image">
                    <img src="${destination.image}" alt="${destination.name}">
                    <div class="destination-type">${capitalizeFirstLetter(destination.type)}</div>
                    <div class="destination-wishlist" data-id="${destination.id}">
                        <i class="far fa-heart"></i>
                    </div>
                </div>
                <div class="destination-content">
                    <h3>${destination.name}, ${destination.country}</h3>
                    <div class="destination-meta">
                        <div>
                            <i class="fas fa-map-marker-alt"></i> ${destination.region === 'europe' ? 'Europe' : 
                                destination.region === 'asia' ? 'Asia' : 
                                destination.region === 'americas' ? 'Americas' : 
                                destination.region === 'africa' ? 'Africa' : 'Oceania'}
                        </div>
                        <div>
                            <i class="fas fa-tag"></i> ${capitalizeFirstLetter(destination.budget)}
                        </div>
                    </div>
                    <p class="destination-description">${destination.description}</p>
                    <div class="destination-price">
                        <div>
                            <span class="price-amount">${formatCurrency(destination.price)}</span>
                            <span class="price-duration">/ person</span>
                        </div>
                        <div class="destination-rating">
                            <span>${destination.rating}</span>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="destination-actions">
                        <a href="booking.html?destination=${destination.id}" class="btn btn-primary">Book Now</a>
                        <a href="#" class="btn btn-secondary view-details" data-id="${destination.id}">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add event listeners to wishlist buttons
    const wishlistButtons = container.querySelectorAll('.destination-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const destId = this.getAttribute('data-id');
            toggleWishlist(destId, this);
        });
        
        // Check if this destination is already in wishlist
        const destId = button.getAttribute('data-id');
        const wishlist = JSON.parse(localStorage.getItem('globetrot_wishlist') || '[]');
        
        if (wishlist.includes(destId)) {
            button.classList.add('active');
            button.querySelector('i').classList.remove('far');
            button.querySelector('i').classList.add('fas');
        }
    });
    
    // Add event listeners to view details buttons
    const viewDetailsButtons = container.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const destId = this.getAttribute('data-id');
            showDestinationDetails(destId);
        });
    });
}

// Setup filter event listeners
function setupFilters() {
    const regionFilter = document.getElementById('region-filter');
    const typeFilter = document.getElementById('type-filter');
    const budgetFilter = document.getElementById('budget-filter');
    const searchInput = document.getElementById('destination-search');
    const searchBtn = document.getElementById('search-btn');
    
    // Apply filters when any filter changes
    if (regionFilter) {
        regionFilter.addEventListener('change', applyFilters);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    
    if (budgetFilter) {
        budgetFilter.addEventListener('change', applyFilters);
    }
    
    // Apply search when button is clicked
    if (searchBtn) {
        searchBtn.addEventListener('click', applyFilters);
    }
    
    // Apply search when Enter key is pressed in search input
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
}

// Apply filters to destinations
function applyFilters() {
    const regionFilter = document.getElementById('region-filter');
    const typeFilter = document.getElementById('type-filter');
    const budgetFilter = document.getElementById('budget-filter');
    const searchInput = document.getElementById('destination-search');
    
    let filteredDestinations = [...destinations];
    
    // Apply region filter
    if (regionFilter && regionFilter.value !== 'all') {
        filteredDestinations = filteredDestinations.filter(dest => 
            dest.region === regionFilter.value
        );
    }
    
    // Apply type filter
    if (typeFilter && typeFilter.value !== 'all') {
        filteredDestinations = filteredDestinations.filter(dest => 
            dest.type === typeFilter.value
        );
    }
    
    // Apply budget filter
    if (budgetFilter && budgetFilter.value !== 'all') {
        filteredDestinations = filteredDestinations.filter(dest => 
            dest.budget === budgetFilter.value
        );
    }
    
    // Apply search filter
    if (searchInput && searchInput.value.trim() !== '') {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredDestinations = filteredDestinations.filter(dest => 
            dest.name.toLowerCase().includes(searchTerm) || 
            dest.country.toLowerCase().includes(searchTerm) || 
            dest.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Update the URL with filter parameters
    updateUrlWithFilters(
        regionFilter ? regionFilter.value : 'all',
        typeFilter ? typeFilter.value : 'all',
        budgetFilter ? budgetFilter.value : 'all',
        searchInput ? searchInput.value : ''
    );
    
    // Render filtered destinations
    renderDestinations(filteredDestinations);
}

// Reset all filters
function resetFilters() {
    const regionFilter = document.getElementById('region-filter');
    const typeFilter = document.getElementById('type-filter');
    const budgetFilter = document.getElementById('budget-filter');
    const searchInput = document.getElementById('destination-search');
    
    if (regionFilter) regionFilter.value = 'all';
    if (typeFilter) typeFilter.value = 'all';
    if (budgetFilter) budgetFilter.value = 'all';
    if (searchInput) searchInput.value = '';
    
    // Update URL to remove filter parameters
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);
    
    // Re-render all destinations
    renderDestinations(destinations);
}

// Update URL with filter parameters
function updateUrlWithFilters(region, type, budget, search) {
    const url = new URL(window.location);
    
    if (region && region !== 'all') {
        url.searchParams.set('region', region);
    } else {
        url.searchParams.delete('region');
    }
    
    if (type && type !== 'all') {
        url.searchParams.set('type', type);
    } else {
        url.searchParams.delete('type');
    }
    
    if (budget && budget !== 'all') {
        url.searchParams.set('budget', budget);
    } else {
        url.searchParams.delete('budget');
    }
    
    if (search && search.trim() !== '') {
        url.searchParams.set('search', search);
    } else {
        url.searchParams.delete('search');
    }
    
    url.searchParams.delete('view'); // Remove view parameter when filtering
    
    window.history.replaceState({}, '', url);
}

// Handle URL parameters
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for search parameter
    const searchParam = urlParams.get('search');
    if (searchParam) {
        const searchInput = document.getElementById('destination-search');
        if (searchInput) {
            searchInput.value = searchParam;
        }
    }
    
    // Check for filter parameters
    const regionParam = urlParams.get('region');
    const typeParam = urlParams.get('type');
    const budgetParam = urlParams.get('budget');
    
    if (regionParam || typeParam || budgetParam || searchParam) {
        // Set filter values
        if (regionParam) {
            const regionFilter = document.getElementById('region-filter');
            if (regionFilter) regionFilter.value = regionParam;
        }
        
        if (typeParam) {
            const typeFilter = document.getElementById('type-filter');
            if (typeFilter) typeFilter.value = typeParam;
        }
        
        if (budgetParam) {
            const budgetFilter = document.getElementById('budget-filter');
            if (budgetFilter) budgetFilter.value = budgetParam;
        }
        
        // Apply filters
        applyFilters();
    }
    
    // Check for view parameter (destination details)
    const viewParam = urlParams.get('view');
    if (viewParam) {
        showDestinationDetails(viewParam);
    }
}

// Show destination details modal
function showDestinationDetails(destinationId) {
    const destination = getDestinationById(destinationId);
    if (!destination) return;
    
    // Create modal if it doesn't exist
    let modal = document.querySelector('.destination-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'destination-modal';
        document.body.appendChild(modal);
    }
    
    // Update URL to include view parameter
    const url = new URL(window.location);
    url.searchParams.set('view', destinationId);
    window.history.replaceState({}, '', url);
    
    // Populate modal content
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="destination-detail-header" style="background-image: url('${destination.image}')">
                <div class="destination-detail-overlay">
                    <h1>${destination.name}, ${destination.country}</h1>
                    <div class="destination-detail-meta">
                        <div><i class="fas fa-map-marker-alt"></i> ${capitalizeFirstLetter(destination.region)}</div>
                        <div><i class="fas fa-tag"></i> ${capitalizeFirstLetter(destination.type)}</div>
                        <div><i class="fas fa-star"></i> ${destination.rating} (${destination.reviews} reviews)</div>
                    </div>
                </div>
            </div>
            <div class="destination-detail-content">
                <div class="destination-detail-section">
                    <h2>About ${destination.name}</h2>
                    <p>${destination.description}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                </div>
                
                <div class="destination-detail-section">
                    <h2>Highlights</h2>
                    <ul class="highlights-list">
                        <li><i class="fas fa-check-circle"></i> Experience the local culture and traditions</li>
                        <li><i class="fas fa-check-circle"></i> Visit world-famous landmarks and attractions</li>
                        <li><i class="fas fa-check-circle"></i> Enjoy delicious local cuisine</li>
                        <li><i class="fas fa-check-circle"></i> Explore stunning natural landscapes</li>
                    </ul>
                </div>
                
                <div class="destination-detail-section">
                    <h2>Price Details</h2>
                    <div class="price-details">
                        <div class="price-item">
                            <span class="price-label">Starting from</span>
                            <span class="price-value">${formatCurrency(destination.price)}</span>
                            <span class="price-unit">per person</span>
                        </div>
                        <div class="price-includes">
                            <h3>Price includes:</h3>
                            <ul>
                                <li><i class="fas fa-check"></i> Accommodation</li>
                                <li><i class="fas fa-check"></i> Daily breakfast</li>
                                <li><i class="fas fa-check"></i> Local transportation</li>
                                <li><i class="fas fa-check"></i> Guided tours</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="destination-detail-cta">
                    <a href="booking.html?destination=${destination.id}" class="btn btn-primary">Book This Trip</a>
                </div>
            </div>
        </div>
    `;
    
    // Add style for destination detail modal if not already in CSS
    const style = document.createElement('style');
    style.textContent = `
        .destination-detail-header {
            height: 400px;
            background-size: cover;
            background-position: center;
            position: relative;
        }
        
        .destination-detail-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 2rem;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
        }
        
        .destination-detail-overlay h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .destination-detail-meta {
            display: flex;
            gap: 1.5rem;
        }
        
        .destination-detail-content {
            padding: 2rem;
        }
        
        .destination-detail-section {
            margin-bottom: 2rem;
        }
        
        .destination-detail-section h2 {
            margin-bottom: 1rem;
            color: var(--gray-900);
        }
        
        .highlights-list {
            list-style: none;
            padding: 0;
        }
        
        .highlights-list li {
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
        }
        
        .highlights-list i {
            color: var(--success);
            margin-right: 0.5rem;
        }
        
        .price-details {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            align-items: flex-start;
        }
        
        .price-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .price-label {
            font-size: 0.875rem;
            color: var(--gray-600);
        }
        
        .price-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-600);
        }
        
        .price-unit {
            font-size: 0.875rem;
            color: var(--gray-600);
        }
        
        .price-includes {
            flex: 1;
        }
        
        .price-includes h3 {
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }
        
        .price-includes ul {
            list-style: none;
            padding: 0;
        }
        
        .price-includes li {
            margin-bottom: 0.25rem;
        }
        
        .price-includes i {
            color: var(--success);
            margin-right: 0.5rem;
        }
        
        .destination-detail-cta {
            text-align: center;
            margin-top: 2rem;
        }
        
        .destination-detail-cta .btn {
            padding: 1rem 2rem;
            font-size: 1.125rem;
        }
        
        @media (max-width: 768px) {
            .destination-detail-header {
                height: 300px;
            }
            
            .destination-detail-overlay h1 {
                font-size: 1.75rem;
            }
            
            .price-details {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Add close button functionality
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        
        // Update URL to remove view parameter
        const url = new URL(window.location);
        url.searchParams.delete('view');
        window.history.replaceState({}, '', url);
        
        // Remove modal after animation completes
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeButton.click();
        }
    });
}