const { Message, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
	name: 'urban',
	description: 'Searches the Urban Dictionary for a definition.',
	async execute (message, args) {
        const noArgs = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(':x: You need to supply a search term.');
        const noResults = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`:x: No results found for **${args.join(' ')}**`)

        if (!args.length) {
            return message.channel.send(noArgs);
          }
        
        const query = querystring.stringify({ term: args.join(' ') });
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        if (!list.length) {
            return message.channel.send(noResults);
        }
        
        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        const [answer] = list;

        const definitionEmbed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition:', value: trim(answer.definition, 1024) },
                { name: 'Example:', value: trim(answer.example, 1024) },
                { name: 'Rating:', value: `${answer.thumbs_up} :white_check_mark:\n${answer.thumbs_down} :x:` }
            );

        message.channel.send(definitionEmbed);
	},
};