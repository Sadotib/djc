/**
 * ╔════════════════════════════════════════════════════════════════════════════╗
 * ║                         VENUE MAP CONFIGURATION                            ║
 * ║                                                                            ║
 * ║   Edit this section to customize your venue layout                       ║
 * ║   Positions: { x: left/right, z: front/back }                           ║
 * ║   Colors: hex format (0xRRGGBB)                                          ║
 * ║                                                                            ║
 * ║  See VENUE_GUIDE.md for detailed instructions                              ║
 * ╚════════════════════════════════════════════════════════════════════════════╝
 */

const VENUE_CONFIG = {

    // ┌────────────────────────────────────────────────────────────────────────┐
    // │ SCENE SETTINGS                                                         │
    // └────────────────────────────────────────────────────────────────────────┘
    scene: {
        backgroundColor: 0x87CEEB,    // Sky blue background
        groundColor: 0x5d4e37,        // Brown earth color
        groundSize: 500,              // Size of the ground (increase for larger venue)
        gridDivisions: 50,            // Grid lines on ground
        showGrid: false               // Set to false to hide grid lines
    },

    // ┌────────────────────────────────────────────────────────────────────────┐
    // │ CAMERA SETTINGS                                                        │
    // └────────────────────────────────────────────────────────────────────────┘
    camera: {
        fov: 60,                              // Field of view
        position: { x: 40, y: 50, z: 40 },    // Initial camera position
        minDistance: 15,                       // Closest zoom distance
        maxDistance: 200                       // Farthest zoom distance
    },

    // ┌────────────────────────────────────────────────────────────────────────┐
    // │ TERRAIN                                                                │
    // │                                                                        │
    // │ Available types:                                                       │
    // │   • 'grass'  - Green grass area                                        │
    // │   • 'water'  - Blue water body (pond, lake, river)                     │
    // │   • 'land'   - Brown/sand colored land area                            │
    // │   • 'sand'   - Beach/desert sand                                       │
    // │   • 'stone'  - Stone/concrete paved area                               │
    // └────────────────────────────────────────────────────────────────────────┘
    terrain: [
        // Main grass area
        {
            type: 'grass',
            position: { x: 0, z: 0 },
            size: { width: 90, depth: 90 },
            name: 'Event Grounds'
        },
        
        // Decorative pond
        // {
        //     type: 'water',
        //     position: { x: -30, z: -25 },
        //     size: { width: 15, depth: 12 },
        //     name: 'Reflection Pond'
        // },
        
        // Stone plaza near entrance
        // {
        //     type: 'stone',
        //     position: { x: 0, z: 25 },
        //     size: { width: 20, depth: 10 },
        //     name: 'Main Plaza'
        // },
        
        // Sand area
        // {
        //     type: 'sand',
        //     position: { x: 30, z: -25 },
        //     size: { width: 12, depth: 12 },
        //     name: 'Beach Zone'
        // }
    ],

    // ┌────────────────────────────────────────────────────────────────────────┐
    // │ STRUCTURES                                                             │
    // │                                                                        │
    // │ Available types:                                                       │
    // │   • 'building' - Basic rectangular building                            │
    // │   • 'arch'     - Entrance arch with sign                               │
    // │   • 'dome'     - Dome/spherical structure                              │
    // │   • 'tent'     - Outdoor tent/pavilion                                 │
    // │   • 'tower'    - Observation tower                                     │
    // │   • 'stage'    - Performance stage with backdrop                       │
    // │                                                                        │
    // │ TO ADD: Copy a structure block and modify values                    │
    // │ TO REMOVE: Delete the entire { ... } block                          │
    // └────────────────────────────────────────────────────────────────────────┘
    structures: [
        
        // ══════════════════════════════════════════════════════════════════════
        // MAIN STAGE (Red)
        // ══════════════════════════════════════════════════════════════════════
        {
            type: 'building',
            position: { x: 0, z: 0 },
            size: { width: 30, height: 8, depth: 50 },
            color: 0xe74c3c,
            name: 'Main Stage',
            description: 'Live performances & keynotes'
        },

        // ══════════════════════════════════════════════════════════════════════
        // EXHIBITION BOOTHS (Blue) - Auto-generated grid
        // Creates 6 booths in a 2x3 grid pattern
        // ══════════════════════════════════════════════════════════════════════
        // ...generateGrid({
        //     type: 'building',
        //     basePosition: { x: 5, z: -15 },
        //     size: { width: 5, height: 4, depth: 6 },
        //     color: 0x3498db,
        //     rows: 2,
        //     cols: 3,
        //     spacing: { x: 7, z: 8 },
        //     namePrefix: 'Booth',
        //     description: 'Tech exhibitions & demos'
        // }),

        // ══════════════════════════════════════════════════════════════════════
        // FOOD COURT (Green)
        // ══════════════════════════════════════════════════════════════════════
        // {
        //     type: 'building',
        //     position: { x: -15, z: 10 },
        //     size: { width: 15, height: 5, depth: 12 },
        //     color: 0x2ecc71,
        //     name: 'Food Court',
        //     description: 'Refreshments & dining area'
        // },

        // ══════════════════════════════════════════════════════════════════════
        // FOOD STALLS (Dark Green) - Auto-generated row
        // Creates 3 stalls in a horizontal line
        // ══════════════════════════════════════════════════════════════════════
        // ...generateRow({
        //     type: 'building',
        //     basePosition: { x: -12, z: 8 },
        //     size: { width: 3, height: 3, depth: 3 },
        //     color: 0x27ae60,
        //     count: 3,
        //     spacing: 5,
        //     direction: 'x',    // 'x' = horizontal, 'z' = vertical
        //     namePrefix: 'Food Stall',
        //     description: 'Various cuisines'
        // }),

        // ══════════════════════════════════════════════════════════════════════
        // WORKSHOP ZONES (Purple)
        // ══════════════════════════════════════════════════════════════════════
        // {
        //     type: 'building',
        //     position: { x: 10, z: 10 },
        //     size: { width: 10, height: 5, depth: 8 },
        //     color: 0x9b59b6,
        //     name: 'Workshop Zone A',
        //     description: 'Hands-on sessions'
        // },
        // {
        //     type: 'building',
        //     position: { x: 22, z: 10 },
        //     size: { width: 8, height: 5, depth: 8 },
        //     color: 0x8e44ad,
        //     name: 'Workshop Zone B',
        //     description: 'Technical workshops'
        // },

        // ══════════════════════════════════════════════════════════════════════
        // REGISTRATION & ENTRANCE (Orange)
        // ══════════════════════════════════════════════════════════════════════
        {
            type: 'building',
            position: { x: 25, z: 35 },
            size: { width: 8, height: 4, depth: 8 },
            color: 0xf39c12,
            name: 'Registration',
            description: 'Check-in '
        },
        {
            type: 'building',
            position: { x: 25, z: 25 },
            size: { width: 8, height: 4, depth: 8 },
            color: 0xf39c12,
            name: 'Resting Area',
            description: 'Info desk'
        },
        // {
        //     type: 'arch',
        //     position: { x: 0, z: 28 },
        //     color: 0xf39c12,
        //     signColor: 0xe74c3c
        // },

        // ══════════════════════════════════════════════════════════════════════
        // RESTROOMS (Teal)
        // ══════════════════════════════════════════════════════════════════════
        // {
        //     type: 'building',
        //     position: { x: 25, z: -10 },
        //     size: { width: 4, height: 3, depth: 5 },
        //     color: 0x1abc9c,
        //     name: 'Restrooms',
        //     description: 'Facilities'
        // },
        // {
        //     type: 'building',
        //     position: { x: -25, z: 0 },
        //     size: { width: 4, height: 3, depth: 5 },
        //     color: 0x1abc9c,
        //     name: 'Restrooms',
        //     description: 'Facilities'
        // }

        // ══════════════════════════════════════════════════════════════════════
        // ADD YOUR CUSTOM STRUCTURES BELOW
        // Copy any block above and paste here, then modify values
        // ══════════════════════════════════════════════════════════════════════
        
        // Example - Uncomment to add a VIP dome:
        // ,{
        //     type: 'dome',
        //     position: { x: -25, z: -15 },
        //     radius: 5,
        //     color: 0xe84393,
        //     name: 'VIP Lounge',
        //     description: 'Exclusive VIP area'
        // }

        // Example - Uncomment to add an info tower:
        // ,{
        //     type: 'tower',
        //     position: { x: 25, z: 15 },
        //     radius: 2,
        //     height: 10,
        //     color: 0x00cec9,
        //     name: 'Info Tower',
        //     description: 'Event information'
        // }

    ],

    // ┌────────────────────────────────────────────────────────────────────────┐
    // │ DECORATIONS (Trees & Paths)                                            │
    // └────────────────────────────────────────────────────────────────────────┘
    decorations: {
        // Trees - Add { x: value, z: value } to place a tree
        trees: [
            { x: -25, z: 15 },
            { x: -25, z: -15 },
            // { x: 25, z: 20 },
            { x: -20, z: 25 },
            { x: 20, z: -20 }
        ],
        
        // Paths - Connect two points with a walkway
        paths: [
            // { from: { x: 0, z: 25 }, to: { x: 0, z: -15 }, width: 4 },
            // { from: { x: -15, z: 0 }, to: { x: 10, z: 0 }, width: 3 },
            // { from: { x: 15, z: 0 }, to: { x: 15, z: 10 }, width: 3 }
        ]
    }
};


