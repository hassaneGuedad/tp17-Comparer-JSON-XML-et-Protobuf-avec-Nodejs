# TP 17 : Comparer JSON, XML et Protobuf avec Node.js

Ce projet compare la sérialisation de données avec trois formats différents :
- **JSON**
- **XML**
- **Google Protocol Buffers (Protobuf)**

## Objectifs
- Créer une liste d'employés en JavaScript.
- Sérialiser en JSON, XML et Protobuf.
- Comparer la taille des fichiers générés.
- Mesurer les performances d'encodage et de décodage.

## Installation
```bash
npm install
```

## Exécution
```bash
node index.js
```

## Résultats attendus
Les fichiers `data.json`, `data.xml`, et `data.proto` seront générés.
Protobuf devrait être le plus compact et le plus rapide.
