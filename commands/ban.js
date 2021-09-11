const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
try{
  let color = ((1 << 24) * Math.random() | 0).toString(16);
//Gets user being banned
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//If user doesn't exist send bEmbed95
  let bEmbed95 = new Discord.RichEmbed()
  .setColor(0x8B0000)
  .setDescription(`❌ Can't find that user ❌`);
  if(!bUser) return message.channel.send(bEmbed95);
//Ban reason
  let bReason = args.join(" ").slice(22);
//Check if user has permission "BAN_MEMBERS"
  let nbpm3Embed = new Discord.RichEmbed()
  .setColor(0x8B0000)
  .setDescription("❌ You need to have the permission `BAN_MEMEBERS` in order to ban ❌");
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(nbpm3Embed);
//Check if user being banned has permission "BAN_MEMBERS"
  let iub8ybEmbed = new Discord.RichEmbed()
  .setColor(0x8B0000)
  .setDescription("❌ That user cannot be banned ❌");
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(iub8ybEmbed);
//Length of ban
  let banTime = args[1]
//Ban user with ban reason + DM
  await bUser.send(`You was banned from **${message.guild.name}**, for the reason **${bReason}** for the length of ** ${banTime} **`)
  message.guild.member(bUser).ban(bReason);
//Succesfull ban message
  let bEmbed2 = new Discord.RichEmbed()
  .setColor(`#${color}`)
  .setDescription(`✅ ${bUser} has been banned by <@${message.author.id}> for the reason ${bReason} ✅`);
  message.channel.send(bEmbed2);
  //Make server invite
  let invite = await message.channel.createInvite({
    maxAge: 86400,
    maxUses: 1
  })
//Unbanning once time limit reached
    setTimeout(function(){
      message.guild.unban(bUser)
      let umEmbed = new Discord.RichEmbed()
      .setColor(`#${color}`)
      .setDescription(`${bUser} is now unbanned`);
      message.channel.send(umEmbed)
      bUser.send(`You was unbanned from **${message.guild.name}**, you can rejoin with this link -> ** ${invite} **`)
    }, ms(banTime));
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}
  module.exports.help = {
    name: "ban",
    description: "Bans users from the server",
    usage: ".ban @User#0001 1d Racism"
  }
