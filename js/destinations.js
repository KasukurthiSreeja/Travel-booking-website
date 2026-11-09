// Destinations Data and Functionality

// Sample destinations data - in a real app, this would come from an API
const destinations = [
    {
        id: 'paris',
        name: 'Paris',
        country: 'France',
        region: 'europe',
        type: 'city',
        budget: 'luxury',
        price: 1299,
        rating: 4.8,
        reviews: 245,
        description: 'Experience the romance and charm of the City of Light with its iconic Eiffel Tower, world-class museums, and exquisite cuisine.',
        image: 'https://images.unsplash.com/photo-1730993175478-b634849f6536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWlmZWwlMjB0b3dlcnxlbnwwfHwwfHx8MA%3D%3D',
        featured: true
    },
    {
        id: 'bali',
        name: 'Bali',
        country: 'Indonesia',
        region: 'asia',
        type: 'beach',
        budget: 'standard',
        price: 899,
        rating: 4.6,
        reviews: 189,
        description: 'Discover the perfect balance of paradise beaches, spiritual temples, and lush rice terraces on this magical Indonesian island.',
        image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: true
    },
    {
        id: 'santorini',
        name: 'Santorini',
        country: 'Greece',
        region: 'europe',
        type: 'beach',
        budget: 'luxury',
        price: 1499,
        rating: 4.9,
        reviews: 312,
        description: 'Enjoy breathtaking sunsets over the Aegean Sea from the iconic white-washed buildings perched on volcanic cliffs.',
        image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: true
    },
    {
        id: 'tokyo',
        name: 'Tokyo',
        country: 'Japan',
        region: 'asia',
        type: 'city',
        budget: 'standard',
        price: 1199,
        rating: 4.7,
        reviews: 278,
        description: 'Immerse yourself in the fascinating blend of ultramodern and traditional in Japan\'s bustling, trend-setting capital.',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: true
    },
    {
        id: 'newyork',
        name: 'New York',
        country: 'USA',
        region: 'americas',
        type: 'city',
        budget: 'luxury',
        price: 1399,
        rating: 4.6,
        reviews: 423,
        description: 'Explore the Big Apple with its iconic skyline, Central Park, Broadway shows, and world-class shopping and dining.',
        image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: true
    },
    {
        id: 'maldives',
        name: 'Maldives',
        country: 'Maldives',
        region: 'asia',
        type: 'beach',
        budget: 'luxury',
        price: 2299,
        rating: 4.9,
        reviews: 256,
        description: 'Experience luxury in paradise with crystal clear waters, overwater bungalows, and pristine white-sand beaches.',
        image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: true
    },
    {
        id: 'rome',
        name: 'Rome',
        country: 'Italy',
        region: 'europe',
        type: 'historical',
        budget: 'standard',
        price: 999,
        rating: 4.7,
        reviews: 345,
        description: 'Step back in time as you explore ancient ruins, Renaissance masterpieces, and indulge in authentic Italian cuisine.',
        image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: false
    },
    {
        id: 'capetown',
        name: 'Cape Town',
        country: 'South Africa',
        region: 'africa',
        type: 'nature',
        budget: 'standard',
        price: 1099,
        rating: 4.6,
        reviews: 187,
        description: 'Experience the perfect blend of stunning landscapes, vibrant culture, and fascinating history in this coastal gem.',
        image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: false
    },
    {
        id: 'sydney',
        name: 'Sydney',
        country: 'Australia',
        region: 'oceania',
        type: 'city',
        budget: 'standard',
        price: 1599,
        rating: 4.7,
        reviews: 276,
        description: 'Discover the iconic Opera House, beautiful beaches, and vibrant culture in Australia\'s most famous city.',
        image: 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: false
    },
    {
        id: 'barcelona',
        name: 'Barcelona',
        country: 'Spain',
        region: 'europe',
        type: 'city',
        budget: 'standard',
        price: 899,
        rating: 4.6,
        reviews: 320,
        description: 'Experience the unique blend of Catalan culture, stunning architecture, Mediterranean beaches, and vibrant nightlife.',
        image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: false
    },
    {
        id: 'kyoto',
        name: 'Kyoto',
        country: 'Japan',
        region: 'asia',
        type: 'historical',
        budget: 'standard',
        price: 1199,
        rating: 4.8,
        reviews: 210,
        description: 'Immerse yourself in traditional Japan with ancient temples, beautiful gardens, and authentic cultural experiences.',
        image: 'https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: false
    },
    {
        id: 'cusco',
        name: 'Cusco & Machu Picchu',
        country: 'Peru',
        region: 'americas',
        type: 'historical',
        budget: 'standard',
        price: 1299,
        rating: 4.9,
        reviews: 245,
        description: 'Explore the ancient Incan capital and trek to one of the world\'s most spectacular archaeological sites.',
        image: 'https://images.pexels.com/photos/2105832/pexels-photo-2105832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        featured: false
    }
];

