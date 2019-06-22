const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Você não pode usar esse comando.")

    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("Mencione o usuário que deseja desbanir.")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Eu não tenho permissão para executar esse comando.")|
    message.delete()
    try {
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} foi desbanido(a).`)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} logs de moderação`, message.guild.iconURL)
    .addField("Punição:", "unban")
    .addField("Punido:", `${bannedMember.username} (${bannedMember.id})`)
    .addField("Moderador:", message.author.username)
    .addField("Motivo:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
        sChannel.send(embed)

}

module.exports.config = {
    name: "unban",
    description: "Desbane um usuário do servidor.",
    usage: ";unban <@usuário>",
    accessableby: "Administradores",
    aliases: ["ub", "unbanish", "desbanir"]
}