const zulipInit = require("zulip-js");

// Pass the path to your zuliprc file here.
const config = { zuliprc: "download" };

(async () => {
    console.log(config) ;
    
    const client = await zulipInit(config);

    // Send a stream message
    let params = {
        to: "test_bot-bot",
        type: "stream",
        topic: "Castle",
        content: "I come not, friends, to steal away your hearts.--Akash",
    };
    console.log(await client.messages.send(params));






    // Send a private message
    const user_id = 9;
    params = {
        to: ['rendomzz22@gmail.com'],
        type: "private",
        content: "With mirth and laughter let old wrinkles come.",
    };
    console.log(await client.messages.send(params));
    console.log(await client.users.me.getProfile());


})();






