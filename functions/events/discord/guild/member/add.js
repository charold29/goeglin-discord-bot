// authenticates you with the API standard library
// typecontent: welcomeMessageContent.join('\n'),to display API autocomplete
const lib = require('lib')({
  token: process.env.STDLIB_SECRET_TOKEN
})

/*IMAGE*/
// Importing canvas
const {
  registerFont,
  createCanvas,
  loadImage
} = require('canvas')

// Importing and setting up fonts
const aristaFont = require('goeglin-font')
registerFont(aristaFont, {
  family: 'Arista'
})

//--Setup canvas size and context--
const canvas = createCanvas(800, 400)
const ctx = canvas.getContext('2d')
ctx.strokeStyle = '#0099ff'
ctx.strokeRect(0, 0, canvas.width, canvas.height)

//--Layers needed for canvas--
// 1. Background
const background = await loadImage('https://i.postimg.cc/1R7vFz1K/fondo-Welcome-Aumentado.png')
const sizeBackground = [canvas.width, canvas.height]

// 2. AvatarUser
//Get the person's user info
let user = await lib.discord.users['@0.2.0'].retrieve({
  user_id: context.params.event.user.id
});
//Get avatar url
let avatar_url = user.avatar ?
  `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` :
  `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`

const avatarImage = await loadImage(avatar_url)
const sizeAvatar = [140, 140]

// 3. Goeglin
const goeglinImage = await loadImage('https://i.postimg.cc/QxjtZjyc/goeglin-Welcome.png')
const sizeGoeglin = [410, 306]

//--Overlay files onto our canvas--

// Background
ctx.drawImage(background, 0, 0, ...sizeBackground)

// Goeglin
ctx.drawImage(goeglinImage, 380, 60, ...sizeGoeglin)

// Draw Background Circle
ctx.beginPath()
ctx.arc(220, 200, 75, 0, Math.PI * 2, true)
ctx.fillStyle = 'white'
ctx.fill()

//--Welcome Text onto our canvas--

//Adjust text width 
const applyText = (canvas, text) => {
  const context = canvas.getContext('2d')
  let fontSize = 66

  do {
    context.font = `${fontSize -=10}px "Arista"`
  } while (context.measureText(text).width > canvas.width - 400);

  return context.font
}

const usernameText = context.params.event.user.username

ctx.font = `56px "Arista"`
ctx.fillStyle = "#ffffff"
ctx.textAlign = "center"
ctx.fillText("Welcome to Goeglins World!", 400, 80)
ctx.font = applyText(canvas, usernameText)
ctx.fillText(usernameText, 220, 340)

// Draw Circle
ctx.beginPath()
ctx.strokeStyle = 'white'
ctx.lineWidth = 25
ctx.stroke()
ctx.arc(220, 200, 69, 0, Math.PI * 2, true)

// Cut the circle only for AvatarUser
ctx.clip()

// AvatarUser
ctx.drawImage(avatarImage, 150, 130, ...sizeAvatar)

/*MESSAGE*/
// Create content of welcome message

let guild = await lib.discord.guilds['@0.2.2'].retrieve({
  guild_id: context.params.event.guild_id
});

let welcomeMessageContent = [
  `Hey there <@${user.id}>! This is **${guild.name} Server**`,
  `Now you can chat in **<#933050620267626537>**! 😊`,
  //`measureText = ${ctx.measureText(usernameText).width}`
];

/*SHOW*/
//Generate the message

const testChannel = '929526036083912755'
const goeglinsChannel = '933055560490836068'

return lib.discord.channels['@0.3.0'].messages.create({
  channel_id: goeglinsChannel,
  content: welcomeMessageContent.join('\n'),
  attachments: [{
    'file': canvas.toBuffer(),
    'filename': `welcome.png`
  }]
});