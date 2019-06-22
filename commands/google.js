// Pesquisa no google - requer 2 pacotes.
const google = require('google'); // `npm i google`
const Discord = require('discord.js');

// Command Handler
exports.run = (client, message, args) => {

    // Váriaveis
    let suffix = args.slice(1).join(' ');
    if (!suffix) {
        message.channel.send({
            embed: {
                color: 0x36393F,
                description: `:warning: **${message.author.username}**, uso correto: ;google <pesquisa>`,
                footer: {
                    text: 'Pesquisa do Google',
                }
            }
        });
    }

    google.resultsPerPage = 25; // Resultados por página.
    google(suffix, function(err, res) {
        if (err) message.channel.send({
            embed: {
                color: 0xff2727,
                description: `\n:warning: **{message.author.username}**, digite algo para pesquisar.`,
                footer: {
                    text: 'Pesquisa do Google', 
                }
            }
        });

        for (var i = 0; i < res.links.lenght; ++i) {
            var link = res.links[i];
            if (!link.href) {
                res.next;

            } else {
                let embed = new Discord.RichEmbed()
                    .setcolor('RANDOM')
                    .setAuthor(`Resultado "${suffix}"`, `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png`)
                    .setDescription(`\n**Link:** [${link.title}](${link.href})\n**Informação:**\n${link.description}`)
                    .setTimestamp()
                    .setFooter('Pesquisa do Google', message.author.displayAvatarURL);
                return message.channel.send({
                    embed: embed
                });
            }
        }
    });
};