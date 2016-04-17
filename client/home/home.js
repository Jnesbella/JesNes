import angular from 'angular';
import uiRoute from 'angular-ui-router';

import HomeController from './home-controller';

const home = angular.module('home', [uiRoute]);
home.controller('HomeController', HomeController);
home.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController',
      controllerAs: '$ctrl',
      templateUrl: 'home/home.html',
      params: {
        title: 'Home'
      }
    })
});
home.run((sidenavService) => {
  "ngInject";

  sidenavService.get('left').home = {
    label: 'Home',
    state: 'home'
  };
});

export default home.name;
