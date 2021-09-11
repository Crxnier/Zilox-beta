const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
  //If user attempting to mute doesn't have permission MUTE_MEMBERS don't allow the user to mute the targetted user
    let tm4Embed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ You must have the permission `MUTE_MEMBERS` in order to mute users ❌");
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(tm4Embed)
  //Find user to mute
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //If user not found
    let permEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription(`❌ The user you are attempting to mute does not exist ❌`);
    if(!tomute) return message.channel.send(permEmbed);
  //If user being kicked has permission MUTE_MEMBERS don't kick the user
    let perm2Embed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription(`❌ <@${tomute.id}> cannot be muted ❌`);
    if(tomute.hasPermission("MUTE_MEMBERS")) return message.channel.send(perm2Embed);
  //Length of mute
    let mutetime = args[1]
  //If user didn't define a time unit send timeEmbed
    let timeEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setFooter("Format: S/M/H/D")
    .setDescription(`❌ Please say how long the user will be muted for\n e.g. .mute <@${tomute.id}> 1d Spam ❌`);
    if(!mutetime) return message.channel.send(timeEmbed);
  //Get mute reason
//mReason shows mutetime in it so removed until fixed
    // var mReason = args.join(` `).slice(22);
    // if(!mReason){
    //   var mReason = "Reason not supplied"
    // }
  //Check for a role called "Muted"
    let muterole = message.guild.roles.find(`name`, "Muted");
  //Check if user is already muted
    if(tomute.roles.find(role => role.name === "Muted")){
      let maEmbed = new Discord.RichEmbed()
      .setColor(0x8B0000)
      .setDescription(`❌ The user <@${tomute.id}> is already muted ❌`)
      message.channel.send(maEmbed)
      return;
    }
  //Create mute role if mute role does not exist
    if(!muterole){
      message.channel.send(`❌ The role "Muted" does not exist`).then((sentMessage) => sentMessage.edit(`Creating the role "Muted"`)).then((sentMessage) => sentMessage.edit(`✅ Role "Muted" created successfully "`));
      message.channel.send(`Please move the role "Muted" as high as possible! (If the role is below the users highest rank it will not work!)`)
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#818386",
          permissions:[]
        })
  //Changes all channel permission to dissallow for the role to speak
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false,
            CONNECT: true,
          });
        });
      }catch(e){
        console.log(e.stack)
      }
    }
//DM the user saying they was muted

  //Apply the mute role to the user being muted
    await(tomute.addRole(muterole.id));
    tomute.send(`You was muted in **${message.guild.name}** by **<@${message.author.id}>**, mute legnth **${mutetime}**`)
  //Successful mute message
    let mEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .addField("**Member muted**", `<@${tomute.id}>`, true)
    .addField("**Muted by**", `<@${message.author.id}>`, true)
    .addField("**Length of mute**", `${mutetime}`, true)
    // .addField("**Reason of mute**", `${mReason}`, true)
    message.channel.send(mEmbed);
  //Unmuting once time limit reached
    setTimeout(function(){
      tomute.removeRole(muterole.id);
      let umEmbed = new Discord.RichEmbed()
      .setColor(`#${color}`)
      .setDescription(`✅ <@${tomute.id}> is now unmuted ✅`);
      message.channel.send(umEmbed)
      tomute.send(`You was unmuted in **${message.guild.name}**`)
    }, ms(mutetime));
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}

module.exports.help = {
  name: "mute",
  description: "Mute a user for the given time then unmutes them once finished",
  usage: ".mute @User#0001 1d Racism"
}
