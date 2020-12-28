const { Message, MessageEmbed } = require("discord.js");
const cowAscii = '\\  ^__^\n \\ (oo)\\_______\n   (__)\\        )\\/\\\n       ||----w |\n       ||     ||';

module.exports = {
	name: 'cowsay',
	description: 'linux!!! !! omg',
	execute (message, args) {
        const specifyText = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(':x: Please specify text for the cow to say.');
        if (!args[0]) {return message.channel.send(specifyText);}

        const text = args.join(' ');
        const cowsayEmbed = new MessageEmbed()
            .setColor('#585858')
            .setDescription(`\`\`\`${makeSpeech(text, cowAscii)}\`\`\``);
        message.channel.send(cowsayEmbed);
        function makeSpeech(text, cow) {
            const cowlines = cow.split('\n');
            let result = '';
            const length = Math.min(text.length, 25);
        
            result = result + ' _' + repeatString('_', length) + '_ \n';
            const lines = splittext(text, length);
            for (var i = 0; i < lines.length; i++) {
                const line = lines[i];
                let beginChar = '|';
                let endChar = '|';
                if (i == 0) {
                    if (lines.length == 1) {
                        beginChar = '<';
                        endChar = '>';
                    }
                    else {
                        beginChar = '/';
                        endChar = '\\';
                    }
                }
                else if (i == lines.length - 1) {
                    beginChar = '\\';
                    endChar = '/';
                }
                const lineLength = line.length;
                const pad = length - lineLength;
                result = result + `${beginChar} ${line}${repeatString(' ', pad)} ${endChar}\n`;
            }
        
            result = result + ' -' + repeatString('-', length) + '- \n';
        
            for (var i = 0; i < cowlines.length; i++) {
                const line = cowlines[i];
                result = result + repeatString(' ', length + 4) + line + '\n';
            }
        
            return result;
        }

        function splittext(text, maxlength) {
            const lines = [];
            let current = '';
            for (let i = 0; i < text.length; i++) {
                const character = text[i];
                switch (character) {
                case '\0':
                case '\b':
                case '\t':
                case '\v':
                case '\r':
                case '`':
                    continue;
                case '\n':
                    lines.push(current);
                    current = '';
                    continue;
                default:
                    current = current + character;
                    break;
        
                }
                if (current.length >= maxlength) {
                    lines.push(current);
                    current = '';
                }
            }
            if (current.length > 0) {
                lines.push(current);
                current = '';
            }
            return lines;
        }

        function repeatString(text, length) {
            let result = '';
            for (let i = 0; i <= length; i++) {
                result = result + text;
            }
            return result;
        }
	},
};