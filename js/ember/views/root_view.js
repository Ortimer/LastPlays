BggBuddy.RootView = Ember.View.extend({
  afterRenderEvent: function() {
    var self = this;

    BootstrapDialog.show({
        title: 'Sign in',
        message: '<div id="bggUserModal" class="form-group"><label class="control-label" for="bggUserInput">BGG user</label><input id="bggUserInput" type="text" class="form-control" id="bggUserInput" placeholder="BGG User"><div>',
        closable: false,
        buttons: [{
          label: 'Sign in',
          hotkey: 13, //Enter
          action: function(dialogRef){
            dialogRef.close();
          }
        }],
        onhide: function(dialogRef){
          var bggUser = dialogRef.getModalBody().find('input').val();
          if($.trim(bggUser.toLowerCase()).length == 0) {
            dialogRef.getModalBody().find('#bggUserModal').addClass('has-error');

            return false;
          }

          self.get('controller').transitionToRoute('index', $.trim(bggUser.toLowerCase()));
        }
    });
  }
});
