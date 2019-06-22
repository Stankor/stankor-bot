const Discord = require('discord.js');

module.exports.run = async (client, message,args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Você não pode usar esse comando.")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!kickMember) return message.channel.send("Mencione o usuário que deseja expulsar.")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Não específicado."

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Eu não tenho permissão para usar esse comando.")
    
    kickMember.send(`Opa, beleza? Vim te avisar que tu foi expulso do servidor ${message.guild.name} por: ${reason}.`).then(() => 
    kickMember.kick()).catch(err => console.log(err))

    message.channel.send(`**${kickMember.user.tag}** foi expulso(a).`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setAuthor(`${message.guild.name} - logs de moderação`, message.guild.iconURL)
        .addField("Moderação:", "expulsão")
        .addField("Punido:", kickMember.user.username)
        .addField("Moderador:", message.author.username)
        .addField("Motivo:", reason) 
        .addField("Data:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
    sChannel.send(embed)

}



module.exports.config = {
    name: "kick",
    aliases: ["k", "kickar", "expulsar", "chutar"],
    usage: ";kick <@user> <motivo>",
    description: "Expulsa um usuário do servidor.",
    accessableby: "Moderador"
}