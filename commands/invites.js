const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  if(message.author.id !== "157619634504204289") return message.channel.send("❌ Sorry only the bot owner can do this ❌" );
  //Stolen code - https://gist.github.com/Sv443/1abfd269d15006a8689470cc14946d1b
  var allowedToUse = true;
  if(allowedToUse) {
      let invites = ["ignore me"], ct = 0;
      bot.guilds.forEach(g => {
          g.fetchInvites().then(guildInvites => {
              invites[invites.length + 1] = (g + " - `Invites: " + guildInvites.array().join(", ") + "`");
              ct++;

              if(ct >= bot.guilds.size) {
                  invites.forEach((invite, i) => {
                      if(invite == undefined)
                          invites.splice(i, 1);
                  });

                  invites.shift();
                  invites.forEach((invite, i) => invites[i] = "- " + invite);
                  invites = invites.join("\n\n");

                  let embed = new Discord.RichEmbed()
                  .setTitle("All Invites:")
                  .setDescription(invites);

                  message.channel.send(embed);
              }
          }).catch(err => {
              ct++;
          });
      });
  }
  else {
      message.reply("this command can only be used by a developer.");
  }
}

module.exports.help = {
  name: "invites",
  description: "Get's invite links for all servers the bot is it, Bot owner only",
  usage: ".invites"
}
