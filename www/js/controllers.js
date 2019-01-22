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
  $scope.list = [];
  user_id = 't9l18UKPut3npvMzNNjC';

  firebase.firestore().collection("messages").where("user", "==", user_id)
  .get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      $scope.list.push({ id: doc.id, ...doc.data() });
    });
    $scope.$apply()
  });


  $scope.close = function() {
    $scope.modal.hide();
  };

  $scope.goToDetail = function(object) {
    object.new = false;
    $scope.object = object;
    firebase.firestore().collection("messages").doc(object.id).update(object);
    $ionicModal.fromTemplateUrl('templates/message/detail.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
})

.filter("timeAgo", function () {
  return function (time, local, raw) {
    if (!time) return "never";

    if (!local) {
      (local = Date.now())
    }

    if (angular.isDate(time)) {
      time = time.getTime();
    } else if (typeof time === "string") {
      time = new Date(time).getTime();
    }

    if (angular.isDate(local)) {
      local = local.getTime();
    }else if (typeof local === "string") {
      local = new Date(local).getTime();
    }

    if (typeof time !== 'number' || typeof local !== 'number') {
      return;
    }

    var
      offset = Math.abs((local - time) / 1000),
      span = [],
      MINUTE = 60,
      HOUR = 3600,
      DAY = 86400,
      WEEK = 604800,
      MONTH = 2629744,
      YEAR = 31556926,
      DECADE = 315569260;

    if (offset <= MINUTE)              span = [ '', raw ? 'now' : 'less than a minute' ];
    else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'min' ];
    else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'hr' ];
    else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
    else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
    else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), 'year' ];
    else if (offset < (DECADE * 100))  span = [ Math.round(Math.abs(offset / DECADE)), 'decade' ];
    else                               span = [ '', 'a long time' ];

    span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
    span = span.join(' ');

    if (raw === true) {
      return span;
    }
    return (time <= local) ? span + ' ago' : 'in ' + span;
  }
})