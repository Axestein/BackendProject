const socket = io('http://localhost:8000');

const form = document.getElementById('send-conatiner');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.valur;
    append(`You: ${message}`, 'roght');
    socket.emit('send',message);
    messageInput.value = ''
})

const userName = prompt("enter your name to join");
socket.emit('new-user-joined', userName);

socket.on('user-joined', userName => {
    append(`${userName} joined the chat`,'right')
})

socket.on('recieve', data => {
    append(`${data.message}: ${data.user}`,'left')
})