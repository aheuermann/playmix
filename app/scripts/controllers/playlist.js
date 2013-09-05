'use strict';

app.controller('PlaylistCtrl', function ($scope, $stateParams, Rdio, Player) {
    Rdio.getPlaylist($stateParams.id).then(function(playlist){
      $scope.playlist = playlist;
    });

    $scope.playPlaylist = function () {
      Player.lookupAndPlay($scope.playlist.tracks);
    }
})
.controller('PlaylistItemCtrl', function ($scope, Player){
  $scope.play = function(){
    Player.lookupAndPlay($scope.track);
  }
});
