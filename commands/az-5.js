const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'az-5',
	description: 'Not great, not terrible.',
	async execute (message) {
        function controlRods() {
            message.client.destroy();
            process.exit();
        }
    
        function twopointsix() {
            message.client.user.setActivity('AZ-5 ☢️ (2.6s)');
        }
    
        function onepointsix() {
            message.client.user.setActivity('AZ-5 ☢️ (1.6s)');
        }
    
        function zeropointsix() {
            message.client.user.setActivity('AZ-5 ☢️ (0.6s)');
        }
    
        if (message.author.id == '195090852974952448') {
            const engage = new MessageEmbed()
                .setColor('#FF0000')
                .setDescription('AZ-5: Shutting down Nightraid II in 3.6 seconds.')
                .setFooter(`☢️ mem. usage: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}mb`);
    
            message.client.user.setActivity('AZ-5 ☢️ (3.6s)');
            message.channel.send(engage);
            setTimeout(controlRods, 3600);
            setTimeout(twopointsix, 1600);
            setTimeout(onepointsix, 2600);
            setTimeout(zeropointsix, 3500);
        }
	},
};