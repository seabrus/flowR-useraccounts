// =================================================
//   Helpers
// =================================================
Template.availableUserList.helpers({
    users: function() {
        return Meteor.users.find({}, {sort: [['username', 'asc']]});
    }
});
