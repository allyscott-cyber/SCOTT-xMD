const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    delay, 
    DisconnectReason,
    makeInMemoryStore 
} = require("@whiskeysockets/baileys"); // Njia ya uhakika ya ku-import kwa Node v20+

const express = require('express');
const path = require('path');
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require('fs');
const app = express();

const port = process.env.PORT || 10000;
const ownerNumber = "255629308154@s.whatsapp.net";

// Store ya kuhifadhi chats (Inasaidia Antidelete na Speed)
// Sasa itatambuliwa bila kosa lolote
const store = makeInMemoryStore({ 
    logger: pino().child({ level: 'silent', stream: 'store' }) 
});

app.use(express.static(__dirname)); 

async function startAllyScott() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();
    
    const client = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        auth: state,
        // Ubuntu Chrome Header kwa ajili ya Pairing Code chapchap
        browser: ["Ubuntu", "Chrome", "20.0.04"], 
        connectTimeoutMs: 60000, 
        printQRInTerminal: false,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2
                            },
                            ...message
                        }
                    }
                };
            }
            return message;
        }
    });

    store.bind(client.ev);
    client.ev.on('creds.update', saveCreds);

    // --- CONNECTION UPDATE ---
    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                console.log("🔄 Connection lost. Restarting in 5s...");
                setTimeout(() => startAllyScott(), 5000); 
            }
        } else if (connection === 'open') {
            console.log('✅ ALLY SCOTT V11 CONNECTED SUCCESSFULLY!');
            
            // AUTO JOIN CHANNEL & GROUP
            try {
                await client.newsletterFollow("https://whatsapp.com/channel/0029VbC3KUA5a23x1ndnfi2a"); 
                await client.groupAcceptInvite("Bffi10i0w013Pa7A5z7UxP"); 
            } catch (e) { console.log("Auto-join error:", e); }
        }
    });

    // --- MESSAGE HANDLER (Connects to message.js) ---
    client.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const m = chatUpdate.messages[0];
            if (!m.message) return;
            
            delete require.cache[require.resolve("./message")];
            const messageHandler = require("./message");
            await messageHandler(client, m); 
        } catch (err) {
            console.error("Error in index.js handler:", err);
        }
    });

    // --- AUTO-BIO LOGIC ---
    setInterval(async () => {
        const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' });
        const bio = `ALLY SCOTT V11 ⚡ Online: ${time} | Alien System 👽`;
        try {
            await client.updateProfileStatus(bio);
        } catch (e) { }
    }, 60000);
}

// PAIRING API KWA AJILI YA HTML PAGE
app.get('/api/get-code', async (req, res) => {
    let num = req.query.number;
    if (!num) return res.status(400).json({ error: "Weka namba!" });
    num = num.replace(/[^0-9]/g, '');
    
    try {
        const { state, saveCreds } = await useMultiFileAuthState('session');
        const { version } = await fetchLatestBaileysVersion();
        const tempClient = makeWASocket({
            version,
            logger: pino({ level: "silent" }),
            auth: state,
            browser: ["Ubuntu", "Chrome", "20.0.04"]
        });
        
        tempClient.ev.on('creds.update', saveCreds);
        await delay(3000); 
        
        if (!tempClient.authState.creds.registered) {
            let code = await tempClient.requestPairingCode(num);
            if (!res.headersSent) res.json({ code: code });
        } else {
            res.json({ error: "Tayari bot imeunganishwa!" });
        }
    } catch (err) {
        if (!res.headersSent) res.status(500).json({ error: "Server Error" });
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => {
    console.log(`🚀 ALLY SCOTT Server listening on port ${port}`);
    startAllyScott(); 
});
