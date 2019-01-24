angular.module('app.controllers', ['ngCordova'])
.controller('AppCtrl', function($scope, $cordovaCamera, ApiService, StorageService) {

  $scope.user = null;
  $scope.hasMessage = false;
  user_id = 't9l18UKPut3npvMzNNjC';

  ApiService.getUser(user_id).then(function(data) {
    $scope.user = data;
    StorageService.setUser($scope.user);
    $scope.$apply();
  });

  ApiService.getMessages(user_id).then(function(data) {
    data.forEach(function(item) {
      if (item.new) {
        $scope.hasMessage = true;
        $scope.$apply();
        return;
      }
    });
    $scope.$apply();
  });

  $scope.setAvatar = function() {
    $cordovaCamera.getPicture({
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then(function(imageBase64) {
      $scope.user.avatar = 'data:image/jpeg;base64,'+imageBase64;
      ApiService.putUser($scope.id, $scope.user)
    });
  };
})

.controller('MessageCtrl', function($scope, $ionicModal, ApiService, StorageService) {

  user_id = StorageService.getUser().id

  ApiService.getMessages(user_id).then(function(data) {
    $scope.list = data;
    $scope.$apply();
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