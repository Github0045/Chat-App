class ChatUI {
    constructor() {
        this.list = document.querySelector('.list');
    }
    render(data) {
        let date = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );
        let html = `
            <li>
                <span class="username">${data.username}: </span>
                <span class="message">${data.message}</span>
                <div class="created-at">${date}</div>
            </li>
        `;
        this.list.innerHTML += html;
    }
    clearList() {
        [...this.list.children].forEach(li => {
            li.remove()
        });
    }
    changingRooms(room) {
        chatroom.changeRoom(room);
    }
}