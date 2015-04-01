BggBuddy.ApplicationView = Ember.View.extend({
  afterRenderEvent: function() {
    $(function(){
      var easter_egg = new Konami(calvoInit);

      var calvoImageMarkup = '<img id="elCalvo" style="display: none" src="/img/calvo.png" />';

      $('body').append(calvoImageMarkup);
      var calvo = $('#elCalvo').css({
            "position":"fixed",
            "bottom": "-700px",
            "right" : "0",
            "display" : "block"
          });

      var locked = false;

      function calvoInit() {
        if (!locked) {
          locked = true;

          // Movement Hilarity
          calvo.animate({
            "bottom" : "0"
          }, function() {
            $(this).animate({
              "bottom" : "-30px"
            }, 100, function() {
              var offset = (($(this).position().left)+700);
              $(this).delay(300).animate({
                "right" : offset
              }, 3500, function() {
                calvo = $('#elCalvo').css({
                  "bottom": "-700px",
                  "right" : "0"
                })
                locked = false;
              })
            });
          });
        }
      }
    });

    var changeMenu = function() {
      var topOffset = 50;
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      if (width < 768) {
        $('div.navbar-collapse').addClass('collapse');
        topOffset = 100; // 2-row-menu
      } else {
        $('div.navbar-collapse').removeClass('collapse');
      }

      var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $("#page-wrapper").css("min-height", (height) + "px");
      }
    }

    $(changeMenu);

    //Loads the correct sidebar on window load,
    //collapses the sidebar on window resize.
    // Sets the min-height of #page-wrapper to window size
    $(window).resize(function() {
      changeMenu();
    });

    /*
    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
    */
  }
});
