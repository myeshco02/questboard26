export const REGIONS = [
    { id: 1, name: 'Mroczny Las',       icon: '🌲', desc: 'Gęsty las pełen cieni i niebezpiecznych stworzeń.',        danger: 4 },
    { id: 2, name: 'Górskie Przełęcze', icon: '⛰️',  desc: 'Strome szlaki i lodowate wiatry.',                          danger: 7 },
    { id: 3, name: 'Nawiedzony Zamek',  icon: '🏰', desc: 'Ruiny dawnej twierdzy, gdzie błąkają się duchy.',           danger: 8 },
    { id: 4, name: 'Dolina Mgieł',      icon: '🌫️',  desc: 'Spokojne łąki spowite tajemniczą mgłą.',                    danger: 2 },
    { id: 5, name: 'Spalone Pustkowia', icon: '🔥', desc: 'Jałowa ziemia po dawnej wojnie magów.',                     danger: 6 },
    { id: 6, name: 'Zielony Las',       icon: '🍃', desc: 'Przyjazny las elfów, rzadko nawiedzany przez złe stwory.', danger: 1 },
];

export const EVENTS = [
    { regionId: 2, title: 'Smocza Burza',    desc: 'Smok krąży nad przełęczami.',           bonus: 20 },
    { regionId: 1, title: 'Nocna Mgła',      desc: 'Gęsta mgła utrudnia wędrówkę.',          bonus: 0  },
    { regionId: 3, title: 'Pełnia Księżyca', desc: 'Nieumarli silniejsi tej nocy.',           bonus: 15 },
];

export const QUESTS = [
    { id:  1, title: 'Zaginiony kupiec',     icon: '🗺️',  desc: 'Odnajdź kupca zaginionego w Mrocznym Lesie.',                  diff: 'Easy',   minLvl: 2, reward:  80, status: 'Open',       regionId: 1 },
    { id:  2, title: 'Wilki w dolinie',      icon: '🐺', desc: 'Przepędź watahę wilków terroryzujących Dolinę Mgieł.',         diff: 'Easy',   minLvl: 1, reward:  50, status: 'Open',       regionId: 4 },
    { id:  3, title: 'Skarb w ruinach',      icon: '💎', desc: 'Eksploruj ruiny Nawiedzonego Zamku i odnajdź zaginiony skarb.',diff: 'Hard',   minLvl: 6, reward: 400, status: 'Open',       regionId: 3 },
    { id:  4, title: 'Gobliński napad',      icon: '⚔️',  desc: 'Odpędź goblinów atakujących wioskę na skraju lasu.',           diff: 'Medium', minLvl: 3, reward: 150, status: 'InProgress', regionId: 1, party: [{ name: 'Thorin', leader: true }, { name: 'Gorak', leader: false }] },
    { id:  5, title: 'Zaklęty artefakt',     icon: '🔮', desc: 'Odnajdź i zniszcz przeklęty artefakt dawnych magów.',          diff: 'Hard',   minLvl: 7, reward: 500, status: 'Open',       regionId: 5, reqClass: 'Mage' },
    { id:  6, title: 'Straż przełęczy',      icon: '🛡️',  desc: 'Pilnuj szlaku przez Górskie Przełęcze przez trzy doby.',       diff: 'Medium', minLvl: 4, reward: 200, status: 'Open',       regionId: 2 },
    { id:  8, title: 'Oczyszczenie kopalni', icon: '⛏️',  desc: 'Oczyść opuszczoną kopalnię w górach z goblinów.',              diff: 'Hard',   minLvl: 5, reward: 350, status: 'Open',       regionId: 2 },
    { id:  9, title: 'List do elfów',        icon: '📜', desc: 'Dostarcz pilną wiadomość do elfiej osady w Zielonym Lesie.',   diff: 'Easy',   minLvl: 1, reward:  60, status: 'Open',       regionId: 6 },
    { id: 10, title: 'Nekromanta w zamku',   icon: '💀', desc: 'Pokonaj nekromantę który opanował skrzydło ruin.',             diff: 'Hard',   minLvl: 8, reward: 600, status: 'Open',       regionId: 3, reqClass: 'Mage' },
    { id: 11, title: 'Zioła lecznicze',      icon: '🌿', desc: 'Zbierz rzadkie zioła rosnące głęboko w Mrocznym Lesie.',       diff: 'Easy',   minLvl: 2, reward:  70, status: 'InReview',   regionId: 1, party: [{ name: 'Arindel', leader: true }, { name: 'Arannis', leader: false }], report: 'Zebraliśmy pełen koszyk ziół. Wszystkie gatunki z listy były dostępne w głębi lasu.' },
    { id: 13, title: 'Zagubione dzieci',     icon: '🏃', desc: 'Odnajdź dzieci zaginione podczas wyprawy do lasu.',            diff: 'Easy',   minLvl: 1, reward:  90, status: 'Completed',  regionId: 6, party: [{ name: 'Sera', leader: true }] },
    { id: 14, title: 'Smok w przełęczy',     icon: '🐉', desc: 'Przepędź młodego smoka który zajął jaskinię na szlaku.',       diff: 'Hard',   minLvl: 9, reward: 800, status: 'Open',       regionId: 2 },
    { id: 15, title: 'Klątwa wioski',        icon: '🧿', desc: 'Znajdź źródło klątwy trapiącej wioskę przy dolinie.',          diff: 'Medium', minLvl: 5, reward: 250, status: 'Open',       regionId: 4, reqClass: 'Mage' },
    { id: 16, title: 'Eskortuj karawanę',    icon: '🐎', desc: 'Eskortuj karawanę kupiecką przez Mroczny Las.',                diff: 'Medium', minLvl: 3, reward: 170, status: 'Open',       regionId: 1 },
    { id: 17, title: 'Duch rycerza',         icon: '👻', desc: 'Uwolnij ducha rycerza uwięzionego w zamkowej kaplicy.',        diff: 'Medium', minLvl: 5, reward: 230, status: 'Rejected',   regionId: 3, party: [{ name: 'Malgath', leader: true }, { name: 'Ysera', leader: false }], report: 'Próbowaliśmy odprawić ducha przy użyciu dostępnych zaklęć.', rejectionReason: 'Raport zbyt ogólny. Opisz szczegółowo zastosowany rytuał.' },
    { id: 20, title: 'Zaginiony patrol',     icon: '🔍', desc: 'Odnajdź zwiadowców gildii którzy nie wrócili z rekonesansu.',  diff: 'Medium', minLvl: 4, reward: 190, status: 'Open',       regionId: 2 },
];

