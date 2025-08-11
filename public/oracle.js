const myName = localStorage.getItem('geteai_userName') || 'Traveler';
const socket = io('/oracle-app', { query: { name: myName } });
const outputLog = document.getElementById('outputLog');
const promptPrefix = document.getElementById('promptPrefix');
const mainInput = document.getElementById('mainInput');

function addLog(html, className = '') {
    const line = document.createElement('div');
    if (className) line.className = className;
    line.innerHTML = html;
    outputLog.appendChild(line);
    outputLog.scrollTop = outputLog.scrollHeight;
}

function initialize() {
    outputLog.innerHTML = '';
    promptPrefix.textContent = `${myName}:`;
    mainInput.disabled = false;
    mainInput.placeholder = '';
    addLog('<div class="message system-bold">The Oracle is listening. Ask one question.</div>', 'system-bold');
    mainInput.focus();
}

mainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = mainInput.value.trim();
        if (!text || mainInput.disabled) return;
        
        if (text.toLowerCase() === '/hub') {
             window.location.href = '/';
             return;
        }

        socket.emit('askQuestion', { question: text });
        addLog(`<div class="echo message">> ${text}</div>`);
        mainInput.value = '';
        mainInput.disabled = true;
        promptPrefix.textContent = 'Communing...';
    }
});

socket.on('oracleResponse', (data) => {
    promptPrefix.textContent = 'The Oracle has spoken.';
    addLog(`<div class="message"><span class="message-name machine-msg-name">The Oracle:</span><span class="message-content">${data.response}</span></div>`);
    addLog('<div class="message system-italic">To ask another question, you must leave and return. Type /hub to leave.</div>');
});

socket.on('connect', initialize);
document.body.addEventListener('click', () => { if (!mainInput.disabled) mainInput.focus(); });