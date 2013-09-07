'use strict';

app.controller('SongCtrl', function ($scope, $stateParams, data, Player) {
  $scope.song = data.song;
  $scope.tracks = data.tracks;

  $scope.playAll = function() {
    Player.queue(data.tracks, data.song);
  }

  $scope.playTrack = function(track) {
    Player.queue(track, data.song);
  }
});
