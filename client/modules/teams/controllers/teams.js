angular.module('App')
  .controller('TeamsController', ['$scope', '$meteor',
    function($scope, $meteor) {
      $scope.teams = $meteor.collection(Teams, false).subscribe('teams');      
      $scope.selectTeam = function(uid, name) {
        $scope.selectedId = uid;
        $scope.selectedName = name;
      }
      $scope.updateScore = function(score) {
        $meteor.call('updateScore', $scope.selectedId, score)
          .then(function(){
            console.log('OK');
          }, 
          function(err) {
            alert(err)
          })
      }  
    }
  ])
