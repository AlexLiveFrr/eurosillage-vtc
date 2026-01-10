document.getElementById('discordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // REMPLACE par ton lien de Webhook Discord
    const webhookURL = "https://discord.com/api/webhooks/1458667146946285652/IrZUJCZ95hCjLCR6j3yc3rMOlF3d8BvW_qBX5WGGQzT7RKPDJle9oB_Dxcnsr7xSEFTl";

    // Récupération des données de base
    const pseudo = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const hours = document.getElementById('hours').value;
    const motivation = document.getElementById('motivation').value;
    
    // Récupération des informations de configuration
    const hardware = document.getElementById('hardware').value;
    const style = document.getElementById('drive_style').value;
    const tmpId = document.getElementById('tmp_id').value || "Non renseigné";
    const dispo = document.getElementById('availability').value || "Non précisé";
    
    // Récupération des nouveaux identifiants externes
    const steamId = document.getElementById('steam_id').value || "Non renseigné";
    const tbId = document.getElementById('truckbook_id').value || "Non renseigné";
    const truckyId = document.getElementById('trucky_id').value || "Non renseigné";
    
    // Récupération des DLC cochés
    let dlcList = [];
    document.querySelectorAll('.dlc:checked').forEach((checkbox) => {
        dlcList.push(checkbox.value);
    });

    // Construction du message pour Discord avec les nouveaux champs
    const payload = {
        "username": "EuroSillage - Recrutement",
        "avatar_url": "https://raw.githubusercontent.com/AlexLiveFrr/eurosillage-vtc/main/img/logo.png", 
        "embeds": [{
            "title": "🚚 NOUVELLE CANDIDATURE REÇUE",
            "description": "Un chauffeur souhaite rejoindre les rangs d'**EuroSillage Logistique**.",
            "color": 13848362, // Orange EuroSillage
            "thumbnail": {
                "url": "https://raw.githubusercontent.com/AlexLiveFrr/eurosillage-vtc/main/img/logo.png"
            },
            "fields": [
                {
                    "name": "👤 INFORMATIONS CHAUFFEUR",
                    "value": `**Nom:** ${pseudo}\n**Âge:** ${age} ans\n**Expérience:** ${hours} heures`,
                    "inline": true
                },
                {
                    "name": "⚙️ CONFIGURATION & STYLE",
                    "value": `**Matériel:** ${hardware}\n**Style:** ${style}\n**TMP ID:** ${tmpId}`,
                    "inline": true
                },
                {
                    "name": "🔗 COMPTES EXTERNES",
                    "value": `**Steam:** ${steamId}\n**TruckBook:** ${tbId}\n**Trucky:** ${truckyId}`,
                    "inline": false
                },
                {
                    "name": "📅 DISPONIBILITÉS",
                    "value": dispo,
                    "inline": false
                },
                {
                    "name": "🗺️ EXTENSIONS DE CARTE",
                    "value": dlcList.length > 0 ? "✅ " + dlcList.join("\n✅ ") : "❌ Aucun DLC",
                    "inline": false
                },
                {
                    "name": "📝 MOTIVATIONS",
                    "value": "```" + (motivation || "Non renseigné") + "```",
                    "inline": false
                }
            ],
            "footer": {
                "text": "EuroSillage Logistique - Recrutement Automatisé",
            },
            "timestamp": new Date().toISOString()
        }]
    };

    // Envoi de la requête vers Discord
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (res.ok) {
            alert("✅ Votre candidature pour EuroSillage Logistique a été envoyée avec succès !");
            document.getElementById('discordForm').reset();
        } else {
            alert("❌ Erreur lors de l'envoi. Vérifiez votre Webhook.");
        }
    })
    .catch(err => {
        console.error(err);
        alert("❌ Une erreur est survenue lors de la connexion.");
    });
});