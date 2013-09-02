'use strict';

app.controller('PlaylistsCtrl', function ($scope, Rdio) {
    Rdio.getPlaylists().then(function(playlists){
      $scope.playlists = playlists.owned;
    });
})
.controller('PlaylistItemCtrl', function ($scope, $rootScope, Rdio) {
  $scope.queue = function(){
    $rootScope.playlist = $scope.playlist;
  }
});
