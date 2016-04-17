function sidenavService () {
  let sidenavs = {};

  return {
    register (navId) {
      if (navId && !sidenavs[navId]) {
        sidenavs[navId] = {id: navId, data: {}};
      }
    },
    unregister (navId) {
      sidenavs[navId] = undefined;
    },
    get (navId) {
      this.register(navId);
      return sidenavs[navId];
    }
  };
};

export default sidenavService;
