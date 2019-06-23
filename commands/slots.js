// 🍎🍌🍒🍓🍈 Vulgo: lugar onde tu perde todo teu dinheiro

const Discord = require('discord.js'); 

// Command Handler
exports.run = (client, message, args) => {

    let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let icone = message.author.displayAvatarURL;

    if (slots[result1] === slots[result2] && slots[result3]) {
        let wEmbed = new Discord.RichEmbed() // Embed
            .setFooter('Você ganhou!', icone)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Resultado:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(0xF4E842)
        message.channel.send(wEmbed);

    } else {

        let lEmbed = new Discord.RichEmbed()
            .setFooter('Você perdeu!', icone)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Resultado:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(0xF4E842)
        message.channel.send(lEmbed);
    }
} 

module.exports.config = {
    name: "slots",
    aliases: ["cassino", "slot", "loteria"],
    usage: ";slots",
    description: "Cassino virtual.",
    accessableby: "Membros"
}
