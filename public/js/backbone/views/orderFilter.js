LastPlaysGamesByBGGUser.Views.OrderFilterView = Backbone.View.extend({
	events:{},
	className:"",
	initialize : function(){
		this.template = _.template($("#OrderFilter_tpl").html());
	},
	render: function(bggUser) {
		var self = this;
		var searchData = null;

		this.$el.html(this.template({data:{}}));

		if($.cookie(bggUser) != null){
			searchData = JSON.parse($.cookie(bggUser));
		}

		if(searchData == null){
			searchData = {
				bggUser: bggUser,
				orderBy: "Days",
				orderType: "Desending",
				onlyOwned: true,
				excludeExp: true,
				onlyPlayed: true
			}
		}

		this.$el.find("#filterOrderBy").val(searchData.orderBy);
		this.$el.find("#filterOrderType").val(searchData.orderType);
		this.$el.find("#filterToggle").on('click', function(){
			if(self.$el.find("#filterForm").attr('class') === "filterFormShow"){
				self.$el.find("#filterForm").attr('class', 'filterFormHidden');
			}else{
				self.$el.find("#filterForm").attr('class', 'filterFormShow');
			}
		});

		this.$el.find("#reOrder").on('click', function(){
			var orderBy = self.$el.find("#filterOrderBy").val();
			var orderType = self.$el.find("#filterOrderType").val();

			window.collections.gamePlays.comparator = window.collections.gamePlays.getComparator(orderBy, orderType);
			window.collections.gamePlays.sort();
			window.collections.gamePlays.render();
		});

		return this;
	}
});
