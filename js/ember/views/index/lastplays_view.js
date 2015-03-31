BggBuddy.IndexLastplaysView = Ember.View.extend({
  afterRenderEvent: function() {
    // JS only for the switch
    $(function() {
      $('#switch-view').click(function() {
        $(this).find('button').toggleClass('active');
        $('.article-wrapper').toggleClass('bloc col-xs-4 col-xs-12');
      });
    });

    var changeLayout = function() {
      var articleWarper = $('.article-wrapper');
      width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      if (width < 768) {
        articleWarper.removeClass();
        articleWarper.addClass('article-wrapper bloc col-xs-12');
      } else if (width < 980) {
        articleWarper.removeClass();
        articleWarper.addClass('article-wrapper bloc col-xs-6');
      } else {
        var buttons = $('#switch-view').find('button');
        buttons.removeClass('active');
        buttons.eq(1).addClass('active');
        articleWarper.removeClass();
        articleWarper.addClass('article-wrapper col-xs-12');
      }
    }

    $(changeLayout);

    //Loads the correct sidebar on window load,
    //collapses the sidebar on window resize.
    // Sets the min-height of #page-wrapper to window size
    $(window).resize(function() {
      changeLayout();
    });
  }
});
