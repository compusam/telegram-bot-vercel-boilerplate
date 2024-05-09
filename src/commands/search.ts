import { Context } from 'telegraf';
import createDebug from 'debug';


import { author, name, version } from '../../package.json';

const debug = createDebug('bot:search_command');

const search = () => async (ctx: Context) => {

  let name_fragance = ctx.text?.replace('/search','').trimStart();
  debug(name_fragance);
  // debug(ctx.message);
  
  const message_tosend = `*${name} ${version}*\n${author}`;
  debug(`Triggered "search" command with message \n${message_tosend}`);
  await ctx.replyWithMarkdownV2(message_tosend, { parse_mode: 'Markdown' });
};

export { search };
