// Comando de quiz
const Discord = require('discord.js');

// Command Handler
exports.run = async (client, message, args) => {

let quiz = [
    { p: 'Qual a cor do céu?', r: ['não tem cor', 'invisível'] },
    { p: 'Quem descobriu o Brasil?', r: 'pedro álvares cabral'},
    { p: 'Qual o homem mais rico do mundo?', r: 'jeff bezos'},
    { p: 'Diga o nome de uma marca de refrigerante.', r: ['coca-cola', 'coca cola', 'pepsi', 'fanta', 'dolly', 'dydyo', 'sprite']},
    { p: 'Diga o nome de uma linguagem de programação.', r: ['actionscript', 'coffescript', 'c', 'c++', 'c#', 'visual basic', 'javascript', 'python', 'lua', 'java'] },

];
let opçoes = {
    max: 1,
    time: 30050, // 30 segundos.
    errors: ['time'],
};

let item = quiz[Math.floor(Math.random() * quiz.length)];
await message.channel.send(item.p);
try {
    let collected = await message.channel.awaitMessages(resposta => item.r.includes(resposta.content.toLowerCase()), opçoes);
    let winnerMessage = collected.first();
    return message.channel.send({embed: new Discord.RichEmbed()
                                    .setAuthor(`Ganhador: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
                                    .setTitle(`Resposta correta: \`${winnerMessage.content}\``)
                                    .setFooter(`Pergunta: ${item.q}`)
                                    .setColor('RANDOM')
                                    })
  } catch (_) {
      return message.channel.send({embed: new Discord.RichEmbed()
                                    .setAuthor('Ninguém acertou a resposta.')
                                    .setTitle(`Resposta correta: \${item.r}\``)
                                    .setFooter(`Pergunta: ${item.q}`)
                                })
  }

}