const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
try{
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  //Update embed
  //Change every update
  let update = new Discord.RichEmbed()
  .setColor(`#${color}`)
  .setDescription(`Update not yet added`)
  //Bot version
  .setFooter("Version 6")
  message.channel.send(update)
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}
module.exports.help = {
  name: "update",
  description: "Show what was added in the most recent update, format for the update is as follows: What changes - File changed - Date when changed",
  usage: ".update"
}
