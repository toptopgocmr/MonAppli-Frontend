# TopTopGo — Site Web

## Structure du projet
```
tholad-site/
├── index.html          ← Page principale
├── images/             ← Toutes les images
│   ├── logo.png
│   ├── coworking-1.jpg
│   ├── coworking-2.jpg
│   ├── coworking-3.jpg
│   ├── office-1.jpg
│   ├── office-2.jpg
│   ├── salle-reunion-1.jpg  → salle-reunion-8.jpg
├── package.json
├── nixpacks.toml
└── README.md
```

## Déploiement sur Railway

### 1. Pousser sur GitHub
```bash
git init
git add .
git commit -m "Initial commit — Tholad Group site"
git remote add origin https://github.com/TON_USERNAME/tholad-site.git
git push -u origin main
```

### 2. Déployer sur Railway
1. Aller sur https://railway.app
2. Cliquer **New Project → Deploy from GitHub**
3. Sélectionner le repo `tholad-site`
4. Railway détecte automatiquement le `package.json` et lance `npm start`
5. Cliquer **Generate Domain** pour obtenir une URL publique

## Développement local
```bash
npm install
npm start
# → http://localhost:3000
```
