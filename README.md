# 👽 ALLY SCOTT V11 - ALIEN SYSTEM 👽
> **"Security is an Illusion, Privacy is a Myth."**

![Status](https://img.shields.io/badge/Status-Online-brightgreen)
![Version](https://img.shields.io/badge/Version-11.0.0-blue)
![Owner](https://img.shields.io/badge/Owner-Scott-red)

**ALLY SCOTT V11** ni WhatsApp bot ya kinyama iliyotengenezwa kwa ajili ya automation, security research, na dark arsenal payloads. Imejengwa kwa kutumia **Node.js** na **Baileys library** ikiwa na muonekano wa kipekee wa terminal.

---

## 🚀 FEATURES ZA KINYAMA

### ☣️ Dark Arsenal (Injectors)
* **`.bug` / `.crash`** - Inatuma payloads nzito kulemaza WhatsApp ya target.
* **`.vcrash`** - Video buffer crash inayofanya simu igande (freeze).
* **`.nuke`** - Inafuta member wote kwenye group (Admin only).
* **`.infinity`** - Endless crash loop kwa ajili ya targets sugu.

### 🛡️ Security & Privacy
* **Anti-Delete** - Inarudisha meseji iliyofutwa papo hapo.
* **Anti-Link** - Inafuta links za magroup zinapotumwa na watu baki.
* **View Once Hack** - Inapakua picha/video za "View Once" na kuzituma kwenye namba yako.
* **Anti-Call** - Inakata simu za watu wasiojulikana (optional).

### 🤖 Automation
* **Auto-Status View** - Inatazama status za watu wako otomatiki.
* **Status Like** - Inapiga reaction ya "🔥" kwenye kila status.
* **Auto-React** - Inajibu meseji kwa emoji za kinyama (👽, 👾, ⚡).
* **Auto-Join** - Inajiunga kwenye channel na group la owner mara tu inapowashwa.

---

## 🛠 SETUP & DEPLOYMENT

### 1. Mahitaji (Requirements)
* GitHub Account
* Render/Koyeb/Heroku Account
* WhatsApp namba (Secondary recommended)

### 2. Files Structure
```text
├── index.js        # Server & Connection Logic
├── message.js      # Commands & Functionality
├── payloads.js     # Heavy Crash Strings
├── index.html      # Pairing Dashboard (Neon UI)
├── package.json    # Dependencies
└── .gitignore      # Security filter
