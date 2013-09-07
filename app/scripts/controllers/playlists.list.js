'use strict';

app.controller('PlaylistsCtrl', function ($scope, playlists, Player) {
  $scope.playlists = playlists.owned.concat(playlists.subscribed, playlists.collab);
  $scope.queue = function(playlist){
    Player.lookupAndPlay(playlist.tracks);
  }
});
