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
        html: '<i class="fas fa-cut" style="color: #7C3AED; font-size: 24px;"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
    
    L.marker(graysCoords, { icon: barberIcon }).addTo(map)
        .bindPopup('<b>Signature Barbers</b><br>13 Orsett Road, Grays<br>RM17 5DS')
        .openPopup();
}

// Initialize map when page loads
if (document.getElementById('map')) {
    initMap();
}