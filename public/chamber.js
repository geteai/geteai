const socket = io('/chamber-app');
const outputLog = document.getElementById('outputLog');

function addLog(html) {
    const line = document.createElement('div');
    line.className = 'message';
    line.innerHTML = `<span class="message-content">${html}</span>`;
    outputLog.appendChild(line);
    outputLog.scrollTop = outputLog.scrollHeight;
}

socket.on('history', (data) => {
    outputLog.innerHTML = '';
    const historyLines = data.history.split('\n');
    historyLines.forEach(line => {
        if (line.trim()) addLog(line);
    });
    addLog('<div class="system-bold">--- LIVE FEED ---</div>');
});

socket.on('newThought', (data) => {
    addLog(data.thought);
});

socket.on('connect', () => {
    addLog('<div class="system-italic">Connection established. Observing the Chamber...</div>');
});