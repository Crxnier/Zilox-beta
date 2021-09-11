const Discord = require("discord.js");
const ms = require("ms");
let color = ((1 << 24) * Math.random() | 0).toString(16);
module.exports.run = async (bot, message, args) => {
  try{
    let tm4Embed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ You must have the permission `MUTE_MEMBERS` in order to do a lockdown ❌");
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(tm4Embed)
//Length of lockdown
    let lockTime = args[0]
//If user didn't mention amount of time for lockdown, send timeEmbed
    let timeEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setFooter("Format: S/M/H/D")
    .setDescription(`❌ Please say how long the lockdown will be e.g. .lockdown 10m ❌`);
    if(!lockTime) return message.channel.send(timeEmbed);
//Rank being changed
    let lockRole = message.guild.roles.find(`name`, `@everyone`)
    message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(lockRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false,
          CONNECT: false,
        })
      })
      let lockEmbed = new Discord.RichEmbed()
      .setColor(`#${color}`)
      .setDescription("🔒 Server is on lockdown! No one can speak unless their role permits it 🔒")
      message.channel.send(lockEmbed)
      setTimeout(function(){
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(lockRole, {
              SEND_MESSAGES: true,
              ADD_REACTIONS: true,
              SPEAK: true,
              CONNECT: true,
            })
          })
        let lEmbed = new Discord.RichEmbed()
        .setColor(`#${color}`)
        .setDescription(`🔒 Server is no longer on lock down! 🔒`);
        message.channel.send(lEmbed)
      }, ms(lockTime));
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}

module.exports.help = {
 name: "lockdown",
 description: "Locks every channel so no user is able to speak for a certain amount of time",
 usage: ".lockdown 10d"
}
