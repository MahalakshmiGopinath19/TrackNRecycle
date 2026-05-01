document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const user = localStorage.getItem('ecothreads_user');
    if (user) {
        updateUIForLoggedInUser();
    }

    // Modal functionality
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('logged-in')) {
                showLogoutMenu(this);
            } else {
                openModal(loginModal);
            }
        });
    }

    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Switch to signup
    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    }

    // Switch to login
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            authenticateUser(email, password);
        });
    }

    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;

            if (!name || !email || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }

            if (password.length < 6) {
                showAlert('Password must be at least 6 characters', 'error');
                return;
            }

            registerUser(name, email, password);
        });
    }

    // Social login buttons
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'google' : 'facebook';
            initiateSocialLogin(provider);
        });
    });

    // Forgot password
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email address to reset your password:');
            if (email) {
                alert(`Password reset link has been sent to ${email} (simulated for demo)`);
            }
        });
    }

    // Helper functions
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove();

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.insertBefore(alert, modalContent.firstChild);
        }

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    function authenticateUser(email, password) {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Demo credentials
            if (email === 'demo@ecothreads.com' && password === 'demo123') {
                localStorage.setItem('ecothreads_user', JSON.stringify({
                    email: email,
                    name: 'Demo User',
                    points: 250
                }));
                
                showAlert('Login successful!', 'success');
                updateUIForLoggedInUser();
                closeModal(loginModal);
            } else {
                showAlert('Invalid email or password', 'error');
            }
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    function registerUser(name, email, password) {
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        submitBtn.disabled = true;

        setTimeout(() => {
            localStorage.setItem('ecothreads_user', JSON.stringify({
                email: email,
                name: name,
                points: 0
            }));
            
            showAlert('Account created successfully!', 'success');
            updateUIForLoggedInUser();
            closeModal(signupModal);
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    function initiateSocialLogin(provider) {
        const btn = document.querySelector(`.btn-social.${provider}`);
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        btn.disabled = true;

        setTimeout(() => {
            localStorage.setItem('ecothreads_user', JSON.stringify({
                email: `${provider}_user@example.com`,
                name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
                points: 100
            }));
            
            showAlert(`Logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`, 'success');
            updateUIForLoggedInUser();
            closeModal(loginModal);
            
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }

    function updateUIForLoggedInUser() {
        const user = JSON.parse(localStorage.getItem('ecothreads_user'));
        if (user && loginBtn) {
            loginBtn.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span class="user-name">${user.name.split(' ')[0]}</span>
            `;
            loginBtn.classList.add('logged-in');

            // Update points display
            const pointsDisplay = document.getElementById('user-points');
            if (pointsDisplay) {
                pointsDisplay.textContent = user.points;
            }
        }
    }

    function showLogoutMenu(button) {
        const existingMenu = document.querySelector('.logout-menu');
        if (existingMenu) existingMenu.remove();

        const user = JSON.parse(localStorage.getItem('ecothreads_user'));
        const menu = document.createElement('div');
        menu.className = 'logout-menu';
        menu.innerHTML = `
            <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <span>${user.name}</span>
            </div>
            <ul>
                <li><a href="#"><i class="fas fa-user"></i> My Profile</a></li>
                <li><a href="#"><i class="fas fa-history"></i> Recycling History</a></li>
                <li><a href="#"><i class="fas fa-gift"></i> My Rewards</a></li>
                <li><a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        `;

        const rect = button.getBoundingClientRect();
        menu.style.top = `${rect.bottom + window.scrollY}px`;
        menu.style.left = `${rect.left + window.scrollX}px`;

        document.body.appendChild(menu);

        document.getElementById('logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('ecothreads_user');
            window.location.reload();
        });

        document.addEventListener('click', function outsideClick(e) {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.remove();
                document.removeEventListener('click', outsideClick);
            }
        });
    }
});