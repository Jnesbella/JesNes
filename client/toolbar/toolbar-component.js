class ToolbarController {
  /*@ngInject*/
  constructor ($mdSidenav, $rootScope) {
    this.$mdSidenav = $mdSidenav;
    this.title = '';

    $rootScope.$on('$stateChangeSuccess', this.stateChangeSuccessHandler.bind(this));
  }

  stateChangeSuccessHandler (event, toState, toParams, fromState, fromParams) {
    debugger;
    this.title = toParams ? toParams.title : '';
  }

  toggleSidenav () {
    this.$mdSidenav('left').toggle();
  }
}

const toolbarComponent = {
  templateUrl: 'toolbar/toolbar-component.html',
  controller: ToolbarController,
  bindings: {
    toolbarId: '='
  }
};

export default toolbarComponent;
