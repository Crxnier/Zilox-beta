const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
try{
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  if(message.author.id !== "157619634504204289") return message.channel.send("❌ Sorry only the bot owner can do this ❌");
  //Message for server list
  let dEmbed = new Discord.RichEmbed()
  .setColor(`#${color}`)
  .setDescription("__**Servers i'm in!:**__");
  message.channel.send(dEmbed)
  bot.guilds.forEach((guild) => {
  //Applies the server list to an embed
    let fEmbed = new Discord.RichEmbed()
  //Gets the servers name and adds it's to the embed
    .setDescription(`**${guild.name}**`)
    .setColor(`#${color}`);
  //Sends embed and repeats until out of servers
    message.channel.send(fEmbed)
        })
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}

module.exports.help = {
  name: "servers",
  description: "Shows a list of what servers the bot is in!, only the bot owner can use this",
  usage: ".servers"
}
