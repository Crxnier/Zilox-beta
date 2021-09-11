const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

module.exports.run = async (bot, message, args) => {
  try{
    var resMsg = await message.channel.send('Calculating ping... :bar_chart:');
    let color = ((1 << 24) * Math.random() | 0).toString(16);
    let pEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setDescription('** Ping**: ' + Math.round((resMsg.createdTimestamp - message.createdTimestamp) - bot.ping));
    message.channel.send(pEmbed)
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
}
}
module.exports.help = {
  name: "ping",
  description: "Shows the bot ping",
  usage: ".ping"
}
