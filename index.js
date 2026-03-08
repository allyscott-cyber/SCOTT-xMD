/**
 * ALLY SCOTT V11 - ALIEN SYSTEM
 * FIX: Couldn't Connect / Pairing Timeout
 */

const baileys = require("@whiskeysockets/baileys");

const makeWASocket = baileys.default || baileys;
const useMultiFileAuthState = baileys.useMultiFileAuthState || baileys.default?.useMultiFileAuthState;
const fetchLatestBaileysVersion = baileys.fetchLatestBaileysVersion || baileys.default?.fetchLatestBaileysVersion;
const delay = baileys.delay || baileys.default?.delay;
const DisconnectReason = baileys.DisconnectReason || baileys.default?.DisconnectReason;
const makeInMemoryStore = baileys.makeInMemoryStore || baileys.default?.makeInMemoryStore;

const express = require('express');
const path = require('path');
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require('fs-extra');
const app = express();

const port = process.env.PORT || 10000;
const ownerNumber = "255629308154@s.whatsapp.net";

// Auto-Clean Session kila baada ya restart kuzuia cache mbovu
if (fs.existsSync('./session')) {
    fs.emptyDirSync('./session'); 
}

const store = (typeof makeInMemoryStore === 'function') 
    ? makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) }) 
    : { bind: () => {}, readMessages: () => {}, writeToFile: () => {} }; 

app.use(express.static(__dirname)); 

async function startAllyScott() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();
    
    const client = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        auth: state,
        // BADILISHA HAPA: Safari inapita haraka zaidi kwenye pairing
        browser: ["Mac OS", "Safari", "10.15.7"], 
        connectTimeoutMs: 120000, 
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 30000,
        // HIZI NDIO LINE MUHIMU ZA KUTATUA 'COULDN'T CONNECT'
        syncFullHistory: false, // Inazuia kupakua chat za zamani (Fast Link)
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: false,
        printQRInTerminal: false,
    });

    store.bind(client.ev);
    client.ev.on('creds.update', saveCreds);

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                console.log("🔄 Connection lost. Restarting...");
                setTimeout(() => startAllyScott(), 5000); 
            }
        } else if (connection === 'open') {
            console.log('✅ ALLY SCOTT V11 CONNECTED!');
            // Tuma ujumbe kwako kuthibitisha
            await client.sendMessage(ownerNumber, { text: "🚀 *ALLY SCOTT V11 CONNECTED SUCCESSFULLY!*" });
        }
    });

    client.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const m = chatUpdate.messages[0];
            if (!m.message) return;
            delete require.cache[require.resolve("./message")];
            const messageHandler = require("./message");
            await messageHandler(client, m); 
        } catch (err) { }
    });
}

// API YA PAIRING - ILIBORESHWA
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
            browser: ["Mac OS", "Safari", "10.15.7"],
            connectTimeoutMs: 120000,
            syncFullHistory: false, // Lazima iwe false hapa pia
        });
        
        tempClient.ev.on('creds.update', saveCreds);
        await delay(5000); // Subiri server itulie
        
        if (!tempClient.authState.creds.registered) {
            let code = await tempClient.requestPairingCode(num);
            if (!res.headersSent) res.json({ code: code });
        } else {
            res.json({ error: "Tayari bot imeunganishwa!" });
        }
    } catch (err) {
        if (!res.headersSent) res.status(500).json({ error: "Server Busy. Jaribu tena!" });
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => {
    console.log(`🚀 ALLY SCOTT Server listening on port ${port}`);
    startAllyScott(); 
});
