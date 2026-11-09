// Payment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    if (!checkAuthRequired()) return;
    
    // Check if there is a current booking
    const currentBooking = localStorage.getItem('globetrot_current_booking');
    
    if (!currentBooking) {
        // No booking data, redirect to home
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize payment process
    simulatePaymentProcess();
});

// Simulate payment processing
function simulatePaymentProcess() {
    const paymentStatus = document.getElementById('payment-status');
    const paymentSuccess = document.getElementById('payment-success');
    const bookingReference = document.getElementById('booking-reference');
    
    // Get booking data
    const booking = JSON.parse(localStorage.getItem('globetrot_current_booking'));
    
    if (bookingReference) {
        bookingReference.textContent = booking.reference;
    }
    
    // Simulate payment processing delay
    setTimeout(() => {
        if (paymentStatus) {
            paymentStatus.classList.add('hidden');
        }
        
        if (paymentSuccess) {
            paymentSuccess.classList.remove('hidden');
        }
        
        // Update booking status to confirmed
        booking.status = 'confirmed';
        
        // Save to user's bookings
        saveBookingToUserHistory(booking);
        
        // Clear current booking as it's now completed
        localStorage.removeItem('globetrot_current_booking');
    }, 3000); // 3 seconds delay
}

// Save booking to user's booking history
function saveBookingToUserHistory(booking) {
    const user = getCurrentUser();
    if (!user) return;
    
    // Get existing bookings
    let userBookings = JSON.parse(localStorage.getItem(`globetrot_bookings_${user.email}`)) || [];
    
    // Add new booking to the beginning of the array
    userBookings.unshift(booking);
    
    // Save updated bookings
    localStorage.setItem(`globetrot_bookings_${user.email}`, JSON.stringify(userBookings));
}