(function(angular){
  angular.module('app.home')
  .controller('homeController', home);


  /*@inject*/
  function home($scope){
    $scope.data = {};
    $scope.data.hello = 'hello world';
  }
})(angular);