/**
 * ========================================
 * HELPER FUNCTIONS FOR CONFIGURATION
 * ========================================
 */

// Generate a grid of structures (e.g., booth rows)
function generateGrid({ type, basePosition, size, color, rows, cols, spacing, namePrefix, description }) {
    const structures = [];
    let count = 1;
    
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            structures.push({
                type,
                position: {
                    x: basePosition.x + col * spacing.x,
                    z: basePosition.z + row * spacing.z
                },
                size: { ...size },
                color,
                name: `${namePrefix} ${count}`,
                description
            });
            count++;
        }
    }
    
    return structures;
}

// Generate a row of structures
function generateRow({ type, basePosition, size, color, count, spacing, direction, namePrefix, description }) {
    const structures = [];
    
    for (let i = 0; i < count; i++) {
        structures.push({
            type,
            position: {
                x: basePosition.x + (direction === 'x' ? i * spacing : 0),
                z: basePosition.z + (direction === 'z' ? i * spacing : 0)
            },
            size: { ...size },
            color,
            name: `${namePrefix} ${i + 1}`,
            description
        });
    }
    
    return structures;
}


/**
 * ========================================
 * VENUE MAP CLASS
 * ========================================
 * Main class that handles the 3D venue map
 */

class VenueMap {
    constructor(containerId, config = VENUE_CONFIG) {
        this.containerId = containerId;
        this.config = config;
        
        // Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.labelRenderer = null;  // CSS2D renderer for labels
        this.controls = null;
        
        // Interaction
        this.raycaster = null;
        this.mouse = null;
        this.interactiveObjects = [];
        
        // State
        this.isInitialized = false;
        
        // Bind methods
        this.onWindowResize = this.onWindowResize.bind(this);
        this.animate = this.animate.bind(this);
    }

