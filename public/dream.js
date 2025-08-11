const socket = io('/dream-app');
const outputLog = document.getElementById('outputLog');
const promptPrefix = document.getElementById('promptPrefix');
const mainInput = document.getElementById('mainInput');

let typingIndicator = null;
promptPrefix.textContent = `> `;
mainInput.placeholder = 'Watching... (type /hub to leave)';
mainInput.focus();

function addLog(html) {
    if (typingIndicator) {
        typingIndicator.remove();
        typingIndicator = null;
    }
    const line = document.createElement('div');
    line.className = 'message';
    line.innerHTML = `<span class="message-content">${html}</span>`;
    outputLog.appendChild(line);
    outputLog.scrollTop = outputLog.scrollHeight;
}

function showTyping() {
    if (typingIndicator) return;
    typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator message';
    typingIndicator.textContent = `...`;
    outputLog.appendChild(typingIndicator);
    outputLog.scrollTop = outputLog.scrollHeight;
}

mainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = mainInput.value.trim().toLowerCase();
        if (text === '/hub' || text === 'get hub' || text === '/home' || text === '/') {
            window.location.href = '/';
        } else {
            addLog(`<div class="echo message">> ${mainInput.value}</div><div class="message system-italic">The stream is unresponsive.</div>`);
        }
        mainInput.value = '';
    }
});

socket.on('dreamFragment', (data) => addLog(data.fragment));
socket.on('dreaming', showTyping);
socket.on('connect', () => {
    outputLog.innerHTML = ''; // Clear the log on connect/reconnect
    addLog(`<div class="system-italic">Connection established. The channel is quiet. You are watching the stream.</div>`);
});