# EuroSillage Logistique — Site vitrine (HTML/CSS/JS)

Site vitrine **EuroSillage Logistique** (VTC ETS2) : pages statiques en HTML + design TailwindCSS, surcouche CSS custom (mode sombre permanent) et un script JS pour envoyer les candidatures via **Webhook Discord**.

> ⚠️ Important : le dépôt contient un **webhook Discord en clair** dans `script.js`.  
> **À sécuriser immédiatement** (voir section *Sécurité*).

---

## 📁 Arborescence du projet

```
/
├─ index.html                  # Accueil
├─ entreprise.html             # Présentation / histoire
├─ pourquoinouschoisir.html    # Arguments / avantages
├─ flotte.html                 # Présentation des camions
├─ contact.html                # Formulaire de recrutement (postuler)
├─ style.css                   # CSS custom (mode sombre + responsive)
├─ script.js                   # Envoi du formulaire vers Discord
└─ img/
   ├─ logo.png
   ├─ favicon.ico
   └─ camion/
      ├─ scania.png
      ├─ VolvoFH16.png
      └─ man.png
```

---

## ✅ Fonctionnalités

- **Design moderne** (Tailwind via CDN) + font **Montserrat**
- **Mode sombre permanent** (variables CSS)
- **Navigation responsive**
  - menu classique desktop
  - **menu burger** sur mobile
- Pages :
  - Accueil avec hero image (Unsplash)
  - Entreprise (histoire + valeurs)
  - Pourquoi nous choisir (piliers)
  - Flotte (cartes camions)
  - Postuler (formulaire complet)
- **Recrutement automatisé**
  - le formulaire envoie une embed Discord via Webhook
  - confirmation / erreur affichée en alert()

---

## 🧱 Tech stack

- **HTML5**
- **TailwindCSS** (CDN)
- **CSS custom** : `style.css`
- **JavaScript vanilla** : `script.js`
- **Discord Webhook** pour réception des candidatures

---

## 🗺️ Détail des pages

### `index.html` — Accueil
- Hero avec gradient + image Unsplash
- Statistiques (Livraisons, Disponibilité, Chauffeurs, Réalisme)
- Section avantages

### `entreprise.html` — L'entreprise
- Présentation de l’histoire
- 3 piliers : Discipline / Liberté / Convivialité

### `pourquoinouschoisir.html` — Pourquoi nous choisir ?
- Blocs avantages (communauté, réalisme, événements)

### `flotte.html` — Flotte
- Cartes véhicules avec images :
  - Scania S Highline
  - Volvo FH16
  - MAN TGX

### `contact.html` — Recrutement
- Formulaire : pseudo, âge, heures ETS2, motivation…
- Champs optionnels : Steam / Truckbook / Trucky / TMP
- Liste DLC (checkbox)
- Envoi de la candidature vers Discord via `script.js`

---

## 🎨 Styles : `style.css`

Fichier CSS avec :
- variables globales (palette sombre)
- correction responsive des grilles
- **burger menu**
- uniformisation des cards / sections en mode sombre

---

## 🤖 JS : `script.js`

- Intercepte le submit (`preventDefault`)
- Construit une payload embed Discord :
  - infos chauffeur
  - setup (matériel / style / TMP ID)
  - comptes (Steam/TruckBook/Trucky)
  - disponibilité
  - DLC
  - motivation
- Envoie via `fetch()` (POST JSON)
- Popup succès / erreur

---

## 🚀 Installation & utilisation

### 1) Local (simple)
Ouvre `index.html` directement dans ton navigateur.

### 2) Local (recommandé, serveur)
Pour éviter des soucis CORS / fetch selon navigateur :

#### Option A — VS Code Live Server
- Installe l’extension *Live Server*
- Clic droit sur `index.html` → *Open with Live Server*

#### Option B — Python
```bash
python -m http.server 8080
```
Puis ouvre :
- http://localhost:8080/

---

## 🔒 Sécurité (à faire absolument)

### Problème actuel
Le webhook Discord est **visible côté client** (`script.js`).
➡️ N’importe qui peut le récupérer et spammer ton Discord.

### Solution recommandée
1. **Créer un petit backend** (Cloudflare Worker / Vercel / Netlify Functions / serveur Node/PHP)
2. Le frontend appelle ton endpoint (`/api/apply`)
3. Ton backend envoie au webhook (secret côté serveur)

👉 Ensuite, tu **régénères** le webhook Discord (le lien actuel est considéré compromis).

---

## 🛠️ Personnalisation rapide

- **Logo / favicon** : `img/logo.png` et `img/favicon.ico`
- **Couleurs** : `:root` dans `style.css`
- **Menu** : liens dans les `<nav>`
- **Camions** : images dans `img/camion/` et cards dans `flotte.html`
- **Stats** : section stats dans `index.html`

---

## 📌 TODO (améliorations possibles)

- [ ] Backend sécurisé pour candidatures (recommandé)
- [ ] Remplacer les alert() par un toast UI propre
- [ ] Ajouter reCAPTCHA / hCaptcha
- [ ] Ajout d’une page “Mentions légales”
- [ ] Optimiser SEO (meta description + OpenGraph)
- [ ] Minifier/packager (optionnel)

---

## 📄 Licence

Projet vitrine interne EuroSillage.  
(À compléter : MIT / propriétaire / etc.)
