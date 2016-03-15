// =================================================
//   Helpers
// =================================================
Template.availableUser.helpers({
    getUsername: function(user) {
        return user.username;   // || (user._id === Meteor.userId() ? '' : 'stranger');
    },

    getAvatar: function(user) {
        return user.profile.avatar || 'ava0.png';
    },

    isOnline: function(user) {
        return user.status.online;
    },

    isMyUser: function(userId) {
        return (userId === Meteor.userId());
    },
});



/*
    statusClass: function(user) {
        var status = user.status;
        if (status.idle) {
            return 'label-warning';
        }
        else if (status.online) {
            return 'label-success';
        }
        else {
            return 'label-default';
        }
    },
*/
