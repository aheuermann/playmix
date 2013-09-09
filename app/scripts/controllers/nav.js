'use strict';

app.controller('NavCtrl', function ($scope, $rootScope, $state, Rdio, Alert) {
  $scope.signIn = function() {
    Alert.info("Logging in...");
    Rdio.auth().then(function(user) {
      Alert.clear();
      $rootScope.user = user;
      $state.transitionTo("app.playlists");
    }, function(){
      Alert.error("Unexpected error, please refresh the page and try again...");
    });
  }
});
