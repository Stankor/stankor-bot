/// Pacote 'npm i quick.db'
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('Você não pode usar esse comando.')
    }

    if (!args[0]) return message.reply('Especifique uma quantidade para adicionar.');
    if (isNaN(args[0])) return message.reply('Valor inválido.')

    let user = message.mentions.user.first() || message.author
    message.channel.send('Foram adicionados ' + args[0] + ' à conta do ' + user)
    db.add('userInfo.balance', args[0])

}

module.exports.config = {
    name: "addmoney",
    aliases: ["adicionarcash", "adddinheiro", "moneyadd"],
    usage: ";addmoney <@usuário> <quantia>",
    description: "Adiciona dinheiro à conta do usuário específicado.",
    accessableby: "Desenvolvedor"
}
