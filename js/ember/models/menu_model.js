BggBuddy.Menu = DS.Model.extend({
  messages: DS.hasMany('menuMessage'),
  tasks: DS.hasMany('menuTask'),
  sideMenuOptions: DS.hasMany('menuSideOption')
});

BggBuddy.MenuMessage = DS.Model.extend({
  author: DS.attr('string'),
  time: DS.attr('string'),
  message: DS.attr('string')
});

BggBuddy.MenuTask = DS.Model.extend({
  name: DS.attr('string'),
  progress: DS.attr('number'),
  barType: DS.attr('string')
});

BggBuddy.MenuSideOption = DS.Model.extend({
  name: DS.attr('string'),
  icon: DS.attr('string'),
  link: DS.attr('string'),
  subMenus: DS.hasMany('menuSideSub')
});

BggBuddy.MenuSideSub = DS.Model.extend({
  name: DS.attr('string'),
  link: DS.attr('string')
});
