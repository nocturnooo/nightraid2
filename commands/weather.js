const { Message, MessageEmbed } = require("discord.js");
const weather = require('weather-js');

module.exports = {
	name: 'weather',
	description: 'Sends weather info.',
	async execute (message, args) {
        if (!args.length) {
            const noArgs = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':x: You need to supply arguments.');

            message.channel.send(noArgs);
            return 0;
        }

            weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
                if(err) console.log(err);
        
            if(result.length === 0) {
                const invalid = new MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription('Please enter a valid location.');
                message.channel.send(invalid);
                return;
            }
        
            const current = result[0].current;
            const location = result[0].location;

            const weatherEmbed = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor('#80cee1')
                .addField('Timezone:', `UTC${location.timezone}`, true)
                .addField('Degree Type:', location.degreetype, true)
                .addField('Temperature:', `${current.temperature} degrees`, true)
                .addField('Feels like:', `${current.feelslike} degrees`, true)
                .addField('Winds:', current.winddisplay, true)
                .addField('Humidity:', ` ${current.humidity}%`, true)
                .addField('Day:', `${current.day}`, true)
                .addField('Date:', `${current.date}`, true);
        
            message.channel.send(weatherEmbed);
        });
	},
};