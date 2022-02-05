const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if(context.params.event.content.match("!status")){
  await lib.discord.users['@0.2.0'].me.status.update({
    activity_name: `C₳RD₳N0`,
    activity_type: 'GAME',
    status: 'ONLINE'
  });
  
  return await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `The bot's status was set!`
  });
}

if(context.params.event.content.match("!clearstatus")) {
  
  await lib.discord.users['@0.2.0'].me.status.clear();
  
    return await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `The bot's status was cleared!`
    });
  
}