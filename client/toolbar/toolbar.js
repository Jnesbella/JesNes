import angular from 'angular';
import material from 'angular-material';

import toolbarService from './toolbar-service';
import toolbarComponent from './toolbar-component';

const toolbar = angular.module('toolbar', []);
toolbar.factory('toolbarService', toolbarService);
toolbar.component('toolbar', toolbarComponent);

export default toolbar.name;
