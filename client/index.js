import angular from 'angular';
import material from 'angular-material';
import uiRoute from 'angular-ui-router';

import toolbar from './toolbar/toolbar';
import sidenav from './sidenav/sidenav';

import home from './home/home';
import about from './about/about';

import AppController from './app-controller';

const app = angular.module('JesNes', [material, uiRoute, toolbar, sidenav, home, about]);
app.controller('AppController', AppController);

app.config(($urlRouterProvider, $mdThemingProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('brown');
});

app.run(($location) => {
  $location.path('/about');
});
