import angular from 'angular';
import uiRoute from 'angular-ui-router';

import AboutController from './about-controller';
import sidenav from '../sidenav/sidenav';

const about = angular.module('about', [uiRoute, sidenav]);
about.controller('AboutController', AboutController);
about.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('about', {
      url: '/about',
      controller: 'AboutController',
      controllerAs: '$ctrl',
      templateUrl: 'about/about.html',
      params: {
        title: 'About'
      }
    });
});
about.run((sidenavService) => {
  "ngInject";

  sidenavService.get('left').about = {
    label: 'About',
    state: 'about'
  };
});

export default about.name;
