// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize login form
    initLoginForm();
    
    // Initialize signup form
    initSignupForm();
    
    // Initialize password strength meter
    initPasswordStrengthMeter();
});

// Validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Initialize login form
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me')?.checked;
            
            // Validate inputs
            if (!email || !password) {
                showLoginError('Please enter both email and password');
                return;
            }
            
            // Attempt login (client-side simulation)
            const loginSuccess = attemptLogin(email, password);
            
            if (loginSuccess) {
                // Check if there's a redirect destination
                const redirectTo = localStorage.getItem('redirect_after_login');
                
                if (redirectTo) {
                    localStorage.removeItem('redirect_after_login');
                    window.location.href = redirectTo;
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                showLoginError('Invalid email or password');
            }
        });
    }
}

// Initialize signup form
function initSignupForm() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAgreed = document.getElementById('terms')?.checked;
            
            // Validate inputs
            if (!firstName || !lastName || !email || !password) {
                showSignupError('Please fill in all required fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showSignupError('Please enter a valid email address');
                return;
            }
            
            if (password.length < 8) {
                showSignupError('Password must be at least 8 characters long');
                return;
            }
            
            if (password !== confirmPassword) {
                showSignupError('Passwords do not match');
                return;
            }
            
            if (!termsAgreed) {
                showSignupError('You must agree to the Terms of Service');
                return;
            }
            
            // Check if email is already in use
            if (emailExists(email)) {
                showSignupError('This email is already registered. Please login instead.');
                return;
            }
            
            // Create new user (client-side simulation)
            const newUser = createUser(firstName, lastName, email, password);
            
            if (newUser) {
                // Login the new user
                loginUser(newUser);
                
                // Redirect to home
                window.location.href = 'index.html';
            } else {
                showSignupError('Registration failed. Please try again.');
            }
        });
    }
}

// Initialize password strength meter
function initPasswordStrengthMeter() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            
            // Update strength bar width and color
            strengthBar.style.width = `${strength.score * 25}%`;
            
            // Update color based on strength
            if (strength.score <= 1) {
                strengthBar.style.backgroundColor = '#ef4444'; // weak (red)
            } else if (strength.score <= 2) {
                strengthBar.style.backgroundColor = '#f59e0b'; // medium (amber)
            } else if (strength.score <= 3) {
                strengthBar.style.backgroundColor = '#10b981'; // strong (green)
            } else {
                strengthBar.style.backgroundColor = '#059669'; // very strong (darker green)
            }
            
            // Update text
            strengthText.textContent = `Password strength: ${strength.label}`;
        });
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    if (!password) {
        return { score: 0, label: 'Weak' };
    }
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[a-z]/.test(password)) score += 1; // Has lowercase
    if (/[0-9]/.test(password)) score += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special character
    
    // Normalize score to 0-4 range
    score = Math.min(4, Math.floor(score / 1.5));
    
    // Get label based on score
    let label;
    switch (score) {
        case 0:
        case 1:
            label = 'Weak';
            break;
        case 2:
            label = 'Medium';
            break;
        case 3:
            label = 'Strong';
            break;
        case 4:
            label = 'Very Strong';
            break;
        default:
            label = 'Weak';
    }
    
    return { score, label };
}

// Show login error message
function showLoginError(message) {
    const errorElement = document.getElementById('login-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Show signup error message
function showSignupError(message) {
    const errorElement = document.getElementById('signup-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Check if email already exists
function emailExists(email) {
    const users = JSON.parse(localStorage.getItem('globetrot_users') || '[]');
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Create a new user
function createUser(firstName, lastName, email, password) {
    try {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('globetrot_users') || '[]');
        
        // Create new user object
        const newUser = {
            id: Date.now(), // Simple ID generation
            firstName,
            lastName,
            email,
            password: hashPassword(password), // In a real app, never store plain text passwords
            createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save back to localStorage
        localStorage.setItem('globetrot_users', JSON.stringify(users));
        
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

// Attempt login
function attemptLogin(email, password) {
    try {
        const users = JSON.parse(localStorage.getItem('globetrot_users') || '[]');
        
        // Find user with matching email
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        // Check if user exists and password matches
        if (user && verifyPassword(password, user.password)) {
            // Login successful
            loginUser(user);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

// Login user (store in localStorage)
function loginUser(user) {
    // Create a safe user object (without password)
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    
    // Store in localStorage
    localStorage.setItem('globetrot_user', JSON.stringify(safeUser));
    
    // Update UI
    updateAuthButtons();
}

// Simple password hashing (for demo only)
// In a real app, use a proper hashing library
function hashPassword(password) {
    // This is NOT secure! In a real app, use bcrypt or a similar library
    // This is just for demo purposes
    return `hashed_${password}_${Date.now()}`;
}

// Verify password (for demo only)
function verifyPassword(inputPassword, storedHash) {
    // This is NOT secure! In a real app, use proper password verification
    // This is just for demo purposes
    if (!storedHash) return false;
    
    // Check if this is one of our demo users
    if (storedHash === 'demo_password') {
        return inputPassword === 'password';
    }
    
    return storedHash.startsWith(`hashed_${inputPassword}_`);
}

// Add some demo users if none exist
(function addDemoUsers() {
    const users = JSON.parse(localStorage.getItem('globetrot_users') || '[]');
    
    if (users.length === 0) {
        // Add a demo user
        const demoUsers = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'demo_password', // In a real app, this would be hashed
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane@example.com',
                password: 'demo_password', // In a real app, this would be hashed
                createdAt: new Date().toISOString()
            }
        ];
        
        localStorage.setItem('globetrot_users', JSON.stringify(demoUsers));
    }
})();