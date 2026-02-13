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
        selectedService = serviceSelected.value;
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
        selectedBarber = barberSelected.value;
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
        const serviceOption = document.querySelector(`input[name="service"][value="${selectedService}"]`);
        if (serviceOption) {
            const serviceText = serviceOption.closest('.service-option').querySelector('h4').textContent;
            const servicePrice = serviceOption.getAttribute('data-price');
            summaryService.textContent = `${serviceText} - £${servicePrice}`;
            summaryTotal.textContent = `£${servicePrice}`;
        }
    }
    
    // Update barber
    if (selectedBarber) {
        const barberOption = document.querySelector(`input[name="barber"][value="${selectedBarber}"]`);
        if (barberOption) {
            const barberText = barberOption.closest('.barber-option').querySelector('h4').textContent;
            summaryBarber.textContent = barberText;
        }
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
    e.preventDefault();
    
    // Validate all fields
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Phone validation (simple UK format)
    const phoneRegex = /^[0-9\s\+\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Here you would typically send the booking data to a server
    alert('Booking confirmed! We look forward to seeing you.');
    
    // Redirect to home page or show success message
    // window.location.href = 'index.html';
});
