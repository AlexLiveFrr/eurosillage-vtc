document.getElementById('discordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // REMPLACE ICI PAR TON NOUVEAU LIEN COPIÉ SUR DISCORD
    const webhookURL = "https://discord.com/api/webhooks/1459356270879572070/7KQkQ0-RbUN7sNfPRZlNRpn2pFVo17OP_MfULTfI6p-0PqLv2fxgyVB1K69ewBVOg38G";

    if(webhookURL === "https://discord.com/api/webhooks/1459356270879572070/7KQkQ0-RbUN7sNfPRZlNRpn2pFVo17OP_MfULTfI6p-0PqLv2fxgyVB1K69ewBVOg38G") {
        alert("Attention : Le lien Webhook n'est pas configuré.");
        return;
    }

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
});