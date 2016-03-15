// start up script that creates some users for testing
// users have the username 'user1@test.com' .. 'user8@test.com'
// and the password test123

Meteor.startup(function() {
    if (!Meteor.users.findOne()) {
        for (var i=1; i < 9; i++) {
            var email = "user" + i + "@test.com";
            var username = "user" + i;
            var avatar = "ava" + i + ".png";

            console.log("Creating a user with username / email: " + email);
            Meteor.users.insert({
                username: username,
                emails: [ {address: email} ],
                profile: {username: username, avatar: avatar},
                services: {password: {"bcrypt": "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}},
            });
        } // end of " for (var i=1;... "
    }
});

