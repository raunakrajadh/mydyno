module.exports = {
    name: 'help',

    alts: ['h'],

    execute(Discord, client, message, args, PREFIX){
        const fs = require('fs');

        let clientCommands = new Array()
        let commandListArray = new Array();
        
        const commandFolders = fs.readdirSync('./discord/commands/')
        commandFolders.forEach((folder) => {
            const commandFiles = fs.readdirSync('./discord/commands/' + folder).filter(file => file.endsWith('.js'))
            commandFiles.forEach((file) => {
                const command = require('../../commands/' + folder + '/' + file)
                commandListArray.push({folder: folder, file: file, command: command.name})
            })
        })

        let commandArray = commandListArray.reduce((a, b) => Object.assign(a, { [b.folder]: ( a[b.folder] || [] ).concat(b) }), {})
        Object.keys(commandArray).forEach((key) => {
            if(key !== 'nsfw'){
                let commands = {
                    name: key.toUpperCase() + ':',
                    value: commandArray[key].map(obj => '`' + obj.command + '`').join(', ')
                }
                clientCommands.push(commands)
            }
        })

        
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(client.user.username + ' | Help')
            .setDescription('Bot help command!')
            .setColor("GREEN")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(clientCommands)
            .addFields(
                // {
                //     name: 'List of commands:',
                //     value: client.commands.map(cmd => `\`${cmd.name}\``).join(', ')
                // },
                {
                    name: 'Links:',
                    value:
                        ':small_blue_diamond: [Invite](' + client.config.botInvite + ')' + '\n' +
                        ':small_blue_diamond: [Vote - Top.gg](' + client.config.voteBot + ')' + '\n' +
                        ':small_blue_diamond: [Support Server](' + client.config.supportServer + ')' + '\n'
                }
            )
            .setFooter(client.user.username + ' developed by ' + client.config.botDeveloper)

        message.channel.send({embeds: [helpEmbed]})
    }
}