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
		var ownedGames = [];
		var gameData = [];
		var hasMoreData = true;
		var page = 1;

		$("#contenido").html("<figure id='loadingIcon'><img src='/img/ajax-loader.gif' /></figure>");

		var requestURL = "/bggData/collection?username=" + bggUser;

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

		if(searchData.onlyOwned){
			requestURL += "&own=1";
		}

		if(searchData.excludeExp){
			requestURL += "&excludesubtype=boardgameexpansion";
		}

		if(searchData.onlyPlayed){
			requestURL += "&played=1";
		}

		window.collections.gamePlays.comparator = window.collections.gamePlays.getComparator(searchData.orderBy, searchData.orderType);
		window.collections.gamePlays.reset();

		$.ajax({
			url: requestURL,
			dataType: "xml",
			type: 'GET',
			async: false,
			success: function (data) {
				var xmlReader = $(data);

				xmlReader.find("items").find("item").each(function(){
					ownedGames.push($(this).attr('objectid'));
					gameData[$(this).attr('objectid')] = {
						id: $(this).attr('objectid'),
						title: $(this).find('name').text(),
						image: $(this).find('thumbnail').text(),
						lastPlay: 'No play has been recorded',
						time: 'N/A',
						timeMilis: -1,
						totalPlays: $(this).find('numplays').text()
					}
				});
			},
			error: function (data) {
				console.log("Entro al error");
			}
		});

		while(hasMoreData){
			requestURL = "/bggData/plays?username=" + bggUser + "&page=" + page;

			$.ajax({
				url: requestURL,
				dataType: "xml",
				type: 'GET',
				async: false,
				success: function (data) {
					var xmlReader = $(data);
					var tempId = null;

					if(xmlReader.find("plays").children().length > 0){
						xmlReader.find("plays").find("play").each(function(){
							tempId = $(this).find('item').attr('objectid');

							if($.inArray(tempId, ownedGames) != -1){
								if(gameData[tempId].lastPlay == 'No play has been recorded' || gameData[tempId].lastPlay < $(this).attr('date')){
									gameData[tempId].lastPlay = $(this).attr('date');

									var today = new Date().getTime();
									var gameDate = new Date(gameData[tempId].lastPlay.substring(0,4), (gameData[tempId].lastPlay.substring(5,7) - 1), gameData[tempId].lastPlay.substring(8,10)).getTime();
									gameData[tempId].timeMilis = (today - gameDate);
									var difference = gameData[tempId].timeMilis / (1000 * 60 * 60 * 24);

									var years = parseInt(difference / 365);
									difference = difference % 365;
									var month = parseInt(difference / 30);
									difference = difference % 30;
									var days = parseInt(difference);

									gameData[tempId].time = years + " year(s) " + month + " month(s) " + days + " day(s)";
								}
							}
						});

						page++;
					}else{
						hasMoreData = false;
					}
				},
				error: function (data) {
					console.log("Entro al error");
					hasMoreData = false;
				}
			});
		}


		for(key in gameData){
			var gameItem = new LastPlaysGamesByBGGUser.Models.GameItem(gameData[key]);

			window.collections.gamePlays.add(gameItem);
		}

		window.views.orderFilter.render(bggUser);
		window.views.orderFilter.$el.appendTo("body header")
		window.collections.gamePlays.render();
	}
});
