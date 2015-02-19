var kanbanApp = angular.module('KanBanApp', ['ui.router', 'ngCookies', 'ngDraggable', 'ngTagsInput']);

kanbanApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        
        .state('kanban.signin', {
            url: '/user/signin',
			controller:'SigninController',
			templateUrl: '/signin/signin.html'
        })
        
        .state('kanban.signup', {
            url: '/user/signup',
			controller: 'SignupController',
            templateUrl: '/signup/signup.html'       
        })
		.state('kanban.resetpassword', {
            url: '/user/resetpassword',
			controller: 'ResetPasswordController',
            templateUrl: '/resetpassword/reset.html'     
        })
		.state('kanban.dashboard', {
            url: '/dashboard',
			controller: 'DashboardController',
            templateUrl: '/dashboard/dashboard.html'       
        })
		.state('kanban.verify', {
            url: '/user/verify/:token',
			controller: 'VerifyController',
            templateUrl: '/verify/verify.html'       
        })
		
        $urlRouterProvider.otherwise('/user/signin');
});