export const ITEMS = [
    { id:  1, name: 'Miecz Krótki',       icon: '⚔️',  type: 'Weapon',   value:  80, desc: 'Lekki miecz dla początkujących wojowników.' },
    { id:  2, name: 'Długi Miecz',        icon: '🗡️',  type: 'Weapon',   value: 150, desc: 'Solidna broń dla doświadczonych.' },
    { id:  3, name: 'Topór Bojowy',       icon: '🪓', type: 'Weapon',   value: 200, desc: 'Ciężki topór zadający ogromne obrażenia.' },
    { id:  4, name: 'Łuk Elficki',        icon: '🏹', type: 'Weapon',   value: 180, desc: 'Precyzyjny łuk elfich rzemieślników.' },
    { id:  5, name: 'Laska Maga',         icon: '🔮', type: 'Weapon',   value: 160, desc: 'Wzmacnia zaklęcia o 15%.' },
    { id:  6, name: 'Różdżka Piorunów',   icon: '⚡', type: 'Weapon',   value: 350, desc: 'Rzuca błyskawice — tylko dla magów.' },
    { id:  7, name: 'Sztylet Cienia',     icon: '🔪', type: 'Weapon',   value: 110, desc: 'Lekki i szybki, idealny dla zwiadowców.' },
    { id:  8, name: 'Skórzana Zbroja',    icon: '🥋', type: 'Armor',    value:  60, desc: 'Lekka ochrona nie ograniczająca ruchów.' },
    { id:  9, name: 'Kolczuga',           icon: '🛡️',  type: 'Armor',    value: 140, desc: 'Solidna ochrona dla awanturników.' },
    { id: 10, name: 'Płytowa Zbroja',     icon: '⚜️',  type: 'Armor',    value: 300, desc: 'Maksymalna ochrona — tylko dla wojowników.' },
    { id: 11, name: 'Tarcza Herbu',       icon: '🔰', type: 'Armor',    value: 120, desc: 'Wytrzymała tarcza z herbem gildii.' },
    { id: 12, name: 'Zbroja Paladyna',    icon: '✝️',  type: 'Armor',    value: 280, desc: 'Święta zbroja wzmacniająca boskie moce.' },
    { id: 13, name: 'Peleryna Zwiadowcy', icon: '🧥', type: 'Armor',    value:  95, desc: 'Zapewnia częściową niewidzialność w lesie.' },
    { id: 14, name: 'Amulet Zdrowia',     icon: '💚', type: 'Talisman', value:  90, desc: 'Powoli regeneruje zdrowie podczas odpoczynku.' },
    { id: 15, name: 'Pierścień Mocy',     icon: '💍', type: 'Talisman', value: 110, desc: 'Zwiększa siłę ataku o 10%.' },
    { id: 16, name: 'Kamień Szczęścia',   icon: '🍀', type: 'Talisman', value:  75, desc: 'Podobno przynosi szczęście w trudnych chwilach.' },
    { id: 17, name: 'Talizman Odwagi',    icon: '🔶', type: 'Talisman', value: 130, desc: 'Chroni przed efektami strachu i paniki.' },
    { id: 18, name: 'Kryształ Magii',     icon: '💎', type: 'Talisman', value: 220, desc: 'Znacznie zwiększa pulę many maga.' },
    { id: 19, name: 'Amulet Ochrony',     icon: '🔵', type: 'Talisman', value: 170, desc: 'Pochłania część obrażeń od magii.' },
    { id: 20, name: 'Pierścień Skupienia',icon: '🟣', type: 'Talisman', value: 140, desc: 'Zwiększa celność o 12%.' },
];

