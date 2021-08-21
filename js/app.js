// Updating The Name
const nameInput = document.querySelector('.new-name');
nameInput.addEventListener('submit', e => {
    e.preventDefault();
    let name = nameInput.name.value.trim();
    localStorage.setItem('username', name);
    nameInput.reset();
    chatRoom.updatName(localStorage.getItem('username'))
});

// Classes Instance
let chatRoom = new Chatroom(undefined, 'anon');
let chatUI = new ChatUI();

// Changing Rooms
// Adding The EventListener
chatUI.rooms.forEach(room => {
    room.addEventListener('click', () => {
        // Clear The Chat Of The Recent Room
        chatUI.ClearRoom()
        // Choosing A Room
        chatUI.changeRoom(room)
        // Getting The Choosed Room Data By render() Method
        chatRoom.getChats(data => {
            // Render The Data
            chatUI.render(data)
        });
    })
});

// Sending Message
chatUI.messageInput.addEventListener('submit', e => {
    e.preventDefault();
    chatUI.sendMessage(chatUI.messageInput);
})