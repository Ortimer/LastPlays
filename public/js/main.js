$(document).ready(function(){

	window.views.inputForm = new LastPlaysGamesByBGGUser.Views.InputFormView( $('#contenido') );
	window.views.orderFilter = new LastPlaysGamesByBGGUser.Views.OrderFilterView();

	window.collections.gamePlays = new LastPlaysGamesByBGGUser.Collections.GamePlaysCollection();
	window.routers = new LastPlaysGamesByBGGUser.Routers.MainRouter();

	Backbone.history.start({
		root : "/",
		pushState : true,
		silent : false
	});
});