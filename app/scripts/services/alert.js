'use strict';

app.factory('Alert', function ($rootScope, $timeout) {
  var _alert = function(type, message, timeOut){
    $rootScope.alert = true;
    $rootScope.alertType = "alert-" + type;
    $rootScope.alertMessage = message;
    if(timeOut){
      $timeout(function(){
        clear();
      }, timeOut);
    }
  }

  var error = function(message){
    _alert('danger', message, 5000);
  }

  var info = function(message){
    _alert('info', message, 5000);
  }

  var success = function(message){
    _alert('success', message, 5000);
  }

  var warning = function(message){
    _alert('warning', message, 5000);
  }

  var clear = function() {
    $rootScope.alert = false;
  }

  return {
    error: error,
    info: info,
    success: success,
    warning: warning,
    clear: clear
  };
});