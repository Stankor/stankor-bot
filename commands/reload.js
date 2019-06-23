// Comando que recarrega outros comandos - utilizado para aplicar alterações.

const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if(message.author.id != "339924970673012736") return message.channel.send("Você não é meu desenvolvedor.")

    if(!args[0]) return message.channel.send("Informe o comando que deseja recarregar.")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Não foi possível recarregar o comando: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`O comando \`${args[0].toUpperCase()}\` foi recarregado.`)

}


module.exports.config = {
    name: "reload",
    description: "Recarrega um comando.",
    usage: "!reload <nome>",
    accessableby: "Desenvolvedor",
    aliases: ["creload", "recarregar"]
}
