'use strict';

app.controller('PlaylistsCtrl', function ($scope, Rdio, Player) {
  Rdio.getPlaylists().then(function(playlists){
    console.log("playlists", playlists);
    $scope.playlists = playlists.owned.concat(playlists.subscribed, playlists.collab);
  });
  $scope.queue = function(playlist){
    Player.lookupAndPlay(playlist.tracks);
  }
});
