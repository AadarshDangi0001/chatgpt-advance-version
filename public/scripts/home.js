// Minimal JS for chat input demo (replace with real logic as needed)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chat-input-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // Connect to socket.io server
    const socket = io();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = text;
        messages.appendChild(userMsg);
        messages.scrollTop = messages.scrollHeight;
        input.value = '';

        try {
            socket.emit('ai-message', text);
        } catch (error) {
            console.error('Socket error:', error);
        }
    });

    // Listen for AI response
    socket.on('ai-message-response', function(result) {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.textContent = result;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
    });

    function openSidebar() {
        sidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('hide');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('hide');
    }

    if (menuIcon && sidebar) {
        menuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebar();
        });
    }
    // Optional: close sidebar when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            closeSidebar();
        }
    });
});
