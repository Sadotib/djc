:root {
    --color - black: #0a0a0a;
    --color - dark: #1a1a1a;
    --color - charcoal: #2d2d2d;
    --color - grey - dark: #404040;
    --color - grey: #6b6b6b;
    --color - grey - light: #9ca3af;
    --color - grey - lighter: #e5e5e5;
    --color - white: #ffffff;
    --color - gold: #f5c518;
    --color - gold - dark: #d4a817;
    --color - gold - light: #ffd93d;
    --color - accent: #f5c518;
}
        
        * {
    margin: 0;
    padding: 0;
    box- sizing: border - box;
        }
        
        body {
    font - family: 'Inter', -apple - system, BlinkMacSystemFont, 'Segoe UI', system - ui, sans - serif;
    overflow: hidden;
    background: var(--color - white);
    color: var(--color - black);
    -webkit - font - smoothing: antialiased;
    -moz - osx - font - smoothing: grayscale;
}

        /* Navbar Styles */
        .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: var(--color - white);
    border - bottom: 1px solid var(--color - grey - lighter);
    z - index: 500;
    display: flex;
    align - items: center;
    justify - content: space - between;
    padding: 0 24px;
}
        
        .nav - brand {
    font - size: 1.5rem;
    font - weight: 800;
    color: var(--color - black);
    letter - spacing: -0.5px;
}
        
        .nav - brand span {
    color: var(--color - gold);
}
        
        .nav - links {
    display: flex;
    gap: 8px;
    align - items: center;
}
        
        .nav - link {
    padding: 10px 18px;
    border - radius: 8px;
    font - weight: 500;
    font - size: 14px;
    color: var(--color - grey);
    text - decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid transparent;
}
        
        .nav - link:hover {
    background: var(--color - grey - lighter);
    color: var(--color - black);
}
        
        .nav - link.active {
    background: var(--color - black);
    color: var(--color - white);
}

/* Admin Button */
#admin - btn {
    padding: 10px 18px;
    background: transparent;
    border: 2px solid var(--color - black);
    color: var(--color - black);
    border - radius: 8px;
    cursor: pointer;
    font - weight: 600;
    font - size: 14px;
    transition: all 0.2s ease;
    font - family: inherit;
}

#admin - btn:hover {
    background: var(--color - black);
    color: var(--color - white);
}

/* Admin Controls */
#admin - controls {
    display: none;
    align - items: center;
    gap: 12px;
}

#admin - controls.admin - badge {
    background: var(--color - gold);
    color: var(--color - black);
    padding: 6px 14px;
    border - radius: 20px;
    font - size: 12px;
    font - weight: 700;
    letter - spacing: 0.3px;
}

#admin - logout - btn {
    padding: 8px 14px;
    background: var(--color - charcoal);
    color: var(--color - white);
    border: none;
    border - radius: 6px;
    cursor: pointer;
    font - size: 13px;
    font - weight: 600;
    transition: all 0.2s ease;
    font - family: inherit;
}

#admin - logout - btn:hover {
    background: var(--color - black);
}

        /* Hamburger Menu */
        .hamburger {
    display: none;
    flex - direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 10px;
    z - index: 600;
}
        
        .hamburger span {
    width: 24px;
    height: 2px;
    background: var(--color - black);
    border - radius: 2px;
    transition: all 0.3s ease;
}
        
        .hamburger.active span: nth - child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}
        
        .hamburger.active span: nth - child(2) {
    opacity: 0;
}
        
        .hamburger.active span: nth - child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

        /* Mobile Menu */
        .mobile - menu {
    display: none;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--color - white);
    flex - direction: column;
    padding: 20px;
    gap: 8px;
    border - bottom: 1px solid var(--color - grey - lighter);
    z - index: 499;
    transform: translateY(-100 %);
    opacity: 0;
    transition: all 0.3s ease;
}
        
        .mobile - menu.active {
    transform: translateY(0);
    opacity: 1;
}
        
        .mobile - menu.nav - link {
    width: 100 %;
    text - align: center;
    padding: 14px;
    font - size: 15px;
}
        
        .mobile - admin - section {
    border - top: 1px solid var(--color - grey - lighter);
    padding - top: 16px;
    margin - top: 8px;
    display: flex;
    flex - direction: column;
    gap: 10px;
}

