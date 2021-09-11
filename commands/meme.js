const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {
  try {
    let rList = ["https://www.reddit.com/r/dankmemes.json?sort=top&t=week"]
    let result = Math.floor((Math.random() * rList.length))
         const { body } = await snekfetch
             .get(`${rList[result]}`)
             .query({ limit: 800 });
         const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
         if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
         const randomnumber = Math.floor(Math.random() * allowed.length)
         let color = ((1 << 24) * Math.random() | 0).toString(16);
         const embed = new Discord.RichEmbed()
         .setColor(`#${color}`)
         .setTitle(allowed[randomnumber].data.title)
         .setImage(allowed[randomnumber].data.url)
         .setFooter("Posts provided by r/dankmemes & r/memes | Up votes:" + allowed[randomnumber].data.ups + " | Posted by " + allowed[randomnumber].data.author)
         message.channel.send(embed)
     } catch(e){
       console.log(e.stack)
       message.channel.send("Sorry! I ran into an error while executing the command.")
     }
     }


module.exports.help = {
  name: "meme",
  description: "Shows funny pictures or videos of memes taken from r/dankmemes",
  usage: ".meme"
}
