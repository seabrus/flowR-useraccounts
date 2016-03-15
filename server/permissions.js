Meteor.users.deny({
    insert: function() { return true; },
    update: function() { return true; },
    remove: function() { return true; },
});


Chats.deny({
    insert: function() { return true; },
    update: function() { return true; },
    remove: function() { return true; },
});


Messages.deny({
    insert: function() { return true; },
    update: function() { return true; },
    remove: function() { return true; },
});

