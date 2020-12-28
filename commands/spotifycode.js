const { Message, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'spotifycode',
	description: 'Creates a scannable Spotify code!',
	async execute (message, args) {
        if (!args.length) {
            const noArgs = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':x: You need to supply arguments.')
                .setDescription('n!spotifycode `backgroundcolor`(hex) `white/black` `spotifyURI` \n example: n!spotifycode 1db954 white spotify:track:4E5P1XyAFtrjpiIxkydly4');

            message.channel.send(noArgs);
            return 0;
        }

        if (args[1] != 'white' && args[1] != 'black') {
            const noCodeColor = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':x: The code color must either be white or black.');
            
            message.channel.send(noCodeColor);
            return 0;
        }

        if (!args[2]) {
            const noURI = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':x: You need to provide a Spotify URI.');

            message.channel.send(noURI);
            return 0;
        }

        const codeEmbed = new MessageEmbed()
		    .setColor('#1DB954')
		    .setDescription('Here\'s your scannable Spotify code!')
            .setImage(`https://scannables.scdn.co/uri/plain/png/${args[0]}/${args[1]}/512/${args[2]}`)

	    message.channel.send(codeEmbed);
	},
};