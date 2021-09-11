const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const client = new Discord.Client({disableEveryone: true});

module.exports.run = async (bot, message, args) => {
  try {
    let fuckJerry = ["You know what Jerry? Fuck you! I fucking hate you so fucking much like words can **NOT** describe how much I **HATE** you like seriously SHUT THE FUCK UP", "You know Jerry isn't that bad, SIKE", "Fuck Jerry", "I hate Jerry", "Jerry is dumb dumb stupid head", "Stinky Jerry", "I fucking hate Jerry", "The reason I hate Jerry is: ERROR", "Jerry go fuck yourself"]
    var result = Math.floor((Math.random() * fuckJerry.length))
    let color = ((1 << 24) * Math.random() | 0).toString(16);

    let ballEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setThumbnail(message.author.avatarURL)
    .setTitle("**FuckJerryGenerator8000**")
    .setDescription(`${fuckJerry[result]}`)
    .setFooter("Accepting suggestions for the FuckJerryGenerator8000!")
    message.channel.send(ballEmbed)
  } catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}

module.exports.help = {
name: "fkjerry",
description: "Fuck Jerry lol",
usage: ".fkjerry"
}
