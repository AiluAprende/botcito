require('dotenv').config()
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Busquedas = require("./models/busquedas");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

const prefix = "!";

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  console.log('commandBody', commandBody);
  console.log('command', command);
  console.log('args', args);

  if (command == "ping") {
    console.log('es igual a ping');
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  if (command == "clima") {

    const busquedas = new Busquedas();
    const lugares = await busquedas.lugar(args)

    const opciones = lugares.map((lugar) => {
      return {
        label: lugar.nombre,
        value: lugar.id,
        lat: lugar.lat,
        lon: lugar.lon

      }
    });

    const menuLugares = new MessageSelectMenu()
      .setCustomId(`id`)
      .setPlaceholder('Selecciona una opción')
      .addOptions(opciones)

    const filaMenu = new MessageActionRow().addComponents(menuLugares);
    message.reply({
      content: 'Selecciona una opción:',
      components: [filaMenu]
    });


    client.on('interactionCreate', async (interaction) => {
      if (interaction.isSelectMenu()) {
        // console.log('interaccion:', interaction)
        const opcionSeleccionada = interaction.values[0];
        // Aquí puedes hacer algo con la opción seleccionada, como mostrar más detalles o realizar una acción específica
        const lugarElegido = opciones.find(l => l.value === opcionSeleccionada)

        const clima = await busquedas.climaLugar(lugarElegido.lat, lugarElegido.lon)

        console.log('lugar elegido', lugarElegido);

        console.log('clima', clima);
        interaction.reply(`Has seleccionado el objeto ${opcionSeleccionada}`);
      }
    })

  }
}
);

client.login(process.env.BOT_TOKEN);