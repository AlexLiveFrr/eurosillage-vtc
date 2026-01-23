// --- GESTION DU MENU BURGER ---
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }
});

// --- ENVOI DU FORMULAIRE VERS DISCORD ---
document.getElementById('discordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const webhookURL = "https://discord.com/api/webhooks/1464303276777275485/5uQxWbfSVsNcYl-5IFCQPxmiFmwM0QbPXZ_CjbOo6W4BfkRP8dh9oMpd2aTiv_EBAva2";

    // Récupération des données
    const acceptedRules = document.getElementById('accept_rules').checked;
    const pseudo = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const steamId = document.getElementById('steam_id').value || "Non renseigné";
    const truckyId = document.getElementById('trucky_id').value || "Non renseigné";
    const hours = document.getElementById('hours').value;
    const hardware = document.getElementById('hardware').value;
    const style = document.getElementById('drive_style').value;
    const availability = document.getElementById('availability').value || "Non précisé";
    const motivation = document.getElementById('motivation').value;

    let dlcList = [];
    document.querySelectorAll('.dlc:checked').forEach((checkbox) => {
        dlcList.push(checkbox.value);
    });

    const payload = {
        "embeds": [{
            "title": "🚚 Nouvelle Candidature - EuroSillage",
            "color": 13848362,
            "fields": [
                { "name": "👤 Chauffeur", "value": `**Pseudo:** ${pseudo}\n**Âge:** ${age} ans`, "inline": true },
                { "name": "🎮 Expérience", "value": `**Heures:** ${hours}h\n**Style:** ${style}`, "inline": true },
                { "name": "⚙️ Matériel", "value": hardware, "inline": true },
                { "name": "🔗 Liens", "value": `**Steam:** ${steamId}\n**Trucky:** ${truckyId}`, "inline": false },
                { "name": "📜 Règlement", "value": acceptedRules ? "✅ Lu et Accepté" : "❌ Non accepté", "inline": true },
                { "name": "📅 Dispos", "value": availability, "inline": false },
                { "name": "🗺️ DLC", "value": dlcList.length > 0 ? "✅ " + dlcList.join(", ") : "❌ Aucun", "inline": false },
                { "name": "📝 Motivation", "value": "```" + (motivation || "Aucune motivation.") + "```", "inline": false }
            ],
            "footer": { "text": "EuroSillage Logistique - Recrutement" },
            "timestamp": new Date().toISOString()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (res.ok) {
            const formContainer = document.getElementById('discordForm');
            formContainer.innerHTML = `
                <div class="text-center py-10">
                    <div class="text-6xl mb-6">✅</div>
                    <h2 class="text-3xl font-black uppercase italic text-white mb-4">Dossier Transmis !</h2>
                    <p class="text-gray-300 mb-8">Ton dossier est entre les mains de l'équipe EuroSillage.</p>
                    <div class="bg-slate-900/50 p-6 rounded-2xl border border-orange-500/30 mb-8">
                        <p class="text-white mb-6">Rejoins notre Discord pour ton entretien :</p>
                        <a href="https://discord.gg/YnG3dg6SG4" target="_blank" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition inline-block">Rejoindre le Discord</a>
                    </div>
                    <a href="index.html" class="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition">Retour à l'accueil</a>
                </div>`;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert("❌ Erreur lors de l'envoi.");
        }
    })
    .catch(err => console.error(err));
});