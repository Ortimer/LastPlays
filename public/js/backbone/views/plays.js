LastPlaysGamesByBGGUser.Views.PlaysView = Backbone.View.extend({
	events:{
		"show" : "show",
		"click" : "toggleExpand"
	},
	className:"",
	initialize : function(playData){
		this.playData = playData;
		this.expanded = 0;
		this.template = _.template($("#PlaysView_tpl").html());
	},
	render: function(data) {
		var self = this;

		var templateData = {"data": this.playData.toJSON()};

		this.$el.html(this.template(templateData));

		return this;
	},
	toggleExpand: function() {
		var self = this;

		if(this.expanded == 0){
			this.$el.find(".gameItem").attr("class", "extendedGameItem");
			this.expanded = 1;
		}else{
			this.$el.find(".extendedGameItem").attr("class", "gameItem");
			this.expanded = 0;
		}
	}
});
