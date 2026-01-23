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

    // URL de ton Webhook Discord
    const webhookURL = "https://discord.com/api/webhooks/1464303276777275485/5uQxWbfSVsNcYl-5IFCQPxmiFmwM0QbPXZ_CjbOo6W4BfkRP8dh9oMpd2aTiv_EBAva2";

    // Récupération des valeurs du formulaire
    const pseudo = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const steamId = document.getElementById('steam_id').value || "Non renseigné";
    const truckyId = document.getElementById('trucky_id').value || "Non renseigné";
    const hours = document.getElementById('hours').value;
    const hardware = document.getElementById('hardware').value;
    const style = document.getElementById('drive_style').value;
    const availability = document.getElementById('availability').value || "Non précisé";
    const motivation = document.getElementById('motivation').value;

    // Récupération des DLC cochés
    let dlcList = [];
    document.querySelectorAll('.dlc:checked').forEach((checkbox) => {
        dlcList.push(checkbox.value);
    });

    // Préparation du message (Embed Discord)
    const payload = {
        "embeds": [{
            "title": "🚚 Nouvelle Candidature - EuroSillage",
            "color": 13848362, // Orange ESL (#d34f2a)
            "fields": [
                { "name": "👤 Chauffeur", "value": `**Pseudo:** ${pseudo}\n**Âge:** ${age} ans`, "inline": true },
                { "name": "🎮 Expérience", "value": `**Heures:** ${hours}h\n**Style:** ${style}`, "inline": true },
                { "name": "⚙️ Matériel", "value": hardware, "inline": true },
                { "name": "🔗 Liens Profils", "value": `**Steam:** ${steamId}\n**Trucky:** ${truckyId}`, "inline": false },
                { "name": "📅 Disponibilités", "value": availability, "inline": false },
                { "name": "🗺️ DLC Cartes", "value": dlcList.length > 0 ? "✅ " + dlcList.join(", ") : "❌ Aucun DLC", "inline": false },
                { "name": "📝 Motivation", "value": "```" + (motivation || "Aucune motivation fournie.") + "```", "inline": false }
            ],
            "footer": { "text": "EuroSillage Logistique - Système de Recrutement" },
            "timestamp": new Date().toISOString()
        }]
    };

    // Envoi de la requête à Discord
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (res.ok) {
            alert("✅ Ton dossier a été transmis avec succès à EuroSillage !");
            document.getElementById('discordForm').reset();
        } else {
            alert("❌ Erreur lors de l'envoi. Vérifie ta connexion.");
        }
    })
    .catch(err => {
        console.error(err);
        alert("❌ Impossible de contacter Discord.");
    });
});