function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

function navigateTo(page) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(`${page}-section`).classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(page)) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    document.querySelector('.hamburger').classList.remove('active');
    document.getElementById('mobile-menu').classList.remove('active');

    // Reinitialize 3D map if navigating to venue
    if (page === 'venue' && typeof reinitializeMap === 'function') {
        reinitializeMap();
    }
}