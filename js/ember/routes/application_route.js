BggBuddy.ApplicationRoute = Ember.Route.extend({
  model: function(){
    var menuOptions = Ember.Object.create({
        messages: [
          {
            author: "John Smith",
            time: "Yesterday",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend..."
          },
          {
            author: "John Doe",
            time: "3 days ago",
            message: "Bacon ipsum dolor amet porchetta flank turducken, pork belly beef ribs bresaola chuck swine beef turkey jerky picanha leberkas..."
          }
        ],
        tasks: [
          {
            name: "Task 1",
            progress: 42,
            barType: "progress-bar-success"
          },
          {
            name: "Task 2",
            progress: 15,
            barType: "progress-bar-info"
          },
          {
            name: "Task 3",
            progress: 80,
            barType: "progress-bar-warning"
          },
          {
            name: "Task 4",
            progress: 5,
            barType: "progress-bar-danger"
          }
        ],
        sideMenuOptions: [
          {
            name: "Last plays",
            icon: "fa-gamepad",
            link: "#"
          },
          {
            name: "Charts",
            icon: "fa-bar-chart-o",
            link: "#",
            subMenus: [
              {
                name: "Owned games by year",
                link: "#"
              },
              {
                name: "Plays by month",
                link: "#"
              }
            ]
          },
          {
            name: "Tables",
            icon: "fa-table",
            link: "#"
          },
          {
            name: "Stats",
            icon: "fa-pie-chart",
            link: "#",
            subMenus: [
              {
                name: "H-Index",
                link: "#"
              },
              {
                name: "Money spend",
                link: "#"
              }
            ]
          }
        ]
      });
    return menuOptions;
  }
});
