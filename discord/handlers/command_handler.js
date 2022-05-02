const fs = require('fs');

module.exports = (client, Discord) => {
    const commandFolders = fs.readdirSync('./discord/commands/')
    for(const folder of commandFolders){

        const commandFiles = fs.readdirSync('./discord/commands/' + folder).filter(file => file.endsWith('.js'))
        for(const file of commandFiles){

            const command = require('../commands/' + folder + '/' + file)
    
            if(!command.alts){
                command.alts = []
            }
            if(command.name){
                client.commands.set(command.name, command)
            }
            command.alts.forEach((alt) => {
                if(alt){
                    client.commands.set(alt, command)
                }
            })
        }
    }

}