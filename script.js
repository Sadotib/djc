// Global adminManager reference (initialized from admin.js if available)
let adminManager = null;
let currentDate = '2026-01-31'; // Track current date globally

function navigateTo(page) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(`${page}-section`).classList.add('active');

    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().includes(page.replace('-', ' '))) {
            tab.classList.add('active');
        }
    });

    // Update URL hash
    updateHash(page);

    // Reinitialize 3D map if navigating to venue
    if (page === 'venue' && typeof reinitializeMap === 'function') {
        reinitializeMap();
    }
}

/**
 * Switch to a different date
 */
function switchDate(date) {
    // Update global date tracker
    currentDate = date;
    
    // Update adminManager if it exists
    if (adminManager && typeof adminManager === 'object') {
        adminManager.currentDate = date;
        adminManager.renderSchedule();
    }
    
    // Update active tab - more precise matching
    document.querySelectorAll('.date-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to the correct tab based on the date
    document.querySelectorAll('.date-tab').forEach(tab => {
        const text = tab.textContent.trim();
        if ((date === '2026-01-31' && text === '31st Jan') || 
            (date === '2026-02-01' && text === '1st Feb')) {
            tab.classList.add('active');
        }
    });
}

// Check for admin route on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize adminManager variable if it doesn't exist
    if (typeof adminManager === 'undefined') {
        window.adminManager = null;
    }
    
    // Check if current URL contains /admin
    if (window.location.pathname.includes('/admin') || window.location.hash === '#admin') {
        showAdminLogin();
    }
    
    // Handle hash-based navigation
    if (window.location.hash) {
        const page = window.location.hash.substring(1);
        if (page === 'schedule' || page === 'venue') {
            navigateTo(page);
        }
    }
});

// Function to show admin login modal
function showAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('admin-id').focus();
    }
}

// Update URL hash when navigating
function updateHash(page) {
    window.location.hash = page;
}