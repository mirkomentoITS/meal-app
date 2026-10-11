# 🍝 Meals App

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.73+-61DAFB?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK%2050-000000?style=flat-square&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)
![Platform](https://img.shields.io/badge/Platform-iOS%20|%20Android-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

**Una moderna applicazione mobile per scoprire e collezionare ricette da tutti i paesi.**

</div>

---

## 📱 Overview

**Meals App** è un'applicazione React Native che consente agli utenti di esplorare, cercare e salvare ricette di tutto il mondo. 

Sviluppato come **progetto accademico**, con focus su:
- ✨ User Experience intuitiva
- 🏗️ Architettura scalabile
- ♿ Accessibilità (WCAG 2.1)
- 📱 Responsive design
- 🔐 Autenticazione sicura
- 💾 Persistenza dati

---

## ✨ Funzionalità

### 🔑 Autenticazione
- Login sicuro con validazione email/password
- Persistenza dell'utente via AsyncStorage
- 3 mock users per testing
- Logout con cleanup dello stato

### 🍽️ Esplorazione Ricette
- Lista dinamica di piatti da **TheMealDB API**
- Ricerca real-time con filtro controllato
- Dettagli completi: ingredienti, istruzioni, categoria, area geografica
- Loading states e error handling robusto

### ❤️ Sistema Preferiti
- Salva/rimuovi ricette dai preferiti
- Griglia responsive 2x2 (mobile) / 3x3 (tablet)
- Persistenza in AsyncStorage (chiave: `app:v1:favs`)
- Sincronizzazione automatica tra schermate

### ⚙️ Impostazioni Personalizzate
- Toggle per tema, suono, vibrazione
- Preferenze notifiche (app e email)
- Raccolta dati opzionale
- Interfaccia intuitiva con icon descrittive

### 🔗 Deep Linking
- Accesso diretto alle ricette via URL
- Configurazione: `meal-app://detail/:id`
- Fallback intelligente se link invalido
- Support per Expo Go durante lo sviluppo

### ♿ Accessibilità
- Touch target minimo 44×44 pt (WCAG 2.1 AA)
- `accessibilityRole` e `accessibilityLabel` completi
- `maxFontSizeMultiplier` per font scaling
- Screen reader support integrato

---

## 🏗️ Architettura

### Gestione Stato: Context API

**Perché Context API?**
- ✅ Zero dipendenze aggiuntive
- ✅ Nativo a React - allineato ai principi fondamentali
- ✅ Performance adeguata per stato "piccolo-medio"
- ✅ Facilmente migrabile verso Redux se necessario

```typescript
// AuthContext
├── state: { user: User | null }
├── actions: { login(), logout() }
└── persistence: AsyncStorage('app:user')

// FavoriteContext
├── state: { favorites: string[] }
├── actions: { toggleFavorite() }
└── persistence: AsyncStorage('app:v1:favs')
```

### Struttura Progetto

```
meal-app/
├── src/
│   ├── screens/                 # Schermate principali
│   │   ├── LoginScreen.tsx
│   │   ├── LocationScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DetailScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingScreen.tsx
│   ├── components/              # Componenti riutilizzabili
│   │   ├── CountryCardList.tsx
│   │   ├── PlateCardGrid.tsx
│   │   ├── PlateCardList.tsx
│   │   ├── Avatar.tsx
│   │   └── SettingRow.tsx
│   ├── context/                 # State management
│   │   ├── AuthContext.tsx
│   │   └── FavoriteContext.tsx
│   ├── services/                # Logica di business
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── location.ts
│   │   ├── plate.ts
│   │   └── favorite.ts
│   ├── services/               
│   │   └── countries.ts
│   └── App.tsx                  # Entry point
├── assets/                       # Risorse statiche
├── package.json
└── README.md
```

---

## 📊 Stack

| Categoria | Tecnologie |
|-----------|-----------|
| **Framework** | React Native 0.73, Expo SDK 50 |
| **Linguaggio** | TypeScript 5.0+ |
| **Navigation** | React Navigation 6 |
| **State** | React Context API |
| **Storage** | AsyncStorage, Expo Storage |
| **Icons** | Expo Vector Icons (Material Design) |
| **API** | TheMealDB REST API |

---

## 🚀 Quick Start

### Requisiti
```bash
# Richiede Node.js LTS 18.x+
node --version    # v18.x o superiore
npm --version     # 9.x o superiore
```

### Installazione

```bash
# 1. Clone repository
git clone https://github.com/mirkomentoITS/meal-app.git
cd meal-app

# 2. Installa dipendenze
npm install

# 3. Avvia il development server
npx expo start
```

### Esecuzione

```bash
# Android Emulator
Premi: a

# iOS Simulator
Premi: i

# Expo Go (Smartphone)
Scannerizza il QR code con l'app Expo Go
```

---

## 🔐 Test Credenziali

Usa uno di questi account per il login:

| Email | Password | Name |
|-------|----------|------|
| `mario.rossi@student.it` | `React2026!` | Mario Rossi |
| `giulia.bianchi@student.it` | `Expo2026!` | Giulia Bianchi |
| `luca.verdi@student.it` | `Mobile2026!` | Luca Verdi |

---

## 🌐 API Docs

### TheMealDB Endpoint

**Get Meals:**
```http
GET https://www.themealdb.com/api/json/v1/1/filter.php?a={area}
```

**Get Meal Details:**
```http
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}
```

📚 [TheMealDB API Docs](https://www.themealdb.com/api.php)

---

## 🔗 Deep Linking

Accedi direttamente a una ricetta:

```bash
# Development (Expo Go)
exp://localhost:8081/detail/52772

# Production
meal-app://detail/52772
```

---

## 🛡️ Edge Cases Gestiti

La app gestisce:

✅ **Errori di rete** - Loading state + retry button  
✅ **Login fallito** - Validazione client + feedback dinamico  
✅ **Lista vuota** - Messaggio user-friendly  
✅ **Deep link invalido** - Fallback a Home  
✅ **Font scaling** - Layout stabile fino a 200% zoom  
✅ **Favoriti offline** - Persistiti in AsyncStorage  
✅ **Responsive layout** - 2-3 colonne dinamiche  

---

## 📦 Funzionalità Implementate

### Requisiti Obbligatori (10/10) ✅

| # | Feature | Implementato |
|----|---------|-------------|
| 1️⃣ | Login con 3 mock users | ✅ Completo |
| 2️⃣ | Avatar + nome profilo | ✅ In ProfileScreen |
| 3️⃣ | Lista Peasi + GPS | ✅ In LocationScreen |
| 4️⃣ | Lista piatti | ✅ Da TheMealDB |
| 5️⃣ | Ricerca/Filter controllato | ✅ In HomeScreen |
| 6️⃣ | Dettaglio ricetta | ✅ Completo |
| 7️⃣ | Favoriti + AsyncStorage | ✅ Persistito |
| 8️⃣ | Settings + Logout | ✅ Con toggle |
| 9️⃣ | Accessibilità (min 2) | ✅ 7+ features |
| 🔟 | Deep Linking | ✅ Testabile |8️⃣

---

## 🎓 Applicazione Concetti

Questo progetto dimostra l'applicazione pratica di:

- **React Hooks** - useState, useEffect, useContext
- **TypeScript** - Type safety end-to-end
- **Async/Await** - API calls con error handling
- **State Management** - Context API patterns
- **Local Storage** - Persistenza con AsyncStorage
- **Location Request** - Posizione GPS dispositivo
- **Navigation** - Stack & Deep Linking
- **Responsive Design** - useWindowDimensions
- **Accessibilità** - WCAG 2.1 compliance
- **UX Best Practices** - Loading states, error boundaries
- **Mobile Performance** - Ottimizzazione rendering

---

## 📸 Screenshots

Vedi tutti gli screenshot dei lab 13-22 nel [Google Doc](https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit)

---

## 📝 Licenza

Questo progetto è rilasciato sotto la **MIT License**.

```
MIT License

Copyright (c) 2026 Mirko Mento

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Autore

**Mirko Mento**

- 🔗 [GitHub](https://github.com/mirkomentoITS)
- 📧 [Email](mailto:mirko.mento@jcmaxwell.it)
- 💼 [LinkedIn](https://linkedin.com/in/mirkomento)

---

## 🙏 Ringraziamenti

- [TheMealDB](https://www.themealdb.com/) - Per la fantastica API pubblica
- [Expo](https://expo.dev/) - Per il toolkit incredibile
- [React Navigation](https://reactnavigation.org/) - Per il sistema di navigazione

---

<div align="center">

Made with ❤️ by Mirko Mento

⭐ Se il progetto ti piace, considera di dargli una stella!

</div>
