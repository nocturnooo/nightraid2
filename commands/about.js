const { Message, MessageEmbed } = require("discord.js");
const packageJSON = require('../package.json')
const nightraidVersion = packageJSON.version;

module.exports = {
	name: 'about',
	description: 'Sends information about the bot!',
	execute (message) {
        var colors = [
            '#FF0000',
            '#FF1919',
            '#FF3232',
            '#FF4C4C',
            '#FF6666',
            '#FF7F7F',
            '#FF9999',
            '#FFB2B2',
            '#FFCCCC',
            '#FFE5E5',
            '#FFFFFF'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const aboutEmbed = new MessageEmbed()
            .setColor(randomColor)
            .setAuthor('About Nighraid II', message.client.user.displayAvatarURL())
            .addField('Bot Statistics', `:robot: Nightraid II ${nightraidVersion}
                                        :green_book: Node ${process.version}
                                        :radioactive: Memory used ${Math.round(process.memoryUsage().rss / 1024 / 1024)}mb
                                        :newspaper: Active on ${message.client.guilds.cache.size} guild(s)`)
            .addField('\u200B', '\u200B')
            .addField(':heart: Nightraid II is an easy to use multi-functional bot suited for all of your needs.', '[Nightraid II Support](https://discord.gg/vBKkqbt) • [Invite](https://discord.com/api/oauth2/authorize?client_id=727621771729305604&permissions=435547254&scope=bot)')
        message.channel.send(aboutEmbed)
	},
};