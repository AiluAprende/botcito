const Busquedas = require("../models/busquedas");
require('dotenv').config()
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

const Clima = async (args, message, client) => {

    const busquedas = new Busquedas();
    if (args.length < 1) {
        message.reply('No me diste ningún lugar para buscar su clima');
        return []
    }
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
            const soloElegido = lugarElegido.label.split(',', 1)

            const clima = await busquedas.climaLugar(lugarElegido.lat, lugarElegido.lon)

            // console.log('lugar elegido', lugarElegido);

            // console.log('clima', clima);
            interaction.reply(`Este es el clima en ${soloElegido} \n :small_orange_diamond: Temperatura: ${clima.main.temp}° \n :small_orange_diamond: Sensación térmica: ${clima.main.feels_like}° \n :small_orange_diamond: Humedad: ${clima.main.humidity}% \n :small_orange_diamond: Descripción: ${clima.weather[0].description}`);
        }
    })

}

module.exports = Clima