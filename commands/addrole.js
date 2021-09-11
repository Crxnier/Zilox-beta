const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
//Check if the user has the permission "MANAGE_ROLES"
    let pEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ You don't have permission to change users roles ❌");
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(pEmbed);
//Look for user mentioned
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
//User does not exist
    let nrEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ Couldn't find that user ❌");
    if(!rMember) return message.channel.send(nrEmbed);
//Look for role mentioned
    let role = args.slice(-1).join(" ");﻿
//Role not mentioned
    let frEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ Please mention a role ❌");
//Role doesn't exist
    if(!role) return message.channel.send(frEmbed);
    let gRole = message.guild.roles.find(`name`, role);
    let rnEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ That role doesn't exist (Case sensitive) ❌");
    if(!gRole) return message.channel.send(rnEmbed);
//Check if user already has the role
    let urEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription(`❌ ${rMember} already has the role "${gRole}" ❌`);
    if(rMember.roles.has(gRole.id)) return message.channel.send(urEmbed);
//Apply the role
    await(rMember.addRole(gRole.id));
//Confirmation message
    let rEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setDescription(`✅ ${rMember} now has ${gRole} ✅`);
    message.channel.send(rEmbed);
    return;
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}

module.exports.help = {
  name: "addrole",
  description: "Adds a role to the user",
  usage: ".addrole @User#0001 Admin (Or @Admin, command is case sensitive)"
}
