// Precisamos de 2 pacotes para esse comando, 'discord.js' & 'ms'
const Discord = require('discord.js');
const ms = require ('ms');

// Command Handler
exports.run = async (client, message, args) => {
    
    let lembreteTempo = args[0]; // Variável
    if (!lembreteTempo) {
        let embed = new Discord.RichEmbed()
            .setTitle('Uso correto')
            .setDescription(`\`<prefix>lembrete 15min enviar o arquivo\``) // Embed com comando e exemplo.

            return message.channel.send(embed) // Envia o embed de cima.
            
    }

    let lembrete = args.slice(1).join(" "); // Divide os argumentos.

    let lembreteEmbed = new Discord.RichEmbed() // Mesma coisa do de cima.
        .setColor(0xffffff)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField('Lembrete', `\`\`\`${lembrete}\`\`\``) // Mostra o lembrete.
        .addField('Tempo', `\`\`\`${lembreteTempo}\`\`\``) // Mostra o tempo pra lembrar.
        .setTimestamp();
    
    message.channel.send(lembreteEmbed); // Envia o lembrete.

    setTimeout(function() {
        let lembreteEmbed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .addField('Lembrete', `\`\`\`${lembrete}\`\`\``)
            .setTimestamp()

        message.channel.send(lembreteEmbed);
    }, ms(lembreteTempo));
}

module.exports.config = {
    name: "lembrete",
    aliases: ["remindme", "lembrar", "avisar"],
    usage: ";lembrete <tempo> <motivo>",
    description: "Irei responder a sua pergunta.",
    accessableby: "Membros"
}
