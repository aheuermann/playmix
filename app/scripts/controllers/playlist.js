'use strict';

app.controller('PlaylistCtrl', function ($scope, $stateParams, playlist, Player) {
  $scope.playlist = playlist

  $scope.playPlaylist = function () {
    Player.lookupAndPlay($scope.playlist.tracks);
  }

  $scope.playTrack = function(track){
    Player.lookupAndPlay(track);
  }
});
