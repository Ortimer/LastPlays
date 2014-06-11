LastPlaysGamesByBGGUser.Routers.MainRouter = Backbone.Router.extend({
	routes: {
		"" :  "root",
		"plays/:bggUser" : "showPlays"
	},
	initialize : function(){
		var self = this;

	},
	root: function(){
		var self = this;

		window.views.orderFilter.remove();
		window.views.inputForm.render();
	},
	showPlays: function(bggUser){
		var self = this;
		var searchData = null;

		var opts = {
	        lines: 11,
	        // The number of lines to draw
	        length: 25,
	        // The length of each line
	        width: 12,
	        // The line thickness
	        radius: 40,
	        // The radius of the inner circle
	        corners: 1,
	        // Corner roundness (0..1)
	        rotate: 0,
	        // The rotation offset
	        color: '#000',
	        // #rgb or #rrggbb
	        speed: 1,
	        // Rounds per second
	        trail: 60,
	        // Afterglow percentage
	        shadow: true,
	        // Whether to render a shadow
	        hwaccel: false,
	        // Whether to use hardware acceleration
	        className: 'spinner',
	        // The CSS class to assign to the spinner
	        zIndex: 2e9,
	        // The z-index (defaults to 2000000000)
	        top: '50%',
	        // Top position relative to parent in px
	        left: '50%',
	        // Left position relative to parent in px
	        visibility: true
	    };

		$("#contenido").html(new Spinner(opts).spin().el);

		var requestURL = "/bggData/collection?username=" + bggUser;

		if($.cookie(bggUser) != null){
			searchData = JSON.parse($.cookie(bggUser));
		}

		if(searchData == null){
			searchData = {
				bggUser: bggUser,
				orderBy: "Days",
				orderType: "Descending",
				onlyOwned: true,
				excludeExp: true,
				onlyPlayed: true
			}
		}

		if(searchData.onlyOwned){
			requestURL += "&own=1";
		}

		if(searchData.excludeExp){
			requestURL += "&excludesubtype=boardgameexpansion";
		}

		if(searchData.onlyPlayed){
			requestURL += "&played=1";
		}

		ga('set', 'dimension1', searchData.bggUser);
		ga('set', 'dimension2', searchData.orderBy);
		ga('set', 'dimension3', searchData.orderType);
		ga('set', 'dimension4', searchData.onlyOwned);
		ga('set', 'dimension5', searchData.excludeExp);
		ga('set', 'dimension6', searchData.onlyPlayed);

		window.collections.gamePlays.comparator = window.collections.gamePlays.getComparator(searchData.orderBy, searchData.orderType);
		window.collections.gamePlays.reset();

		this.ajaxCollection(self, bggUser, requestURL);
	},
	ajaxCollection: function (self, bggUser, requestURL) {
		$.ajax({
			url: requestURL,
			dataType: "json",
			type: 'GET',
			success: function (data) {
				var ownedGames = [];
				var gameData = [];

				console.log('Ajax information');
				console.log(data);

				$(data.items.item).each(function(index, itemData){
					ownedGames.push(itemData.objectid);
					gameData[itemData.objectid] = {
						id: itemData.objectid,
						title: itemData.name.$t,
						image: itemData.thumbnail,
						lastPlay: 'No play has been recorded',
						time: 'N/A',
						timeMilis: -1,
						totalPlays: itemData.numplays
					}

					console.log(gameData[itemData.objectid]);
				});

				self.ajaxPlays(self, bggUser, 1, ownedGames, gameData);
			},
			error: function (data) {
				console.log("Error in ajaxCollection");
				console.log(data);
			}
		});
	},
	ajaxPlays: function (self, bggUser, page, ownedGames, gameData) {
		var requestURL = "/bggData/plays?username=" + bggUser + "&page=" + page;

		$.ajax({
			url: requestURL,
			dataType: "json",
			type: 'GET',
			success: function (data) {
				var tempId = null;

				if(data.plays.play != null){
					var tempUserId = data.plays.userid;

					$(data.plays.play).each(function(index, playData){
						tempId = playData.item.objectid;

						if($.inArray(tempId, ownedGames) != -1){
							if(gameData[tempId].lastPlay == 'No play has been recorded' || gameData[tempId].lastPlay < playData.date){
								gameData[tempId].userId = tempUserId;
								gameData[tempId].lastPlay = playData.date;

								var today = new Date();
								var gameDate = new Date(gameData[tempId].lastPlay.substring(0,4), (gameData[tempId].lastPlay.substring(5,7) - 1), gameData[tempId].lastPlay.substring(8,10));
								var diffDays = new Date(gameData[tempId].lastPlay.substring(0,4), (gameData[tempId].lastPlay.substring(5,7) - 1), 1);
								var diffMonths = (today.getFullYear() - gameDate.getFullYear()) * 12;
								diffMonths -= gameDate.getMonth();
								diffMonths += today.getMonth();

								if(gameDate.getDate() > today.getDate()){
									diffMonths -= 1;
								}

								if(diffMonths <= 0){
									diffMonths = 0;
								}

								gameData[tempId].timeMilis = today.getTime() - gameDate.getTime();

								var years = parseInt(diffMonths / 12);
								var month = diffMonths % 12;

								diffDays.setMonth(diffDays.getMonth() + month + years * 12);
								diffDays.setDate(gameDate.getDate());
								var days = parseInt((today.getTime() - diffDays.getTime()) / (1000 * 60 * 60 * 24));

								gameData[tempId].time = years + " year(s) " + month + " month(s) " + days + " day(s)";
							}
						}
					});

					page++;
					self.ajaxPlays(self, bggUser, page, ownedGames, gameData);
				}else{
					for(key in gameData){
						var gameItem = new LastPlaysGamesByBGGUser.Models.GameItem(gameData[key]);

						window.collections.gamePlays.add(gameItem);
					}

					window.views.orderFilter.render(bggUser);
					window.views.orderFilter.$el.appendTo("body header")
					window.collections.gamePlays.render();
				}
			},
			error: function (data) {
				console.log("Error in ajaxPlays [Page: " + page + "]");
				console.log(data);
			}
		});
	}
});
