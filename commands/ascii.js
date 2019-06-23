// Comando ascii - requer 1 package.
// 'npm i ascii-art'
const ascii = require("ascii-art");

// Command Handler
exports.run = (client, message,args, ops) => {

    // Gera a fonte:
    ascii.font(args.join(' '), 'Doom', function(rendered) {
        // args segura as letras enviadas com o comando

        // rendered tem o ouput à ser enviado.
        rendered = rendered.trimRight(); // Remove o espaço que seria deixado vazio.

        // Agora iremos checar se a linha excede o limite de caracteres.
        if(rendered.length > 2000) return message.channel.send('Desculpe-me, essa mensagem é demasiadamente grande.');

        // Se tudo estiver ok, enviamos a mensagem.
        message.channel.send(rendered, {
            code: 'md'

        }); // A opção no final especifica que a mensagem deverá estar em um bloco de código.

    });
}


module.exports.config = {
    name: "ascii",
    aliases: ["ascmesagem", "asciimensagem", "codascii"],
    usage: ";ascii <texto>",
    description: "Codifica sua mensagem usando a fonte ascii.",
    accessableby: "Membros"
}
