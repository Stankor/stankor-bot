// ppt = pedra, papel e tesoura.
const Discord = require('discord.js');

exports.run = (client, message, args) => {

    let rock2 = ['Papel! Eu ganhei!', 'Tesoura! Você ganhou!']
    let rock1 = Math.floor(Math.random() * rock2.length);

    let paper2 = ['Pedra! Você ganhou!', 'Tesoura! Eu ganhei!']
    let paper1 = Math.floor(Math.random() * paper2.length);

    let scissors2 = ['Pedra! Eu ganhei!', 'Papel! Você ganhou!']
    let scissors1 = Math.floor(Math.random() * scissors2.length);

let rock = new Discord.RichEmbed()
    .setAuthor('Pedra, Papel, Tesoura')
    .setColor(0x685858)
    .addField('Você escolheu', `${args[0]}`)
    .addField('Eu escolhi', rock2[rock1])

let paper = new Discord.RichEmbed()
    .setAuthor('Pedra, Papel, Tesoura')
    .setColor(0x685858)
    .addField('Você escolheu', `${args[0]}`)
    .addField('Eu escolhi', paper2[paper1])

let scissors = new Discord.RichEmbed()
    .setAuthor('Pedra, Papel, Tesoura')
    .setColor(0x685858)
    .addField('Você escolheu', `${args[0]}`)
    .addField('Eu escolhi', scissors2[scissors1])

if (message.content === ';ppt pedra') message.channel.send(rock)
if (message.content === ';ppt Pedra') message.channel.send(rock)

if (message.content === ';ppt papel') message.channel.send(paper)
if (message.content === ';ppt Papel') message.channel.send(paper)

if (message.content === ';ppt tesoura') message.channel.send(scissors)
if (message.content === ';ppt Tesoura') message.channel.send(scissors)


if (message.content === ';ppt') message.channel.send('Opções: ``Pedra``, ``Papel``, ``Tesoura``. **Uso: ;ppt <opção>**')


} // Fim da linha meu chapa.

module.exports.config = {
    name: "ppt",
    aliases: ["pedrapapeltesoura", "pedrapt", "rcs"],
    usage: ";ppt <pedra, papel ou tesoura>",
    description: "Irei jogar pedra, papel, tesoura com você.",
    accessableby: "Membros"
}
