# QuestBoard — frontend

Makieta frontendu aplikacji QuestBoard — systemu zarządzania questami
budowanego w ramach kursu .NET 10.

## Uruchomienie

Frontend wymaga lokalnego serwera HTTP — nie otwieraj `index.html` bezpośrednio
przez `file://` (moduły ES nie działają bez serwera).

**Live Server (VS Code):**
Otwórz folder w VS Code, kliknij „Go Live" w pasku statusu.

**npx serve:**
```bash
npx serve .
```

**Python:**
```bash
python -m http.server 8000
```

## Tryb mock / API

Przełącznik w `js/api.js`:

```javascript
const USE_MOCK = true;   // dane testowe z data/mock.js
const USE_MOCK = false;  // prawdziwe API
const API_BASE = 'http://localhost:5000/api';  // adres API
```

## Struktura

```
questboard/
├── index.html
├── css/
│   └── style.css
├── data/
│   └── mock.js          # dane testowe (SeedData)
└── js/
    ├── api.js           # konfiguracja, przełącznik mock/API
    ├── main.js          # punkt wejścia, rejestracja tras
    ├── router.js        # nawigacja hash-based
    ├── utils.js         # pomocnicze funkcje
    └── views/
        ├── quests.js
        ├── questDetail.js
        ├── profile.js
        ├── shop.js
        ├── regions.js
        ├── ranking.js
        └── admin.js
```

## Widoki

| Widok | URL | Dostęp |
|---|---|---|
| Lista questów | `#quests` | publiczny |
| Szczegóły questu | `#quest/{id}` | publiczny |
| Profil bohatera | `#profile` | zalogowany |
| Sklep | `#shop` | zalogowany |
| Regiony | `#regions` | publiczny |
| Ranking | `#ranking` | publiczny |
| Panel admina | `#admin` | admin |
