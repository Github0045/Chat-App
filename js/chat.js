class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message) {
        // Creating The Data Obj
        let date = new Date();
        let obj = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        };
        // Saving The Data Obj
        let response = await this.chats.add(obj);
        return response;
    }
    getChats(callback) {
        this.unsub = this.chats
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
    updatName(username) {
        this.username = username;
    }
    updataRoom(room) {
        this.room = room;
        console.log('Room Updated')
        if (this.unsub) {
            this.unsub()
        }
    }
}