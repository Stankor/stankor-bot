const Discord = require('discord.js');
const superagent = require('superagent');


module.exports.run = async (client, message, args) => {
// Verifica se o usuário tem permissão para usar el comandito.
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Você não pode usar este comando.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Eu não tenho permissão para adicionar cargos.")

// Define o motivo e muta.
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Mencione o usuário que deseja mutar.");

let reason = args.slice(1).join(" ");
if(!reason) reason = "Motivo não específicado."

// Define o cargo de mute e se o cargo não existir, cria um.
let muterole = message.guild.roles.find(r => r.name === "Mutado")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Mutado",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false, 
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

// Adiciona o cargo para o usuário mencionado e também envia uma dm dizendo onde e porque foi mutado.

mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Opa, beleza? Vim avisar que você foi silenciado no ${message.guild.name} por: ${reason}.`)
    message.channel.send(`${mutee.user.username} foi silenciado(a).`)
})

// Envia um embed para os canais de log da staff.

let embed = new Discord.RichEmbed()
.setColor(0xffffff)
.setAuthor(`${message.guild.name} - logs de moderação`, message.guild.iconURL)
.addField("Moderação:", "silenciamento")
.addField("Punido:", mutee.user.username)
.addField("Moderador:", message.author.username)
.addField("Motivo:", reason) 
.addField("Data:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
sChannel.send(embed)

}









module.exports.config = {
    name: "mute",
    aliases: ["m", "nospeak", "mutar", "silenciar"],
    usage: ";mute <@user> <motivo>",
    description: "Silencia um usuário no servidor do discord.",
    accessableby: "Members"
}
