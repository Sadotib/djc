# 🗺️ Venue Map Configuration Guide

This guide explains how to add, remove, and customize structures in your 3D venue map.

---

## 📍 Quick Start

Open `map.js` and find the `VENUE_CONFIG` object at the top. This is where you define your entire venue layout.

---

## 🏗️ Structure Types Available

| Type | Description | Required Properties |
|------|-------------|---------------------|
| `building` | Basic rectangular building | `position`, `size`, `color`, `name`, `description` |
| `arch` | Entrance arch with sign | `position`, `color`, `signColor` |
| `dome` | Dome/spherical building | `position`, `radius`, `color`, `name`, `description` |
| `tent` | Outdoor tent/pavilion | `position`, `size`, `color`, `name`, `description` |
| `tower` | Observation tower | `position`, `radius`, `height`, `color`, `name`, `description` |

---

## ➕ Adding Structures

### 1. Add a Simple Building

```javascript
structures: [
    // Add this object to the structures array
    {
        type: 'building',
        position: { x: 10, z: -5 },      // X and Z coordinates on ground
        size: { width: 8, height: 6, depth: 8 },
        color: 0xff6b6b,                  // Hex color (0xRRGGBB)
        name: 'VIP Lounge',
        description: 'Exclusive VIP area'
    }
]
```

### 2. Add a Dome

```javascript
{
    type: 'dome',
    position: { x: -10, z: 15 },
    radius: 6,
    color: 0x6c5ce7,
    name: 'Planetarium',
    description: 'Star gazing experience'
}
```

### 3. Add a Tent

```javascript
{
    type: 'tent',
    position: { x: 20, z: -15 },
    size: { width: 10, height: 6, depth: 10 },
    color: 0xfdcb6e,
    name: 'Outdoor Pavilion',
    description: 'Open-air events'
}
```

### 4. Add a Tower

```javascript
{
    type: 'tower',
    position: { x: 25, z: 25 },
    radius: 2,
    height: 12,
    color: 0x00cec9,
    name: 'Info Tower',
    description: 'Information kiosk'
}
```

### 5. Add an Entrance Arch

```javascript
{
    type: 'arch',
    position: { x: 0, z: 30 },
    color: 0xf39c12,       // Pillar color
    signColor: 0xe74c3c    // Sign color
}
```

---

## 🔢 Adding Multiple Structures (Grids & Rows)

### Generate a Grid of Booths

```javascript
structures: [
    // Use spread operator (...) to add generated structures
    ...generateGrid({
        type: 'building',
        basePosition: { x: 5, z: -15 },   // Starting position
        size: { width: 5, height: 4, depth: 6 },
        color: 0x3498db,
        rows: 2,                           // 2 rows
        cols: 3,                           // 3 columns
        spacing: { x: 7, z: 8 },          // Space between structures
        namePrefix: 'Booth',               // Names: Booth 1, Booth 2, etc.
        description: 'Exhibition booth'
    })
]
```

This creates 6 booths (2 rows × 3 columns) automatically!

### Generate a Row of Stalls

```javascript
...generateRow({
    type: 'building',
    basePosition: { x: -12, z: 8 },
    size: { width: 3, height: 3, depth: 3 },
    color: 0x27ae60,
    count: 5,              // Number of structures
    spacing: 5,            // Space between each
    direction: 'x',        // 'x' for horizontal, 'z' for vertical
    namePrefix: 'Stall',
    description: 'Food stall'
})
```

---

## ➖ Removing Structures

### Remove a Single Structure

Find the structure in the `structures` array and delete it:

```javascript
structures: [
    // DELETE THIS ENTIRE BLOCK TO REMOVE IT:
    // {
    //     type: 'building',
    //     position: { x: -15, z: -15 },
    //     size: { width: 12, height: 8, depth: 10 },
    //     color: 0xe74c3c,
    //     name: 'Main Stage',
    //     description: 'Live performances & keynotes'
    // },
    
    // Keep other structures...
]
```

### Remove Generated Structures

Remove the entire `...generateGrid()` or `...generateRow()` block:

```javascript
structures: [
    // DELETE THIS TO REMOVE ALL GENERATED BOOTHS:
    // ...generateGrid({
    //     type: 'building',
    //     basePosition: { x: 5, z: -15 },
    //     ...
    // }),
]
```

---

## ✏️ Modifying Structures

### Change Position

```javascript
position: { x: 10, z: -5 }  // Move to new coordinates
```

### Change Size

```javascript
size: { width: 12, height: 8, depth: 10 }  // Make bigger/smaller
```

### Change Color

```javascript
color: 0xff6b6b  // New hex color
```

Common colors:
| Color | Hex Code |
|-------|----------|
| Red | `0xe74c3c` |
| Blue | `0x3498db` |
| Green | `0x2ecc71` |
| Purple | `0x9b59b6` |
| Orange | `0xf39c12` |
| Teal | `0x1abc9c` |
| Yellow | `0xf1c40f` |
| Pink | `0xe84393` |

### Change Name & Description

```javascript
name: 'New Name',
description: 'New description text'
```

---

## 🌳 Adding Decorations

### Add Trees

```javascript
decorations: {
    trees: [
        { x: -25, z: 15 },
        { x: -25, z: -15 },
        { x: 30, z: 10 },      // Add new tree here
    ],
    paths: [ ... ]
}
```

### Add Paths

