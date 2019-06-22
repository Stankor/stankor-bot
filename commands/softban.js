const Discord = require('discord.js');
const superagent = require('superagent');


exports.run = async (client, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Você não pode usar esse comando.")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
    if(!banMember) return message.channel.send("Mencione o usuário que deseja banir.")

    let reason = arg.slice(1).join(" ");
    if(!reason) reason = "Não específicado."

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return ("Eu não tenho permissão para usar esse comando.")

    message.delete()

    banMember.send(`Opa, beleza? Você foi banido do servidor ${message.guild.name} por: ${reason}.`).then(() => 
    message.guild.ban(banMember, {days: 1, reason: reason})).then(() => message.guild.uban(banMember.id, { reason: "softban"})).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.tag}** foi banido(a).`)

    let embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setAuthor(`${message.guild.name} - logs de moderação`, message.guild.iconURL)
        .addField("Moderação:", "banimento")
        .addField("Punido:", banMember.user.username)
        .addField("Moderador:", message.author.username)
        .addField("Motivo:", reason) 
        .addField("Data:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
    sChannel.send(embed)
    

}





module.exports.config = {
    name: "softban",
    aliases: ["sb", "sbanish", "sbanir", "sban"],
    usage: ";softban <@usuário>",
    description: "Bane falsamente um usuário no discord.",
    accessableby: "Administradores"
}