// =================================================
//   Helpers
// =================================================
Template.home.helpers({
    globalReady: function() {
        return Session.get('globalReady');
    },
});
