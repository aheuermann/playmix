'use strict';

app.controller('PlaylistsCtrl', function ($scope, Rdio, Player) {
  Rdio.getPlaylists().then(function(playlists){
    $scope.playlists = playlists.owned;
  });
  $scope.queue = function(playlist){
    Player.lookupAndPlay(playlist.tracks);
  }
});