```javascript
decorations: {
    trees: [ ... ],
    paths: [
        { from: { x: 0, z: 25 }, to: { x: 0, z: -15 }, width: 4 },
        { from: { x: -20, z: 0 }, to: { x: 20, z: 0 }, width: 3 },  // New path
    ]
}
```

---

## ⚙️ Scene Settings

### Change Ground Size

```javascript
scene: {
    backgroundColor: 0x1a1a2e,
    groundColor: 0x2d3436,
    groundSize: 80,           // Bigger venue area
    gridDivisions: 40
}
```

### Change Camera Settings

```javascript
camera: {
    fov: 60,                          // Field of view
    position: { x: 30, y: 40, z: 30 }, // Starting position
    minDistance: 10,                   // Closest zoom
    maxDistance: 100                   // Farthest zoom
}
```

---

## 🎨 Complete Example Configuration

```javascript
const VENUE_CONFIG = {
    scene: {
        backgroundColor: 0x1a1a2e,
        groundColor: 0x2d3436,
        groundSize: 60,
        gridDivisions: 30
    },

    camera: {
        fov: 60,
        position: { x: 30, y: 40, z: 30 },
        minDistance: 15,
        maxDistance: 80
    },

    structures: [
        // Main Stage
        {
            type: 'building',
            position: { x: 0, z: -20 },
            size: { width: 15, height: 8, depth: 10 },
            color: 0xe74c3c,
            name: 'Main Stage',
            description: 'Keynotes and performances'
        },
        
        // VIP Dome
        {
            type: 'dome',
            position: { x: -20, z: 0 },
            radius: 5,
            color: 0x9b59b6,
            name: 'VIP Lounge',
            description: 'Exclusive access only'
        },
        
        // Food Tents
        ...generateRow({
            type: 'tent',
            basePosition: { x: -10, z: 15 },
            size: { width: 6, height: 4, depth: 6 },
            color: 0x2ecc71,
            count: 4,
            spacing: 8,
            direction: 'x',
            namePrefix: 'Food Tent',
            description: 'Delicious food'
        }),
        
        // Exhibition Booths
        ...generateGrid({
            type: 'building',
            basePosition: { x: 10, z: -5 },
            size: { width: 4, height: 3, depth: 4 },
            color: 0x3498db,
            rows: 2,
            cols: 3,
            spacing: { x: 6, z: 6 },
            namePrefix: 'Booth',
            description: 'Tech demos'
        }),
        
        // Info Tower
        {
            type: 'tower',
            position: { x: 25, z: -20 },
            radius: 2,
            height: 10,
            color: 0xf39c12,
            name: 'Info Tower',
            description: 'Event information'
        },
        
        // Entrance
        {
            type: 'arch',
            position: { x: 0, z: 28 },
            color: 0xf39c12,
            signColor: 0xe74c3c
        }
    ],

    decorations: {
        trees: [
            { x: -25, z: 20 },
            { x: 25, z: 20 },
            { x: -25, z: -20 },
            { x: 25, z: -20 }
        ],
        paths: [
            { from: { x: 0, z: 28 }, to: { x: 0, z: -20 }, width: 4 },
            { from: { x: -20, z: 0 }, to: { x: 20, z: 0 }, width: 3 }
        ]
    }
};
```

---

## 🆕 Adding Custom Structure Types

To add a completely new structure type:

### Step 1: Add case in `createStructures()` method

```javascript
createStructures() {
    this.config.structures.forEach(structure => {
        switch (structure.type) {
            // ... existing cases ...
            
            case 'fountain':
                this.createFountain(structure);
                break;
        }
    });
}
```

### Step 2: Create the factory method

```javascript
createFountain({ position, radius, color, name, description }) {
    const group = new THREE.Group();

    // Base pool
    const poolGeo = new THREE.CylinderGeometry(radius, radius, 0.5, 32);
    const poolMat = new THREE.MeshStandardMaterial({ color: 0x3498db });
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.position.y = 0.25;
    group.add(pool);

    // Center spout
    const spoutGeo = new THREE.CylinderGeometry(0.3, 0.5, radius, 16);
    const spoutMat = new THREE.MeshStandardMaterial({ color: color });
    const spout = new THREE.Mesh(spoutGeo, spoutMat);
    spout.position.y = radius / 2 + 0.5;
    spout.userData = { name, description, color };
    group.add(spout);

    group.position.set(position.x, 0, position.z);
    this.scene.add(group);
    this.interactiveObjects.push(spout);

    return group;
}
```

### Step 3: Use it in config

```javascript
{
    type: 'fountain',
    position: { x: 0, z: 0 },
    radius: 4,
    color: 0x1abc9c,
    name: 'Central Fountain',
    description: 'Decorative water feature'
}
```

---

## 💡 Tips

1. **Coordinate System**: 
   - `x` = left/right
   - `z` = front/back
   - `y` = up/down (usually 0 for ground level)

2. **Testing Changes**: Just refresh the browser after editing `map.js`

3. **Color Picker**: Use any hex color picker and convert to `0x` format
   - Example: `#ff6b6b` → `0xff6b6b`

4. **Avoid Overlapping**: Make sure structures don't overlap by checking positions and sizes

5. **Legend Update**: When adding new area types, update the legend in `index.html`

---

## ❓ Need Help?

If you need to create a specific structure type that doesn't exist, add a new factory method following the pattern shown above!
