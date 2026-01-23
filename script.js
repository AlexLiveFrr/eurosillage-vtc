// --- GESTION DU MENU BURGER ---
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animation optionnelle des barres du menu
            mobileMenu.classList.toggle('open');
        });
    }
});

// --- RESTE DE TON CODE (FORMULAIRE DISCORD) ---

document.getElementById('discordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Ton lien est maintenant configuré ici
    const webhookURL = "https://discord.com/api/webhooks/1464303276777275485/5uQxWbfSVsNcYl-5IFCQPxmiFmwM0QbPXZ_CjbOo6W4BfkRP8dh9oMpd2aTiv_EBAva2";

    // J'ai supprimé le bloc "if" qui bloquait l'envoi pour que ça marche directement

    const pseudo = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const hours = document.getElementById('hours').value;
    const motivation = document.getElementById('motivation').value;
    const hardware = document.getElementById('hardware').value;
    const style = document.getElementById('drive_style').value;
    const tmpId = document.getElementById('tmp_id').value || "Non renseigné";
    const dispo = document.getElementById('availability').value || "Non précisé";
    const steamId = document.getElementById('steam_id').value || "Non renseigné";
    const tbId = document.getElementById('truckbook_id').value || "Non renseigné";
    const truckyId = document.getElementById('trucky_id').value || "Non renseigné";

    let dlcList = [];
    document.querySelectorAll('.dlc:checked').forEach((checkbox) => {
        dlcList.push(checkbox.value);
    });

    const payload = {
        "username": "EuroSillage - Recrutement",
        "avatar_url": "https://raw.githubusercontent.com/AlexLiveFrr/eurosillage-vtc/main/img/logo.png",
        "embeds": [{
            "title": "🚚 NOUVELLE CANDIDATURE REÇUE",
            "color": 13848362,
            "fields": [
                { "name": "👤 CHAUFFEUR", "value": `**Nom:** ${pseudo}\n**Âge:** ${age} ans\n**Expérience:** ${hours}h`, "inline": true },
                { "name": "⚙️ SETUP", "value": `**Matériel:** ${hardware}\n**Style:** ${style}\n**TMP ID:** ${tmpId}`, "inline": true },
                { "name": "🔗 COMPTES", "value": `**Steam:** ${steamId}\n**TruckBook:** ${tbId}\n**Trucky:** ${truckyId}`, "inline": false },
                { "name": "📅 DISPOS", "value": dispo, "inline": false },
                { "name": "🗺️ DLC", "value": dlcList.length > 0 ? "✅ " + dlcList.join(", ") : "❌ Aucun", "inline": false },
                { "name": "📝 MOTIVATIONS", "value": "```" + (motivation || "...") + "```", "inline": false }
            ],
            "footer": { "text": "Système de recrutement EuroSillage" },
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
                alert("✅ Candidature envoyée !");
                document.getElementById('discordForm').reset();
            } else {
                alert("❌ Erreur Webhook. Vérifiez le lien Discord.");
            }
        })
        .catch(err => alert("❌ Erreur de connexion."));

    // Exemple d'appel à l'API Trucky pour ESL
    async function getTruckyStats(vtcId) {
        const response = await fetch(`https://api.truckyapp.com/v2/vtc/${vtcId}/members`, {
            headers: { 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55X2lkIjo0MTY3OX0.5xNWU-V9ae6IFbm1p62_weal76tX-gABfM-lh0Y551o' }
        });
        return await response.json();
    }
});