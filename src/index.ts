import { Telegraf,Context } from 'telegraf';
import { about,search } from './commands';
import { llmopenai, groqapi } from './llms';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import createDebug from 'debug';
import { Update } from 'telegraf/typings/core/types/typegram';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const debug = createDebug('bot:handleRequest');
const bot = new Telegraf(BOT_TOKEN,{
  handlerTimeout: Infinity
});
const VERCEL_URL = `${process.env.VERCEL_URL}`;
// for description BOT
try {
  // bot.telegram.setWebhook(`${VERCEL_URL}/api`);
  // const getWebhookInfo = bot.telegram.getWebhookInfo();
  const description = "Gracias por utilizar BonaFraganceBot, seré tu ayuda para comprar de forma rápida tu fragancia preferida";
  debug("Iniciando SetMyDescription");
  const response_setDescription = async () => {
    const setMyDescriptionBot = await bot.telegram.callApi('setMyDescription', {
      description,
      language_code: 'es',
    });
    // await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
    // const getWebhookInfo = await bot.telegram.getWebhookInfo();
    console.log('setMyDescriptionBot',  setMyDescriptionBot);
    debug("DebugSetmydescription",setMyDescriptionBot);
    // return getWebhookInfo;

 };
 
//  getWebhookInfo.then((value) => {
//   console.log(value);
//   // Expected output: "Success!"
// });
  //console.log('setMyDescription',  );
} catch (error) {
  console.error('setMyDescription',  error);
  debug("Error en setMyDescription",error);
}

bot.start((ctx) => {
  let message = ` Para buscar una fragancia ingresa alguna frase como, cuánto cuesta el perfume para hombre Eros Versace?`
  ctx.reply(message)
})

bot.command('about', about());
bot.command('search', search());
bot.on('message', groqapi());
bot.on("pre_checkout_query", ctx => ctx.answerPreCheckoutQuery(true));
bot.on("successful_payment", () => console.log("Pagado"));


// export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
    
//   if (req.method === 'POST') {
//     console.log('Estamos en POST en Index');
//     console.log(`Req Body: ${JSON.stringify(req.body)}`);

//     try {
//       // Ensure that this is a message being sent
//       await bot.handleUpdate(req.body as unknown as Update, res);
//       console.log(`se recibe body y se manda a handleUpdate`);
//       res.send("OK");
//     } catch (error) {
//       // If there was an error sending our message then we
//       // can log it into the Vercel console
//       console.error("Error sending message",JSON.stringify(error));
      
//     }
    
    
//   } else {
//     res.status(200).json('Listening to bot events from Index...');
//   }
//    };

export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

// export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
//   development(bot);
// };


  
  // Expected output: "Success!"

//dev mode
// ENVIRONMENT !== 'production' && development(bot);
