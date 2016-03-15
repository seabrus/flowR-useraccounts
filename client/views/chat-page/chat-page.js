// =================================================
//   Subscription, and template's variables and functions
// =================================================
Template.chatPage.onCreated(function() {
    var templateInstance = this;

    // Subscription
    templateInstance.subscribe('messages', Session.get('chatId'));

    // Template's variables and functions
    var chat = Chats.findOne({_id: Session.get('chatId')});
    var companionId = (chat.user1Id === Meteor.userId()) ? chat.user2Id : chat.user1Id;

    Session.setDefault('isCompanionOnline', false);

    templateInstance.autorun(function() {
        templateInstance.companion = Meteor.users.findOne({_id: companionId});
        if (templateInstance.companion) {
            Session.set('isCompanionOnline', templateInstance.companion.status.online);
        }
    });

/*
    // Template's variables and functions
    templateInstance.chat = function() { 
        return Chats.findOne({_id: Session.get('chatId')});
    };
    Session.setDefault('isCompanionOnline', false);

    templateInstance.autorun(function() {
        templateInstance.subscribe('messages', Session.get('chatId'));

        var chat = templateInstance.chat();
        if (chat) {
            var companionId = (chat.user1Id === Meteor.userId()) ? chat.user2Id : chat.user1Id;
            templateInstance.companion = Meteor.users.findOne({_id: companionId});
            Session.set('isCompanionOnline', templateInstance.companion.status.online);
        }
    });
*/
});


// =================================================
//   Helpers
// =================================================
Template.chatPage.helpers({

    companion: function() {
        var companion = Template.instance().companion;
        if (companion) {
            var profile = companion.profile;
            if (!profile.avatar) {
                profile.avatar = 'ava0.png';
            }
            return companion;
        }

        return {profile: {}};
    },

    isCompanionOnline: function() {
        return Session.get('isCompanionOnline');
    },

    messages: function() {
        if (Template.instance().subscriptionsReady()) {
            return Messages.find({chatId: Session.get('chatId')}, {sort: [['createdAt', 'asc']]});
        }

        return [];
    },

    emos: function() {
        return emoticons;   // see /client/lib/emotions
    },

});


// =================================================
//   Events
// =================================================
Template.chatPage.events({
    // this event fires when the user sends a message on the chat page
    'submit .js-send-chat': function(event, instance) {
        // stop the form from triggering a page reload
        event.preventDefault();

        var chatId = Session.get('chatId');
        var text = event.target['chat-textarea'].value;
        // insert the message in the database
        Meteor.call('addMessage', chatId, text, function(error) {
            if (error) {
                console.log('addMessage error');
            }
            // reset the form
            event.target['chat-textarea'].value = '';
        });

/*
        var chat = instance.chat();
        if (chat) {
            var text = event.target['chat-textarea'].value;
            // reset the form
            event.target['chat-textarea'].value = '';

            // insert the message in the database
            Meteor.call('addMessage', chat._id, text, function(error) {
                if (error) {
                    console.log('addMessage error');
                }
            });

        }
*/
    }, // end of " 'submit .js-send-chat'..."


    // this event fires when the user clicks the button "Remove..."
    'click .js-remove-messages': function(event, instance) {
        // stop the form from triggering a page reload
        event.preventDefault();

        var yes = confirm('Are you sure?');
        if (yes) {
            var chatId = Session.get('chatId');
            // remove the messages
            Meteor.call('removeMessages', chatId, function(error) {
                if (error) {
                    console.log('removeMessages error');
                }
            });
        } // end of "if (yes)..."

/*
        var chat = instance.chat();
        if (chat) {
            var yes = confirm('Are you sure?');
            if (yes) {
                // remove the messages
                Meteor.call('removeMessages', chat._id, function(error) {
                    if (error) {
                        console.log('removeMessages error');
                    }
                });
            } // end of "if (yes)..."
        }
*/
    }, // end of " 'click .js-remove-messages'..."


    // this event fires when the user clicks on an emoticon
    'click .js-emo': function(event) {
        event.preventDefault();

        var emoString = $(event.target).data('emo');
        var textarea = $('#textarea_id');
        var caretPos = textarea.caret();   // see for details /client/lib/caret/caret.js and https://github.com/accursoft/caret
        var initText = textarea.val();
        var resultText = initText.slice(0, caretPos) + emoString + initText.slice(caretPos);

        textarea.val(resultText);
        textarea.focus();
        textarea.caret(caretPos + emoString.length);
    }, // end of " 'click .js-emo'..."

});
