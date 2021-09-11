const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try{
    let color = ((1 << 24) * Math.random() | 0).toString(16);
    let npEmbed = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription("❌ You need to have the permission `MANAGE_MESSAGES` in order to purge ❌");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(npEmbed);
    await message.delete().catch();
    const args = message.content.split(' ').slice(1);
    //Amount of messages deleted
    const amount = args.join(' ');
    //If amount isn't given;
    let nAmount = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription('❌ You haven\'t given an amount of messages which should be deleted! ❌');
    if (!amount) return message.channel.send(nAmount);
    //If amount isn't numbers
    let vAmount = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription('❌ The value must be a number ❌');
    if (isNaN(amount)) return message.channel.send(vAmount);
    //If amount is bigger then 100
    let oAmount = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription('❌ You can`t delete more than 100 messages at once! ❌');
    if (amount > 100) return message.channel.send(oAmount);
    //If amount < 1
    let uAmount = new Discord.RichEmbed()
    .setColor(0x8B0000)
    .setDescription('❌ You have to delete at least 1 message! ❌');
    if (amount < 1) return message.channel.send(uAmount)
    //Purge messages
    await message.channel.bulkDelete(amount)
    //Purge successful
    let success = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setDescription(`✅ ${amount} messages purged by <@${message.author.id}> ✅`)
    message.channel.send(success)
  }catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}
  module.exports.help = {
    name: "purge",
    description: "Deletes messages (up to 14 days old)",
    usage: ".purge 50"
}
