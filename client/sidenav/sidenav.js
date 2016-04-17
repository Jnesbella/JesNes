import angular from 'angular';
import material from 'angular-material';

import sidenavComponent from './sidenav-component';
import sidenavService from './sidenav-service';

const sidenav = angular.module('sidenav', [material]);
sidenav.factory('sidenavService', sidenavService);
sidenav.component('sidenav', sidenavComponent);

export default sidenav.name;
