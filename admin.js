/**
 * ╔════════════════════════════════════════════════════════════════════════════╗
 * ║                         ADMIN CONFIGURATION                                ║
 * ╚════════════════════════════════════════════════════════════════════════════╝
 */

const ADMIN_CONFIG = {
    // Default admin credentials (change these!)
    credentials: {
        id: 'admin',
        password: 'djc2024'
    },
    
    // Storage key for schedule data
    storageKey: 'djc_schedule_data'
};

/**
 * Default schedule data structure
 */
const DEFAULT_SCHEDULE = {
    '2026-01-31': {
        mainStage: [
            { id: 'ms1', time: '9:00 AM', title: 'Opening Ceremony', description: 'Welcome & Keynote Address', order: 0 },
            { id: 'ms2', time: '11:00 AM', title: 'Tech Talk: Future of AI', description: 'By Dr. Sarah Chen', order: 1 },
            { id: 'ms3', time: '2:00 PM', title: 'Panel Discussion', description: 'Industry Leaders Q&A', order: 2 },
            { id: 'ms4', time: '5:00 PM', title: 'Live Performance', description: 'Entertainment & Music', order: 3 }
        ]
    },
    '2026-02-01': {
        mainStage: [
            { id: 'ms5', time: '10:00 AM', title: 'Day 2 Keynote', description: 'Future of Technology', order: 0 },
            { id: 'ms6', time: '1:00 PM', title: 'Networking Session', description: 'Meet industry leaders', order: 1 }
        ]
    }
};

/**
 * ╔════════════════════════════════════════════════════════════════════════════╗
 * ║                         ADMIN MANAGER CLASS                                ║
 * ╚════════════════════════════════════════════════════════════════════════════╝
 */

class AdminManager {
    constructor() {
        this.isLoggedIn = false;
        this.scheduleData = null;
        this.broadcastChannel = null;
        this.draggedItem = null;
        this.currentDate = '2026-01-31'; // Track selected date
        this.pendingDeleteData = null; // Store pending deletion data
        
        this.init();
    }
    
    /**
     * Initialize the admin manager
     */
    init() {
        // Load schedule data
        this.loadScheduleData();
        
        // Setup real-time sync via BroadcastChannel
        this.setupBroadcastChannel();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Check if already logged in (session) - DO THIS BEFORE RENDERING
        this.checkSession();
        
        // Render the schedule (now with correct isLoggedIn state)
        this.renderSchedule();
    }
    
    /**
     * Setup BroadcastChannel for cross-tab real-time sync
     */
    setupBroadcastChannel() {
        if ('BroadcastChannel' in window) {
            this.broadcastChannel = new BroadcastChannel('djc_schedule_sync');
            
            this.broadcastChannel.onmessage = (event) => {
                if (event.data.type === 'schedule_update') {
                    this.scheduleData = event.data.data;
                    this.saveToStorage();
                    this.renderSchedule();
                    this.showNotification('Schedule updated by admin', 'info');
                }
            };
        }
    }
    
    /**
     * Broadcast schedule changes to all tabs
     */
    broadcastUpdate() {
        if (this.broadcastChannel) {
            this.broadcastChannel.postMessage({
                type: 'schedule_update',
                data: this.scheduleData
            });
        }
    }
    
    /**
     * Load schedule data from storage or use defaults
     */
    loadScheduleData() {
        const stored = localStorage.getItem(ADMIN_CONFIG.storageKey);
        if (stored) {
            try {
                this.scheduleData = JSON.parse(stored);
            } catch (e) {
                this.scheduleData = { ...DEFAULT_SCHEDULE };
            }
        } else {
            this.scheduleData = { ...DEFAULT_SCHEDULE };
            this.saveToStorage();
        }
    }
    
