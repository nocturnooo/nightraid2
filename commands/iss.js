const { Message, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'iss',
	description: 'Sends the location of the ISS.',
	async execute (message) {
        const { iss_position } = await fetch('http://api.open-notify.org/iss-now.json').then(response => response.json());

        const issLocEmbed = new MessageEmbed()
		    .setColor('#0b3d91')
		    .setDescription('Here\'s the location of the International Space Station:')
		    .addField('Longitude', iss_position.longitude, true)
		    .addField('Latitude', iss_position.latitude, true);

	    message.channel.send(issLocEmbed);
	},
};