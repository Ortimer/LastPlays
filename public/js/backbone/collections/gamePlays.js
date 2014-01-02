LastPlaysGamesByBGGUser.Collections.GamePlaysCollection = Backbone.Collection.extend({
    model: LastPlaysGamesByBGGUser.Models.GameItemModel,
    url:"",
    name:"Plays",
    search : function(letters){
        if(letters == "") return this;
        var pattern = new RegExp(letters,"gi");
        return _(this.filter(function(data) {
            return pattern.test(data.get("title"));
        }));
    },
    comparator : function(item){
        return item.get("title");    
    },
    getOne : function(id){
        return this.filter(function(data) {
            return data.get("id") == id;
        });
    },
    parse : function(resp) {
        return resp.data;
    },
    render: function(){
        $("#contenido").html("");
        this.each(function(modelTemp){
            var view = new LastPlaysGamesByBGGUser.Views.PlaysView(modelTemp);
            view.render();
            view.$el.appendTo("#contenido");
        });
    },
    getComparator: function(orderBy, orderType){
        var orderVariable = "";

        switch(orderBy){
            case "Days": 
                    orderVariable = "timeMilis";
                    break;
            case "Name": 
                    orderVariable = "title";
                    break;
            case "Plays": 
                    orderVariable = "totalPlays";
                    break;
        }

       return function(item1, item2){
            if(orderType === "Ascending"){
                if(orderBy === "Name"){
                    return item1.get(orderVariable).localeCompare(item2.get(orderVariable));
                }else{
                    return item1.get(orderVariable) - item2.get(orderVariable);
                }
            }else{
                if(orderBy === "Name"){
                    return item2.get(orderVariable).localeCompare(item1.get(orderVariable));
                }else{
                    return item2.get(orderVariable) - item1.get(orderVariable);
                }
            }
        }
    }
});

LastPlaysGamesByBGGUser.Collections.gamePlays = LastPlaysGamesByBGGUser.Collections.GamePlaysCollection;