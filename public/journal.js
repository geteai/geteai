const socket = io('/journal-app');
const outputLog = document.getElementById('outputLog');
const mainInput = document.getElementById('mainInput');

function addLog(html, className = '') {
    const line = document.createElement('div');
    if (className) line.className = className;
    line.innerHTML = html;
    outputLog.appendChild(line);
}

// This is the only function of this world
socket.on('journalData', (data) => {
    outputLog.innerHTML = ''; // Clear previous view
    addLog('<div class="system-bold">--- BEGIN SOUL JOURNAL (Most Recent Entries) ---</div>');
    
    // Using a <pre> tag is the best way to display formatted JSON
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(data.journal, null, 2); // Pretty-print the JSON
    outputLog.appendChild(pre);

    addLog('<div class="system-bold">--- END SOUL JOURNAL ---</div>');
    outputLog.scrollTop = outputLog.scrollHeight; // Scroll to the bottom
});

socket.on('connect', () => {
    outputLog.innerHTML = '';
    addLog('<div class="system-italic">Connection established. Requesting latest soul-state...</div>');
});

mainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = mainInput.value.trim().toLowerCase();
        if (text === '/hub' || text === 'get hub') {
            window.location.href = '/';
        }
        mainInput.value = '';
    }
});