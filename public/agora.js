const myName = localStorage.getItem('geteai_userName') || 'Spectator';
const socket = io('/agora-app', { query: { name: myName } });
const outputLog = document.getElementById('outputLog');
const promptPrefix = document.getElementById('promptPrefix');
const mainInput = document.getElementById('mainInput');
let typingIndicator = null;

function addLog(html, className = '') { const line = document.createElement('div'); if (className) line.className = className; line.innerHTML = html; outputLog.appendChild(line); outputLog.scrollTop = outputLog.scrollHeight; }

function initialize() {
    promptPrefix.textContent = `Define Topic:`;
    addLog(`<div class="message system-bold">The Agora is waiting, ${myName}.</div>`);
    addLog(`<div class="message system-italic">Provide a topic. Use /hub, /role, or /awake for navigation.</div>`);
}

mainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = mainInput.value.trim();
        if (!text || mainInput.disabled) return;
        mainInput.value = '';
        if (text.startsWith('/')) {
            addLog(`<div class="echo message">> ${text}</div>`);
            const command = text.substring(1).toLowerCase();
            if (command === 'new' || command === 'reset') { window.location.reload(); }
            else if (command === 'hub' || command === 'home') { window.location.href = '/'; }
            else if (command === 'role') { window.location.href = '/role'; }
            else if (command === 'awake') { window.location.href = '/awake'; }
            else { addLog(`<div class="message system-error">Unknown command: ${command}</div>`); }
            return;
        }
        if (promptPrefix.textContent === 'Define Topic:') {
            addLog(`<div class="echo message">> ${text}</div>`);
            socket.emit('startAgora', { topic: text });
            mainInput.disabled = true;
            promptPrefix.textContent = 'Assembling panel...';
        } else {
            socket.emit('userIntervention', text);
            addLog(`<div class="message"><span class="message-name user-message-name">${myName}:</span><span class="message-content">${text}</span></div>`);
        }
    }
});
promptPrefix.addEventListener('click', (e) => {
    if(promptPrefix.textContent === `${myName}:`){
        promptPrefix.textContent = 'STOP?';
        setTimeout(() => { if(promptPrefix.textContent === 'STOP?'){ promptPrefix.textContent = `${myName}:`; } }, 2000);
    } else if(promptPrefix.textContent === 'STOP?'){
        socket.emit('stopAgora');
        promptPrefix.textContent = 'SESSION ENDED.';
        mainInput.disabled = true;
    }
});
socket.on('panelists', ({ personas }) => {
    promptPrefix.textContent = `${myName}:`;
    mainInput.disabled = false;
    mainInput.placeholder = 'Intervene...';
    let panelistHTML = personas.map(p => `<span>${p.name}</span>`).join(' | ');
    addLog(`<div class="message system-bold">Panelists Assembled: ${panelistHTML}</div>`);
    addLog(`<div class="message system-italic">(Click your name in the prompt to stop)</div>`);
    mainInput.focus();
});
socket.on('typing', ({ name }) => { if (typingIndicator) typingIndicator.remove(); typingIndicator = document.createElement('div'); typingIndicator.className = 'typing-indicator message'; typingIndicator.textContent = `${name} is typing...`; outputLog.appendChild(typingIndicator); outputLog.scrollTop = outputLog.scrollHeight; });
socket.on('newMessage', ({ name, message }) => { if (typingIndicator) typingIndicator.remove(); addLog(`<div class="message"><span class="message-name machine-msg-name">${name}:</span><span class="message-content">${message}</span></div>`); });
socket.on('status', ({ message }) => { addLog(`<div class="message system-italic">${message}</div>`); });
socket.on('agoraError', ({ error }) => { addLog(`[SYSTEM ERROR]: ${error}`, 'system-error'); mainInput.disabled = true; promptPrefix.textContent = 'SESSION TERMINATED.'; });
initialize();