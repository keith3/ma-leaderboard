Meteor.methods({
  updateScore: function(uid, score) {
    try{
      Teams.update({_id: uid}, 
        {$inc: {score: parseInt(score)}}
      )    
     } catch(err) {
       throw new Meteor.Error(err.toString());
     }
  }
})
