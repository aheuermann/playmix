'use strict';

app.controller('NavCtrl', function ($scope, $rootScope, Rdio, Alert) {
  $scope.signIn = function() {
    Alert.info("Logging in...");
    Rdio.auth().then(function(user) {
      Alert.clear();
      $rootScope.user = user;
    }, function(){
      console.log("eerrrrrrr");
    });
  }
});
