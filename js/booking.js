// Booking Form Functionality
let currentStep = 1;
let selectedService = null;
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;

// Navigation functions
function nextStep(step) {
    // Validate current step before proceeding
    if (step === 1) {
        const serviceSelected = document.querySelector('input[name="service"]:checked');
        if (!serviceSelected) {
            alert('Please select a service to continue');
            return;
        }
        selectedService = {
            value: serviceSelected.value,
            price: serviceSelected.getAttribute('data-price'),
            text: serviceSelected.closest('.service-option').querySelector('h4').textContent
        };
        updateSummary();
    } else if (step === 2) {
        const barberSelected = document.querySelector('input[name="barber"]:checked');
        if (!barberSelected) {
            alert('Please select a barber to continue');
            return;
        }
        if (!selectedDate || !selectedTime) {
            alert('Please select date and time to continue');
            return;
        }
        selectedBarber = {
            value: barberSelected.value,
            text: barberSelected.closest('.barber-option').querySelector('h4').textContent
        };
        updateSummary();
    }
    
    // Hide current step
    document.getElementById(`step${step}`).classList.remove('active');
    document.querySelectorAll('.step')[step-1].classList.remove('active');
    
    // Show next step
    currentStep = step + 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelectorAll('.step')[currentStep-1].classList.add('active');
}

function prevStep(step) {
    // Hide current step
    document.getElementById(`step${step}`).classList.remove('active');
    document.querySelectorAll('.step')[step-1].classList.remove('active');
    
    // Show previous step
    currentStep = step - 1;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelectorAll('.step')[currentStep-1].classList.add('active');
}

// Time slot selection
function selectTime(element) {
    // Remove selected class from all time slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selected class to clicked slot
    element.classList.add('selected');
    selectedTime = element.textContent;
    updateSummary();
}

// Date selection
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        dateInput.addEventListener('change', function(e) {
            selectedDate = e.target.value;
            updateSummary();
        });
    }
    
    // Check for URL parameters (pre-selected barber)
    const urlParams = new URLSearchParams(window.location.search);
    const barberParam = urlParams.get('barber');
    if (barberParam) {
        // Auto-select the barber from the URL
        const barberRadio = document.querySelector(`input[name="barber"][value="${barberParam}"]`);
        if (barberRadio) {
            barberRadio.checked = true;
        }
    }
});

// Update summary in step 3
function updateSummary() {
    const summaryService = document.getElementById('summary-service');
    const summaryBarber = document.getElementById('summary-barber');
    const summaryDatetime = document.getElementById('summary-datetime');
    const summaryTotal = document.getElementById('summary-total');
    
    // Update service
    if (selectedService) {
        summaryService.textContent = `${selectedService.text} - £${selectedService.price}`;
        summaryTotal.textContent = `£${selectedService.price}`;
    }
    
    // Update barber
    if (selectedBarber) {
        summaryBarber.textContent = selectedBarber.text;
    }
    
    // Update date and time
    if (selectedDate && selectedTime) {
        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        summaryDatetime.textContent = `${formattedDate} at ${selectedTime}`;
    }
}

// Form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // This stops the page from refreshing
    console.log('Form submitted - preventing default');
    
    // Validate all fields
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    
    if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Get service price - FIX THIS PART
    const serviceSelected = document.querySelector('input[name="service"]:checked');
    if (!serviceSelected) {
        alert('Service information missing. Please start over.');
        window.location.href = 'booking.html';
        return;
    }
    
    const servicePrice = serviceSelected.getAttribute('data-price');
    
    // Store booking data
    const bookingData = {
        firstName,
        lastName,
        email,
        phone,
        service: serviceSelected.closest('.service-option').querySelector('h4').textContent,
        servicePrice: servicePrice,
        barber: document.querySelector('input[name="barber"]:checked')?.closest('.barber-option').querySelector('h4').textContent || 'Not selected',
        date: selectedDate,
        time: selectedTime,
        paymentMethod,
        notes: document.getElementById('notes').value
    };
    
    console.log('Booking data saved:', bookingData);
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Redirect to payment page
    console.log('Redirecting to payment.html');
    window.location.href = 'payment.html';
