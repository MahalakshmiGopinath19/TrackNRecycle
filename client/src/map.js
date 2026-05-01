// Map Functionality
function initMap() {
    // Default coordinates (San Francisco)
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };
    
    // Create map
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: defaultLocation,
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]
    });

    // Sample recycling centers data
    const recyclingCenters = [
        {
            name: "Green Textiles Recycling",
            location: { lat: 37.7749, lng: -122.4194 },
            address: "123 Eco Street, San Francisco",
            hours: "Mon-Fri: 9AM-5PM",
            accepts: "All textiles, shoes, accessories"
        },
        {
            name: "Eco Fabric Center",
            location: { lat: 37.7849, lng: -122.4294 },
            address: "456 Green Avenue, San Francisco",
            hours: "Tue-Sat: 10AM-6PM",
            accepts: "Clothing, linens, curtains"
        },
        {
            name: "Sustainable Threads",
            location: { lat: 37.7649, lng: -122.4094 },
            address: "789 Recycle Lane, San Francisco",
            hours: "Wed-Sun: 8AM-4PM",
            accepts: "Clothing and shoes only"
        }
    ];

    // Add markers for recycling centers
    recyclingCenters.forEach(center => {
        const marker = new google.maps.Marker({
            position: center.location,
            map: map,
            title: center.name,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
        });

        // Info window for each marker
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${center.name}</h3>
                    <p><strong>Address:</strong> ${center.address}</p>
                    <p><strong>Hours:</strong> ${center.hours}</p>
                    <p><strong>Accepts:</strong> ${center.accepts}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });

    // Locate me button functionality
    const locateMeBtn = document.getElementById('locate-me');
    if (locateMeBtn) {
        locateMeBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        
                        // Center map on user's location
                        map.setCenter(userLocation);
                        
                        // Add user location marker
                        new google.maps.Marker({
                            position: userLocation,
                            map: map,
                            title: "Your Location",
                            icon: {
                                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            }
                        });
                        
                        // Add 5 points for using the locate feature
                        addPoints(5);
                    },
                    error => {
                        console.error("Error getting location:", error);
                        alert("Could not get your location. Please make sure location services are enabled.");
                    }
                );
            } else {
                alert("Geolocation is not supported by your browser.");
            }
        });
    }

    // Filter centers button functionality
    const filterCentersBtn = document.getElementById('filter-centers');
    if (filterCentersBtn) {
        filterCentersBtn.addEventListener('click', function() {
            alert("Filter functionality would show options to filter by types of textiles accepted, hours, etc.");
        });
    }
}

// Function to add points to user's account
function addPoints(points) {
    const currentPoints = parseInt(localStorage.getItem('userPoints') || 0);
    const newPoints = currentPoints + points;
    localStorage.setItem('userPoints', newPoints.toString());
    document.getElementById('user-points').textContent = newPoints;
    
    // Show points earned notification
    const notification = document.createElement('div');
    notification.className = 'points-notification';
    notification.innerHTML = `
        <i class="fas fa-star"></i>
        <span>+${points} EcoPoints earned!</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}