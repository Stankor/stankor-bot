// Comando de saldo.
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    let bal = db.get('userInfo.balance')

    if (bal === nul) bal = 0;

    message.channel.send('Você tem um saldo de `' + bal + '`')

}

module.exports.config = {
    name: "bal",
    aliases: ["bal", "saldo", "money", "dinheiro"],
    usage: ";bal <usuário>",
    description: "Exibe o seu saldo.",
    accessableby: "Membros"
}
