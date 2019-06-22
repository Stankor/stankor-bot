// Arquivo principal.

// Requerimento de pacotes:
require('dotenv').config() // Requerimento necessário pra economia/loja/itens funcionarem.
const Discord = require('discord.js');
const client = new Discord.Client();
const superagent = require('superagent')

// Ligação do comando help
const fs = require('fs');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.lenght <= 0) {
        return console.log("[LOGS] Não foi possível encontrar comandos!");
    }

    jsfile.forEach((f, i) => {
        let pull = require('./commands/$(f)');
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});


// Váriaveis constantes:
const prefix = ';'; // Prefixo utilizado para executar comandos.
const ownerID = 'ID'
var version = '2.0'; // Versão do bot.

// Objeto contendo os stats do servidor:
const serverStats = {
    guildID: '539258125056737290',
    totalUsersID: '539258125056737290',
    memberCountID: '539258125056737290',
    botCountID: '539258125056737290'
}; // Usado pra editar os títulos, usando o ID.

// Listener events - eventos de captura de mensagem.
client.on('message', message => {
    // Executado toda vez que uma mensagem é recebida.

    // A filtragem de mensagens é dividida em 3 partes: declarar as palavras proíbidas, verificar e remover, avisando o usuário.

    // Parte 1: Declarando as palavras proíbidas. 
    let blacklisted = ['Desgraçado', 'viado', 'imbecil', 'otário', 'babaca']; // Essas são as palavras proíbidas
    
    // Parte 2: Verificando e removendo o texto.
    let foundInText = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    } // Verifica se o item atual está incluso na mensagem.

    // Parte 3: Se o texto for encontrado, delete a mensagem e avise o usuário.
    if (foundInText) {
        message.delete();
        message.channel.send('O uso dessa palavra está proíbido.');
    }

    // Váriaveis:
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Return Statements:
    if (message.author.bot) return;  // Ignora as mensagens do bot.
    if (message.content.startsWith(prefix)) return;

    // Command Handler
    try {

        // Auto reload
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        // Opções
        let ops = {
            ownerID: "339924970673012736"
        }
        
        if(!message.content.startsWith(prefix)) return;
        let commandfile = bot.commands.get(cmd.slice(prefix.lenght)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.lenght)))
        if(commandfile) commandfile.run(client, message, args)
    } catch(e) {
        console.log(e.stack);
    }
});

// Evento de inicialização - bot online:
client.on('ready', () =>{
    console.log('Inicialização concluída!'); 
    client.user.setActivity("Stankor Bot V2.0", { type: 'STREAMING'}).catch(console.error);
})

// Eventos de membros entrando/saindo
client.on('guildMemberAdd', member => {

    // Verifica se não estava nos Stats
    if (member.guild.id !== serverStats.guildID) return;

    // Agora pra atualizar os nomes dos canais com os dados de usuário.
    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setname(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);
});

    client.on('guildMemberRemove', member => {

        if (member.guild.id !== serverStats.guildID) return;

    // Mesma coisa de cima aqui.
        client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
        client.channels.get(serverStats.memberCountID).setname(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
        client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});

// Login do bot:
client.login(process.env.BOT_TOKEN);
