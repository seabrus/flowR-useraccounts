// ===========================================================================
//   Move the chat history div to the bottom to show new added messages
// ===========================================================================
Template.chatMessage.onRendered(function() {
    var templateInstance = this;

    var messagesNum = templateInstance.data.messagesNum;
    var currentIndex = templateInstance.data.index;
    if (currentIndex === (messagesNum - 1)) {
        var chatHistoryDiv = $('#chat-history-div');
        chatHistoryDiv.scrollTop( chatHistoryDiv.prop('scrollHeight') );
    }
});


// =================================================
//   Helpers
// =================================================
Template.chatMessage.helpers({
    isMe: function(createdBy) {
        var myUsername = Meteor.user().username;     // <<<<< Add check if this is not "undefined" ?
        return (myUsername === createdBy);
    },

    formatDate: function(date) {
        return date.toISOString().slice(5, 10) + ', ' + date.toISOString().slice(11, 16);
    },


    // Sanitize, and insert line breaks and emoticons into the message text
    formatText: function(text) {
        if (typeof text !== 'string') { return ''; }

        var result = '';

        // Sanitize HTML
        var escapeHtml = {
            "&": "&amp;", "/": '&#x2F;',
            "<": "&lt;", ">": "&gt;",
            '"': '&quot;', "'": '&#39;',
        };
        result = text.replace(/[&<>"'\/]/g, function(s) { return escapeHtml[s]; });

        // Line breaks
        result = result.replace(/[\n]/g, '<br>');

        // Emoticons
        for (var i=0, len=emoticons.length; i<len; i++) {   // see /client/lib/emotions
            result = result.replace(emoticons[i].rexexp, ('<img class="emo" src="/icons/' + emoticons[i].image + '">') );
        }

        return result;

//text.replace(/[&<>"'\/]|[\n]|(\:\))|(\:\()|(\(heart\))|(\(kiss\))|(\(sun\))|(\(d\))|(\(\^\))|(\(nerd\))|(\(\*\))|(\(F\))/g, function(s) { return symbols[s]; })
    },

});
