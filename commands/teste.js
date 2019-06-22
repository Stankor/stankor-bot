/////// Filtragem de comandos
const fs = require('fs');
const Discord = require('discord.js');
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


///// Pegar comandos através da index

if(!message.content.startsWith(prefix)) return;
let commandfile = bot.commands.get(cmd.slice(prefix.lenght)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.lenght)))
if(commandfile) commandfile.run(client, message, args)



