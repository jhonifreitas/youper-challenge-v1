// Ionic App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.controllers' is found in controllers.js
(function() {

  var config = window.__env;
  firebase.initializeApp(config);

  angular.module('app', ['ionic', 'ngCordova', 'firebase', 'app.controllers'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', { url: '/', controller: 'AppCtrl', templateUrl: 'templates/home.html'})
    .state('message', {url: '/messages', controller: 'MessageCtrl', templateUrl: 'templates/message/list.html'});
    $urlRouterProvider.otherwise('/');
  });
}());
