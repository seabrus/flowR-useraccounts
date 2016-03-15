// Companions
Meteor.publish('companions', function() {
    if (this.userId) {
	    return Meteor.users.find(
	            {},
	            {fields: {
                    username: 1,
                    profile: 1,
                    status: 1,
                }}
	    );
    }
    
	this.ready();
	return;
});


// Chats
Meteor.publish('chats', function() {
    if (this.userId) {
	    return Chats.find(
                {$or: [
                    {user1Id: this.userId},
                    {user2Id: this.userId}
                ]},
	            {fields: {
                    user1Id: 1,
                    user2Id: 1,
                }}
	    );
    }
    
	this.ready();
	return;
});


// Match pattern
var NonEmptyString = Match.Where(function(x) {
    return (typeof x === 'string'  &&  x.length > 0);
});

// Messages
Meteor.publish('messages', function(chatId) {
    if (this.userId  &&  Match.test(chatId, NonEmptyString)) {
	    return Messages.find(
	            {chatId: chatId},
	            {fields: {
                    chatId: 1,
                    createdAt: 1,
                    createdBy: 1,
                    text: 1,
                 },
                 sort: [['createdAt', 'asc']],
                 limit: 100,
                } // end of  " {fields:... "
	    );
    } // end of  "if (this.userId... "
    
	this.ready();
	return;
});
