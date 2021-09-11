const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
    //Replies
    let replies = ["Yes", "No", "Maybe", "Not sure"]
    //Random generator for the 8ball
    let result = Math.floor((Math.random() * replies.length))

    //8ball message
    let ballEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setTitle("**Answer:**")
    .setDescription(`${replies[result]}`)
    //send message
    message.channel.send(ballEmbed);
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}

module.exports.help = {
  name: "8ball",
  description: "Replies to your question with 4 possible answers",
  usage: ".8ball Should @User#0001 be admin?"
}
