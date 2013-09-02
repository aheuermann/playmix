'use strict';

app.controller('PlaylistsCtrl', function ($scope, Rdio) {
    Rdio.getPlaylists().then(function(playlists){
      $scope.playlists = playlists.owned;
    });
});
