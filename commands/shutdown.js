const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if(message.author.id != "ownerID") return message.channel.send("Você não é meu desenvolvedor")

    try {
        await message.channel.send("O bot está desligando...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


}


module.exports.config = {
    name: "shutdown",
    description: "Desliga o bot.",
    usage: "!shutdown",
    accessableby: "Desenvolvedor",
    aliases: ["botstop", "desligar"]
}