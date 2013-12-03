LastPlaysGamesByBGGUser.Views.InputFormView = Backbone.View.extend({
	events:{
		"click #search" : "searchGames",
		"keypress #bggUser" : "searchGamesEnter",
	},
	className:"",
	initialize : function($el){
		this.$el = $el;
		this.template = _.template($("#inputForm_tpl").html());
	},
	render: function(data) {
		var self = this;
		var locals ={};

		this.$el.html( this.template({data:locals}));

		return this;
	},
	searchGames: function() {
		var searchData = {
			bggUser: $("#bggUser").val().trim(),
			orderBy: $("#orderBy").val(),
			orderType: $("#orderType").val(),
			onlyOwned: $("#onlyOwned").is(':checked'),
			excludeExp: $("#excludeExpansions").is(':checked'),
			onlyPlayed: $("#onlyPlayed").is(':checked')
		};

		$("#bggUser").removeClass("badInput");

		$("#bggUser").focus(function () {
            $("#bggUser").removeClass("badInput");
         });

		if(searchData.bggUser.length == 0){
			$("#bggUser").addClass("badInput");
		}else{
			$.cookie(searchData.bggUser, JSON.stringify(searchData), { expires: 365, path: '/' });

			Backbone.history.navigate('plays/' + searchData.bggUser, {trigger: true});
		}
	},
	searchGamesEnter: function(e) {
		if (e.keyCode != 13) return;
        this.searchGames();
	}	
});