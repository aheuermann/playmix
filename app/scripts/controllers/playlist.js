'use strict';

app.controller('PlaylistCtrl', function ($scope, $stateParams, Rdio) {
    Rdio.getPlaylist($stateParams.id).then(function(playlist){
      console.log(playlist);
      $scope.playlist = playlist;
    });
});
