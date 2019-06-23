// Esse comando precisa de 2 pacotes 'discord.js' e 'mathjs'

const math = require('mathjs');
const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    // Vamos checar se eles colocaram texto.
    if (!args[0]) return message.channel.send('Insira um cálculo.');

    // Vamos evaluar o cálculo usando o pacote 'mathjs'
    let resp;
    try {
        resp = math.evaluate(args.join(' '));    
    } catch (e) {
        return message.channel.send('Cálculo inválido.');        
    }

    // Hora de enviar o resultado da continha que o bbzinho não sabia fazer sozinho.
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setTitle('Calculadora')
        .addField('Valor de entrada', `\`\`\`js\n${args.joins('')}\`\`\``)
        .addfield('Valor de saída', `\`\`\`js\n${resp}\`\`\``)
        .timestamp()
        .setFooter('Sou um humano disfarçado.')

    message.channel.send(embed);

}

module.exports.config = {
    name: "calc",
    aliases: ["calcular", "calculadora", "calculo"],
    usage: ";calcular <cálculo>",
    description: "Irei enviar o resultado do cálculo.",
    accessableby: "Membros"
}
