const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
try{
  let color = ((1 << 24) * Math.random() | 0).toString(16);
//Making help command if no subcommand is found
  if(!args[0]){
    var h2Embed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setAuthor(`Zilox bot`, message.guild.iconURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField(`Fun`, `8ball, Cat, Dog, Meme, Covidcuts`)
    .addField(`Utility`, `Serverinfo, Userinfo, Botinfo, Ping, Help, Support`)
    .addField(`Moderation`, `Lockdown, Addrole, Remrole, Ban, Mute, Unmute, Kick`)
    .addField(`Bot owner`, `Servers, Invites, Restart`)
    .setFooter("To see more information about a command do `.help <command name>` e.g. `.help ban`")
    message.channel.send(h2Embed)
  }
//Making the help GUI for all commands
  if(args[0]){
    let command = args[0];
    if(!bot.commands.get(command)) {
      message.channel.send("Command does not exist")
    }
    if(bot.commands.has(command)) {
      command = bot.commands.get(command);
      var hEmbed = new Discord.RichEmbed()
      .setColor(`#${color}`)
      .setAuthor(`Zilox bot`, message.guild.iconURL)
      .setThumbnail(bot.user.displayAvatarURL)
      .addField(`Command`, `${command.help.name}`)
      .addField(`Description`, `${command.help.description}`)
      .addField(`Usage`, `${command.help.usage}`)
      .setFooter("If their is any issues with a command please report it to TechnobladesKid#1679")
      message.channel.send(hEmbed)
    }
  }
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}
  module.exports.help = {
    name: "help",
    description: "Show the bot commands and how to use it and what it does",
    usage: ".help or .help <command name>"
}
