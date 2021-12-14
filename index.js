require('dotenv').config();
const Discord = require('discord.js');
const topten = new Discord.Client();


topten.on('ready', function() {
    console.info('TopTen has successfully booted up.');
});

let users = [];

topten.on('message', function(message) {

    if (message.content === '!join') {
        users.push(message.author);
        message.author.send('Vous jouez à TopTen');
    } else if (message.content === '!leave') {
        for (let i = 0 ; i < users.length ; ++i) {
            if (users[i] === message.author) {
                users.splice(i,1);
            }
            message.author.send('Vous ne jouez plus à TopTen');
        }
    } else if (message.content === '!topten') {
        let randoms = [];
        users.forEach((user) => {
            let random = Math.floor((Math.random() * 10) + 1);
            while (randoms.indexOf(random) !== -1) {
                random = Math.floor((Math.random() * 10) + 1);
            }

            user.send('Votre nombre est **' + random + '**');
            randoms.push(random);
        })
        randoms = [];
    }

});

topten.login(process.env.KEY)
    .then(() => console.info('TopTen logged in to server.'))
    .catch(console.error);

// https://discord.com/api/oauth2/authorize?client_id=892490149777244231&scope=bot&permissions=68608