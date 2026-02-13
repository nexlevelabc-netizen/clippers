// Initialize map
function initMap() {
    // Coordinates for Grays, Essex
    const graysCoords = [51.475, 0.325];
    
    const map = L.map('map').setView(graysCoords, 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    // Custom marker
    const barberIcon = L.divIcon({
        className: 'custom-marker',
        html: '<i class="fas fa-cut" style="color: #7C3AED; font-size: 24px; background: white; padding: 8px; border-radius: 50%; box-shadow: 0 2px 10px rgba(0,0,0,0.2);"></i>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });
    
    L.marker(graysCoords, { icon: barberIcon }).addTo(map)
        .bindPopup('<b>Signature Barbers</b><br>13 Orsett Road, Grays<br>RM17 5DS<br><a href="https://maps.google.com/?q=13+Orsett+Road+Grays" target="_blank">Get Directions</a>')
        .openPopup();
}

// Initialize map when page loads
if (document.getElementById('map')) {
    // Wait for Leaflet to load
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        // If Leaflet hasn't loaded yet, wait for it
        window.addEventListener('load', function() {
            if (typeof L !== 'undefined') {
                initMap();
            }
        });
    }
}

// Handle social media links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            alert('Social media links will be added soon!');
        }
    });
});

// Copy phone number on click (optional feature)
const contactPhone = document.querySelector('.contact-phone');
if (contactPhone) {
    contactPhone.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.clipboard.writeText('01234567890').then(() => {
            alert('Phone number copied to clipboard!');
        }).catch(() => {
            // Fallback
            window.location.href = 'tel:+441234567890';
        });
    });
}
