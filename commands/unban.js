const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
try{
  //If user unbanning doesn't have BAN_MEMBERS
  let nbpm3Embed = new Discord.RichEmbed()
  .setColor(0x8B0000)
  .setDescription("❌ You need to have the permission `BAN_MEMEBERS` in order to ban ❌");
  if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(nbpm3Embed)
  //Check if ID exists
  let idEmbed = new Discord.RichEmbed()
  .setColor(0x8B0000)
  .setDescription("❌ Give me a valid ID ❌")
  if(!args[0]) return message.channel.send(idEmbed);

    let bannedMember;
    //This try...catch solves the problem with the await
    try{
        bannedMember = await bot.users.fetch(args[0])
    }catch(e){
        let id1Embed = new Discord.RichEmbed()
        .setColor(0x8B0000)
        .setDescription("❌ Give me a valid ID ❌")
        if(!bannedMember) return message.channel.send(id1Embed)
    }

    //Check if the user is not banned
    try {
            await message.guild.fetchBan(args[0])
        } catch(e){
            let bancEmbed = new Discord.RichEmbed()
            .setColor(0x8B0000)
            .setDescription("❌ This user is not banned ❌")
            message.channel.send(bancEmbed);
            return;
        }

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "..."
    //Check if the bot has permissions to BAN_MEMBERS/ ADMINISTRATOR
    let permEmebed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ I don't have the permission `BAN_MEMBERS` ❌")
    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I can't do that")
    message.delete()
    try {
        let unbanEmbed = new Discord.RichEmbed()
        .setColor(`#${color}`)
        .setDescription(`${bannedMember.tag} is now unbanned`)
        message.guild.members.unban(bannedMember, {reason: reason})
        message.channel.send(unbanEmbed)
    } catch(e) {
        console.log(e.message)
    }
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}
  module.exports.help = {
    name: "unban",
    description: "Unbans the specific target (Must be banned from the server already)",
    usage: ".unban @User#0001 I forgive you ❤️"
  }
