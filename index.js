const { Client, Intents } = require("discord.js");
const { BOT_TOKEN } = require("./config.json")
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
console.log('why');
client.on('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

const prefix = "!";

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    console.log('Mensaje recibido:', message.content);

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log('comando', commandBody);

    if (command == "ping") {
        console.log('es igual a ping');
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    if (command == "clima") {
        console.log('clima');
        message.reply('Esto va a ser el comando del clima');
    }
}
);
client.login(BOT_TOKEN);