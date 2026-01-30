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
    mainStage: [
        { id: 'ms1', time: '9:00 AM', title: 'Opening Ceremony', description: 'Welcome & Keynote Address', order: 0 },
        { id: 'ms2', time: '11:00 AM', title: 'Tech Talk: Future of AI', description: 'By Dr. Sarah Chen', order: 1 },
        { id: 'ms3', time: '2:00 PM', title: 'Panel Discussion', description: 'Industry Leaders Q&A', order: 2 },
        { id: 'ms4', time: '5:00 PM', title: 'Live Performance', description: 'Entertainment & Music', order: 3 }
    ],
    workshopA: [
        { id: 'wa1', time: '10:00 AM', title: 'Web Dev Basics', description: 'HTML, CSS, JavaScript', order: 0 },
        { id: 'wa2', time: '1:00 PM', title: 'React Masterclass', description: 'Advanced React patterns', order: 1 },
        { id: 'wa3', time: '3:30 PM', title: 'API Design', description: 'RESTful best practices', order: 2 }
    ],
    workshopB: [
        { id: 'wb1', time: '10:00 AM', title: 'Python for Data', description: 'Data analysis basics', order: 0 },
        { id: 'wb2', time: '1:00 PM', title: 'ML Workshop', description: 'Machine learning intro', order: 1 },
        { id: 'wb3', time: '3:30 PM', title: 'Cloud Deployment', description: 'AWS & Azure basics', order: 2 }
    ]
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
        
        // Render the schedule
        this.renderSchedule();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Check if already logged in (session)
        this.checkSession();
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
        }
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Admin login button
        document.getElementById('admin-btn')?.addEventListener('click', () => this.showLoginModal());
        
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
        document.getElementById('login-modal').classList.add('active');
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
        document.getElementById('admin-btn').style.display = 'none';
        document.getElementById('admin-controls').style.display = 'flex';
    }
    
    /**
     * Hide admin controls
     */
    hideAdminControls() {
        document.getElementById('admin-btn').style.display = 'block';
        document.getElementById('admin-controls').style.display = 'none';
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
        const description = document.getElementById('add-event-description').value;
        
        const newEvent = {
            id: 'evt_' + Date.now(),
            time,
            title,
            description,
            order: this.scheduleData[category].length
        };
        
        this.scheduleData[category].push(newEvent);
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
        const event = this.scheduleData[category].find(e => e.id === eventId);
        if (!event) return;
        
        document.getElementById('edit-event-category').value = category;
        document.getElementById('edit-event-id').value = eventId;
        document.getElementById('edit-event-time').value = event.time;
        document.getElementById('edit-event-title').value = event.title;
        document.getElementById('edit-event-description').value = event.description;
        
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
        const description = document.getElementById('edit-event-description').value;
        
        const eventIndex = this.scheduleData[category].findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            this.scheduleData[category][eventIndex] = {
                ...this.scheduleData[category][eventIndex],
                time,
                title,
                description
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
        if (!confirm('Are you sure you want to delete this event?')) return;
        
        this.scheduleData[category] = this.scheduleData[category].filter(e => e.id !== eventId);
        
        // Reorder remaining events
        this.scheduleData[category].forEach((event, index) => {
            event.order = index;
        });
        
        this.saveToStorage();
        this.broadcastUpdate();
        this.renderSchedule();
        this.showNotification('Event deleted successfully!', 'success');
    }
    
    /**
     * Move event up or down
     */
    moveEvent(category, eventId, direction) {
        const events = this.scheduleData[category];
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
        
        const events = [...this.scheduleData.mainStage].sort((a, b) => a.order - b.order);
        
        container.innerHTML = events.map(event => this.createEventCard(event, 'mainStage', 'red')).join('');
        
        // Add "Add Event" button if logged in
        if (this.isLoggedIn) {
            container.innerHTML += `
                <button class="add-event-btn" onclick="adminManager.showAddEventModal('mainStage')">
                    ➕ Add Event
                </button>
            `;
        }
    }
    
    /**
     * Render workshop events
     */
    renderWorkshops() {
        const containerA = document.getElementById('workshop-a-events');
        const containerB = document.getElementById('workshop-b-events');
        
        if (containerA) {
            const eventsA = [...this.scheduleData.workshopA].sort((a, b) => a.order - b.order);
            containerA.innerHTML = eventsA.map(event => this.createWorkshopCard(event, 'workshopA')).join('');
            
            if (this.isLoggedIn) {
                containerA.innerHTML += `
                    <button class="add-event-btn small" onclick="adminManager.showAddEventModal('workshopA')">
                        ➕ Add
                    </button>
                `;
            }
        }
        
        if (containerB) {
            const eventsB = [...this.scheduleData.workshopB].sort((a, b) => a.order - b.order);
            containerB.innerHTML = eventsB.map(event => this.createWorkshopCard(event, 'workshopB')).join('');
            
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
                        <p class="text-sm text-gray-600">${event.description}</p>
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

// Initialize admin manager when DOM is ready
let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
});
