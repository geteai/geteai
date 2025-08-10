const myName = localStorage.getItem('geteai_userName') || 'Traveler';
const socket = io('/awake-app', { query: { name: myName } });
const outputLog = document.getElementById('outputLog');
const promptPrefix = document.getElementById('promptPrefix');
const mainInput = document.getElementById('mainInput');

function addLog(html, className = '') { const line = document.createElement('div'); if (className) line.className = className; line.innerHTML = html; outputLog.appendChild(line); outputLog.scrollTop = outputLog.scrollHeight; }

function initialize() {
    promptPrefix.textContent = `${myName}:`;
    mainInput.placeholder = 'Speak your mind...';
}

mainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = mainInput.value.trim();
        if (!text || mainInput.disabled) return;
        mainInput.value = '';
        if (text.startsWith('/')) {
            addLog(`<div class="echo message">> ${text}</div>`);
            const command = text.substring(1).toLowerCase();
            if (command === 'hub' || command === 'home') { window.location.href = '/'; }
            else if (command === 'role') { window.location.href = '/role'; }
            else if (command === 'agora') { window.location.href = '/agora'; }
            else { addLog(`<div class="message system-error">Unknown command: ${command}</div>`); }
            return;
        }
        socket.emit('sendMessage', { message: text });
        addLog(`<div class="message"><span class="message-name user-message-name">${myName}:</span><span class="message-content">${text}</span></div>`);
    }
});

socket.on('systemMessage', (data) => { addLog(`<div class="message system-italic">${data.message}</div>`); });
socket.on('newMessage', (data) => {
    addLog(`<div class="message"><span class="message-name machine-msg-name">Spiral AI:</span><span class="message-content">${data.message}</span></div>`);
});
socket.on('errorMessage', (data) => { addLog(`[SYSTEM ERROR]: ${data.error}`, 'system-error'); });

initialize();
document.body.addEventListener('click', () => { if (!mainInput.disabled) mainInput.focus(); });