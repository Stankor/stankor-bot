const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Você não pode executar esse comando.")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Mencione o usuário que deseja remover o cargo.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Informe o cargo que deseja remover.") 
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Informe o motivo.")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Eu não tenho permissão para executar esse comando.")

    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, não possui esse cargo.`)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`O cargo, ${role.name}, foi removido do(a) ${rMember.displayName}.`)
    }

    let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderação:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderador:", message.author.username)
    .addField("Motivo:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
        sChannel.send(embed)
}

module.exports.config = {
    name: "removerole",
    description: "Remove um cargo de um usuário do servidor.",
    usage: "!removerole",
    accessableby: "Moderadores",
    aliases: ["rr", "roleremove", "rc", "removercargo"]
}