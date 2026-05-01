// Main App JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Tab functionality for recycling section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Marketplace tabs
    const marketTabs = document.querySelectorAll('.market-tab');
    const marketItems = [
        {
            id: 1,
            title: "Vintage Denim Jacket",
            price: "$35",
            location: "New York, NY",
            image: "images/marketplace/denim-jacket.jpg",
            category: "clothing"
        },
        {
            id: 2,
            title: "Silk Scarf Collection",
            price: "$20",
            location: "Los Angeles, CA",
            image: "images/marketplace/silk-scarf.jpg",
            category: "accessories"
        },
        {
            id: 3,
            title: "Organic Cotton Sheets",
            price: "$45",
            location: "Chicago, IL",
            image: "images/marketplace/cotton-sheets.jpg",
            category: "home"
        },
        {
            id: 4,
            title: "Wool Sweater",
            price: "$28",
            location: "Seattle, WA",
            image: "images/marketplace/wool-sweater.jpg",
            category: "clothing"
        },
        {
            id: 5,
            title: "Handmade Tote Bag",
            price: "$15",
            location: "Austin, TX",
            image: "images/marketplace/tote-bag.jpg",
            category: "accessories"
        },
        {
            id: 6,
            title: "Linen Curtains",
            price: "$40",
            location: "Portland, OR",
            image: "images/marketplace/linen-curtains.jpg",
            category: "home"
        }
    ];

    // Render marketplace items
    function renderMarketplaceItems(category = 'all') {
        const marketplaceGrid = document.querySelector('.marketplace-grid');
        marketplaceGrid.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? marketItems 
            : marketItems.filter(item => item.category === category);
        
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'market-item';
            itemElement.innerHTML = `
                <div class="market-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="market-item-info">
                    <h4 class="market-item-title">${item.title}</h4>
                    <p class="market-item-price">${item.price}</p>
                    <div class="market-item-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${item.location}</span>
                    </div>
                </div>
            `;
            marketplaceGrid.appendChild(itemElement);
        });
    }

    // Initialize marketplace with all items
    renderMarketplaceItems();

    // Add event listeners to marketplace tabs
    marketTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            marketTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            renderMarketplaceItems(category);
        });
    });

    // Pickup form submission
    const pickupForm = document.getElementById('pickup-form');
    if (pickupForm) {
        pickupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pickupDate = document.getElementById('pickup-date').value;
            const pickupTime = document.getElementById('pickup-time').value;
            const itemsCount = document.getElementById('items-count').value;
            
            // Here you would typically send this data to a server
            console.log('Pickup scheduled:', { pickupDate, pickupTime, itemsCount });
            
            // Show success message
            alert(`Pickup scheduled for ${pickupDate} during ${pickupTime} window for ${itemsCount} items!`);
            
            // Reset form
            this.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would typically send this data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert(`Thank you for subscribing with ${email}!`);
            
            // Reset form
            emailInput.value = '';
        });
    }

    // Community post form submission
    const communityForm = document.querySelector('.community-form');
    if (communityForm) {
        communityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const postContent = this.querySelector('textarea').value;
            
            if (postContent.trim() === '') {
                alert('Please enter some content for your post');
                return;
            }
            
            // Here you would typically send this data to a server
            console.log('New community post:', postContent);
            
            // In a real app, you would add the new post to the posts list
            // For now, we'll just show a success message
            alert('Your post has been submitted!');
            
            // Reset form
            this.reset();
        });
    }

    // Initialize user points
    document.getElementById('user-points').textContent = localStorage.getItem('userPoints') || '0';
});