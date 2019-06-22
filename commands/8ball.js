// Requer 1 pacote.
const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    // Alguma coisa
        let question = message.content.split(/\s+/g).slice(1).join(" ");

        if (!question) {
            return message.channel.send('Você deve fazer uma pergunta! **Uso: ;8ball <pergunta>**');
        }

    var resposta = ['Certamente sim', 
                                        'Com toda a certeza', 
                                        'Sem nenhuma dúvida', 
                                        'Definitivamente sim', 
                                        'Você pode confiar nele',
                                        'Da forma que eu vejo, sim',
                                        'Provavelmente',
                                        'Parece bom',
                                        'Sim',
                                        'Sinais dizem que sim',
                                        'Sei não, tenta outra',
                                        'Me pergunte depois',
                                        'Melhor não te dizer agora',
                                        'Não sei',
                                        'Se concentra e pergunta de novo',
                                        'Não conte com isso',
                                        'Minha resposta é não',
                                        'Minhas fontes dizem que não',
                                        'Não parece bom',
                                        'Muito duvidoso'];
            // Embed aqui
        const ballEmbed = new Discord.RichEmbed()
            .setAuthor(question)
            .setDescription(resposta[Math.round(Math.random() * (resposta.lenght - 1))] + '.')
            .setColor(0x646770);
        message.channel.send(ballEmbed);

    }

module.exports.config = {
    name: "8ball",
    aliases: ["8ball", "perguntas", "8b"],
    usage: ";8ball <pergunta>",
    description: "Irei responder a sua pergunta.",
    accessableby: "Membros"
}
