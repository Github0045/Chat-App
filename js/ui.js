class ChatUI {
    constructor() {
        this.list = document.querySelector('.chat-list');
        this.rooms = document.querySelectorAll('.chat-rooms > button');
        this.messageInput = document.querySelector('.new-chat');
    }
    render(data) {
        let when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );
        let html = `
            <li class="list-group-item">
                <span class="username">${data.username}:</span>
                <span class="message">${data.message}</span>
                <div class="date">${when}</div>
            </li>
        `;
        this.list.innerHTML += html;
    }
    changeRoom(target) {
        chatRoom.updataRoom(target.getAttribute('id'));
    }
    ClearRoom() {
        [...this.list.children].forEach(child => {
            child.remove()
        })
    }
    sendMessage(input) {
        let ms = input.message.value.trim();
        chatRoom.addChat(ms)
            .then(() => input.reset())
            .catch(err => console.log(err))
    }
}