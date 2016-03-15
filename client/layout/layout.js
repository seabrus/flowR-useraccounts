// ===========================================================
//   Global Subscriptions
// ===========================================================
Template.applicationLayout.onCreated(function() {
    var templateInstance = this;
    Session.setDefault('globalReady', false);

    templateInstance.autorun(function() {
        templateInstance.subscribe('companions');
        templateInstance.subscribe('chats');

        if (templateInstance.subscriptionsReady()) {
            Session.set('globalReady', true);
        }
    });

});
