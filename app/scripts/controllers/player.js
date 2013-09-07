'use strict';

app.controller('PlayerCtrl', function ($scope, Player) {
  $scope.isPlaying = Player.isPlaying;

  $scope.next = Player.next;

  $scope.prev = Player.prev;

  $scope.togglePlay = Player.togglePlay;

});
