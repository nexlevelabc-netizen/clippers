// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Chat Widget Functionality
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const chatClose = document.querySelector('.chat-close');
const chatInput = document.querySelector('.chat-input input');
const voiceBtn = document.querySelector('.voice-btn');
const chatMessages = document.querySelector('.chat-messages');

// Toggle chat
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });
}

// Voice input
if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (chatInput) {
                    chatInput.value = transcript;
                    processMessage(transcript);
                }
            };
            
            recognition.start();
        } else {
            alert('Voice input is not supported in your browser');
        }
    });
}

// Simple AI responses
function processMessage(message) {
    if (!chatMessages) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = message;
    chatMessages.appendChild(userMsg);
    
    // Simulate AI response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        
        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
            aiMsg.textContent = 'Our services start from £15 for beard grooming, £25 for haircuts, and £30 for hot towel shaves. Check our Services page for full pricing!';
        } else if (lowerMsg.includes('book')) {
            aiMsg.textContent = 'You can book online through our Booking page or call us at 01234 567 890. Would you like me to help you with the booking process?';
        } else if (lowerMsg.includes('hour') || lowerMsg.includes('open')) {
            aiMsg.textContent = 'We\'re open Mon-Fri 9AM-7PM, Sat 8AM-6PM, Sun 10AM-4PM.';
        } else {
            aiMsg.textContent = 'Thanks for your message! I can help with bookings, pricing, or questions about our services.';
        }
        
        chatMessages.appendChild(aiMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (chatInput) chatInput.value = '';
}

// Send message on Enter
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            processMessage(chatInput.value.trim());
        }
    });
}