export const HEROES = [
    { id:  1, name: 'Thorin',   icon: '⚔️',  cls: 'Warrior', lvl: 7, gold: 320, completed: 1, inventory: [{ id: 2, name: 'Długi Miecz', icon: '🗡️' }, { id: 9, name: 'Kolczuga', icon: '🛡️' }] },
    { id:  2, name: 'Arindel',  icon: '🏹', cls: 'Ranger',  lvl: 5, gold: 180, completed: 2, inventory: [{ id: 4, name: 'Łuk Elficki', icon: '🏹' }, { id: 13, name: 'Peleryna Zwiadowcy', icon: '🧥' }] },
    { id:  3, name: 'Malgath',  icon: '🧙', cls: 'Mage',    lvl: 8, gold: 540, completed: 1, inventory: [{ id: 5, name: 'Laska Maga', icon: '🔮' }, { id: 18, name: 'Kryształ Magii', icon: '💎' }] },
    { id:  4, name: 'Sera',     icon: '🛡️',  cls: 'Paladin', lvl: 4, gold: 210, completed: 1, inventory: [{ id: 11, name: 'Tarcza Herbu', icon: '🔰' }] },
    { id:  5, name: 'Aldric',   icon: '⚔️',  cls: 'Warrior', lvl: 3, gold:  90, completed: 0, inventory: [] },
    { id:  6, name: 'Ysera',    icon: '🧙', cls: 'Mage',    lvl: 6, gold: 430, completed: 1, inventory: [{ id: 6, name: 'Różdżka Piorunów', icon: '⚡' }, { id: 19, name: 'Amulet Ochrony', icon: '🔵' }] },
    { id:  7, name: 'Bronn',    icon: '⚔️',  cls: 'Warrior', lvl: 2, gold:  40, completed: 0, inventory: [{ id: 1, name: 'Miecz Krótki', icon: '⚔️' }] },
    { id:  8, name: 'Aelindra', icon: '🏹', cls: 'Ranger',  lvl: 9, gold: 750, completed: 3, inventory: [{ id: 4, name: 'Łuk Elficki', icon: '🏹' }, { id: 7, name: 'Sztylet Cienia', icon: '🔪' }, { id: 13, name: 'Peleryna Zwiadowcy', icon: '🧥' }] },
    { id: 11, name: 'Durgin',   icon: '🛡️',  cls: 'Paladin', lvl: 6, gold: 290, completed: 0, inventory: [{ id: 12, name: 'Zbroja Paladyna', icon: '✝️' }, { id: 11, name: 'Tarcza Herbu', icon: '🔰' }] },
    { id: 20, name: 'Halvard',  icon: '🛡️',  cls: 'Paladin', lvl: 8, gold: 620, completed: 2, inventory: [{ id: 10, name: 'Płytowa Zbroja', icon: '⚜️' }, { id: 12, name: 'Zbroja Paladyna', icon: '✝️' }, { id: 17, name: 'Talizman Odwagi', icon: '🔶' }] },
];

// Aktualnie zalogowany bohater (mock)
export const CURRENT_HERO_ID = 3;
