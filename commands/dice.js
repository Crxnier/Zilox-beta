const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
    let number = ["1","2","3","4","5","6"]
    let result = Math.floor((Math.random() * number.length))

    let diceRoll = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setTitle("**You rolled a:**")
    .setDescription(`${number[result]}`)

    message.channel.send(diceRoll)
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}
module.exports.help = {
  name: "dice",
  description: "Roll a dice (1-6)",
  usage: ".dice"
}
