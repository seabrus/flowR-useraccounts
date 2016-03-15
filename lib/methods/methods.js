// ===============================================================================
//   Match pattern
// ===============================================================================
var NonEmptyString = Match.Where(function(x) {
    return (typeof x === 'string'  &&  x.length > 0);
});


Meteor.methods({
    // Insert a new chat object
    addChat: function(otherUserId) {
        if (this.userId  &&  Match.test(otherUserId, NonEmptyString)) {

            try {
                var chatId = Chats.insert({user1Id: this.userId, user2Id: otherUserId});
                return chatId;
            }
            catch(e) {
                console.log('addChat error: Cannot insert chat - ' + e.message + '; otherUserId = ' + otherUserId);
                throw new Meteor.Error('addchat-error', 'addChat error 2');
            } // end of "try-catch" block

        } else {
            console.log( 'addChat error: Unauthed user or incorrect argument: otherUserId = ' + otherUserId);
            throw new Meteor.Error('bad-arguments', 'addChat error 1');
        } 
    }, // end of "addChat..."


    // Insert a new message
    addMessage: function(chatId, text) {
        if (this.userId  &&  Match.test(chatId, NonEmptyString)  &&  Match.test(text, NonEmptyString)) {

            var username = Meteor.users.findOne({_id: this.userId}).username; // <<<<< To add check if this is not "undefined" ?

            try {
                Messages.insert({
                    chatId: chatId,
                    createdAt: new Date(),
                    createdBy: username,
                    text: text,
                });

                return 'ok';
            }
            catch(e) {
                console.log('addMessage error: Cannot insert message - ' + 
                        e.message + '; chatId = ' + chatId + '; text = ' + text);
                throw new Meteor.Error('addmessage-error', 'addMessage error 2');
            } // end of "try-catch" block

        } else {
            console.log( 'addMessage error: Unauthed user or incorrect arguments: chatId = ' + chatId + '; text = ' + text);
            throw new Meteor.Error('bad-arguments', 'addMessage error 1');
        } 
    }, // end of "addMessage..."


    // Remove all messages for this chat
    removeMessages: function(chatId) {
        if (this.userId  &&  Match.test(chatId, NonEmptyString)) {

            try {
                Messages.remove({chatId: chatId});
                return 'ok';
            }
            catch(e) {
                console.log('removeMessages error: Cannot remove messages - ' + 
                        e.message + '; chatId = ' + chatId);
                throw new Meteor.Error('removemessages-error', 'removeMessages error 2');
            } // end of "try-catch" block

        } else {
            console.log( 'removeMessages error: Unauthed user or incorrect argument: chatId = ' + chatId);
            throw new Meteor.Error('bad-arguments', 'removeMessages error 1');
        } 
    }, // end of "removeMessages..."

});
