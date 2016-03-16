/*
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
*/


// USERNAME_AND_EMAIL configuration
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "username",
        required: true,
        minLength: 5,
    },
    {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "email",
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email',
    },
    pwd
]);


// Logout hook
var doAfterLogout = function () {
//console.log("Router.go('/') -- Meteor.user() = " + Meteor.user());
//     -- this is called when the user is already logged out and Meteor.user() has changed !
//    Router.go('/');
    FlowRouter.go('home');
};
AccountsTemplates.configure({
    onLogoutHook: doAfterLogout
});


// Other configuration
AccountsTemplates.configure({
    // Behavior
    confirmPassword: false,
    enablePasswordChange: true,

    forbidClientAccountCreation: false,

    overrideLoginErrors: false,     // configuration file should be accessible on the server too -- 
                                                              // https://github.com/meteor-useraccounts/core/issues/216
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeValidation: true,
    positiveValidation: false,
    negativeFeedback: true,
    positiveFeedback: false,
    showValidating: false,

    // Privacy Policy and Terms of Use
//    privacyUrl: 'privacy',
//    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 2000,

    // Hooks
//    onLogoutHook: myLogoutFunc,
//    onSubmitHook: mySubmitFunc,
//    preSignUpHook: myPreSubmitFunc,
//    postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});
