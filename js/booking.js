// Booking Form Functionality
let currentStep = 1;
let selectedService = null;
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;

// Navigation functions
function nextStep(step) {
    console.log('nextStep called with step:', step);
    
    // Validate current step before proceeding
    if (step === 1) {
        console.log('Validating step 1');
        const serviceSelected = document.querySelector('input[name="service"]:checked');
        console.log('Service selected:', serviceSelected);
        
        if (!serviceSelected) {
            alert('Please select a service to continue');
            return;
        }
        
        // Store service data
        try {
            selectedService = {
                value: serviceSelected.value,
                price: serviceSelected.getAttribute('data-price'),
                text: serviceSelected.closest('.service-option').querySelector('h4').textContent
            };
            console.log('Service data stored:', selectedService);
        } catch (error) {
            console.error('Error storing service data:', error);
        }
        
        updateSummary();
    } else if (step === 2) {
        console.log('Validating step 2');
        const barberSelected = document.querySelector('input[name="barber"]:checked');
        console.log('Barber selected:', barberSelected);
        
        if (!barberSelected) {
            alert('Please select a barber to continue');
            return;
        }
        if (!selectedDate || !selectedTime) {
            alert('Please select date and time to continue');
            return;
        }
        
        try {
            selectedBarber = {
                value: barberSelected.value,
                text: barberSelected.closest('.barber-option').querySelector('h4').textContent
            };
            console.log('Barber data stored:', selectedBarber);
        } catch (error) {
            console.error('Error storing barber data:', error);
        }
        
        updateSummary();
    }
    
    // Hide current step
    const currentStepElement = document.getElementById(`step${step}`);
    const currentStepIndicator = document.querySelectorAll('.step')[step-1];
    
    console.log('Current step element:', currentStepElement);
    console.log('Current indicator:', currentStepIndicator);
    
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
        console.log('Removed active from step', step);
    } else {
        console.error(`Element step${step} not found`);
    }
    
    if (currentStepIndicator) {
        currentStepIndicator.classList.remove('active');
    }
    
    // Show next step
    const nextStepNum = step + 1;
    const nextStepElement = document.getElementById(`step${nextStepNum}`);
    const nextStepIndicator = document.querySelectorAll('.step')[nextStepNum-1];
    
    console.log('Next step element:', nextStepElement);
    console.log('Next indicator:', nextStepIndicator);
    
    if (nextStepElement) {
        nextStepElement.classList.add('active');
        console.log('Added active to step', nextStepNum);
    } else {
        console.error(`Element step${nextStepNum} not found`);
    }
    
    if (nextStepIndicator) {
        nextStepIndicator.classList.add('active');
    }
    
    currentStep = nextStepNum;
    console.log('Current step now:', currentStep);
}

function prevStep(step) {
    console.log('prevStep called with step:', step);
    
    // Hide current step
    const currentStepElement = document.getElementById(`step${step}`);
    const currentStepIndicator = document.querySelectorAll('.step')[step-1];
    
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
    }
    if (currentStepIndicator) {
        currentStepIndicator.classList.remove('active');
    }
    
    // Show previous step
    const prevStepNum = step - 1;
    const prevStepElement = document.getElementById(`step${prevStepNum}`);
    const prevStepIndicator = document.querySelectorAll('.step')[prevStepNum-1];
    
    if (prevStepElement) {
        prevStepElement.classList.add('active');
    }
    if (prevStepIndicator) {
        prevStepIndicator.classList.add('active');
    }
    
    currentStep = prevStepNum;
    console.log('Current step now:', currentStep);
}

// Time slot selection
function selectTime(element) {
    console.log('Time selected:', element.textContent);
    
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
    console.log('DOM loaded - initializing booking form');
    
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        dateInput.addEventListener('change', function(e) {
            selectedDate = e.target.value;
            console.log('Date selected:', selectedDate);
            updateSummary();
        });
    }
    
    // Check for URL parameters (pre-selected barber)
    const urlParams = new URLSearchParams(window.location.search);
    const barberParam = urlParams.get('barber');
    if (barberParam) {
        console.log('Barber parameter found:', barberParam);
        // Auto-select the barber from the URL
        const barberRadio = document.querySelector(`input[name="barber"][value="${barberParam}"]`);
        if (barberRadio) {
            barberRadio.checked = true;
        }
    }
});

// Update summary in step 3
function updateSummary() {
    console.log('Updating summary');
    
    const summaryService = document.getElementById('summary-service');
    const summaryBarber = document.getElementById('summary-barber');
    const summaryDatetime = document.getElementById('summary-datetime');
    const summaryTotal = document.getElementById('summary-total');
    
    // Update service
    if (selectedService && summaryService) {
        summaryService.textContent = `${selectedService.text} - £${selectedService.price}`;
    }
    
    // Update barber
    if (selectedBarber && summaryBarber) {
        summaryBarber.textContent = selectedBarber.text;
    }
    
    // Update date and time
    if (selectedDate && selectedTime && summaryDatetime) {
        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        summaryDatetime.textContent = `${formattedDate} at ${selectedTime}`;
    }
    
    // Update total
    if (selectedService && summaryTotal) {
        summaryTotal.textContent = `£${selectedService.price}`;
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
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    
    console.log('Form fields:', { firstName, lastName, email, phone, paymentMethod: paymentMethod?.value });
    
    if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Get service selected
    const serviceSelected = document.querySelector('input[name="service"]:checked');
    if (!serviceSelected) {
        alert('Service information missing. Please start over.');
        window.location.href = 'booking.html';
        return;
    }
    
    // Get barber selected
    const barberSelected = document.querySelector('input[name="barber"]:checked');
    if (!barberSelected) {
        alert('Barber information missing. Please start over.');
        window.location.href = 'booking.html';
        return;
    }
    
    if (!selectedDate || !selectedTime) {
        alert('Date and time information missing. Please start over.');
        window.location.href = 'booking.html';
        return;
    }
    
    // Get service price and text
    const servicePrice = serviceSelected.getAttribute('data-price');
    const serviceText = serviceSelected.closest('.service-option').querySelector('h4').textContent;
    const barberText = barberSelected.closest('.barber-option').querySelector('h4').textContent;
    
    // Store booking data
    const bookingData = {
        firstName,
        lastName,
        email,
        phone,
        service: serviceText,
        serviceValue: serviceSelected.value,
        servicePrice: servicePrice,
        barber: barberText,
        barberValue: barberSelected.value,
        date: selectedDate,
        time: selectedTime,
        paymentMethod: paymentMethod.value,
        notes: document.getElementById('notes').value
    };
    
    console.log('Booking data saved:', bookingData);
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Redirect based on payment method
    if (paymentMethod.value === 'card') {
        console.log('Redirecting to payment.html');
        window.location.href = 'payment.html';
    } else {
        console.log('Redirecting to booking-confirmation.html?method=cash');
        window.location.href = 'booking-confirmation.html?method=cash';
    }
});
