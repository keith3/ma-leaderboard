Meteor.startup(function () {
  if (Teams.find().count() === 0) {
    var names = ["骑士", "老鹰", "勇士",
                 "马刺", "火箭", "热火"];
    _.each(names, function (name) {
      Teams.insert({
        name: name,
        score: Math.floor(Random.fraction() * 10) * 5
      });
    });
  }
});