    /**
     * Save schedule data to storage
     */
    saveToStorage() {
        localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(this.scheduleData));
    }
    
    /**
     * Check if admin session exists
     */
    checkSession() {
        const session = sessionStorage.getItem('djc_admin_session');
        if (session === 'active') {
            this.isLoggedIn = true;
            this.showAdminControls();
            // Hide login modal if already logged in
            const loginModal = document.getElementById('admin-login-modal');
            if (loginModal) {
                loginModal.classList.remove('active');
            }
        }
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Login form submit
        document.getElementById('admin-login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Close modals
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });
        
        // Add event form submit
        document.getElementById('add-event-form')?.addEventListener('submit', (e) => this.handleAddEvent(e));
        
        // Edit event form submit
        document.getElementById('edit-event-form')?.addEventListener('submit', (e) => this.handleEditEvent(e));
        
        // Logout button
        document.getElementById('admin-logout-btn')?.addEventListener('click', () => this.logout());
        
        // Close modal on outside click
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeAllModals();
            });
        });
    }
    
    /**
     * Show login modal
     */
    showLoginModal() {
        document.getElementById('admin-login-modal').classList.add('active');
        document.getElementById('admin-id').focus();
    }
    
    /**
     * Handle login form submission
     */
    handleLogin(e) {
        e.preventDefault();
        
        const id = document.getElementById('admin-id').value;
        const password = document.getElementById('admin-password').value;
        
        if (id === ADMIN_CONFIG.credentials.id && password === ADMIN_CONFIG.credentials.password) {
            this.isLoggedIn = true;
            sessionStorage.setItem('djc_admin_session', 'active');
            this.closeAllModals();
            this.showAdminControls();
            this.showNotification('Login successful! You can now manage the schedule.', 'success');
            
            // Re-render schedule with admin controls
            this.renderSchedule();
            
            // If on admin.html, don't redirect - stay on admin panel
            // Only redirect if on index.html
            if (!window.location.pathname.includes('admin.html')) {
                setTimeout(() => {
                    window.location.href = 'index.html#schedule';
                }, 1500);
            }
        } else {
            this.showNotification('Invalid credentials. Please try again.', 'error');
            document.getElementById('admin-password').value = '';
        }
    }
    
    /**
     * Logout admin
     */
    logout() {
        this.isLoggedIn = false;
        sessionStorage.removeItem('djc_admin_session');
        this.hideAdminControls();
        this.renderSchedule();
        this.showNotification('Logged out successfully.', 'info');
    }
    
    /**
     * Show admin controls
     */
    showAdminControls() {
        const adminControls = document.getElementById('admin-controls');
        if (adminControls) {
            adminControls.style.display = 'block';
        }
    }
    
    /**
     * Hide admin controls
     */
    hideAdminControls() {
        const adminControls = document.getElementById('admin-controls');
        if (adminControls) {
            adminControls.style.display = 'none';
        }
    }
    
    /**
     * Close all modals
     */
    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Reset forms
        document.getElementById('admin-login-form')?.reset();
        document.getElementById('add-event-form')?.reset();
        document.getElementById('edit-event-form')?.reset();
    }
    
    /**
     * Show add event modal
     */
    showAddEventModal(category) {
        document.getElementById('add-event-category').value = category;
        document.getElementById('add-event-modal').classList.add('active');
        document.getElementById('add-event-time').focus();
    }
    
    /**
     * Handle add event form submission
     */
    handleAddEvent(e) {
        e.preventDefault();
        
        const category = document.getElementById('add-event-category').value;
        const time = document.getElementById('add-event-time').value;
        const title = document.getElementById('add-event-title').value;
        
        // Ensure date structure exists
        if (!this.scheduleData[this.currentDate]) {
            this.scheduleData[this.currentDate] = { mainStage: [], workshopA: [], workshopB: [] };
        }
        
        const newEvent = {
            id: 'evt_' + Date.now(),
            time,
            title,
            description: '',
            order: this.scheduleData[this.currentDate][category].length
        };
        
        this.scheduleData[this.currentDate][category].push(newEvent);
        this.saveToStorage();
        this.broadcastUpdate();
        this.renderSchedule();
        this.closeAllModals();
        this.showNotification('Event added successfully!', 'success');
    }
    
    /**
     * Show edit event modal
     */
    showEditEventModal(category, eventId) {
        const dateEvents = this.scheduleData[this.currentDate];
        if (!dateEvents) return;
        
        const event = dateEvents[category].find(e => e.id === eventId);
        if (!event) return;
        
        document.getElementById('edit-event-category').value = category;
        document.getElementById('edit-event-id').value = eventId;
        document.getElementById('edit-event-time').value = event.time;
        document.getElementById('edit-event-title').value = event.title;
        
        document.getElementById('edit-event-modal').classList.add('active');
    }
    
    /**
     * Handle edit event form submission
     */
    handleEditEvent(e) {
        e.preventDefault();
        
        const category = document.getElementById('edit-event-category').value;
        const eventId = document.getElementById('edit-event-id').value;
        const time = document.getElementById('edit-event-time').value;
        const title = document.getElementById('edit-event-title').value;
        
        const dateEvents = this.scheduleData[this.currentDate];
        if (!dateEvents) return;
        
        const eventIndex = dateEvents[category].findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            dateEvents[category][eventIndex] = {
                ...dateEvents[category][eventIndex],
                time,
                title
            };
            
            this.saveToStorage();
            this.broadcastUpdate();
            this.renderSchedule();
            this.closeAllModals();
            this.showNotification('Event updated successfully!', 'success');
        }
    }
    
    /**
     * Delete an event
     */
    deleteEvent(category, eventId) {
        this.pendingDeleteData = { category, eventId };
        const modal = document.getElementById('delete-confirm-modal');
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    /**
     * Confirm deletion from modal
     */
    confirmDelete() {
        if (!this.pendingDeleteData) return;
        
        const { category, eventId } = this.pendingDeleteData;
        const dateEvents = this.scheduleData[this.currentDate];
        if (!dateEvents) return;
        
        dateEvents[category] = dateEvents[category].filter(e => e.id !== eventId);
        
        // Reorder remaining events
        dateEvents[category].forEach((event, index) => {
            event.order = index;
        });
        
        this.saveToStorage();
        this.broadcastUpdate();
        this.renderSchedule();
        this.showNotification('Event deleted successfully!', 'success');
        this.cancelDelete();
    }
    
    /**
     * Cancel deletion
     */
    cancelDelete() {
        this.pendingDeleteData = null;
        const modal = document.getElementById('delete-confirm-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    /**
     * Move event up or down
     */
    moveEvent(category, eventId, direction) {
        const dateEvents = this.scheduleData[this.currentDate];
        if (!dateEvents) return;
        
        const events = dateEvents[category];
        const index = events.findIndex(e => e.id === eventId);
        
        if (index === -1) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === events.length - 1) return;
        
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        // Swap events
        [events[index], events[newIndex]] = [events[newIndex], events[index]];
        
        // Update order values
        events.forEach((event, i) => {
            event.order = i;
        });
        
        this.saveToStorage();
        this.broadcastUpdate();
        this.renderSchedule();
    }
    
    /**
     * Render the schedule in the UI
     */
    renderSchedule() {
        this.renderMainStage();
        this.renderWorkshops();
    }
    
    /**
     * Render main stage events
     */
    renderMainStage() {
        const container = document.getElementById('main-stage-events');
        if (!container) return;
        
        // Get events for current date
        const dateEvents = this.scheduleData[this.currentDate];
        let html = '';
        
        if (dateEvents && dateEvents.mainStage && dateEvents.mainStage.length > 0) {
            const events = [...dateEvents.mainStage].sort((a, b) => a.order - b.order);
            html = events.map(event => this.createEventCard(event, 'mainStage', 'red')).join('');
        } else if (!this.isLoggedIn) {
            html = '<p style="color: var(--color-grey); padding: var(--spacing-md);">No events scheduled for this date.</p>';
        }
        
        // Add "Add Event" button if logged in
        if (this.isLoggedIn) {
            html += `
                <button class="add-event-btn" onclick="adminManager.showAddEventModal('mainStage')">
                    ➕ Add Event
                </button>
            `;
        }
        
        container.innerHTML = html;
    }
    
    /**
     * Render workshop events
     */
    renderWorkshops() {
        const containerA = document.getElementById('workshop-a-events');
        const containerB = document.getElementById('workshop-b-events');
        
        const dateEvents = this.scheduleData[this.currentDate];
        
        if (containerA) {
            if (dateEvents && dateEvents.workshopA) {
                const eventsA = [...dateEvents.workshopA].sort((a, b) => a.order - b.order);
                containerA.innerHTML = eventsA.map(event => this.createWorkshopCard(event, 'workshopA')).join('');
            } else {
                containerA.innerHTML = '';
            }
            
            if (this.isLoggedIn) {
                containerA.innerHTML += `
                    <button class="add-event-btn small" onclick="adminManager.showAddEventModal('workshopA')">
                        ➕ Add
                    </button>
                `;
            }
        }
        
        if (containerB) {
            if (dateEvents && dateEvents.workshopB) {
                const eventsB = [...dateEvents.workshopB].sort((a, b) => a.order - b.order);
                containerB.innerHTML = eventsB.map(event => this.createWorkshopCard(event, 'workshopB')).join('');
            } else {
                containerB.innerHTML = '';
            }
            
            if (this.isLoggedIn) {
                containerB.innerHTML += `
                    <button class="add-event-btn small" onclick="adminManager.showAddEventModal('workshopB')">
                        ➕ Add
                    </button>
                `;
            }
        }
    }
    
    /**
     * Create event card HTML for main stage
     */
    createEventCard(event, category, colorClass) {
        const adminButtons = this.isLoggedIn ? `
            <div class="event-admin-controls">
                <button class="event-btn move-up" onclick="adminManager.moveEvent('${category}', '${event.id}', 'up')" title="Move Up">▲</button>
                <button class="event-btn move-down" onclick="adminManager.moveEvent('${category}', '${event.id}', 'down')" title="Move Down">▼</button>
                <button class="event-btn edit" onclick="adminManager.showEditEventModal('${category}', '${event.id}')" title="Edit">✏️</button>
                <button class="event-btn delete" onclick="adminManager.deleteEvent('${category}', '${event.id}')" title="Delete">🗑️</button>
            </div>
        ` : '';
        
        return `
            <div class="event-card ${colorClass}" data-id="${event.id}">
                <div class="event-content">
                    <div class="event-time">
                        <p class="font-bold text-${colorClass}-600">${event.time}</p>
                    </div>
                    <div class="event-details">
                        <p class="font-semibold text-gray-800">${event.title}</p>
                    </div>
                </div>
                ${adminButtons}
            </div>
        `;
    }
    
    /**
     * Create workshop card HTML
     */
    createWorkshopCard(event, category) {
        const adminButtons = this.isLoggedIn ? `
            <div class="workshop-admin-controls">
                <button class="event-btn small move-up" onclick="adminManager.moveEvent('${category}', '${event.id}', 'up')" title="Move Up">▲</button>
                <button class="event-btn small move-down" onclick="adminManager.moveEvent('${category}', '${event.id}', 'down')" title="Move Down">▼</button>
                <button class="event-btn small edit" onclick="adminManager.showEditEventModal('${category}', '${event.id}')" title="Edit">✏️</button>
                <button class="event-btn small delete" onclick="adminManager.deleteEvent('${category}', '${event.id}')" title="Delete">🗑️</button>
            </div>
        ` : '';
        
        return `
            <div class="workshop-card" data-id="${event.id}">
                <p class="p-2 bg-purple-50 rounded">
                    <strong>${event.time}</strong> - ${event.title}
                    ${adminButtons}
                </p>
            </div>
        `;
    }
    
    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

/**
 * Switch to a different date
 */
function switchDate(date) {
    // Safety check - make sure adminManager exists
    if (!adminManager || typeof adminManager !== 'object') {
        console.warn('Admin manager not initialized yet');
        return;
    }
    
    adminManager.currentDate = date;
    
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
    
    // Re-render schedule
    adminManager.renderSchedule();
}

// Initialize admin manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
});
