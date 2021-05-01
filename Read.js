const zulipInit = require("zulip-js");

// Pass the path to your zuliprc file here.
const config = { zuliprc: "zuliprc" };

var prevMsgData;

(async () => {
    const client = await zulipInit(config);

    const readParams = {
        anchor: "newest",
        num_before: 100,
        num_after: 0,
        narrow: [
            {operator: "sender", operand: "test_bot-bot@hackfestwinner.zulipchat.com"},
            {operator: "stream", operand: "test_bot-bot"},
        ],
    };

    // Get the 100 last messages sent by "iago@zulip.com" to the stream "Verona"
    prevMsgData=await client.messages.retrieve(readParams);
    console.log(prevMsgData.messages);
})();

