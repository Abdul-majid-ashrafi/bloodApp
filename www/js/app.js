// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller : 'Login'
    })

    .state('sign-up',{
      url: '/sign-up',
      templateUrl: 'templates/signup.html',
      controller : 'SignUpController as cont'
    })


    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'HomeController as HM'
  })


    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          //controller: 'HomeController as HM'
        }
      }
    })

    //.state('app.details', {
    //  url: '/details',
    //  views: {
    //    'menuContent': {
    //      templateUrl: 'templates/search.html',
    //      controller: 'HomeController as HM'
    //    }
    //  }
    //})

  //.state('app.single', {
  //  url: '/playlists/:playlistId',
  //  views: {
  //    'menuContent': {
  //      templateUrl: 'templates/playlist.html',
  //      controller: 'PlaylistCtrl'
  //    }
  //  }
  //});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
