// Comando de gato.
const Discord = require('discord.js');
exports.run = async (client, message, args) => {

    let msg = await message.channel.send('Carregando...')

    let {body} = await superagent
    .get('http://aws.random.cat/meow')
    // console.log(body.file)
    if(!{body}) return message.channel.send('Eu buguei! Tente novamente.')

        let cEmbed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setAuthor('Gatitos', message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter('Sou um humano disfarçado', bot.user.avatarURL)
        message.channel.send({embed: cEmbed})

        msg.delete();

}

module.exports.config = {
    name: "cat",
    description: "Envia uma imagem de gato.",
    usage: ";cat",
    accessableby: "Membros",
    aliases: ["cat", "gato", "gatito"]
}