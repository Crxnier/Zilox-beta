const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
//If user attempting to unmute doesn't have permission MUTE_MEMBERS don't allow the user to unmute the targetted user
    let tm4Embed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ You must have the permission `MUTE_MEMBERS` in order to mute users ❌");
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(tm4Embed)
//Find user to unmute
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//If user not found
    let permEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription(`❌ The user you are attempting to unmute does not exist ❌`);
    if(!tomute) return message.channel.send(permEmbed);
//Find muted role
    let muterole = message.guild.roles.find(`name`, "Muted");
//Check if user is currently muted
    if(!tomute.roles.find(role => role.name === "Muted")){
      let maEmbed = new Discord.RichEmbed()
      .setColor(0x8B0000)
      .setDescription(`❌ The user <@${tomute.id}> is not muted ❌`)
      message.channel.send(maEmbed)
      return;
    }
//Remove the mute role to the user being unmuted + DM the user
    tomute.send(`You was unmuted in **${message.guild.name}** by <@${message.author.id}>`)
    await(tomute.removeRole(muterole.id));
//Successful unmute message
    let umEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .addField("**Member unmuted**", `<@${tomute.id}>`, true)
    .addField("**Unmuted by**", `<@${message.author.id}>`, true)
    message.channel.send(umEmbed)
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}

module.exports.help = {
  name: "unmute",
  description: "Unmutes a user who is muted",
  usage: ".unmute @User#0001"
}
