const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
    //Create embed
    let sEmbed = new Discord.RichEmbed()
    .addField("Support", "Need to report a bug? Join the server [here](https://discord.gg/9McYPcP) and report it!")
    .setColor(`#${color}`)
    message.channel.send(sEmbed)
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}

module.exports.help = {
  name: "support",
  description: "Links to the support server, you can report issues here!",
  usage: ".support"
}
