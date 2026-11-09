// Error Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load random suggested destinations
    loadSuggestedDestinations();
});

// Load random suggested destinations
function loadSuggestedDestinations() {
    const container = document.getElementById('suggestion-grid');
    if (!container) return;
    
    // Get random destinations (4 max)
    const shuffled = [...destinations].sort(() => 0.5 - Math.random());
    const randomDestinations = shuffled.slice(0, 4);
    
    let html = '';
    randomDestinations.forEach(destination => {
        html += `
            <div class="suggestion-card">
                <div class="suggestion-image">
                    <img src="${destination.image}" alt="${destination.name}">
                </div>
                <div class="suggestion-content">
                    <h3>${destination.name}, ${destination.country}</h3>
                    <p>Explore this amazing destination!</p>
                    <a href="booking.html?destination=${destination.id}" class="btn btn-primary">Book Now</a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}