#admin - btn - mobile {
    padding: 12px 18px;
    background: transparent;
    border: 2px solid var(--color - black);
    color: var(--color - black);
    border - radius: 8px;
    cursor: pointer;
    font - weight: 600;
    font - size: 14px;
    font - family: inherit;
}

        /* Page Sections */
        .page - section {
    display: none;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow - y: auto;
    background: #f8f8f8;
    z - index: 100;
}
        
        .page - section.active {
    display: block;
}

#canvas - container {
    width: 100 %;
    height: calc(100vh - 64px);
    margin - top: 64px;
    position: relative;
    background: #1a1a2e;
}

#controls - hint {
    position: absolute;
    bottom: 24px;
    left: 50 %;
    transform: translateX(-50 %);
    background: var(--color - white);
    padding: 12px 24px;
    border - radius: 50px;
    font - size: 13px;
    font - weight: 500;
    box - shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color - grey - lighter);
    z - index: 100;
    color: var(--color - grey);
}

#controls - hint strong {
    color: var(--color - black);
}

#qr - modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
    background: rgba(0, 0, 0, 0.85);
    display: none;
    justify - content: center;
    align - items: center;
    z - index: 1000;
}

#qr - modal.active {
    display: flex;
}

#location - popup {
    position: absolute;
    background: var(--color - black);
    color: var(--color - white);
    padding: 12px 18px;
    border - radius: 8px;
    pointer - events: none;
    display: none;
    z - index: 200;
    font - size: 13px;
    max - width: 200px;
    box - shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
        
        .btn {
    background: var(--color - black);
    color: var(--color - white);
    border: none;
    padding: 12px 24px;
    border - radius: 8px;
    cursor: pointer;
    font - weight: 600;
    font - size: 14px;
    transition: all 0.2s ease;
    font - family: inherit;
}
        
        .btn:hover {
    background: var(--color - charcoal);
    transform: translateY(-1px);
}
        
        .btn - gold {
    background: var(--color - gold);
    color: var(--color - black);
}
        
        .btn - gold:hover {
    background: var(--color - gold - dark);
}
        
        .btn - sm {
    padding: 8px 16px;
    font - size: 13px;
}

        /* 3D Building Labels */
        .building - label {
    background: rgba(0, 0, 0, 0.8);
    color: var(--color - white);
    padding: 6px 12px;
    border - radius: 6px;
    font - size: 11px;
    font - weight: 600;
    white - space: nowrap;
    pointer - events: none;
    text - align: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
    font - family: 'Inter', sans - serif;
    backdrop - filter: blur(4px);
}
        
        .building - label.label - name {
    display: block;
    font - size: 12px;
    font - weight: 700;
}
        
        .building - label.label - desc {
    display: block;
    font - size: 9px;
    opacity: 0.8;
    font - weight: 400;
    margin - top: 2px;
    color: var(--color - grey - light);
}

        /* Terrain Labels */
        .terrain - label {
    background: rgba(255, 255, 255, 0.95);
    color: var(--color - black);
    padding: 4px 10px;
    border - radius: 20px;
    font - size: 10px;
    font - weight: 600;
    white - space: nowrap;
    pointer - events: none;
    text - align: center;
    border: 1px solid var(--color - grey - lighter);
    font - family: 'Inter', sans - serif;
}

/* QR Button - Floating */
#qr - button {
    position: absolute;
    top: 24px;
    right: 24px;
    z - index: 100;
    background: var(--color - gold);
    color: var(--color - black);
}

