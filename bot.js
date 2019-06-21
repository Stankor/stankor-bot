const Discord = require('discord.js');
const client = new Discord.Client();



const PREFIX = ';';

var version = '1.0.2'

const usedCommandRecently = new Set()

client.on('ready', () =>{
    console.log('Inicialização concluída!');
    client.user.setActivity("Stankor Bot V1.0.2", { type: 'STREAMING'}).catch(console.error);

})

client.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ")

    switch(args[0]){    
        case 'ping':
            if(usedCommandRecently.has(message.author.id)){
                message.channel.send("Você não pode usar esse comando novamente. Aguarde 30s!");
            }else{
            message.channel.send('For the sake of god, estou trabalhando ainda.');

            usedCommandRecently.add(message.author.id);
            setTimeout(() => {
            usedCommandRecently.delete(message.author.id)
            }, 30000);
         
        }
        break; 

        case 'Clodovaldo':
            message.channel.send('Nome feio, não?! Jk')
            break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.send('Estamos na versão ' + version + '!')
            }else{
                message.channel.send('Comando inválido.')
            }
            break;    
        case 'clear':
            if(!message.member.roles.find(r => r.name === "President")) return message.channel.send(message.author + ' Você não pode usar este comando.')
            .then(msg => msg.delete(5000));
            if(!args[1]) return message.channel.send('Comando inválido, defina o número de mensagens que deseja apagar.')
            message.channel.bulkDelete(args[1]);
            break;
        case 'perfil':
            const embed = new Discord.RichEmbed()
            .setTitle('Informações do usuário')
            .addField('Nome de usuário:', message.author.username, true)
            .addField('Versão:', version, true)
            .addField('Servidor atual:', message.guild.name, true)
            .setColor(0x30EE53)
            .setThumbnail(message.author.avatarURL)
            .setFooter('Sou um humano disfarçado.')
            message.channel.send(embed);
            break;  
        case 'avatar': 
            user = message.mentions.users.first()
            const quadro = new Discord.RichEmbed()
            .setTitle('Avatar do' + user.username) 
            .setThumbnail(user.avatarURL)
            .setColor('0x30EE53')
            .setFooter('Sou um humano disfarçado.')
            message.channel.send(quadro)
            break;                   
            
    }
})

client.login(process.env.BOT_TOKEN);
