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
    _alert('danger', message);
  }

  var info = function(message){
    _alert('info', message);
  }

  var success = function(message){
    _alert('success', message);
  }

  var warning = function(message){
    _alert('warning', message);
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