// Requer só o pacote básico do 'discord.js'.
const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {
    
    // Irá conter algumas funções extras.

    // Verificação de cargo:
    if (message.member.roles.find(r => r.name === 'roleName')) return message.channel.send('Esse comando requer o cargo roleName ou superior.');

    // Verificação de permissão - executado se o usuário tem permissões de admin.
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Requer permissões de administrador.');

    // Checar se o usuário enviou algo.
    if (!args[0]) return message.channel.send('Uso correto: <prefixo>pool question');

    //Cria a embed.
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setFooter('Reaja para votar.')
        .setDescription(args.join(' '))
        .timestamp()
        .setTitle(`Votação criada por ${message.author.username}`);

    // Usando await, envia a mensagem.
    let msg = await message.channel.send(embed);
    // A mensagem enviada agora será armazenada na váriavel 'msg'.

    // Reações na mensagem.
    await msg.react(''); // Usando 'await' aqui, asseguramos que a primeira reação será enviada antes da primeira.
    await msg.react('')

    // Deleta a mensagem original, no caso, o comando executado.
    message.delete({timeout: 1000}); // Espera 1000 milisegundos (aka 1 minuto) para apagar.

}



module.exports.config = {
    name: "poll",
    aliases: ["votar", "invotação", "votação"],
    usage: ";poll <objetivo da votação>",
    description: "Irei criar um embed de votação.",
    accessableby: "Administrador"
}
