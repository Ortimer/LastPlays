$( function(){
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
