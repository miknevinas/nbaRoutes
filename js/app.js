var app = angular.module('nbaRoutes', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'js/home/homeTmpl.html',
        controller: 'homeCtrl',
        resolve: {
  			teamDataJazz: function(homeService, $stateParams) {
  				return homeService.getTeamData('utahjazz');
  			},
  			teamDataLakers: function(homeService, $stateParams) {
  				return homeService.getTeamData('losangeleslakers');
  			},
  			teamDataHeat: function(homeService, $stateParams) {
  				return homeService.getTeamData('miamiheat');
  			}
  		}
    })
    .state('teams', {
        url:'/teams/:team',
        templateUrl: 'js/teams/teamTmpl.html',
        controller: 'teamCtrl',
        resolve: { //prevents page from loading until all promises are resolved
            teamData: function(teamService, $stateParams) {
                return teamService.getTeamData($stateParams.team);
            }
        }
    })
    
    $urlRouterProvider.otherwise('/');

});
