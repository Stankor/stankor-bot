// Comando de ajuda.
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    if(args[0] == "help") return message.channel.send(`Use ${prefix}help.`)

    if(args[0]) {
        let command = args[0];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setAuthor('Stankor - Help', bot.user.avatarURL)
            .setDescription(`O prefixo do bot é: ${prefix}\n\n**Comando:** ${command.config.name}\n**Descrição:** ${command.config.description || "Sem descrição."}\n**Forma de uso:** ${command.config.usage || "Não especificado."}\n**Pode ser usado por:** ${command.config.accessableby || "Membros"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed);
        }}

    if(args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor('Comando de ajuda', bot.user.avatarURL)
        .setColor(0xffffff)
        .setDescription(`${message.author.username} verifique suas mensagens privadas!`)

        let Sembed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setAuthor("Stankor - Help", message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Esses são os comandos disponíveis para o Stankor Bot.\n O prefixo do bot é: ${prefix}`)
        .addField('Comandos:', "``cat`` ``dog`` ``meme`` ``help``")
        .setFooter("Sou um humano disfarçado", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)
    }
}


module.exports.config = {
    name: "help",
    aliases: ["h", "help", "commands", "ajuda", "comandos", "ayuda"],
    usage: ";ajuda",
    description: "",
    noalias: "No Aliases",
    accessableby: "Members"
}