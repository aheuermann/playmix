'use strict';

app.controller('PlaylistCtrl', function ($scope, $stateParams, Rdio, Player) {
  Rdio.getPlaylist($stateParams.id).then(function(playlist){
    $scope.playlist = playlist;
  });

  $scope.playPlaylist = function () {
    Player.lookupAndPlay($scope.playlist.tracks);
  }

  $scope.playTrack = function(track){
    Player.lookupAndPlay(track);
  }
});
