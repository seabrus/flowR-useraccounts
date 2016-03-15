// Chats = new Mongo.Collection("chats");
/*
    _id: ID,
    user1Id: ID,
    user2Id: ID,
*/

// ================================================
//   Schema
// ================================================
var chatsSchema = new SimpleSchema({
    user1Id: {
        type: String,
        label: 'User1 ID',
        min: 1,
        denyUpdate: true,
    },
    user2Id: {
        type: String,
        label: 'User2 ID',
        min: 1,
        denyUpdate: true,
    },
});

Chats.attachSchema(chatsSchema);
