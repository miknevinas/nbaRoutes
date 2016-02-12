var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {
    
    $scope.teamData = teamData;
    $scope.newGame = {};
    $scope.showNewGameForm = false; //hides game form until clicked on
    $scope.toggleNewGameForm = function() {
        $scope.showNewGameForm = !$scope.showNewGameForm; //changes game form to true, revealing it on the view
    }
    
    if ($stateParams.team === 'utahjazz') {
        $scope.homeTeam = 'Utah Jazz';
        $scope.logoPath = '/images/jazz-logo.png';
    }
    else if ($stateParams.team === 'losangeleslakers') {
        $scope.homeTeam = 'LA Lakers';
        $scope.logoPath = '/images/lakers-logo.png';
    }
    else if ($stateParams.team === 'miamiheat') {
        $scope.homeTeam = 'Miami Heat';
        $scope.logoPath = '/images/heat-logo.png';
    }
    
    $scope.submitGame = function() {
        $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
        teamService.addNewGame($scope.newGame)
            .then(function(){
                teamService.getTeamData($scope.newGame.homeTeam)
                    .then(function(response){
                        $scope.teamData = response;
                        $scope.newGame = {};  //clears data in form
                        $scope.toggleNewGameForm = false; //hides form again
            })
        })
    }
/*console.log($scope);*/
});
