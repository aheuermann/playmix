'use strict';

app.controller('PlaylistsCtrl', function ($scope, Rdio) {
    Rdio.getPlaylists().then(function(playlists){
      $scope.playlists = playlists.owned;
    });
})
.controller('PlaylistItemCtrl', function ($scope, Player) {
  $scope.queue = function(){
    Player.lookupAndPlay($scope.playlist.tracks);
  }
});
