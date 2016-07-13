module.exports = function(bot) {
  //  YOUR CODE HERE
  //  Example
  //  robot.hear(/javascript/i, function(msg) {
  //    return msg.send("I love JavaScript!");
  //  });

  bot.hear(/Hello!/, function(res) {
    return res.send("I'm the king of the world!");
  });
  bot.respond(/What's your favorite food?/, function(res) {
    return res.send("I'm a robot--I don't eat food!");
  });
  bot.hear(/Say hello to everyone!/, function(res) {
    return res.send("@js2-hubot-5, @js2-hubot-4, @js2-hubot-3, @js2-hubot-6, @js2-hubot-2, @js2-hubot-1: Hello!");
  });
  bot.respond(/Why are we here?/, function(res) {
    return res.send("Where would you rather be?");
  });
  bot.respond(/Hi Hubot! My name is (.*)/i, function(msg) {
    var name;
    name = msg.match[1];
    if (name == "Hubot") {
    return msg.send("You're not Hubot--I'm Hubot!");
  } else {
    return msg.reply("Nice to meet you, " + name + "!");
  }
});
  bot.respond(/Hi Hubot! what's the weather like in (.*)/i, function(msg) {
    var weather;
    weather = msg.match[1];
    if (weather == "Atlanta 30326") {
      return msg.reply("/giphy #weather 30326");
    } else {
      return msg.reply("I'm not sure!");
    }
  });
}

