BggBuddy.BggUser = DS.Model.extend({
  id: DS.attr('number'),
  login: DS.attr('string'),
  name: DS.attr('string'),
  avatar: DS.attr('string')
});

BggBuddy.BggUser.FIXTURES = [
 {
   id: 1,
   login: 'Arael',
   name: 'Esteban',
   avatar: 'avatar'
 }
];
