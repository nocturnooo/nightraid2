const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'serverinfo',
	description: 'Sends info about the guild.',
	execute (message) {
        const verlvl = {
            'NONE' : 'None',
            'LOW' : 'Low',
            'MEDIUM': 'Medium',
            'HIGH' : '(╯°□°）╯︵ ┻━┻',
            'VERY HIGH' : '(ノಠ益ಠ)ノ彡┻━┻',
        };
    
        const inline = true;
        const sicon = message.guild.iconURL();
        const serverembed = new MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(sicon)
            .setAuthor(message.guild.name)
            .addField('Name:', message.guild.name, inline)
            .addField('ID:', message.guild.id, inline)
            .addField('Owner:', message.guild.owner, inline)
            .addField('Region:', message.guild.region, inline)
            .addField('Verification Level:', verlvl[message.guild.verificationLevel], inline)
            .addField('Members:', message.guild.memberCount, inline)
            .addField('Roles:', message.guild.roles.cache.size, inline)
            .addField('Channels:', message.guild.channels.cache.size, inline)
            .setFooter(`Created ${message.guild.createdAt}.`);
    
        message.channel.send(serverembed);
	},
};