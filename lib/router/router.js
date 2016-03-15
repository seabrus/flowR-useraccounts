// Set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loadingView',
    yieldTemplates: {                   // this is necessary for AccountsTemplates' work
        'navbar': {to: 'header'},
    }
});

AccountsTemplates.configure({
    defaultLayout: 'applicationLayout',
});


// Top level route, the page users see when they arrive at the site
Router.route('/', function () {
        this.render('navbar', {to: 'header'});
        this.render('home', {to: 'main'});
    }, 
    {name: 'home'}
);

// Useraccounts signIn page
AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/sign-in',
//    template: 'signIn',
    redirect: '/',     // can be a function
});


// Route that allows the current user to chat to another users
Router.route('/chat/:_id', function() {
    var thisRoute = this;

    // the user they want to chat to has id equal to the id sent in after /chat/...
    var otherUserId = thisRoute.params._id;

    // find a chat that has two users that match current user id
    // and the requested user id
    var selector = {$or: [
        {user1Id: Meteor.userId(), user2Id: otherUserId},
        {user2Id: Meteor.userId(), user1Id: otherUserId}
    ]};
    var chat = Chats.findOne(selector);

    // no chat matching the filter - need to insert a new one
    if (!chat) {
        Meteor.call('addChat', otherUserId, function(error, result) {
            if (error) {
                alert('Sorry, try Minstant a bit later');
                thisRoute.redirect('/');
            }

            Session.set("chatId", result);
            thisRoute.render('navbar', {to: 'header'});
            thisRoute.render("chatPage", {to: "main"});
        });
    }
    else { // there is a chat going already - use that
        var chatId = chat._id;
        if (chatId) { // looking good, save the id to the session
            Session.set("chatId", chatId);
        }
        thisRoute.render('navbar', {to: 'header'});
        thisRoute.render("chatPage", {to: "main"});
    } // end of "if (!chat)..."

});




Router.onBeforeAction(function() {
        if (!Meteor.user()) {
            this.redirect('home');
        } 
        else {
            this.next();
       }
    },
    {except: ['home', 'signin']}
);