    /**
     * Initialize the venue map
     */
    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container #${this.containerId} not found`);
            return;
        }

        if (this.isInitialized && this.renderer) {
            this.resize();
            return;
        }

        this.setupScene(container);
        this.setupCamera(container);
        this.setupRenderer(container);
        this.setupControls();
        this.setupLighting();
        
        this.buildVenue();
        this.addEventListeners();
        
        this.isInitialized = true;
        this.animate();
    }

    /**
     * Setup Three.js scene
     */
    setupScene(container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.config.scene.backgroundColor);
    }

    /**
     * Setup camera
     */
    setupCamera(container) {
        const { fov, position } = this.config.camera;
        const aspect = container.clientWidth / container.clientHeight;
        
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
        this.camera.position.set(position.x, position.y, position.z);
    }

    /**
     * Setup WebGL renderer
     */
    setupRenderer(container) {
        // Main WebGL renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);
        
        // CSS2D renderer for labels
        this.labelRenderer = new THREE.CSS2DRenderer();
        this.labelRenderer.setSize(container.clientWidth, container.clientHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0';
        this.labelRenderer.domElement.style.left = '0';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        container.appendChild(this.labelRenderer.domElement);
    }

    /**
     * Setup orbit controls
     */
    setupControls() {
        const { minDistance, maxDistance } = this.config.camera;
        
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2.2;
        this.controls.minDistance = minDistance;
        this.controls.maxDistance = maxDistance;
    }

    /**
     * Setup scene lighting
     */
    setupLighting() {
        // Ambient light
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        // Main directional light with shadows
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(30, 50, 30);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 150;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 50;
        dirLight.shadow.camera.top = 50;
        dirLight.shadow.camera.bottom = -50;
        this.scene.add(dirLight);

        // Fill light for better aesthetics
        const fillLight = new THREE.DirectionalLight(0x667eea, 0.3);
        fillLight.position.set(-20, 30, -20);
        this.scene.add(fillLight);
    }

    /**
     * Setup raycaster for mouse interaction
     */
    setupInteraction() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    /**
     * Build the entire venue from config
     */
    buildVenue() {
        this.createGround();
        this.createTerrain();
        this.createStructures();
        this.createDecorations();
    }

    /**
     * Create ground plane and grid
     */
    createGround() {
        const { groundColor, groundSize, gridDivisions, showGrid } = this.config.scene;

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize);
        const groundMat = new THREE.MeshStandardMaterial({
            color: groundColor,
            roughness: 0.8
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grid helper (optional)
        if (showGrid !== false) {
            const grid = new THREE.GridHelper(groundSize, gridDivisions, 0x444444, 0x333333);
            grid.position.y = 0.01;
            this.scene.add(grid);
        }
    }

    /**
     * Create terrain features from config
     */
    createTerrain() {
        if (!this.config.terrain) return;
        
        this.config.terrain.forEach(terrain => {
            switch (terrain.type) {
                case 'grass':
                    this.createTerrainPatch(terrain, 0x4a7c59, 0.9); // Green grass
                    break;
                case 'water':
                    this.createWater(terrain);
                    break;
                case 'land':
                    this.createTerrainPatch(terrain, 0x8B7355, 0.85); // Brown land
                    break;
                case 'sand':
                    this.createTerrainPatch(terrain, 0xf4e4ba, 0.95); // Sandy color
                    break;
                case 'stone':
                    this.createTerrainPatch(terrain, 0x808080, 0.7); // Gray stone
                    break;
                default:
                    console.warn(`Unknown terrain type: ${terrain.type}`);
            }
        });
    }

    /**
     * Create a terrain patch (grass, land, sand, stone)
     */
    createTerrainPatch({ position, size, name, type }, color, roughness) {
        const group = new THREE.Group();
        
        const geo = new THREE.PlaneGeometry(size.width, size.depth);
        const mat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: roughness,
            metalness: 0
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.02;
        mesh.receiveShadow = true;
        group.add(mesh);

        // Add subtle label for terrain (smaller, more transparent)
        if (name) {
            const label = this.createTerrainLabel(name, type);
            label.position.set(0, 0.5, 0);
            group.add(label);
        }

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create water body with animated effect
     */
    createWater({ position, size, name }) {
        const group = new THREE.Group();

        // Water base
        const geo = new THREE.PlaneGeometry(size.width, size.depth, 20, 20);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x4a90d9,
            roughness: 0.1,
            metalness: 0.3,
            transparent: true,
            opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -0.1; // Slightly below ground
        mesh.receiveShadow = true;
        group.add(mesh);

        // Water edge/rim
        const rimGeo = new THREE.RingGeometry(
            Math.max(size.width, size.depth) / 2 - 0.3,
            Math.max(size.width, size.depth) / 2 + 0.3,
            32
        );
        const rimMat = new THREE.MeshStandardMaterial({
            color: 0x6b8e7e,
            roughness: 0.8
        });
        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.x = -Math.PI / 2;
        rim.position.y = 0.01;
        // Only add rim for smaller water bodies
        if (size.width < 20 && size.depth < 20) {
            group.add(rim);
        }

        // Label
        if (name) {
            const label = this.createTerrainLabel(name, 'water');
            label.position.set(0, 0.5, 0);
            group.add(label);
        }

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        // Store for animation
        this.waterMeshes = this.waterMeshes || [];
        this.waterMeshes.push(mesh);

        return group;
    }

    /**
     * Create a subtle label for terrain features
     */
    createTerrainLabel(name, type) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'terrain-label';
        
        const icons = {
            grass: '🌿',
            water: '💧',
            land: '🏜️',
            sand: '🏖️',
            stone: '🪨'
        };
        
        labelDiv.innerHTML = `${icons[type] || ''} ${name}`;
        
        const label = new THREE.CSS2DObject(labelDiv);
        return label;
    }

    /**
     * Create all structures from config
     */
    createStructures() {
        this.config.structures.forEach(structure => {
            switch (structure.type) {
                case 'building':
                    this.createBuilding(structure);
                    break;
                case 'arch':
                    this.createArch(structure);
                    break;
                case 'dome':
                    this.createDome(structure);
                    break;
                case 'tent':
                    this.createTent(structure);
                    break;
                case 'tower':
                    this.createTower(structure);
                    break;
                case 'stage':
                    this.createStage(structure);
                    break;
                default:
                    console.warn(`Unknown structure type: ${structure.type}`);
            }
        });
    }

    /**
     * Create decorative elements
     */
    createDecorations() {
        const { trees, paths } = this.config.decorations;

        // Create trees
        trees.forEach(tree => this.createTree(tree.x, tree.z));

        // Create paths
        paths.forEach(path => {
            this.createPath(path.from.x, path.from.z, path.to.x, path.to.z, path.width);
        });
    }


    /**
     * ========================================
     * STRUCTURE FACTORY METHODS
     * ========================================
     * Add new structure types here
     */

    /**
     * Create a floating label above a structure
     */
    createLabel(name, description, height, color) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'building-label';
        labelDiv.style.borderColor = `#${new THREE.Color(color).getHexString()}`;
        labelDiv.style.background = `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(${this.hexToRgb(color)},0.3) 100%)`;
        
        labelDiv.innerHTML = `
            <span class="label-name">${name}</span>
            ${description ? `<span class="label-desc">${description}</span>` : ''}
        `;
        
        const label = new THREE.CSS2DObject(labelDiv);
        label.position.set(0, height + 1.5, 0);
        
        return label;
    }

    /**
     * Helper to convert hex color to RGB string
     */
    hexToRgb(hex) {
        const color = new THREE.Color(hex);
        return `${Math.round(color.r * 255)},${Math.round(color.g * 255)},${Math.round(color.b * 255)}`;
    }

    /**
     * Create a basic building
     */
    createBuilding({ position, size, color, name, description }) {
        const group = new THREE.Group();
        const { width, height, depth } = size;

        // Main building body
        const geo = new THREE.BoxGeometry(width, height, depth);
        const mat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.7,
            metalness: 0.1
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = height / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);

        // Roof accent
        const roofGeo = new THREE.BoxGeometry(width + 0.5, 0.3, depth + 0.5);
        const roofMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color).multiplyScalar(0.7)
        });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = height + 0.15;
        roof.castShadow = true;
        group.add(roof);

        // Add floating label
        if (name) {
            const label = this.createLabel(name, description, height, color);
            group.add(label);
        }

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create an entrance arch with label
     */
    createArch({ position, color, signColor, name = 'Entrance', description = 'Main Entry' }) {
        const group = new THREE.Group();
        const pillarMat = new THREE.MeshStandardMaterial({ color });

        // Left pillar
        const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 7, 16);
        const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
        leftPillar.position.set(-4, 3.5, 0);
        leftPillar.castShadow = true;
        group.add(leftPillar);

        // Right pillar
        const rightPillar = new THREE.Mesh(pillarGeo, pillarMat);
        rightPillar.position.set(4, 3.5, 0);
        rightPillar.castShadow = true;
        group.add(rightPillar);

        // Top bar
        const topGeo = new THREE.BoxGeometry(10, 1, 1.5);
        const top = new THREE.Mesh(topGeo, pillarMat);
        top.position.set(0, 7.5, 0);
        top.castShadow = true;
        group.add(top);

        // Welcome sign
        const signGeo = new THREE.BoxGeometry(8, 2, 0.2);
        const signMat = new THREE.MeshStandardMaterial({ color: signColor });
        const sign = new THREE.Mesh(signGeo, signMat);
        sign.position.set(0, 9, 0);
        sign.castShadow = true;
        group.add(sign);

        // Add floating label
        const label = this.createLabel(name, description, 10, signColor);
        group.add(label);

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create a dome structure (e.g., planetarium, exhibition hall)
     */
    createDome({ position, radius, color, name, description }) {
        const group = new THREE.Group();

        // Base cylinder
        const baseGeo = new THREE.CylinderGeometry(radius, radius, 1, 32);
        const baseMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color).multiplyScalar(0.8),
            roughness: 0.7
        });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.5;
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        // Dome
        const domeGeo = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.5,
            metalness: 0.2
        });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.y = 1;
        dome.castShadow = true;
        group.add(dome);

        // Add floating label
        if (name) {
            const label = this.createLabel(name, description, radius + 1, color);
            group.add(label);
        }

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create a tent structure (e.g., outdoor events)
     */
    createTent({ position, size, color, name, description }) {
        const group = new THREE.Group();
        const { width, height, depth } = size;

        // Tent using cone geometry
        const tentGeo = new THREE.ConeGeometry(Math.max(width, depth) / 1.5, height, 4);
        const tentMat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.8,
            side: THREE.DoubleSide
        });
        const tent = new THREE.Mesh(tentGeo, tentMat);
        tent.position.y = height / 2;
        tent.rotation.y = Math.PI / 4;
        tent.castShadow = true;
        group.add(tent);

        // Poles at corners
        const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, height * 0.7, 8);
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        
        const polePositions = [
            [-width/3, -depth/3],
            [width/3, -depth/3],
            [-width/3, depth/3],
            [width/3, depth/3]
        ];
        
        polePositions.forEach(([px, pz]) => {
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.position.set(px, height * 0.35, pz);
            group.add(pole);
        });

        // Add floating label
        if (name) {
            const label = this.createLabel(name, description, height, color);
            group.add(label);
        }

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create a tower structure (e.g., observation tower, info kiosk)
     */
    createTower({ position, radius, height, color, name, description }) {
        const group = new THREE.Group();

        // Main tower body
        const towerGeo = new THREE.CylinderGeometry(radius * 0.8, radius, height, 16);
        const towerMat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.6,
            metalness: 0.2
        });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.y = height / 2;
        tower.castShadow = true;
        group.add(tower);

        // Observation deck
        const deckGeo = new THREE.CylinderGeometry(radius * 1.5, radius * 1.5, 0.5, 16);
        const deckMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color).multiplyScalar(0.7)
        });
        const deck = new THREE.Mesh(deckGeo, deckMat);
        deck.position.y = height;
        deck.castShadow = true;
        group.add(deck);

        // Top spire
        const spireGeo = new THREE.ConeGeometry(radius * 0.3, height * 0.3, 8);
        const spire = new THREE.Mesh(spireGeo, towerMat);
        spire.position.y = height + height * 0.15 + 0.25;
        spire.castShadow = true;
        group.add(spire);

        // Add floating label
        if (name) {
            const label = this.createLabel(name, description, height + height * 0.3 + 0.5, color);
            group.add(label);
        }

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create a performance stage with backdrop
     */
    createStage({ position, size, color, name, description }) {
        const group = new THREE.Group();
        const { width, height, depth } = size;

        // Stage platform
        const platformGeo = new THREE.BoxGeometry(width, 1, depth);
        const platformMat = new THREE.MeshStandardMaterial({
            color: 0x2c2c2c,
            roughness: 0.6
        });
        const platform = new THREE.Mesh(platformGeo, platformMat);
        platform.position.y = 0.5;
        platform.castShadow = true;
        platform.receiveShadow = true;
        group.add(platform);

        // Backdrop
        const backdropGeo = new THREE.BoxGeometry(width, height, 0.5);
        const backdropMat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.5
        });
        const backdrop = new THREE.Mesh(backdropGeo, backdropMat);
        backdrop.position.set(0, height / 2 + 1, -depth / 2 + 0.25);
        backdrop.castShadow = true;
        group.add(backdrop);

        // Side panels
        const sideMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color).multiplyScalar(0.7)
        });
        
        const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(0.5, height * 0.8, depth * 0.3), sideMat);
        leftPanel.position.set(-width / 2 + 0.25, height * 0.4 + 1, -depth / 4);
        leftPanel.castShadow = true;
        group.add(leftPanel);

        const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(0.5, height * 0.8, depth * 0.3), sideMat);
        rightPanel.position.set(width / 2 - 0.25, height * 0.4 + 1, -depth / 4);
        rightPanel.castShadow = true;
        group.add(rightPanel);

        // Stage lights (decorative)
        const lightGeo = new THREE.SphereGeometry(0.3, 8, 8);
        const lightMat = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 0.5
        });
        
        for (let i = 0; i < 5; i++) {
            const light = new THREE.Mesh(lightGeo, lightMat);
            light.position.set(-width / 2 + 1 + i * (width - 2) / 4, height + 0.5, -depth / 2 + 0.5);
            group.add(light);
        }

        // Add floating label
        if (name) {
            const label = this.createLabel(name, description, height + 1, color);
            group.add(label);
        }

        group.position.set(position.x, 0, position.z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create a tree
     */
    createTree(x, z) {
        const group = new THREE.Group();

        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 2, 8);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 1;
        trunk.castShadow = true;
        group.add(trunk);

        // Foliage
        const foliageGeo = new THREE.SphereGeometry(2, 8, 6);
        const foliageMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
        const foliage = new THREE.Mesh(foliageGeo, foliageMat);
        foliage.position.y = 3.5;
        foliage.castShadow = true;
        group.add(foliage);

        group.position.set(x, 0, z);
        this.scene.add(group);

        return group;
    }

    /**
     * Create a path between two points
     */
    createPath(x1, z1, x2, z2, width) {
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2));
        const angle = Math.atan2(z2 - z1, x2 - x1);

        const pathGeo = new THREE.PlaneGeometry(length, width);
        const pathMat = new THREE.MeshStandardMaterial({
            color: 0x555555,
            roughness: 0.9
        });
        const path = new THREE.Mesh(pathGeo, pathMat);
        path.rotation.x = -Math.PI / 2;
        path.rotation.z = -angle;
        path.position.set((x1 + x2) / 2, 0.02, (z1 + z2) / 2);
        this.scene.add(path);

        return path;
    }


    /**
     * ========================================
     * EVENT HANDLERS
     * ========================================
     */

    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize);
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
        this.renderer.domElement.addEventListener('touchstart', this.onTouchStart);
    }

    removeEventListeners() {
        window.removeEventListener('resize', this.onWindowResize);
        this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
        this.renderer.domElement.removeEventListener('touchstart', this.onTouchStart);
    }

    onWindowResize() {
        const container = document.getElementById(this.containerId);
        if (!container || !this.camera || !this.renderer) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.checkIntersection(event.clientX, event.clientY);
    }

    onTouchStart(event) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            this.checkIntersection(touch.clientX, touch.clientY);
        }
    }

    checkIntersection(clientX, clientY) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveObjects);

        const popup = document.getElementById('location-popup');
        if (!popup) return;

        if (intersects.length > 0) {
            const obj = intersects[0].object;
            const data = obj.userData;

            popup.innerHTML = `
                <strong style="color: #${new THREE.Color(data.color).getHexString()}">${data.name}</strong>
                <br><span style="opacity: 0.8">${data.description}</span>
            `;
            popup.style.display = 'block';
            popup.style.left = clientX + 15 + 'px';
            popup.style.top = clientY + 15 + 'px';

            document.body.style.cursor = 'pointer';
        } else {
            popup.style.display = 'none';
            document.body.style.cursor = 'default';
        }
    }

    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(this.animate);
        this.controls.update();
        
        // Animate water
        if (this.waterMeshes && this.waterMeshes.length > 0) {
            const time = Date.now() * 0.001;
            this.waterMeshes.forEach(water => {
                water.material.opacity = 0.75 + Math.sin(time * 2) * 0.1;
            });
        }
        
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
    }

    /**
     * Resize handler for external calls
     */
    resize() {
        setTimeout(() => {
            this.onWindowResize();
        }, 100);
    }

    /**
     * Cleanup method
     */
    destroy() {
        this.removeEventListeners();
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}


/**
 * ========================================
 * GLOBAL INSTANCE & INITIALIZATION
 * ========================================
 */

let venueMap = null;

function init() {
    venueMap = new VenueMap('canvas-container', VENUE_CONFIG);
    venueMap.init();
}

function reinitializeMap() {
    if (venueMap) {
        venueMap.resize();
    }
}





// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
