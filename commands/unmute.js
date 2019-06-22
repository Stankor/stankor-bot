const Discord = require('discord.js');
const superagent = require('superagent');


module.exports.run = async (client, message, args) => {
// Verifica tem permissão para usar o comando.
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Você não pode usar este comando.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Eu não tenho permissão para adicionar cargos.")

// Define o motivo e desmuta.
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Mencione o usuário que deseja mutar.");

let reason = args.slice(1).join(" ");
if(!reason) reason = "Motivo não específicado."

// Define o mute role e se não existir envia uma mensagem
let muterole = message.guild.roles.find(r => r.name === "Mutado")
if(!muterole) return message.channel.send("O usuário não está silenciado.")

// Remove o cargo do usuário mencionado
mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Opa, beleza? Vim avisar que você foi desmutado no ${message.guild.name} por: ${reason}.`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} foi desmutado(a).`)
})

// Envia um embed para os canais de log da staff. 
let embed = new Discord.RichEmbed()
.setColor(0xffffff)
.setAuthor(`${message.guild.name} - logs de moderação`, message.guild.iconURL)
.addField("Moderação:", "desmutamento")
.addField("Punido:", mutee.user.username)
.addField("Moderador:", message.author.username)
.addField("Motivo:", reason) 
.addField("Data:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
sChannel.send(embed)

}


module.exports.config = {
    name: "unmute",
    aliases: ["unmute", "speak", "desmutar"],
    usage: ";unmute <@usuário> motivo",
    description: "Desmuta um usuário no discord.",
    accessableby: "Members"
}