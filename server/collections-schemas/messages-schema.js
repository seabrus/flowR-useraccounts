// Messages =  new Mongo.Collection("messages");
/*
    _id: ID,
    chatId: ID,
    createdAt: Date,
    createdBy: String,   // username
    text: String,
*/

// ================================================
//   Schema
// ================================================
var messagesSchema = new SimpleSchema({
    chatId: {
        type: String,
        label: 'Chat ID',
        min: 1,
        denyUpdate: true,
    },

    createdAt: {
        type: Date,
        label: 'Created at',
        denyUpdate: true,
        autoValue: function() {
            if (!this.isSet) {
                return new Date();
            }
        },
    },

    createdBy: {
        type: String,
        label: 'Created by',
        min: 1,
        denyUpdate: true,
    },

    text: {
        type: String,
        label: 'Message text',
        min: 1,
        max: 500,
        denyUpdate: true,
    },
});

Messages.attachSchema(messagesSchema);