// Sample hotels/accommodations data
const accommodations = {
    'paris': [
        {
            id: 'paris-hotel-1',
            name: 'Grand Parisian Hotel',
            type: 'Hotel',
            rating: 4.8,
            reviews: 324,
            price: 299,
            features: ['Free WiFi', 'Spa', 'Restaurant', 'City View'],
            image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 'paris-hotel-2',
            name: 'Seine River Boutique',
            type: 'Boutique Hotel',
            rating: 4.6,
            reviews: 186,
            price: 219,
            features: ['Free WiFi', 'Breakfast', 'River View'],
            image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 'paris-apartment',
            name: 'Montmartre Luxury Apartment',
            type: 'Apartment',
            rating: 4.7,
            reviews: 98,
            price: 179,
            features: ['Kitchen', 'Free WiFi', 'Washer/Dryer'],
            image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 'paris-hotel-3',
            name: 'Eiffel View Suites',
            type: 'Hotel',
            rating: 4.9,
            reviews: 276,
            price: 399,
            features: ['Free WiFi', 'Breakfast', 'Eiffel Tower View', 'Luxury Spa'],
            image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
    ],
    'bali': [
        {
            id: 'bali-resort-1',
            name: 'Tropical Paradise Resort',
            type: 'Resort',
            rating: 4.9,
            reviews: 421,
            price: 249,
            features: ['Pool', 'Spa', 'Beach Access', 'Restaurant'],
            image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 'bali-villa-1',
            name: 'Private Jungle Villa',
            type: 'Villa',
            rating: 4.8,
            reviews: 156,
            price: 189,
            features: ['Private Pool', 'Kitchen', 'Free WiFi', 'Jungle View'],
            image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 'bali-hotel-1',
            name: 'Ubud Boutique Hotel',
            type: 'Hotel',
            rating: 4.7,
            reviews: 287,
            price: 129,
            features: ['Free WiFi', 'Breakfast', 'Shuttle Service', 'Yoga Classes'],
            image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 'bali-resort-2',
            name: 'Oceanfront Luxury Resort',
            type: 'Resort',
            rating: 4.9,
            reviews: 345,
            price: 329,
            features: ['Infinity Pool', 'Spa', 'Private Beach', 'Multiple Restaurants'],
            image: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
    ],
    // Add more accommodations for other destinations as needed
};

// Gallery images data
const galleryImages = [
    {
        id: 1,
        title: 'Santorini Sunset',
        location: 'Santorini, Greece',
        category: 'architecture',
        image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 2,
        title: 'Tropical Beach Paradise',
        location: 'Bali, Indonesia',
        category: 'beaches',
        image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 3,
        title: 'Mountain Majesty',
        location: 'Swiss Alps, Switzerland',
        category: 'mountains',
        image: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 4,
        title: 'City Skyline',
        location: 'New York, USA',
        category: 'cities',
        image: 'https://images.pexels.com/photos/2224861/pexels-photo-2224861.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 5,
        title: 'Desert Dunes',
        location: 'Sahara Desert, Morocco',
        category: 'nature',
        image: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 6,
        title: 'Ancient Temple',
        location: 'Kyoto, Japan',
        category: 'architecture',
        image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 7,
        title: 'Paradise Cove',
        location: 'Phi Phi Islands, Thailand',
        category: 'beaches',
        image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 8,
        title: 'Alpine Lake',
        location: 'Banff, Canada',
        category: 'mountains',
        image: 'https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 9,
        title: 'Urban Night',
        location: 'Tokyo, Japan',
        category: 'cities',
        image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 10,
        title: 'Tropical Waterfall',
        location: 'Costa Rica',
        category: 'nature',
        image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 11,
        title: 'Venice Canals',
        location: 'Venice, Italy',
        category: 'architecture',
        image: 'https://images.pexels.com/photos/1796739/pexels-photo-1796739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 12,
        title: 'Maldives Overwater Bungalows',
        location: 'Maldives',
        category: 'beaches',
        image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
];

// Function to get destination by ID
function getDestinationById(id) {
    return destinations.find(destination => destination.id === id);
}

// Function to get accommodations for a destination
function getAccommodationsForDestination(destinationId) {
    return accommodations[destinationId] || [];
}

// Function to render featured destinations on the home page
function renderFeaturedDestinations() {
    const featuredContainer = document.getElementById('featured-destinations');
    if (!featuredContainer) return;
    
    const featuredDestinations = destinations.filter(dest => dest.featured);
    
    let html = '';
    featuredDestinations.forEach(destination => {
        html += `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${destination.image}" alt="${destination.name}">
                    <div class="destination-wishlist" data-id="${destination.id}">
                        <i class="far fa-heart"></i>
                    </div>
                </div>
                <div class="destination-content">
                    <h3>${destination.name}, ${destination.country}</h3>
                    <div class="destination-meta">
                        <div class="destination-type">
                            <i class="fas fa-tag"></i> ${capitalizeFirstLetter(destination.type)}
                        </div>
                        <div class="destination-rating">
                            <i class="fas fa-star"></i> ${destination.rating} (${destination.reviews})
                        </div>
                    </div>
                    <p class="destination-description">${destination.description}</p>
                    <div class="destination-price">
                        <div>
                            <span class="price-amount">${formatCurrency(destination.price)}</span>
                            <span class="price-duration">/ person</span>
                        </div>
                    </div>
                    <div class="destination-actions">
                        <a href="booking.html?destination=${destination.id}" class="btn btn-primary">Book Now</a>
                        <a href="destinations.html?view=${destination.id}" class="btn btn-secondary">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    featuredContainer.innerHTML = html;
    
    // Add event listeners to wishlist buttons
    const wishlistButtons = featuredContainer.querySelectorAll('.destination-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const destId = this.getAttribute('data-id');
            toggleWishlist(destId, this);
        });
    });
}

// Function to toggle wishlist status
function toggleWishlist(destinationId, buttonElement) {
    // Get current wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('globetrot_wishlist') || '[]');
    
    // Check if destination is already in wishlist
    const index = wishlist.indexOf(destinationId);
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push(destinationId);
        buttonElement.classList.add('active');
        buttonElement.querySelector('i').classList.remove('far');
        buttonElement.querySelector('i').classList.add('fas');
        showNotification('Added to your wishlist!', 'success');
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        buttonElement.classList.remove('active');
        buttonElement.querySelector('i').classList.remove('fas');
        buttonElement.querySelector('i').classList.add('far');
        showNotification('Removed from your wishlist', 'info');
    }
    
    // Save updated wishlist
    localStorage.setItem('globetrot_wishlist', JSON.stringify(wishlist));
}

// Utility function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize destination data on page load
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedDestinations();
});