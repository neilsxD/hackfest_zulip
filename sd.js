const zulipInit = require("zulip-js");

// Pass the path to your zuliprc file here.
const config = { zuliprc: "zuliprc" };

(async () => {
    const client = await zulipInit(config);

    // Get the profile of the user/bot that requests this endpoint,
    // which is `client` in this case:
    console.log(await client.users.me.getProfile());

    
})();