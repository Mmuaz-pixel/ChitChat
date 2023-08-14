const socket = io('http://localhost:8000'); 
const form = document.getElementById('send-msg'); 
const msgInp = document.getElementById('msg'); 
let messageCont = document.querySelector('.chat')
var audio = new Audio('../ting.mp3')

const append = (name, message, position) => {
    const messageElement = document.createElement('div');
    const nameElement = document.createElement('span'); 
    messageElement.classList.add('message')
    messageElement.classList.add(`${position}`);
    messageElement.innerHTML = `<span>${name}</span>${message}`
    messageCont.append(messageElement); 
    if(name !== 'You')
    {
        audio.play(); 
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    const message = msgInp.value; 
    append('You', `: ${message}`, 'right'); 
    socket.emit('send', message); 
    msgInp.value = ''; 
})

const name = prompt('Enter your name'); 
socket.emit('new-user-joined', name); 

socket.on('user-joined', name => {
    append(name, ` joined the chat`, 'middle')
})

socket.on('recieved', results => 
{
    append(results.name, `: ${results.message}`, 'left'); 
})

socket.on('left', name => {
    append(name, ' left the chat', 'middle'); 
})