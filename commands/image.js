const GoogleImages = require("google-images");
const { MessageEmbed } = require("discord.js");
const { Embeds } = require("discord-paginationembed");

exports.run = async (client, message, args) => { // 
  // if (!message.guild.me.permissions.has("MANAGE_MESSAGES") && !message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply("I don't have the `Manage Messages` permission!");
  if (!message.guild.me.permissions.has("ADD_REACTIONS") && !message.channel.permissionsFor(message.guild.me).has("ADD_REACTIONS")) return message.reply("Eu não tenho permissão para adicionar reações.");
  if (!message.guild.me.permissions.has("EMBED_LINKS") && !message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.reply("Eu não tenho permissão para postar links embed.");
  if (args.length === 0) {
    message.reply("Você precisa digitar alguma coisa para pesquisar.");
  } else {
    const embeds = [];
    const imageSearch = new GoogleImages(client.config.cseID, client.config.googleKey);
    imageSearch.search(args.join(" "), { safe: "high" }).then(images => {
      for (const [i, value] of images.entries()) {
        embeds.push(new MessageEmbed().setFooter(`Page ${i + 1} of ${images.length}`).setImage(value.url));
      }
      if (embeds.length != 0) {
        return new Embeds()
          .setNavigationEmojis({
            back: "◀",
            jump: "🔢",
            forward: "▶",
            delete: "🗑"
          })
          .showPageIndicator(false)
          .setAuthorizedUsers([message.author.id])
          .setChannel(message.channel)
          .setArray(embeds)
          .setAuthor(message.member.displayName, message.author.displayAvatarURL())
          .setPage(1)
          .setTitle("Search Results")
          .setColor(0xFF0000)
          .build();
      } else {
        return message.reply("Nenhum resultado foi encontrado.");
      }
    }).catch(error => { throw new Error(error); });
  }
};

module.exports.config = {
    name: "image",
    aliases: ["imagem", "imagesearch", "impesquisar"],
    usage: ";imagem <termo de busca>",
    description: "Pesquisa e exibe imagens do termo específicado.",
    accessableby: "Membros"
}