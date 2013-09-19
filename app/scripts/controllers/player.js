'use strict';

app.controller('PlayerCtrl', function ($scope, $filter, Player) {
  $scope.isPlaying = Player.isPlaying;

  $scope.next = Player.next;

  $scope.prev = Player.prev;

  $scope.togglePlay = Player.togglePlay;

  $scope.percentComplete = _.throttle(function() {
    return Player.percentComplete() + "%";
  }, 1000);
});
