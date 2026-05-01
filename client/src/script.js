// Global Variables
let userLoggedIn = false;
let cart = [];
let userPoints = 0;

// Sample Products
const products = [
    { name: 'Dress 1', price: 50, img: 'dress1.jpg' },
    { name: 'Bag 1', price: 30, img: 'bag1.jpg' },
    { name: 'Accessory 1', price: 20, img: 'accessory1.jpg' },
];

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        userLoggedIn = true;
        showHomePage();
    } else {
        alert('Please enter username and password');
    }
}

// Show Home Page after login
function showHomePage() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
}

// Show sections
function showMarketplace() {
    toggleSection('marketplace');
}

function showRecycling() {
    toggleSection('recycling');
}

function showCommunity() {
    toggleSection('community');
}

function showRewards() {
    toggleSection('rewards');
}

function toggleSection(sectionId) {
    const sections = ['marketplace', 'recycling', 'community', 'rewards'];
    sections.forEach(section => {
        if (section === sectionId) {
            document.getElementById(section).classList.remove('hidden');
        } else {
            document.getElementById(section).classList.add('hidden');
        }
    });
}

// Add item to cart
function addToCart(item) {
    cart.push(item);
    document.getElementById('cart-list').innerHTML = cart.join('<br>');
}

// Checkout
function checkout() {
    const total = cart.length * 20;  // Example price
    alert(`Total amount: $${total}. Proceeding to payment.`);
}

// Schedule Pickup
function schedulePickup() {
    const time = document.getElementById('recycling-time').value;
    const type = document.getElementById('recycling-type').value;
    if (time && type) {
        alert(`Pickup scheduled for ${type} at ${time}`);
    } else {
        alert('Please select a time and specify items to recycle.');
    }
}

// Community Post
function postMessage() {
    const message = document.getElementById('post-message').value;
    const communityPosts = document.getElementById('community-posts');
    const newPost = document.createElement('div');
    newPost.innerHTML = `<p>${message}</p>`;
    communityPosts.appendChild(newPost);
    document.getElementById('post-message').value = '';
}

// Rewards Redemption
function redeemPoints() {
    userPoints += 10;
    document.getElementById('user-points').innerText = userPoints;
    alert(`You earned 10 points! Your total points: ${userPoints}`);
}

// Logout
function logout() {
    userLoggedIn = false;
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}
