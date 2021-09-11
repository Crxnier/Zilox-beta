const Discord = require("discord.js");
const moment = require("moment")
module.exports.run = async (bot, message, args, aliases) => {
try{
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  var userI = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(userI){
    let uEmbed = new Discord.RichEmbed()
    .setColor(`${color}`)
    .setThumbnail(userI.user.displayAvatarURL)
    .addField("Nickname:", `${userI}`, true)
    .addField("Status:", `${userI.presence.status}`, true)
    .addField("Game:", `${userI.presence.game ? userI.presence.game.name : 'None'}`, true)
    .addField("Joined The Server On:", `${moment.utc(userI.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Account Created On:", `${moment.utc(userI.user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
    // .addField("Roles:", userI.roles.find(roles => `${roles}`).join(', '), true)
    message.channel.send(uEmbed)
  }
  else if(!userI){
    let member = message.author
    let user = member
    let uEmbed = new Discord.RichEmbed()
    .setColor(`${color}`)
    .setThumbnail(message.author.avatarURL)
    .addField("Nickname:", `<@${message.author.id}>`)
    .addField("Status:", `${user.presence.status}`, true)
    .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
    .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
    // .addField("Roles:", member.roles.find(roles => `${roles}`).join(', '), true)
    message.channel.send(uEmbed)
  }
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}

module.exports.help = {
  name: "userinfo",
  description: "Shows user information",
  usage: ".userinfo or .userinfo @User#0001",
  aliases: ["user", "ui"]
}
