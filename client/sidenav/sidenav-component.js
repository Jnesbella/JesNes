class SidenavController {
  /*@ngInject*/
  constructor (sidenavService, $location) {
    this.$location = $location;
    this.sidenavService = sidenavService;

    this.data().title = 'JesNes';
  }

  data () {
    return this.sidenavService.get(this.navId);
  }

  navigate (url) {
    this.$location.path('/about');
  }
}

const sidenav = {
  templateUrl: 'sidenav/sidenav-component.html',
  controller: SidenavController,
  bindings: {
    navId: '@'
  }
};

export default sidenav;
