'use strict';

app.controller('PlaylistsCtrl', function ($scope, Rdio) {
    Rdio.getPlaylists().then(function(playlists){
      console.log(playlists);
      $scope.playlists = playlists.owned;
    });
});
