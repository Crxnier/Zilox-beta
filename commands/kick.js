const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
//Find user being kicked
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//If user didn't exist
    let kUserEmbed = new Discord.RichEmbed()
    .setDescription("❌ Can't find that user ❌")
    .setColor(0x8B0000);
    if(!kUser) return message.channel.send(kUserEmbed);
//Fetch kick reason
    var kReason = args.join(" ").slice(22);
//If no kick reason
    if(!kReason){
      var kReason = "Reason not supplied"
    }
//Check if user can kick
    let pEmbed = new Discord.RichEmbed()
    .setDescription("❌ You don't have the permission `KICK_MEMBERS` ❌")
    .setColor(0x8B0000);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(peEmbed);
//Check if user being kicked has the permission KICK_MEMBERS
    let peEmbed = new Discord.RichEmbed()
    .setDescription("❌ That user has the permission `KICK_MEMBERS` and cannot be kicked! ❌")
    .setColor(0x8B0000);
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channels.send(pe2Emed);
//DM User saying they was kicked with an invite
    let invite = await message.channel.createInvite({
      maxAge: 86400,
      maxUses: 1
    })
//Kick the user
    await kUser.send(`You was kicked from **${message.guild.name}**, for the reason **${kReason}** you can rejoin with this link -> ** ${invite} **`)
    kUser.kick(kReason);
//Confirmation of user being kicked
    let kEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .addField("**Member kicked**", `<@${kUser.id}>`, true)
    .addField("**Kicked by**", `<@${message.author.id}>`, true)
    .addField("**Reason of kick**", `${kReason}`, true)
    message.channel.send(kEmbed);


  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}
  module.exports.help = {
    name: "kick",
    description: "Kicks the user from the server",
    usage: ".kick @User#0001 Being silly"
  }
