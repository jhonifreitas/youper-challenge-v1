angular.module('app.controllers', ['ngCordova'])
.controller('AppCtrl', function($scope, $cordovaCamera, ApiService, StorageService, CameraService) {

  $scope.user = null;
  $scope.hasMessage = false;
  user_id = 'youper-v1';

  ApiService.getUser(user_id).then(function(data) {
    $scope.user = data;
    StorageService.setUser($scope.user);
    if (!$scope.$$phase) $scope.$apply();
  });

  ApiService.getMessages(user_id).then(function(data) {
    $scope.hasMessage = data.filter(x => x.new == true).length > 0
    if (!$scope.$$phase) $scope.$apply();
  });

  $scope.setAvatar = function() {
    CameraService.takePicture(Camera.PictureSourceType.PHOTOLIBRARY)
    .then(function(image) {
      $scope.user.avatar = image;
      ApiService.putUser($scope.id, $scope.user)
    });
  };
})

.controller('MessageCtrl', function($scope, $ionicModal, ApiService, StorageService) {

  user_id = StorageService.getUser().id

  ApiService.getMessages(user_id).then(function(data) {
    $scope.list = data;
    if (!$scope.$$phase) $scope.$apply();
  });

  $scope.close = function() {
    $scope.modal.hide();
  };

  $scope.goToDetail = function(object) {

    object.new = false;
    $scope.object = object;

    ApiService.putMessage(object.id, object);

    $ionicModal.fromTemplateUrl('templates/message/detail.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
})