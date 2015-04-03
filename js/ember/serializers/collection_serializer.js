BggBuddy.CollectionSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  'attrs': {
    'games': {
      'embedded': 'always'
    }
  }
});
