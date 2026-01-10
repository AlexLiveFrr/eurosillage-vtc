document.getElementById('discordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const webhookURL = "TON_LIEN_WEBHOOK_ICI";

    // Récupération des données
    const pseudo = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const hours = document.getElementById('hours').value;
    const motivation = document.getElementById('motivation').value;

    let dlcList = [];
    document.querySelectorAll('.dlc:checked').forEach((checkbox) => {
        dlcList.push(checkbox.value);
    });

    // Construction du message style "EuroSillage"
    const payload = {
        "username": "EuroSillage - Recrutement",
        "avatar_url": "URL_DE_TON_LOGO_PNG", // Mets le lien direct de ton logo ici
        "embeds": [{
            "title": "🚚 NOUVELLE CANDIDATURE REÇUE",
            "description": "Un chauffeur souhaite rejoindre les rangs d'**EuroSillage Logistique**.",
            "color": 13848362, // Le code couleur orange (D34F2A en décimal)
            "thumbnail": {
                "url": "URL_DE_TON_LOGO_PNG"
            },
            "fields": [
                {
                    "name": "👤 INFORMATIONS CHAUFFEUR",
                    "value": `**Nom:** ${pseudo}\n**Âge:** ${age} ans\n**Expérience:** ${hours} heures`,
                    "inline": false
                },
                {
                    "name": "🗺️ EXTENSIONS DE CARTE",
                    "value": dlcList.length > 0 ? "✅ " + dlcList.join("\n✅ ") : "❌ Aucun DLC",
                    "inline": true
                },
                {
                    "name": "📝 MOTIVATIONS",
                    "value": "```" + (motivation || "Non renseigné") + "```",
                    "inline": false
                }
            ],
            "footer": {
                "text": "EuroSillage Logistique - Le bitume n'attend que vous",
            },
            "timestamp": new Date().toISOString()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => {
            alert("Votre candidature pour EuroSillage Logistique a été envoyée !");
            document.getElementById('discordForm').reset();
        })
        .catch(err => alert("Erreur lors de l'envoi. Vérifiez votre connexion."));
});