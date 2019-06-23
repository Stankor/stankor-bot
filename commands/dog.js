// Comando de cachorro.
const Discord = require('discord.js');
exports.run = (client, message, args) => {

    let msg = await message.channel.send('Carregando...')

    let {body} = await superagent
    .get('https://dog.ceo/api/breeds/image/random')
    // console.log(body.file)
    if(!{body}) return message.channel.send('Eu buguei! Tente novamente.')

        let dEmbed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setAuthor('Cachorritos', message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter('Sou um humano disfarçado', bot.user.avatarURL)
        message.channel.send({embed: dEmbed})

        msg.delete();

}

module.exports.config = {
    name: "dog",
    aliases: ["doggo", "cachorro", "cachorrito"],
    usage: ";dog",
    description: "Irei enviar a imagem de um cachorrito fofito.",
    accessableby: "Membros"
}
