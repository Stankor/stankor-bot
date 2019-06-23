// Comando purge (aka limpador de caca) - requer 1 pacote.
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Você deve especificar a quantidade de mensages que deseja apagar.');
    if(!args[0]) return message.channel.send('Você deve especificar a quantidade de mensages que deseja apagar.');

    // Enviando para o chat.
    message.channel.bulkDelete(args[0]).then(() => { // Deleta o comando utilizado pelo usuário.
        message.channel.send(`:pencil2: ${args[0]} mensagens foram deletadas.`).then(msg => msg.delete(5000));
    });
}

module.exports.config = {
    name: "purge",
    aliases: ["prune", "clear", "limpar"],
    usage: ";limpar <qnt de mensagens>",
    description: "Irei apagar a quantidade de mensagens específicada.",
    accessableby: "Administrador"
}
