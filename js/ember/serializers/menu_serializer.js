BggBuddy.MenuSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    messages: {
      embedded: 'always'
    },
    tasks: {
      embedded: 'always'
    },
    sideMenuOptions: {
      embedded: 'always'
    }
  }
});

BggBuddy.MenuSideOptionSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    subMenus: {
      embedded: 'always'
    }
  }
});
