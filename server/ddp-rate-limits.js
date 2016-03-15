DDPRateLimiter.addRule({
        type: 'method',
        name: function(name) { return  _.contains(['addChat', 'addMessage', 'removeMessages'], name); },
        connectionId: function() { return true; }   // Rate limit per connection ID
    }, 
    5, 
    1000
);

DDPRateLimiter.addRule({
        type: 'subscription',
        name: function(name) { return  _.contains(['companions', 'chats', 'messages'], name); },
        connectionId: function() { return true; }   // Rate limit per connection ID
    }, 
    5, 
    1000
);
