const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
    if(message.author.id !== "157619634504204289") return message.channel.send("❌ Sorry only the bot owner can do this ❌");
    function resetBot(channel) {
    message.channel.send('Resetting the bot')
    .then(msg => bot.destroy())
    .then(() => bot.login("NzA5NTE0MjkyMjgxNzM3MzI2.XrnAtA.U46jyTiYbbBFPyqOhROpfqNO1UM"));
    message.channel.send("Bot reset!")
    }
    resetBot(message.channel);
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}

module.exports.help = {
  name: "restart",
  description: "Restarts the bot, Bot owner only",
  usage: ".restart"
}
