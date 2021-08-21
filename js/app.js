// Selecting DOM
const rooms = document.querySelectorAll('.rooms button');
const sendMessages = document.querySelector('.send-message');
const changeName = document.querySelector('.update-name');
const notification = document.querySelector('.notfication')

// Classes
let chatroom = new Chatroom(localStorage.username || 'anon', undefined);
let chatUI = new ChatUI();

// Changing Rooms & Rendering Data
rooms.forEach(room => {
    room.addEventListener('click', () => {
        chatUI.clearList();
        chatUI.changingRooms(room.getAttribute('id'));
        chatroom.getChats(data => {
            chatUI.render(data)
        })
    })
})

// Adding Messages
sendMessages.addEventListener('submit', e => {
    // Preventing The Default Action    
    e.preventDefault();

    // Get The Message
    let ms = sendMessages.message.value.trim();
    chatroom.addChat(ms);
    
    // Reseting The Form
    sendMessages.reset();
})

// Changing Your Name
changeName.addEventListener('submit', e => {
    // Preventing The Default Action
    e.preventDefault();
    
    // Get The Name
    let name = changeName.name.value.trim();
    chatroom.changeUsername(name);
    
    // Reseting The Form
    changeName.reset();

    // Localstorage
    localStorage.setItem('username', name);

    // Sendint Notification
    notification.innerHTML = `Your Name Has Updated To <span style=font-weight:bold>"${name}"</span>`;
    setTimeout(() => notification.textContent = '', 3000);
})