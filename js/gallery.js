// Gallery Page JavaScript
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
        image: 'https://images.unsplash.com/photo-1727001498963-4e26598dc486?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVuaWNlJTIwY2FuYWxzfGVufDB8fDB8fHww'
    },
    {
        id: 12,
        title: 'Maldives Overwater Bungalows',
        location: 'Maldives',
        category: 'beaches',
        image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
];
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    initGallery();
    
    // Set up filter functionality
    setupFilters();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize Load More button
    initLoadMore();
    
    // Initialize photo sharing
    initPhotoSharing();
});

// Initialize gallery
function initGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    
    // Initial load: show first 8 images
    renderGallery(galleryImages.slice(0, 8));
    
    // Save the current state
    galleryContainer.dataset.loaded = '8';
    galleryContainer.dataset.filter = 'all';
}

// Render gallery images
function renderGallery(images) {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    
    let html = '';
    
    images.forEach((image, index) => {
        html += `
            <div class="gallery-item" data-category="${image.category}" data-index="${index}">
                <img src="${image.image}" alt="${image.title}">
                <div class="gallery-item-overlay">
                    <h3>${image.title}</h3>
                    <p>${image.location}</p>
                </div>
            </div>
        `;
    });
    
    galleryContainer.innerHTML = html;
    
    // Add click events to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            openLightbox(index, images);
        });
    });
}

// Setup filter functionality
function setupFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get filter category
            const filter = this.getAttribute('data-filter');
            
            // Apply filter
            applyFilter(filter);
        });
    });
}

// Apply filter to gallery
function applyFilter(filter) {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    
    // Update current filter
    galleryContainer.dataset.filter = filter;
    
    // Reset loaded count for the new filter
    galleryContainer.dataset.loaded = '8';
    
    let filteredImages;
    
    if (filter === 'all') {
        filteredImages = galleryImages.slice(0, 8);
    } else {
        filteredImages = galleryImages
            .filter(image => image.category === filter)
            .slice(0, 8);
    }
    
    renderGallery(filteredImages);
    
    // Show/hide load more button based on if there are more images to load
    toggleLoadMoreButton(filter);
}

// Initialize lightbox
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Close button
    const closeButton = lightbox.querySelector('.lightbox-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }
    
    // Previous button
    const prevButton = lightbox.querySelector('.lightbox-prev');
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            navigateLightbox('prev');
        });
    }
    
    // Next button
    const nextButton = lightbox.querySelector('.lightbox-next');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            navigateLightbox('next');
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    });
}

// Open lightbox
function openLightbox(index, images) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    // Store the current images and index
    lightbox.dataset.currentIndex = index;
    lightbox.dataset.images = JSON.stringify(images);
    
    // Set image and caption
    const image = images[index];
    lightboxImage.src = image.image;
    lightboxImage.alt = image.title;
    lightboxCaption.textContent = `${image.title} - ${image.location}`;
    
    // Show lightbox with animation
    lightbox.classList.add('active');
    
    // Disable scroll on body
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Hide lightbox
    lightbox.classList.remove('active');
    
    // Re-enable scroll on body
    document.body.style.overflow = '';
}

// Navigate lightbox (prev/next)
function navigateLightbox(direction) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    // Get current index and images
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    let images = JSON.parse(lightbox.dataset.images);
    
    // Calculate new index
    if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
        currentIndex = (currentIndex + 1) % images.length;
    }
    
    // Update current index
    lightbox.dataset.currentIndex = currentIndex;
    
    // Update image and caption
    const image = images[currentIndex];
    
    // Fade out effect
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = image.image;
        lightboxImage.alt = image.title;
        lightboxCaption.textContent = `${image.title} - ${image.location}`;
        
        // Fade in effect
        lightboxImage.style.opacity = '1';
    }, 200);
}

// Initialize Load More button
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreImages);
        
        // Initially check if button should be visible
        toggleLoadMoreButton('all');
    }
}

// Load more images
function loadMoreImages() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    
    // Get current state
    const loadedCount = parseInt(galleryContainer.dataset.loaded);
    const currentFilter = galleryContainer.dataset.filter;
    
    // Determine images to load
    let filteredImages;
    
    if (currentFilter === 'all') {
        filteredImages = galleryImages.slice(0, loadedCount + 4);
    } else {
        filteredImages = galleryImages
            .filter(image => image.category === currentFilter)
            .slice(0, loadedCount + 4);
    }
    
    // Update loaded count
    galleryContainer.dataset.loaded = String(loadedCount + 4);
    
    // Render gallery
    renderGallery(filteredImages);
    
    // Check if there are more images to load
    toggleLoadMoreButton(currentFilter);
}

// Toggle Load More button visibility
function toggleLoadMoreButton(filter) {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const galleryContainer = document.getElementById('gallery-container');
    
    if (!loadMoreBtn || !galleryContainer) return;
    
    const loadedCount = parseInt(galleryContainer.dataset.loaded);
    let totalImages;
    
    if (filter === 'all') {
        totalImages = galleryImages.length;
    } else {
        totalImages = galleryImages.filter(image => image.category === filter).length;
    }
    
    // Hide button if all images are loaded
    if (loadedCount >= totalImages) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// Initialize photo sharing functionality
function initPhotoSharing() {
    const shareButton = document.getElementById('share-photos-btn');
    const uploadModal = document.getElementById('upload-modal');
    const closeButton = document.querySelector('.modal-close');
    const uploadForm = document.getElementById('photo-upload-form');
    const fileInput = document.getElementById('photo-file');
    const fileNameDisplay = document.querySelector('.file-name');
    
    // Open upload modal
    if (shareButton && uploadModal) {
        shareButton.addEventListener('click', function() {
            uploadModal.classList.add('active');
        });
    }
    
    // Close upload modal
    if (closeButton && uploadModal) {
        closeButton.addEventListener('click', function() {
            uploadModal.classList.remove('active');
        });
        
        // Close when clicking outside modal content
        uploadModal.addEventListener('click', function(e) {
            if (e.target === this) {
                uploadModal.classList.remove('active');
            }
        });
    }
    
    // Display selected file name
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = '';
            }
        });
    }
    
    // Handle form submission
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if user is logged in
            if (!isAuthenticated()) {
                showNotification('Please log in to share photos', 'error');
                uploadModal.classList.remove('active');
                
                // Save intended destination
                localStorage.setItem('redirect_after_login', 'gallery.html');
                
                // Redirect to login
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                
                return;
            }
            
            // Form validation
            const title = document.getElementById('photo-title').value.trim();
            const location = document.getElementById('photo-location').value.trim();
            const file = fileInput.files[0];
            
            if (!title || !location || !file) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // In a real app, you would upload the file to a server here
            // For this demo, we'll just show a success message
            
            // Reset form
            uploadForm.reset();
            fileNameDisplay.textContent = '';
            
            // Close modal
            uploadModal.classList.remove('active');
            
            // Show success message
            showNotification('Your photo has been submitted for review!', 'success');
        });
    }
}