const socket = io();

// Listen for chat messages from the server
socket.on('chatMessage', (message) => {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
});

// Send a message when the form is submitted
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chatMessage', message);
    messageInput.value = ''; // Clear the input field
  }
});