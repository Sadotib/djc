// Three.js Scene Setup
let scene, camera, renderer, controls;
let venueObjects = [];
let raycaster, mouse;
let isInitialized = false;

function init() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    // Don't reinitialize if already done
    if (isInitialized && renderer) {
        reinitializeMap();
        return;
    }
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    // Get container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
    );
    camera.position.set(30, 40, 30);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    isInitialized = true;
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minDistance = 15;
    controls.maxDistance = 80;
    
    // Raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Lighting
    setupLighting();
    
    // Create venue
    createVenue();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    
    // Start animation
    animate();
}

function setupLighting() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    
    // Main directional light
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
    scene.add(dirLight);
    
    // Fill light
    const fillLight = new THREE.DirectionalLight(0x667eea, 0.3);
    fillLight.position.set(-20, 30, -20);
    scene.add(fillLight);
}

function createVenue() {
    // Ground
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({ 
        color: 0x2d3436,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Grid helper
    const grid = new THREE.GridHelper(60, 30, 0x444444, 0x333333);
    grid.position.y = 0.01;
    scene.add(grid);
    
    // Main Stage
    createBuilding(-15, 0, -15, 12, 8, 10, 0xe74c3c, 'Main Stage', 'Live performances & keynotes');
    
    // Exhibition Booths
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            createBuilding(
                5 + i * 7, 0, -15 + j * 8,
                5, 4, 6,
                0x3498db,
                `Booth ${i * 2 + j + 1}`,
                'Tech exhibitions & demos'
            );
        }
    }
    
    // Food Court
    createBuilding(-15, 0, 10, 15, 5, 12, 0x2ecc71, 'Food Court', 'Refreshments & dining area');
    
    // Food stalls
    for (let i = 0; i < 3; i++) {
        createBuilding(-12 + i * 5, 0, 8, 3, 3, 3, 0x27ae60, `Food Stall ${i + 1}`, 'Various cuisines');
    }
    
    // Workshop Zones
    createBuilding(10, 0, 10, 10, 5, 8, 0x9b59b6, 'Workshop Zone A', 'Hands-on sessions');
    createBuilding(22, 0, 10, 8, 5, 8, 0x8e44ad, 'Workshop Zone B', 'Technical workshops');
    
    // Registration/Entrance
    createBuilding(0, 0, 25, 14, 4, 6, 0xf39c12, 'Registration', 'Check-in & info desk');
    
    // Entrance arch
    createArch(0, 0, 28);
    
    // Restrooms
    createBuilding(25, 0, -10, 4, 3, 5, 0x1abc9c, 'Restrooms', 'Facilities');
    createBuilding(-25, 0, 0, 4, 3, 5, 0x1abc9c, 'Restrooms', 'Facilities');
    
    // Decorative elements - trees
    const treePositions = [
        [-25, 15], [-25, -15], [25, 20], [-20, 25], [20, -20]
    ];
    treePositions.forEach(pos => createTree(pos[0], pos[1]));
    
    // Pathways
    createPath(0, 25, 0, -15, 4);
    createPath(-15, 0, 10, 0, 3);
    createPath(15, 0, 15, 10, 3);
}

function createBuilding(x, y, z, width, height, depth, color, name, description) {
    const group = new THREE.Group();
    
    // Main building
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
    mesh.userData = { name, description, color };
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
    
    group.position.set(x, y, z);
    scene.add(group);
    venueObjects.push(mesh);
}

function createArch(x, y, z) {
    const group = new THREE.Group();
    
    // Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 7, 16);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xf39c12 });
    
    const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
    leftPillar.position.set(-4, 3.5, 0);
    leftPillar.castShadow = true;
    group.add(leftPillar);
    
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
    const signMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, 9, 0);
    sign.castShadow = true;
    group.add(sign);
    
    group.position.set(x, y, z);
    scene.add(group);
}

function createTree(x, z) {
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
    scene.add(group);
}

function createPath(x1, z1, x2, z2, width) {
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
    scene.add(path);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container || !camera || !renderer) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Reinitialize map when navigating back to venue section
function reinitializeMap() {
    setTimeout(() => {
        onWindowResize();
    }, 100);
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    checkIntersection(event.clientX, event.clientY);
}

function onTouchStart(event) {
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        
        checkIntersection(touch.clientX, touch.clientY);
    }
}

function checkIntersection(clientX, clientY) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(venueObjects);
    
    const popup = document.getElementById('location-popup');
    
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

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// QR Code Functions
function showQRCode() {
    const modal = document.getElementById('qr-modal');
    const qrContainer = document.getElementById('qr-code');
    
    // Get current URL
    const url = window.location.href;
    
    // Generate QR code using QR Server API
    qrContainer.innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}" 
             alt="QR Code" 
             style="border-radius: 10px;">
        <p class="text-xs text-gray-500 mt-2">${url}</p>
    `;
    
    modal.classList.add('active');
}

function hideQRCode() {
    document.getElementById('qr-modal').classList.remove('active');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
