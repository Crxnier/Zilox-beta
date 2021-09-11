const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .addField("**Bot Name**", bot.user.username, true)
    .addField("**Amount Of Servers**", `${bot.guilds.size} Servers`, true)
    .addField("**Bot invite**", "Click [here](https://discordapp.com/oauth2/authorize?client_id=492821477008343050&scope=bot&permissions=8)", true)
    .setThumbnail(bicon)
    .addField("**Created On**", bot.user.createdAt, true)
    .addField("**Made by**", "TechnobladesKid#1679", true);
    return message.channel.send(botembed);
  }catch(e){
    console.log(e.stack)
  }
  }
    module.exports.help = {
      name: "botinfo",
      description: "Shows information about the bot",
      usage: ".botinfo"
    }
