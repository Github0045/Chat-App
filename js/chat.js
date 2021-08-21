class Chatroom {
    constructor(username, room) {
        this.username = username;
        this.room = room;
        this.chat = db.collection('chat');
        this.unsub;
    }
    async addChat(message) {
        let date = new Date();
        let obj = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        }
        let response = await this.chat.add(obj);
        return response;
    }
    getChats(callback) {
        this.unsub = this.chat
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data())
                }
            })
        })
    }
    changeUsername(username) {
        this.username = username;
    }
    changeRoom(room) {
        this.room = room;
        if (this.unsub) {
            this.unsub()
        }
    }
}