angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  $scope.user = null;
  $scope.user_id = 't9l18UKPut3npvMzNNjC';
  $scope.hasMessage = false;

  $scope.setAvatar = function() {
    console.log('alskdjaslkdjlas')
  };
})

.controller('MessageCtrl', function($scope, $ionicModal) {

  firebase.database().ref('messages/').then(function(data){
    console.log(data)
  })

  $ionicModal.fromTemplateUrl('templates/message/detail.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.close = function() {
    $scope.modal.hide();
  };

  $scope.goToDetail = function() {
    $scope.modal.show();
  };
})