angular.module('app', ['ionic', 'app.controllers'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', { url: '/', controller: 'AppCtrl', templateUrl: 'templates/home.html'})
  .state('message', {url: '/messages', controller: 'MessageCtrl', templateUrl: 'templates/message/list.html'});
  $urlRouterProvider.otherwise('/');
});