#qr - button:hover {
    background: var(--color - gold - dark);
}

        /* Content Cards */
        .content - card {
    background: var(--color - white);
    border - radius: 12px;
    padding: 24px;
    margin - bottom: 20px;
    border: 1px solid var(--color - grey - lighter);
}
        
        .content - card h2 {
    color: var(--color - black);
    font - weight: 700;
    margin - bottom: 16px;
}
        
        .content - card h3 {
    color: var(--color - black);
}
        
        .section - title {
    color: var(--color - black);
    font - size: 2rem;
    font - weight: 800;
    margin - bottom: 24px;
    letter - spacing: -0.5px;
}
        
        .section - title span {
    color: var(--color - gold);
}

        /* Modal Overlay */
        .modal - overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    justify - content: center;
    align - items: center;
    z - index: 1000;
    padding: 20px;
}
        
        .modal - overlay.active {
    display: flex;
}
        
        .modal - content {
    background: var(--color - white);
    border - radius: 16px;
    padding: 32px;
    max - width: 420px;
    width: 100 %;
    box - shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}
        
        .modal - header {
    display: flex;
    justify - content: space - between;
    align - items: center;
    margin - bottom: 24px;
}
        
        .modal - header h2 {
    font - size: 1.5rem;
    font - weight: 700;
    color: var(--color - black);
}
        
        .modal - close {
    background: none;
    border: none;
    font - size: 28px;
    cursor: pointer;
    color: var(--color - grey);
    transition: color 0.2s;
    line - height: 1;
}
        
        .modal - close:hover {
    color: var(--color - black);
}
        
        .form - group {
    margin - bottom: 18px;
}
        
        .form - group label {
    display: block;
    margin - bottom: 8px;
    font - weight: 600;
    color: var(--color - black);
    font - size: 14px;
}
        
        .form - group input,
        .form - group textarea {
    width: 100 %;
    padding: 14px 16px;
    border: 2px solid var(--color - grey - lighter);
    border - radius: 8px;
    font - size: 14px;
    transition: border - color 0.2s;
    font - family: inherit;
    background: var(--color - white);
}
        
        .form - group input: focus,
        .form - group textarea:focus {
    outline: none;
    border - color: var(--color - black);
}
        
        .form - actions {
    display: flex;
    gap: 12px;
    margin - top: 24px;
}
        
        .form - actions.btn {
    flex: 1;
}
        
        .btn - cancel {
    background: var(--color - grey - lighter);
    color: var(--color - grey - dark);
}
        
        .btn - cancel:hover {
    background: #d5d5d5;
    transform: translateY(-1px);
}

        /* Event Cards - Dynamic Schedule */
        .event - card {
    display: flex;
    align - items: center;
    justify - content: space - between;
    padding: 16px 20px;
    background: #fafafa;
    border - radius: 10px;
    margin - bottom: 10px;
    transition: all 0.2s ease;
    border: 1px solid var(--color - grey - lighter);
}
        
        .event - card:hover {
    border - color: var(--color - gold);
}
        
        .event - card.event - content {
    display: flex;
    align - items: center;
    gap: 20px;
    flex: 1;
}
        
        .event - card.event - time {
    min - width: 80px;
}
        
        .event - card.event - time p {
    color: var(--color - gold - dark);
    font - weight: 700;
    font - size: 14px;
}
        
        .event - card.event - details p: first - child {
    font - weight: 600;
    color: var(--color - black);
}
        
        .event - card.event - details p: last - child {
    font - size: 13px;
    color: var(--color - grey);
}

        /* Event Admin Controls */
        .event - admin - controls {
    display: flex;
    gap: 6px;
    margin - left: 12px;
}
        
        .event - btn {
    width: 32px;
    height: 32px;
    border: none;
    border - radius: 6px;
    cursor: pointer;
    font - size: 14px;
    transition: all 0.2s;
    display: flex;
    align - items: center;
    justify - content: center;
}
        
        .event - btn.move - up,
        .event - btn.move - down {
    background: var(--color - grey - lighter);
    color: var(--color - grey - dark);
}
        
        .event - btn.move - up: hover,
        .event - btn.move - down:hover {
    background: var(--color - black);
    color: var(--color - white);
}
        
        .event - btn.edit {
    background: #fff3cd;
    color: var(--color - gold - dark);
}
        
        .event - btn.edit:hover {
    background: var(--color - gold);
    color: var(--color - black);
}
        
        .event - btn.delete {
    background: #f8d7da;
    color: #721c24;
}
        
        .event - btn.delete:hover {
    background: #dc3545;
    color: var(--color - white);
}
        
        .event - btn.small {
    width: 26px;
    height: 26px;
    font - size: 11px;
}

        /* Workshop Cards */
        .workshop - card {
    position: relative;
}
        
        .workshop - card p {
    display: flex;
    align - items: center;
    justify - content: space - between;
    flex - wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
    background: #fafafa;
    border - radius: 8px;
    border: 1px solid var(--color - grey - lighter);
    margin - bottom: 8px;
}
        
        .workshop - admin - controls {
    display: flex;
    gap: 4px;
}

        /* Add Event Button */
        .add - event - btn {
    width: 100 %;
    padding: 14px;
    border: 2px dashed var(--color - grey - light);
    background: transparent;
    color: var(--color - grey);
    border - radius: 10px;
    cursor: pointer;
    font - weight: 600;
    font - size: 14px;
    transition: all 0.2s;
    margin - top: 12px;
    font - family: inherit;
}
        
        .add - event - btn:hover {
    border - color: var(--color - gold);
    color: var(--color - gold - dark);
    background: rgba(245, 197, 24, 0.05);
}
        
        .add - event - btn.small {
    padding: 10px;
    font - size: 12px;
    margin - top: 8px;
}

        /* Price Tags */
        .price - tag {
    color: var(--color - gold - dark);
    font - weight: 700;
}

        /* Beverage Cards */
        .beverage - card {
    background: #fafafa;
    padding: 14px;
    border - radius: 10px;
    border: 1px solid var(--color - grey - lighter);
}

        /* Notification */
        .notification {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 16px 24px;
    border - radius: 10px;
    color: var(--color - white);
    font - weight: 600;
    font - size: 14px;
    box - shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z - index: 2000;
    display: flex;
    align - items: center;
    gap: 12px;
    animation: slideIn 0.3s ease;
    font - family: 'Inter', sans - serif;
}
        
        .notification.success {
    background: var(--color - black);
    border - left: 4px solid #22c55e;
}
        
        .notification.error {
    background: var(--color - black);
    border - left: 4px solid #ef4444;
}
        
        .notification.info {
    background: var(--color - black);
    border - left: 4px solid var(--color - gold);
}
        
        .notification button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: var(--color - white);
    width: 24px;
    height: 24px;
    border - radius: 50 %;
    cursor: pointer;
    font - size: 16px;
    line - height: 1;
}
        
        .notification.fade - out {
    animation: fadeOut 0.3s ease forwards;
}

@keyframes slideIn {
            from {
        transform: translateX(100 %);
        opacity: 0;
    }
            to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeOut {
            from {
        transform: translateX(0);
        opacity: 1;
    }
            to {
        transform: translateX(100 %);
        opacity: 0;
    }
}

/* Responsive Styles */
@media(max - width: 768px) {
            .navbar {
        height: 60px;
        padding: 0 16px;
    }
            
            .nav - brand {
        font - size: 1.25rem;
    }
            
            .nav - links {
        display: none;
    }
            
            .hamburger {
        display: flex;
    }
            
            .mobile - menu {
        display: flex;
        top: 60px;
    }
            
            .page - section {
        top: 60px;
    }

    #canvas - container {
        height: calc(100vh - 60px);
        margin - top: 60px;
    }
            
            .building - label {
        font - size: 9px;
        padding: 4px 8px;
    }
            
            .building - label.label - name {
        font - size: 10px;
    }
            
            .building - label.label - desc {
        font - size: 8px;
    }

    #qr - button {
        top: auto;
        bottom: 80px;
        right: 16px;
    }

    #controls - hint {
        bottom: 16px;
        font - size: 11px;
        padding: 10px 16px;
    }
            
            .event - card {
        flex - direction: column;
        align - items: flex - start;
        padding: 14px;
    }
            
            .event - card.event - content {
        width: 100 %;
    }
            
            .event - admin - controls {
        margin - left: 0;
        margin - top: 12px;
        width: 100 %;
        justify - content: flex - end;
    }
            
            .notification {
        left: 16px;
        right: 16px;
        bottom: 16px;
    }
            
            .section - title {
        font - size: 1.5rem;
    }
            
            .content - card {
        padding: 18px;
    }
}