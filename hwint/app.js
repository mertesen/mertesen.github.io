// ============================================================
//  HOT WHEELS ENVANTERİM — app.js
// ============================================================

const allCars = [
    // Mainline
    ...data2010,
    ...data2011,
    ...data2012,
    ...data2013,
    ...data2014,
    ...data2015,
    ...data2016,
    ...data2017,
    ...data2018,
    ...data2019,
    ...data2020,
    ...data2021,
    ...data2022,
    ...data2023,
    ...data2024,
    ...data2025,
    ...data2026,
    // Premium Car Culture
    ...carculture2016,
    ...carculture2017,
    ...carculture2018,
    ...carculture2019,
    ...carculture2020,
    ...carculture2021,
    ...carculture2022,
    ...carculture2023,
    ...carculture2024,
    ...carculture2025,
    ...carculture2026,
    // Premium Pop Culture
    ...popculture2013,
    ...popculture2014,
    ...popculture2015,
    ...popculture2016,
    ...popculture2017,
    ...popculture2018,
    ...popculture2019,
    ...popculture2020,
    ...popculture2021,
    ...popculture2022,
    ...popculture2023,
    ...popculture2024,
    ...popculture2025,
    ...popculture2026,
    // Premium Boulevard
    ...boulevard2012,
    ...boulevard2013,
    ...boulevard2020,
    ...boulevard2021,
    ...boulevard2022,
    ...boulevard2023,
    ...boulevard2024,
    ...boulevard2025, 
    ...boulevard2026,
    // Silver Fast Furious
    ...ff2013,
    ...ff2014,
    ...ff2015, 
    ...ff2016, 
    ...ff2017,
    ...ff2018,
    ...ff2019,
    ...ff2020, 
    ...ff2021, 
    ...ff2023,
    ...ffbrianoconner2025, 
    ...ffdominictoretto2024, 
    ...ffdreamline2026,
    ...ffgraphicremix2025, 
    ...ffhwdecadesoffast2024, 
    ...ffracing2024,
    ...ffracingcourse2025, 
    ...fftokyodrift2026, 
    ...ffvillians2025, 
    ...ffwomenoffast2024,
    // Premium Fast Furious
    ...ff2019premium, 
    ...ff2020premium, 
    ...ff2021premium, 
    ...ff2023premium,
    ...ff2024premium, 
    ...ff2025premium, 
    ...ff2026premium,
    // Silver Anniversary
    ...blackandgold2018,
    ...satinandchrome2019,
    ...pearlandchrome2020,
    ...orangeandyellow2021,
    ...blueandpink2022,
    ...blackandyellow2023,
    ...greenandgold2024,
    ...purpleandgold2025,
    ...blueandgold2026,
    // Silver Automative
    ...a14milefinals2021,
    ...a90sStreet2025,
    ...compactkings2026,
    ...americanpickups2019,
    ...backroadrally2019,
    ...cultracers2021,
    ...detroitmuscle2018,
    ...exotics2019,
    ...fordtrucks2018,
    ...forza2023,
    ...forzahorizon2021,
    ...forzahorizon42019,
    ...forzamotorsport2020,
    ...honda70thann2018,
    ...hondacivic2022,
    ...hotpickups2021,
    ...hotwagons2024,
    ...hotwheelsjimports2024,
    ...hwpolice2020,
    ...hwspeedgraphics2024,
    ...hybridspeed2025,
    ...japaneseclassics2023,
    ...luxurysedans2022,
    ...mopar2018,
    ...mopar2023,
    ...motorcycleclub2024,
    ...mudrunners2022,
    ...mudrunners2023,
    ...offroadtrucks2019,
    ...rallyracers2026,
    ...summitsurge2026,
    ...surfsup2025,
    ...toonedgulf2025,
    ...toyota2025,
    ...tubulartrucks2024,
    ...urbancamouflage2020,
    ...worldclassracers2022,
    // Silver Entertainment
    ...acceleracers2025,
    ...avatar2025,
    ...avengers2019,
    ...batman2019,
    ...batman2021,
    ...batman2023,
    ...disney1002023,
    ...disneyclassics2022,
    ...granturismo2024,
    ...lightyear2022,
    ...mickeymouse902018,
    ...muppets2021,
    ...overwatch2020,
    ...peanut75years2025,
    ...pixar2020,
    ...racingcircuit2022,
    ...spiderman2018,
    ...spiderman2022,
    ...spiderman2026,
    ...spidermanvenom2020,
    ...spongebob2019,
    ...spongebob2024,
    ...tmnt2020,
    ...tokyoolmp2020,
    ...toystory2019,
    ...toystory52026,
    ...transformers2025,
    ...warnerbros2023,
    ...xmen2023,
    // Silver Celebrations
    ...americansteel2023,
    ...bmw2025,
    ...convertibles2021,
    ...covertte702023,
    ...hwstarsstripes2022,
    ...mustang60years2025,
    ...pontiac100an2026,
    ...porsche2024,
    ...starsstripes2024,
    ...volkswagen2022,
    // Silver Vintage
    ...nationalicon2025,
    ...saltflatracer2025,
    ...vintage2026,
    ...vintageracingclud2024,
    // Silver Seasonal
    ...spring2026,
    // Silver Batman
    ...batman2025,
    // Silver Neon Speeders
    ...neonspeeders2023,
    ...neonspeeders2024,
    ...neonspeeders2025,
    ...neonspeeders2026,
    // Silver The Hot Ones
    ...thehotones2025,
    ...thehotones2026,
    // Silver Ultra Hots
    ...ultrahots2022,
    ...ultrahots2023,
    ...ultrahots2024,
    ...ultrahots2025,

];

let visibleCount     = 10;
let sortOrder        = 'newest';
let myCollection     = JSON.parse(localStorage.getItem('hw_koleksiyon')) || [];
let myWishlist       = JSON.parse(localStorage.getItem('hw_wishlist'))   || [];

let needsUpdate = false;
// 1. Eski koleksiyonu (sadece string ID'ler) yeni formata (toyId ve price objesi) çevir
if (myCollection.length > 0 && typeof myCollection[0] === 'string') {
    let newColl = [];
    myCollection.forEach(carId => {
        const car = allCars.find(c => c.id === carId);
        if (car && car.toyId) newColl.push({ toyId: car.toyId, price: 0, marketValue: 0, quantity: 1 });
    });
    myCollection = newColl;
    needsUpdate = true;
}
// 2. Eski istek listesini (string ID'ler) toyId array'ine çevir
if (myWishlist.length > 0 && myWishlist[0].startsWith('hw-')) {
    let newWish = [];
    myWishlist.forEach(carId => {
        const car = allCars.find(c => c.id === carId);
        if (car && car.toyId) newWish.push(car.toyId);
    });
    myWishlist = newWish;
    needsUpdate = true;
}
if (needsUpdate) { // Eğer dönüştürme yapıldıysa kaydet
    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
    localStorage.setItem('hw_wishlist', JSON.stringify(myWishlist));
    console.log("Mevcut veriler başarıyla toyId sistemine aktarıldı.");
}

let myWishlistSet = new Set(myWishlist);
let myCollectionSet = new Set(myCollection.map(item => item.toyId)); // veya id
// Koleksiyonda var mı ve fiyatı ne kontrolü için yardımcı fonksiyonlar

function syncSets() {
    myWishlistSet = new Set(myWishlist);
    myCollectionSet = new Set(myCollection.map(item => item.toyId));
}

function getOwnedItem(toyId) {
    if (!toyId) return false;
    return myCollection.find(item => item.toyId === toyId);
}
function isWished(toyId) {
    if (!toyId) return false;
    return myWishlistSet.has(toyId);
}
// --------------------------------------------------------------------

// Active collection filter state
let collFilter       = 'all';   // 'all' | 'mainline' | 'premium' | 'silver' | 'th' | 'sth' | 'chase'
let collSearch       = '';
let collSort         = localStorage.getItem('hw_collSort') || 'newest';

// ── Helpers ───────────────────────────────────
function rarityKey(car) {
    const r = (car.rarity || '').toLowerCase().replace(/\s+/g, '');
    if (r.includes('supertreasure') || r === 'sth') return 'sth';
    if (r.includes('treasure')      || r === 'th')  return 'th';
    if (r === 'chase')   return 'chase';
    if (r === 'premium') return 'premium';
    if (r === 'silver')  return 'silver';
    return 'normal';
}

function typeKey(car) {
    const t = (car.collectionType || '').toLowerCase();
    if (t === 'premium') return 'premium';
    if (t === 'silver')  return 'silver';
    return 'mainline';
}

// ── Populate catalog filter dropdowns ─────────
function populateDynamicFilters() {
    const yearSel    = document.getElementById('yearSelect');
    const seriesSel  = document.getElementById('seriesSelect');
    const releaseSel = document.getElementById('releaseSelect');

    const years   = [...new Set(allCars.map(c => c.year))].filter(Boolean).sort((a,b) => b - a);
    const series  = [...new Set(allCars.map(c => c.series))].filter(Boolean).sort();
    const releases= [...new Set(allCars.map(c => c.release))].filter(Boolean).sort();

    years.forEach(y    => yearSel.innerHTML    += `<option value="${y}">${y}</option>`);
    series.forEach(s   => seriesSel.innerHTML  += `<option value="${s}">${s}</option>`);
    releases.forEach(r => releaseSel.innerHTML += `<option value="${r}">${r}</option>`);
}

// ── Build a single card ───────────────────────
function buildCard(car, isCollection) {
    const el    = document.createElement('div');
    const rKey  = rarityKey(car);
    const tKey  = typeKey(car);
    // Rarity classes override type classes visually for special rarities
    const specialRarity = ['th','sth','chase'].includes(rKey);
    el.classList.add('car-card', `type-${tKey}`, `rarity-${rKey}`);
    el.dataset.carId = car.id;

    const mainImg  = car.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image';
    const hasHover = car.imageUrlCardboard && car.imageUrlCardboard.trim() !== '';
    const inWhislist = isWished(car.toyId);
    const inColl   = getOwnedItem(car.toyId);

    const hoverImg = hasHover
        ? `<img src="${car.imageUrlCardboard}" class="img-hover" loading="lazy">` : '';

    // Type pill label — only for non-special rarity cards
    let typePillHTML = '';
    if (!specialRarity) {
        const pillClass = `pill-${tKey}`;
        const pillLabel = tKey === 'mainline' ? 'Mainline' : tKey === 'premium' ? 'Premium' : 'Silver';
        typePillHTML = `<span class="card-type-pill ${pillClass}">${pillLabel}</span>`;
    }

    const qty = isCollection && inColl ? (inColl.quantity || 1) : 1;
    const actionBtn = isCollection
        ? `<div class="qty-stepper">
               <button class="qty-btn qty-btn--minus" onclick="changeQty('${car.id}',-1)" title="Adet Azalt">−</button>
               <span class="qty-display">${qty}</span>
               <button class="qty-btn qty-btn--plus"  onclick="changeQty('${car.id}',+1)" title="Adet Artır">+</button>
               <button class="btn-remove" onclick="removeFromCollection('${car.id}')">✕</button>
           </div>`
        : inColl
            ? `<button class="btn-remove" onclick="removeFromCollection('${car.id}')">✓ Var</button>`
            : `<button class="btn-add" onclick="addToCollection('${car.id}', event)">+ Ekle</button>`;

    const wishBtn = `<button class="btn-wish ${inWhislist ? 'active' : ''}" onclick="toggleWishlist('${car.id}')">${inWhislist ? '❤️' : '🤍'}</button>`;

    const priceBadge = isCollection && inColl && inColl.price > 0
        ? `<span class="card-price-badge">💶 ${Number(inColl.price).toFixed(2)} €</span>` : '';
    const marketBadge = isCollection && inColl && (inColl.marketValue || 0) > 0
        ? `<span class="card-market-badge">📈 ${Number(inColl.marketValue).toFixed(2)} €</span>` : '';
    const dupBadge = isCollection && inColl && (inColl.quantity || 1) > 1
        ? `<span class="card-dup-badge">×${inColl.quantity}</span>` : '';

    el.innerHTML = `
        <div class="car-image-container ${hasHover ? 'has-hover' : ''}" onclick="openModal('${car.id}')">
            <img src="${mainImg}" class="img-main" loading="lazy">
            ${hoverImg}
            ${typePillHTML}
            ${priceBadge}
            ${marketBadge}
            ${dupBadge}
            <span class="img-zoom-hint">🔍 Detay</span>
        </div>
        <div class="car-body">
            <div class="car-meta-tags">
                ${car.mainlineNumber ? `<span class="tag">#${car.mainlineNumber}</span>` : ''}
                ${car.toyId         ? `<span class="tag">ID: ${car.toyId}</span>` : ''}
                ${car.seriesNumber  ? `<span class="tag">${car.seriesNumber}</span>` : ''}
            </div>
            <h3 class="car-title">${car.name} <span class="car-year">${car.year || ''}</span></h3>
            ${car.series  ? `<p class="car-info"><strong>Seri:</strong> ${car.series}</p>` : ''}
            ${car.release ? `<p class="car-info"><strong>Sürüm:</strong> ${car.release}</p>` : ''}
            <div class="badges">
                <span class="badge ${rKey}">${car.rarity || 'Normal'}</span>
                ${tKey === 'premium' && !specialRarity ? '<span class="badge premium-type">Premium</span>' : ''}
                ${tKey === 'silver'  && !specialRarity ? '<span class="badge silver">Silver</span>'  : ''}
            </div>
        </div>
        <div class="links-and-buttons">
            <a href="${car.wikiLink || '#'}" target="_blank" class="wiki-link">Wiki ↗</a>
            <div class="card-buttons">${actionBtn}${wishBtn}</div>
        </div>
    `;
    return el;
}

// ── Render a car list into a container ────────
function renderCars(carsArray, containerId, isCollection = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (carsArray.length === 0) {
        container.innerHTML = `<p style="padding:20px;color:var(--text2);">Burada henüz bir araç yok.</p>`;
        return;
    }

    const limit = isCollection ? carsArray.length : visibleCount;
    carsArray.slice(0, limit).forEach(car => container.appendChild(buildCard(car, isCollection)));
}

// ── Collection filter bar (pills) ─────────────
function buildCollectionFilters() {
    const wrapper = document.getElementById('collectionFiltersBar');
    if (!wrapper) return;

    const pills = [
        { key: 'all',      label: 'Tümü' },
        { key: 'mainline', label: 'Mainline' },
        { key: 'premium',  label: 'Premium' },
        { key: 'silver',   label: 'Silver' },
        null, // divider
        { key: 'th',    label: 'TH' },
        { key: 'sth',   label: 'STH' },
        { key: 'chase', label: 'Chase' },
    ];

    let html = `<span class="collection-filters-label">Filtre:</span>`;

    pills.forEach(p => {
        if (p === null) {
            html += `<span class="coll-filter-divider"></span>`;
        } else {
            const isActive = collFilter === p.key;
            const activeClass = isActive ? `active-${p.key}` : '';
            html += `<button class="coll-filter-pill ${activeClass}" onclick="setCollFilter('${p.key}')">${p.label}</button>`;
        }
    });

    // Sort select
    html += `<select class="collection-sort-select" onchange="setCollSort(this.value)">
        <option value="newest"  ${collSort==='newest'  ?'selected':''}>Yıl: Yeniden Eskiye</option>
        <option value="oldest"  ${collSort==='oldest'  ?'selected':''}>Yıl: Eskiden Yeniye</option>
        <option value="price_desc"  ${collSort==='price_desc'  ?'selected':''}>💶 Fiyat: Yüksekten Düşüğe</option>
        <option value="price_asc"   ${collSort==='price_asc'   ?'selected':''}>💶 Fiyat: Düşükten Yükseğe</option>
        <option value="market_desc" ${collSort==='market_desc' ?'selected':''}>📈 Piyasa: Yüksekten Düşüğe</option>
        <option value="market_asc"  ${collSort==='market_asc'  ?'selected':''}>📈 Piyasa: Düşükten Yükseğe</option>
        <option value="name_asc"    ${collSort==='name_asc'    ?'selected':''}>A–Z İsim</option>
        <option value="name_desc"   ${collSort==='name_desc'   ?'selected':''}>Z–A İsim</option>
    </select>`;

    // Search inside collection
    html += `<input type="text" class="collection-search" id="collectionSearchInput" placeholder="Koleksiyonda ara..." value="${collSearch}" oninput="setCollSearch(this.value)">`;

    wrapper.innerHTML = html;
}

function setCollFilter(key) {
    collFilter = key;
    buildCollectionFilters();
    renderFilteredCollection();
}

function setCollSearch(val) {
    collSearch = val.toLowerCase();
    renderFilteredCollection();
}

function setCollSort(val) {
    collSort = val;
    localStorage.setItem('hw_collSort', val);
    renderFilteredCollection();
}

function applyCollectionFilters(cars) {
    return cars.filter(car => {
        const rKey = rarityKey(car);
        const tKey = typeKey(car);

        let matchFilter = true;
        if (collFilter === 'mainline') matchFilter = tKey === 'mainline';
        else if (collFilter === 'premium') matchFilter = tKey === 'premium';
        else if (collFilter === 'silver')  matchFilter = tKey === 'silver';
        else if (collFilter === 'th')    matchFilter = rKey === 'th';
        else if (collFilter === 'sth')   matchFilter = rKey === 'sth';
        else if (collFilter === 'chase') matchFilter = rKey === 'chase';

        const matchSearch = collSearch === '' ||
            car.name?.toLowerCase().includes(collSearch) ||
            car.series?.toLowerCase().includes(collSearch) ||
            car.release?.toLowerCase().includes(collSearch) ||
            car.toyId?.toLowerCase().includes(collSearch);

        return matchFilter && matchSearch;
    });
}

function renderFilteredCollection() {
    const allCollected = allCars.filter(car => getOwnedItem(car.toyId));
    const filtered     = applyCollectionFilters(allCollected);

    // Sort collection
    filtered.sort((a, b) => {
        const ao = getOwnedItem(a.toyId) || {};
        const bo = getOwnedItem(b.toyId) || {};
        switch (collSort) {
            case 'oldest':     return (a.year || 0) - (b.year || 0);
            case 'price_desc': return (bo.price || 0) - (ao.price || 0);
            case 'price_asc':  return (ao.price || 0) - (bo.price || 0);
            case 'market_desc':return (bo.marketValue || 0) - (ao.marketValue || 0);
            case 'market_asc': return (ao.marketValue || 0) - (bo.marketValue || 0);
            case 'name_asc':   return a.name.localeCompare(b.name);
            case 'name_desc':  return b.name.localeCompare(a.name);
            default:           return (b.year || 0) - (a.year || 0); // newest
        }
    });

    // Show count next to filter
    const countEl = document.getElementById('collFilterCount');
    if (countEl) countEl.textContent = `${filtered.length} araç`;

    // Render collection grid inside collapsible wrapper if not already wrapped
    const gridWrapper = document.getElementById('collGridHeader');
    if (!gridWrapper) {
        const filtersBar = document.getElementById('collectionFiltersBar');
        if (filtersBar) {
            // Insert collapsible header before filters bar
            const headerEl = document.createElement('div');
            headerEl.id = 'collGridHeader';
            headerEl.className = 'collapsible-section';
            headerEl.innerHTML = `
                <div class="collapsible-header" onclick="toggleSection('collGrid')">
                    <span class="collapsible-title">🚗 Koleksiyon</span>
                    <span id="chevron-collGrid" class="collapsible-chevron">▾</span>
                </div>`;
            filtersBar.parentNode.insertBefore(headerEl, filtersBar);

            // Wrap filters bar + count + grid in a body div
            const bodyEl = document.createElement('div');
            bodyEl.id = 'collGridBody';
            bodyEl.className = 'collapsible-body';
            const countRow = filtersBar.nextElementSibling; // the count row div
            const grid = document.getElementById('collectionGrid');
            bodyEl.appendChild(filtersBar);
            if (countRow) bodyEl.appendChild(countRow);
            if (grid) bodyEl.appendChild(grid);
            headerEl.appendChild(bodyEl);
        }
    }

    renderCars(filtered, 'collectionGrid', true);
    updateSetTracker();
    updateMissingItems();
    applySectionStates();
}

// ── Missing items ─────────────────────────────
function updateMissingItems() {
    const sets = {};

    allCars.forEach(car => {
        if (!car.release || !car.seriesNumber || !car.seriesNumber.includes('/')) return;
        const total = parseInt(car.seriesNumber.split('/')[1]);
        if (isNaN(total)) return;
        const key = `${car.series}||${car.release}||${car.year}||${total}`;
        if (!sets[key]) sets[key] = { total, owned: 0, cars: [], series: car.series, release: car.release, year: car.year };
        sets[key].cars.push(car);
        if (getOwnedItem(car.toyId)) sets[key].owned++;
    });

    const nearly = Object.values(sets)
        .filter(s => s.owned > 0 && s.owned < s.total)
        .sort((a,b) => (b.owned/b.total) - (a.owned/a.total))
        .slice(0, 8);

    const container = document.getElementById('missingItemsContainer');
    if (!container) return;

    if (nearly.length === 0) { container.innerHTML = ''; return; }

    const items = nearly.flatMap(s =>
        s.cars.filter(c => !getOwnedItem(c.toyId)).map(c => `
            <div class="missing-item">
                <span class="missing-badge">${s.owned}/${s.total}</span>
                <div>
                    <div class="missing-item-name">${c.name}</div>
                    <div class="missing-item-sub">${s.series} · ${s.release}</div>
                </div>
            </div>`)
    ).join('');

    container.innerHTML = `
        <div class="collapsible-section">
            <div class="collapsible-header collapsible-header--missing" onclick="toggleSection('missing')">
                <span class="collapsible-title">🎯 Neredeyse Tam — Eksik Parçalar</span>
                <span class="collapsible-chevron" id="chevron-missing">▾</span>
            </div>
            <div id="missingBody" class="collapsible-body">
                <div class="missing-items-grid">${items}</div>
            </div>
        </div>`;
    applySectionStates();
}

// ── Main interface update ──────────────────────
function updateInterface() {
    const searchTerm    = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter    = document.getElementById('typeSelect').value;
    const rarityFilter  = document.getElementById('raritySelect').value;
    const yearFilter    = document.getElementById('yearSelect').value;
    const seriesFilter  = document.getElementById('seriesSelect').value;
    const releaseFilter = document.getElementById('releaseSelect').value;
    sortOrder           = document.getElementById('sortSelect').value;

    let filtered = allCars.filter(car => {
        const matchSearch   = !searchTerm ||
            car.name?.toLowerCase().includes(searchTerm) ||
            car.series?.toLowerCase().includes(searchTerm) ||
            car.toyId?.toLowerCase().includes(searchTerm) ||
            car.release?.toLowerCase().includes(searchTerm);
        const matchType     = typeFilter    === 'all' || typeKey(car) === typeFilter;
        const matchRarity   = rarityFilter  === 'all' || rarityKey(car) === rarityFilter || car.rarity?.toLowerCase() === rarityFilter;
        const matchSeries   = seriesFilter  === 'all' || car.series === seriesFilter;
        const matchRelease  = releaseFilter === 'all' || car.release === releaseFilter;
        const matchYear     = yearFilter    === 'all' || car.year?.toString() === yearFilter;
        return matchSearch && matchType && matchRarity && matchSeries && matchRelease && matchYear;
    });

    filtered.sort((a,b) => sortOrder === 'newest' ? b.year - a.year : a.year - b.year);

    const collectedCars = allCars.filter(car => getOwnedItem(car.toyId));
    const wishedCars    = allCars.filter(car => isWished(car.toyId));

    document.getElementById('collectionCount').innerText = collectedCars.length;
    document.getElementById('wishlistCount').innerText   = wishedCars.length;

    // Rebuild collection filter bar and render filtered collection
    buildCollectionFilters();
    renderFilteredCollection();

    renderCars(wishedCars, 'wishlistGrid', false);
    renderCars(filtered,   'catalogGrid',  false);

    updateStats();
    updateSetTracker();
    updateMissingItems();

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (filtered.length > visibleCount) {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.onclick = () => { visibleCount += 50; updateInterface(); };
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// ── Collection management ──────────────────────
function addToCollection(carId, event) {
    const car = allCars.find(c => c.id === carId);
    if (!car || !car.toyId) {
        alert("Bu aracın sistemde Toy ID'si bulunmuyor, koleksiyona eklenemez."); return;
    }

    if (!getOwnedItem(car.toyId)) {
        // Eklemeden önce fiyat soralım
        let priceInput = prompt(`${car.name} aracı için ödediğiniz fiyatı girin (Euro)\n(Fiyat girmek istemiyorsanız boş bırakın):`, "0");
        let price = parseFloat(priceInput);
        if (isNaN(price)) price = 0;

        myCollection.push({ toyId: car.toyId, price: price, marketValue: 0, quantity: 1 });
        localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
        syncSets();
        
        if (event) {
            const btn = event.target;
            btn.classList.add('card-add-flash');
            btn.disabled = true;
            setTimeout(() => updateInterface(), 450);
        } else {
            updateInterface();
        }
    }
}

function removeFromCollection(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car || !car.toyId) return;
    myCollection = myCollection.filter(item => item.toyId !== car.toyId);
    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
    syncSets();
    updateInterface();
}

function changeQty(carId, delta) {
    const car = allCars.find(c => c.id === carId);
    if (!car || !car.toyId) return;
    const item = getOwnedItem(car.toyId);
    if (!item) return;
    const newQty = Math.max(1, (item.quantity || 1) + delta);
    item.quantity = newQty;
    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
    renderFilteredCollection();
    updateStats();
}

function toggleWishlist(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car || !car.toyId) return;
    
    const idx = myWishlist.indexOf(car.toyId);
    if (idx === -1) {
        myWishlist.push(car.toyId);
    } else {
        myWishlist.splice(idx, 1);
    }
    localStorage.setItem('hw_wishlist', JSON.stringify(myWishlist));
    syncSets();
    updateInterface();
}

// ── Toggle sections ────────────────────────────
function toggleCollection() {
    const w = document.getElementById('collectionWrapper');
    const i = document.getElementById('toggleIcon');
    w.style.display = w.style.display === 'none' ? 'block' : 'none';
    i.textContent   = w.style.display === 'none'  ? '🔽' : '🔼';
}

function toggleWishlistArea() {
    const w = document.getElementById('wishlistWrapper');
    const i = document.getElementById('wishToggleIcon');
    w.style.display = w.style.display === 'none' ? 'block' : 'none';
    i.textContent   = w.style.display === 'none'  ? '🔽' : '🔼';
}

// ── Export / Import ────────────────────────────
function exportCollection() {
    if (!myCollection.length && !myWishlist.length) { 
        alert('Dışa aktarılacak veri (koleksiyon veya istek listesi) yok!'); return; 
    }
    const dataToExport = {
        collection: myCollection,
        wishlist: myWishlist
    };
    const a = document.createElement('a');
    a.href     = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    a.download = `HW-Koleksiyon-Yedek-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
}

function exportCSV() {
    if (!myCollection.length) { alert('Dışa aktarılacak koleksiyon verisi yok!'); return; }

    const headers = [
        'İsim', 'Yıl', 'Toy ID', 'Seri', 'Sürüm', 'Seri No', 'Mainline No',
        'Nadirlik', 'Koleksiyon Tipi', 'Adet', 'Satın Alma Fiyatı (€)',
        'Piyasa Değeri (€)', 'Kâr/Zarar (€)', 'Wiki URL'
    ];

    const rows = myCollection.map(item => {
        const car = allCars.find(c => c.toyId === item.toyId);
        if (!car) return null;
        const qty    = item.quantity || 1;
        const price  = item.price || 0;
        const market = item.marketValue || 0;
        const pl     = market > 0 ? ((market - price) * qty).toFixed(2) : '';
        const esc    = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
        return [
            esc(car.name),
            esc(car.year || ''),
            esc(car.toyId || ''),
            esc(car.series || ''),
            esc(car.release || ''),
            esc(car.seriesNumber || ''),
            esc(car.mainlineNumber || ''),
            esc(car.rarity || 'Normal'),
            esc(car.collectionType || 'mainline'),
            qty,
            (price * qty).toFixed(2),
            market > 0 ? (market * qty).toFixed(2) : '',
            pl,
            esc(car.wikiLink || '')
        ].join(',');
    }).filter(Boolean);

    const csv = [headers.join(','), ...rows].join('\n');
    const bom = '\uFEFF'; // UTF-8 BOM so Excel opens it correctly
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(bom + csv);
    a.download = `HW-Koleksiyon-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
}

document.getElementById('importFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        try {
            const data = JSON.parse(ev.target.result);
            if (Array.isArray(data)) {
                alert('Eski tip (sadece Array) bir yedek yüklemeye çalıştınız. Lütfen bu kod değişikliğinden sonra alınmış yeni bir yedek kullanın.');
            } else if (data.collection !== undefined && data.wishlist !== undefined) {
                // Koleksiyonu mevcutlarla birleştir (aynı toyId varsa ekleme)
                data.collection.forEach(newItem => {
                    const existingItem = myCollection.find(item => item.toyId === newItem.toyId);
                    if (!existingItem) {
                        // Araç hiç yoksa ekle
                        myCollection.push(newItem);
                    } else if (existingItem.price === 0 && newItem.price > 0) {
                        // Araç var ama fiyatı 0 (eski kayıttan kalma), import dosyasında fiyat varsa güncelle
                        existingItem.price = newItem.price;
                    }
                });
                // İstek listesini birleştir
                data.wishlist.forEach(newId => {
                    if (!isWished(newId)) myWishlist.push(newId);
                });
                
                localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
                localStorage.setItem('hw_wishlist', JSON.stringify(myWishlist));
                updateInterface();
                alert('Veriler başarıyla içe aktarıldı ve mevcut koleksiyonunuzla birleştirildi!');
            } else { 
                alert('Geçersiz dosya formatı.'); 
            }
        } catch { alert('Dosya okuma hatası.'); }
        e.target.value = '';
    };
    reader.readAsText(file);
});


// ── Collapsible section state ──────────────────
const sectionState = JSON.parse(localStorage.getItem('hw_sections') || '{}');
const sectionDefaults = {
    stats: true,
    missing: true,
    setTracker: false,
    analytics: true,
    collGrid: true,
};

function isSectionOpen(key) {
    return key in sectionState ? sectionState[key] : (sectionDefaults[key] ?? true);
}

function toggleSection(key) {
    sectionState[key] = !isSectionOpen(key);
    localStorage.setItem('hw_sections', JSON.stringify(sectionState));
    applySectionStates();
}

function applySectionStates() {
    // stats
    const statsBody = document.getElementById('statsBody');
    const statsChevron = document.getElementById('chevron-stats');
    if (statsBody) statsBody.style.display = isSectionOpen('stats') ? '' : 'none';
    if (statsChevron) statsChevron.textContent = isSectionOpen('stats') ? '▾' : '▸';

    // analytics
    const analyticsBody = document.getElementById('analyticsBody');
    const analyticsChevron = document.getElementById('chevron-analytics');
    if (analyticsBody) analyticsBody.style.display = isSectionOpen('analytics') ? '' : 'none';
    if (analyticsChevron) analyticsChevron.textContent = isSectionOpen('analytics') ? '▾' : '▸';

    // missing
    const missingBody = document.getElementById('missingBody');
    const missingChevron = document.getElementById('chevron-missing');
    if (missingBody) missingBody.style.display = isSectionOpen('missing') ? '' : 'none';
    if (missingChevron) missingChevron.textContent = isSectionOpen('missing') ? '▾' : '▸';

    // set tracker
    const setBody = document.getElementById('setBody');
    const setChevron = document.getElementById('chevron-setTracker');
    if (setBody) setBody.style.display = isSectionOpen('setTracker') ? '' : 'none';
    if (setChevron) setChevron.textContent = isSectionOpen('setTracker') ? '▾' : '▸';

    // collection grid
    const collBody = document.getElementById('collGridBody');
    const collChevron = document.getElementById('chevron-collGrid');
    if (collBody) collBody.style.display = isSectionOpen('collGrid') ? '' : 'none';
    if (collChevron) collChevron.textContent = isSectionOpen('collGrid') ? '▾' : '▸';
}

// ── Stats ──────────────────────────────────────
function updateStats() {
    const collected = allCars.filter(c => !!getOwnedItem(c.toyId));

    const catKW = {
        'JDM 🎌':       ['nissan','honda','toyota','mazda','subaru','mitsubishi','datsun','skyline','silvia','supra','ae86'],
        'Muscle 🦅':    ['ford','mustang','chevy','chevrolet','camaro','dodge','plymouth','pontiac','charger','challenger','corvette'],
        'Euro 🇪🇺':     ['porsche','bmw','mercedes','audi','volkswagen','lamborghini','ferrari','fiat','renault','bugatti','alfa'],
        'Trucks 🛻':    ['f-150','silverado','ram','jeep','land cruiser','tundra','baja','hummer','bronco','ranger'],
        'Pop Culture 🎬':['batman','barbie','delorean','k.i.t.t','mystery machine','mario','spider'],
        'Supercars 🏁': ['bugatti','koenigsegg','pagani','mclaren','lotus','lykan'],
    };

    const catCounts = {};
    Object.keys(catKW).forEach(k => catCounts[k] = 0);
    collected.forEach(car => {
        const nl = car.name.toLowerCase();
        for (const [cat, kws] of Object.entries(catKW)) {
            if (kws.some(kw => nl.includes(kw))) { catCounts[cat]++; break; }
        }
    });

    const totalQty    = myCollection.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice  = myCollection.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const totalMarket = myCollection.reduce((sum, item) => sum + (item.marketValue || 0) * (item.quantity || 1), 0);
    const valuedCount = myCollection.filter(item => (item.marketValue || 0) > 0).length;
    const dupCount    = myCollection.filter(item => (item.quantity || 1) > 1).length;
    const profitLoss  = totalMarket - totalPrice;
    const plSign      = profitLoss >= 0 ? '+' : '';
    const plColor     = profitLoss >= 0 ? '#27ae60' : '#e74c3c';

    const seriesMap = {};
    allCars.forEach(car => {
        if (car.series && car.seriesNumber?.includes('/')) {
            const total = parseInt(car.seriesNumber.split('/')[1]);
            const key   = `${car.series} (${car.year})`;
            if (!isNaN(total)) {
                if (!seriesMap[key]) seriesMap[key] = { collected: 0, total, year: car.year };
                if (!!getOwnedItem(car.toyId)) seriesMap[key].collected++;
            }
        }
    });

    // Top 5 by market value
    const top5market = [...myCollection]
        .filter(item => (item.marketValue || 0) > 0)
        .sort((a, b) => (b.marketValue || 0) - (a.marketValue || 0))
        .slice(0, 5)
        .map(item => {
            const car = allCars.find(c => c.toyId === item.toyId);
            if (!car) return '';
            const pl = (item.marketValue || 0) - (item.price || 0);
            const plSign2 = pl >= 0 ? '+' : '';
            const plCol   = pl >= 0 ? '#27ae60' : '#e74c3c';
            return `<div class="analytics-row">
                <div class="analytics-row-name">${car.name} <span class="analytics-row-year">${car.year || ''}</span></div>
                <div class="analytics-row-vals">
                    <span class="analytics-badge analytics-badge--market">📈 ${Number(item.marketValue).toFixed(2)} €</span>
                    ${item.price > 0 ? `<span class="analytics-badge analytics-badge--pl" style="color:${plCol};">${plSign2}${pl.toFixed(2)} €</span>` : ''}
                </div>
            </div>`;
        }).join('');

    // Top 5 by purchase price
    const top5price = [...myCollection]
        .filter(item => (item.price || 0) > 0)
        .sort((a, b) => (b.price || 0) - (a.price || 0))
        .slice(0, 5)
        .map(item => {
            const car = allCars.find(c => c.toyId === item.toyId);
            if (!car) return '';
            return `<div class="analytics-row">
                <div class="analytics-row-name">${car.name} <span class="analytics-row-year">${car.year || ''}</span></div>
                <div class="analytics-row-vals">
                    <span class="analytics-badge analytics-badge--price">💶 ${Number(item.price).toFixed(2)} €</span>
                </div>
            </div>`;
        }).join('');

    // Price vs Market bar chart data
    const typeBreakdown = ['mainline','premium','silver'].map(t => {
        const cars = collected.filter(c => typeKey(c) === t);
        const spent  = cars.reduce((s, c) => { const o = getOwnedItem(c.toyId); return s + (o?.price || 0); }, 0);
        const market = cars.reduce((s, c) => { const o = getOwnedItem(c.toyId); return s + (o?.marketValue || 0); }, 0);
        return { label: t.charAt(0).toUpperCase() + t.slice(1), spent, market, count: cars.length };
    }).filter(d => d.count > 0);

    const maxVal = Math.max(...typeBreakdown.flatMap(d => [d.spent, d.market]), 1);

    const typeChartHTML = typeBreakdown.map(d => `
        <div class="type-chart-row">
            <div class="type-chart-label">${d.label} (${d.count})</div>
            <div class="type-chart-bars">
                ${d.spent > 0 ? `<div class="type-chart-bar-wrap">
                    <div class="type-chart-bar type-chart-bar--spent" style="width:${Math.round((d.spent/maxVal)*100)}%"></div>
                    <span class="type-chart-val">💶 ${d.spent.toFixed(0)} €</span>
                </div>` : ''}
                ${d.market > 0 ? `<div class="type-chart-bar-wrap">
                    <div class="type-chart-bar type-chart-bar--market" style="width:${Math.round((d.market/maxVal)*100)}%"></div>
                    <span class="type-chart-val">📈 ${d.market.toFixed(0)} €</span>
                </div>` : ''}
            </div>
        </div>`).join('');

    const statsHTML = `
        <!-- ── Stats section ── -->
        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection('stats')">
                <span class="collapsible-title">📊 Koleksiyon Özeti</span>
                <div style="display:flex;align-items:center;gap:10px;">
                    <button id="shareCollectionBtn2" class="btn-outline-danger btn-sm" onclick="event.stopPropagation();downloadCollectionImage()">📷 Kartı İndir</button>
                    <span class="collapsible-chevron" id="chevron-stats">▾</span>
                </div>
            </div>
            <div id="statsBody" class="collapsible-body">
                <div class="advanced-stats">
                    <div class="stat-card">
                        <h3>📊 Sayılar</h3>
                        <div class="stats-summary-grid">
                            <p>Benzersiz: <strong>${collected.length}</strong> / ${allCars.length}</p>
                            <p>Toplam Adet: <strong>${totalQty}</strong>${dupCount > 0 ? ` <span style="color:var(--text3);font-size:11px;">(${dupCount} çift)</span>` : ''}</p>
                            <p>Mainline: <strong>${collected.filter(c => typeKey(c) === 'mainline').length}</strong></p>
                            <p>Premium: <strong>${collected.filter(c => typeKey(c) === 'premium').length}</strong></p>
                            <p>Silver: <strong>${collected.filter(c => typeKey(c) === 'silver').length}</strong></p>
                            <p>STH: <strong>${collected.filter(c => rarityKey(c) === 'sth').length}</strong></p>
                            <p>Chase: <strong>${collected.filter(c => rarityKey(c) === 'chase').length}</strong></p>
                            <p>TH: <strong>${collected.filter(c => rarityKey(c) === 'th').length}</strong></p>
                            <p>Harcanan: <strong style="color:var(--gold-dark);">${totalPrice.toFixed(2)} €</strong></p>
                            ${totalMarket > 0 ? `
                            <p>Piyasa (${valuedCount} araç): <strong style="color:#2980b9;">${totalMarket.toFixed(2)} €</strong></p>
                            <p>Kâr/Zarar: <strong style="color:${plColor};">${plSign}${profitLoss.toFixed(2)} €</strong></p>
                            ` : ''}
                        </div>
                    </div>
                    <div class="stat-card">
                        <h3>🏷️ Akıllı Kategoriler</h3>
                        <div class="category-badges">
                            ${Object.entries(catCounts).filter(([,v]) => v > 0)
                                .map(([n,v]) => `<span class="cat-badge"><b>${n}:</b> ${v}</span>`).join('')}
                        </div>
                    </div>
                    <div class="stat-card">
                        <h3>🏆 Tamamlanmaya Yakın Setler</h3>
                        ${Object.entries(seriesMap)
                            .filter(([,d]) => d.collected > 0 && d.collected < d.total)
                            .sort((a,b) => (b[1].collected/b[1].total) - (a[1].collected/a[1].total))
                            .slice(0,4)
                            .map(([name,d]) => {
                                const pct = Math.round((d.collected/d.total)*100);
                                return `<div class="progress-container">
                                    <div class="progress-label"><span>${name}</span><span>${d.collected}/${d.total}</span></div>
                                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
                                </div>`;
                            }).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- ── Analytics section ── -->
        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection('analytics')">
                <span class="collapsible-title">📈 Değer Analitiği</span>
                <span class="collapsible-chevron" id="chevron-analytics">▾</span>
            </div>
            <div id="analyticsBody" class="collapsible-body">
                <div class="advanced-stats">
                    ${top5market ? `<div class="stat-card stat-card--wide">
                        <h3>🏅 En Değerli 5 Araç (Piyasa)</h3>
                        <div class="analytics-list">${top5market}</div>
                    </div>` : ''}
                    ${top5price ? `<div class="stat-card stat-card--wide">
                        <h3>💸 En Pahalı 5 Satın Alım</h3>
                        <div class="analytics-list">${top5price}</div>
                    </div>` : ''}
                    ${typeChartHTML ? `<div class="stat-card" style="grid-column:1/-1;">
                        <h3>⚖️ Tip Bazında Harcama vs Piyasa</h3>
                        <div class="type-chart">${typeChartHTML}</div>
                    </div>` : ''}
                    ${!top5market && !top5price ? `<div class="stat-card"><p style="color:var(--text3);font-size:13px;">Araçlarınıza fiyat ve piyasa değeri girdikten sonra burada analizler görünecek.</p></div>` : ''}
                </div>
            </div>
        </div>
    `;

    const c = document.getElementById('statsContainer');
    if (c) c.innerHTML = statsHTML;
    applySectionStates();
}

function updateSetTracker() {
    const tc = document.getElementById('setTrackerContainer');
    if (!tc) return;

    const sets = {};
    allCars.forEach(car => {
        if (car.release) {
            if (!sets[car.release]) sets[car.release] = { total: 0, owned: 0 };
            sets[car.release].total++;
            if (!!getOwnedItem(car.toyId)) sets[car.release].owned++;
        }
    });

    let inner = '';
    Object.entries(sets).forEach(([setName, s]) => {
        if (s.owned > 0) {
            const pct  = (s.owned / s.total) * 100;
            const done = s.owned === s.total;
            inner += `<div class="set-item ${done ? 'completed' : ''}">
                <div class="set-info"><strong>${setName}</strong><span>${s.owned}/${s.total}</span></div>
                <div class="progress-bar"><div class="progress" style="width:${pct}%"></div></div>
            </div>`;
        }
    });

    tc.innerHTML = `
        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection('setTracker')">
                <span class="collapsible-title">🧩 Set Tamamlama Durumu</span>
                <span class="collapsible-chevron" id="chevron-setTracker">▾</span>
            </div>
            <div id="setBody" class="collapsible-body">
                <div class="tracker-grid">${inner}</div>
            </div>
        </div>`;
    applySectionStates();
}

// ── DETAIL MODAL ───────────────────────────────
function openModal(carId) {
    const car  = allCars.find(c => c.id === carId);
    if (!car) return;

    const modal  = document.getElementById('carModal');
    const box    = document.getElementById('carModalBox');
    const rKey   = rarityKey(car);
    const tKey   = typeKey(car);
    const inColl = !!getOwnedItem(car.toyId);
    const wished = isWished(car.toyId);

    box.className = `modal-box rarity-${rKey} type-${tKey}`;

    const mainImg     = car.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image';
    const hasCardboard= car.imageUrlCardboard && car.imageUrlCardboard.trim() !== '';

    const imagesHTML = hasCardboard
        ? `<div class="modal-images">
            <div><div class="modal-img-wrap"><img src="${mainImg}" alt="${car.name}"></div><div class="modal-img-label">Araç Görseli</div></div>
            <div><div class="modal-img-wrap"><img src="${car.imageUrlCardboard}" alt="karton"></div><div class="modal-img-label">Karton Ambalaj</div></div>
           </div>`
        : `<div class="modal-images single"><div><div class="modal-img-wrap"><img src="${mainImg}" alt="${car.name}"></div><div class="modal-img-label">Araç Görseli</div></div></div>`;

        let detailsArray = [
            { label: 'Yıl',             value: car.year        },
            { label: 'Toy ID',          value: car.toyId       },
            { label: 'Seri',            value: car.series      },
            { label: 'Sürüm',           value: car.release     },
            { label: 'Seri No',         value: car.seriesNumber },
            { label: 'Mainline No',     value: car.mainlineNumber },
            { label: 'Nadirlik',        value: car.rarity      },
            { label: 'Koleksiyon Tipi', value: car.collectionType ? car.collectionType[0].toUpperCase() + car.collectionType.slice(1) : null },
        ];
    
        // Fiyat + adet satırları — id ile tanımlanmış, kayıtsız güncellenebilir
        const ownedItem = getOwnedItem(car.toyId);
        const qtyRowContent = ownedItem
            ? `<span class="modal-detail-label">📦 Adet</span><span class="modal-detail-value" id="modalQtyValue"><strong>${ownedItem.quantity || 1}</strong></span>`
            : '';
        const priceRowContent = ownedItem && ownedItem.price > 0
            ? `<span class="modal-detail-label">💸 Ödenen Fiyat</span><span class="modal-detail-value"><strong style="color:var(--gold-dark);">${Number(ownedItem.price).toFixed(2)} €</strong></span>`
            : '';
        const marketRowContent = ownedItem && (ownedItem.marketValue || 0) > 0
            ? `<span class="modal-detail-label">📈 Piyasa Değeri</span><span class="modal-detail-value"><strong style="color:#2980b9;">${Number(ownedItem.marketValue).toFixed(2)} €</strong></span>`
            : '';
    
        const details = detailsArray.filter(d => d.value).map(d =>
            `<div class="modal-detail-row">
                <span class="modal-detail-label">${d.label}</span>
                <span class="modal-detail-value">${d.value}</span>
            </div>`
        ).join('');

    const noteHTML = car.extraNote ? `<div class="modal-note">📝 ${car.extraNote}</div>` : '';

    document.getElementById('carModalContent').innerHTML = `
        <div class="modal-header">
            <div class="badges">
                <span class="badge ${rKey}">${car.rarity || 'Normal'}</span>
                ${tKey === 'premium' ? '<span class="badge premium-type">Premium</span>' : ''}
                ${tKey === 'silver'  ? '<span class="badge silver">Silver</span>'  : ''}
            </div>
            <h2 class="modal-title">${car.name}</h2>
            <p class="modal-subtitle">${[car.year, car.series, car.release].filter(Boolean).join(' · ')}</p>
        </div>
        ${imagesHTML}
        <div class="modal-details">
            ${noteHTML}
            <div class="modal-detail-grid">
                ${details}
                ${ownedItem ? `<div class="modal-detail-row" id="modalQtyRow">${qtyRowContent}</div>` : ''}
                <div class="modal-detail-row" id="modalPriceRow">${priceRowContent}</div>
                <div class="modal-detail-row" id="modalMarketRow">${marketRowContent}</div>
            </div>
        </div>
        <div class="modal-actions" id="modalActions"></div>
    `;

    modal.dataset.currentCarId = carId;
    updateModalButtons(carId);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateModalButtons(carId) {
    const car     = allCars.find(c => c.id === carId);
    if (!car) return;
    const ownedItem = getOwnedItem(car.toyId);
    const inColl  = !!ownedItem;
    const wished  = isWished(car.toyId);
    const actions = document.getElementById('modalActions');
    if (!actions) return;

    const priceLabel = inColl && ownedItem.price > 0
        ? `✏️ Fiyat (${Number(ownedItem.price).toFixed(2)} €)`
        : '✏️ Fiyat Ekle';

    const marketLabel = inColl && (ownedItem.marketValue || 0) > 0
        ? `📈 Piyasa (${Number(ownedItem.marketValue).toFixed(2)} €)`
        : '📈 Piyasa Değeri';

    // Build eBay search URL using name + toyId for precision
    const ebayQuery = encodeURIComponent(`Hot Wheels ${car.name}${car.toyId ? ' ' + car.toyId : ''}`);
    const ebayUrl   = `https://www.ebay.com/sch/i.html?_nkw=${ebayQuery}&LH_Sold=1&LH_Complete=1`;

    const qty = inColl ? (ownedItem.quantity || 1) : 1;

    actions.innerHTML = `
        ${inColl
            ? `<div class="modal-qty-row">
                   <span class="modal-qty-label">📦 Adet:</span>
                   <button class="modal-qty-btn" onclick="changeQtyModal('${carId}',-1)">−</button>
                   <span class="modal-qty-display" id="modalQtyDisplay">${qty}</span>
                   <button class="modal-qty-btn" onclick="changeQtyModal('${carId}',+1)">+</button>
               </div>
               <button class="modal-btn modal-btn-remove" onclick="removeFromCollection('${carId}'); updateModalButtons('${carId}')">✕ Koleksiyondan Çıkar</button>
               <button class="modal-btn modal-btn-price"  onclick="openPriceEditor('${carId}')">${priceLabel}</button>
               <button class="modal-btn modal-btn-market" onclick="openMarketEditor('${carId}')">${marketLabel}</button>`
            : `<button class="modal-btn modal-btn-add" onclick="addToCollection('${carId}'); updateModalButtons('${carId}')">+ Koleksiyona Ekle</button>`}
        <button class="modal-btn modal-btn-wish ${wished ? 'active' : ''}" onclick="toggleWishlist('${carId}'); updateModalButtons('${carId}')">${wished ? '❤️ İstek Listesinde' : '🤍 İstek Listesine Ekle'}</button>
        <a href="${ebayUrl}" target="_blank" class="modal-btn modal-btn-ebay" title="eBay'de satılmış ilanları görüntüle">🛒 eBay'de Ara</a>
        <a href="${car.wikiLink || '#'}" target="_blank" class="modal-btn modal-btn-wiki">🔗 Wiki</a>
    `;
    updateInterface();
}

// ── Quantity change from modal ────────────────────
function changeQtyModal(carId, delta) {
    const car = allCars.find(c => c.id === carId);
    if (!car || !car.toyId) return;
    const item = getOwnedItem(car.toyId);
    if (!item) return;
    item.quantity = Math.max(1, (item.quantity || 1) + delta);
    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));

    // Update display in-place without full re-render
    const disp = document.getElementById('modalQtyDisplay');
    if (disp) disp.textContent = item.quantity;
    const qtyVal = document.getElementById('modalQtyValue');
    if (qtyVal) qtyVal.innerHTML = `<strong>${item.quantity}</strong>`;
    renderFilteredCollection();
    updateStats();
}

// ── Price editor modal ──────────────────────────
function openPriceEditor(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    const ownedItem = getOwnedItem(car.toyId);
    if (!ownedItem) return;

    const existing = document.getElementById('priceEditorOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'priceEditorOverlay';
    overlay.innerHTML = `
        <div class="price-editor-box">
            <h3 class="price-editor-title">💰 Satın Alma Fiyatı</h3>
            <p class="price-editor-car">${car.name} <span>${car.year || ''}</span></p>
            <div class="price-editor-input-row">
                <input type="number" id="priceEditorInput" class="price-editor-input"
                    value="${ownedItem.price || 0}" min="0" step="0.01" placeholder="0.00">
                <span class="price-editor-currency">€</span>
            </div>
            <div class="price-editor-actions">
                <button class="price-editor-btn price-editor-cancel" onclick="closePriceEditor()">İptal</button>
                <button class="price-editor-btn price-editor-save"   onclick="savePrice('${carId}')">💾 Kaydet</button>
            </div>
        </div>
    `;
    overlay.addEventListener('click', e => { if (e.target === overlay) closePriceEditor(); });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
    setTimeout(() => document.getElementById('priceEditorInput')?.focus(), 80);
}

function openMarketEditor(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    const ownedItem = getOwnedItem(car.toyId);
    if (!ownedItem) return;

    const existing = document.getElementById('priceEditorOverlay');
    if (existing) existing.remove();

    // Build eBay sold search URL for convenience
    const ebayQuery = encodeURIComponent(`Hot Wheels ${car.name}${car.toyId ? ' ' + car.toyId : ''}`);
    const ebayUrl   = `https://www.ebay.com/sch/i.html?_nkw=${ebayQuery}&LH_Sold=1&LH_Complete=1`;

    const overlay = document.createElement('div');
    overlay.id = 'priceEditorOverlay';
    overlay.innerHTML = `
        <div class="price-editor-box price-editor-box--market">
            <h3 class="price-editor-title" style="color:#2980b9;">📈 Piyasa Değeri</h3>
            <p class="price-editor-car">${car.name} <span>${car.year || ''}</span></p>
            <p class="price-editor-hint">
                eBay satılmış ilanlarına bakarak güncel piyasa değerini girebilirsiniz.<br>
                <a href="${ebayUrl}" target="_blank" class="price-editor-ebay-link">🛒 eBay'de satılmış ilanları gör ↗</a>
            </p>
            <div class="price-editor-input-row price-editor-input-row--market">
                <input type="number" id="marketEditorInput" class="price-editor-input"
                    value="${ownedItem.marketValue || 0}" min="0" step="0.01" placeholder="0.00">
                <span class="price-editor-currency" style="color:#2980b9;">€</span>
            </div>
            ${(ownedItem.price || 0) > 0 ? (() => {
                const diff  = (ownedItem.marketValue || 0) - ownedItem.price;
                const sign  = diff >= 0 ? '+' : '';
                const color = diff >= 0 ? '#27ae60' : '#e74c3c';
                return `<p class="price-editor-pl">Satın alma: <strong>${Number(ownedItem.price).toFixed(2)} €</strong> &nbsp;|&nbsp; Fark: <strong style="color:${color};">${sign}${diff.toFixed(2)} €</strong></p>`;
            })() : ''}
            <div class="price-editor-actions">
                <button class="price-editor-btn price-editor-cancel" onclick="closePriceEditor()">İptal</button>
                <button class="price-editor-btn price-editor-save price-editor-save--market" onclick="saveMarketValue('${carId}')">💾 Kaydet</button>
            </div>
        </div>
    `;
    overlay.addEventListener('click', e => { if (e.target === overlay) closePriceEditor(); });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
    setTimeout(() => document.getElementById('marketEditorInput')?.focus(), 80);
}

function closePriceEditor() {
    const overlay = document.getElementById('priceEditorOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        setTimeout(() => overlay.remove(), 180);
    }
}

function savePrice(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    const ownedItem = getOwnedItem(car.toyId);
    if (!ownedItem) return;

    const input = document.getElementById('priceEditorInput');
    const newPrice = parseFloat(input?.value);
    ownedItem.price = isNaN(newPrice) || newPrice < 0 ? 0 : newPrice;

    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
    closePriceEditor();

    const priceRow = document.getElementById('modalPriceRow');
    if (priceRow) {
        priceRow.innerHTML = ownedItem.price > 0
            ? `<span class="modal-detail-label">💸 Ödenen Fiyat</span><span class="modal-detail-value"><strong style="color:var(--gold-dark);">${Number(ownedItem.price).toFixed(2)} €</strong></span>`
            : '';
    }
    updateModalButtons(carId);
    updateStats();
}

function saveMarketValue(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    const ownedItem = getOwnedItem(car.toyId);
    if (!ownedItem) return;

    const input = document.getElementById('marketEditorInput');
    const newVal = parseFloat(input?.value);
    ownedItem.marketValue = isNaN(newVal) || newVal < 0 ? 0 : newVal;

    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
    closePriceEditor();

    const marketRow = document.getElementById('modalMarketRow');
    if (marketRow) {
        marketRow.innerHTML = ownedItem.marketValue > 0
            ? `<span class="modal-detail-label">📈 Piyasa Değeri</span><span class="modal-detail-value"><strong style="color:#2980b9;">${Number(ownedItem.marketValue).toFixed(2)} €</strong></span>`
            : '';
    }
    updateModalButtons(carId);
    updateStats();
}

function closeModal() {
    document.getElementById('carModal').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('carModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// ── Theme ──────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

function updateThemeUI() {
    const dark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateThemeUI();
});

// ── View toggle ────────────────────────────────
let currentView = localStorage.getItem('hw_view') || 'grid';
const viewToggle = document.getElementById('viewToggle');

function applyView() {
    ['catalogGrid','collectionGrid','wishlistGrid'].forEach(id => {
        const g = document.getElementById(id);
        if (!g) return;
        currentView === 'list' ? g.classList.add('list-view') : g.classList.remove('list-view');
    });
    viewToggle.textContent = currentView === 'list' ? '🖼️' : '📄';
    localStorage.setItem('hw_view', currentView);
}

viewToggle.addEventListener('click', () => {
    currentView = currentView === 'grid' ? 'list' : 'grid';
    applyView();
    renderFilteredCollection(); // re-render collection with new view
});

// ── Share collection image ─────────────────────
function downloadCollectionImage() {
    const el  = document.getElementById('statsBody') || document.getElementById('statsContainer');
    const btn = document.getElementById('shareCollectionBtn2') || document.getElementById('shareCollectionBtn');
    if (!el || !window.html2canvas) { alert('Kütüphane yüklenemedi.'); return; }
    const orig = btn.innerHTML;
    btn.innerHTML = '⏳ Hazırlanıyor...'; btn.disabled = true;
    html2canvas(el, {
        scale: 2,
        backgroundColor: document.body.classList.contains('dark-mode') ? '#1a1a1a' : '#ffffff',
        useCORS: true, logging: false,
        onclone: (doc) => {
            const h = doc.createElement('div');
            h.innerHTML = `<div style="padding:15px;text-align:center;border-bottom:2px solid #e8192c;margin-bottom:15px;"><h1 style="color:#e8192c;margin:0;font-size:24px;">Hot Wheels Koleksiyonum</h1><p style="color:gray;margin:5px 0 0;font-size:12px;">Tarih: ${new Date().toLocaleDateString('tr-TR')} | Toplam: ${myCollection.length}</p></div>`;
            doc.getElementById('statsContainer').prepend(h);
        }
    }).then(canvas => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = `HW-Koleksiyonum-${new Date().toISOString().slice(0,10)}.png`;
        document.body.appendChild(a); a.click(); a.remove();
        btn.innerHTML = orig; btn.disabled = false;
    }).catch(() => { btn.innerHTML = orig; btn.disabled = false; alert('Görsel oluşturulamadı.'); });
}

// ── Event listeners ────────────────────────────
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', () => { 
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        visibleCount = 10; 
        updateInterface(); 
    }, 300); // 300ms bekle
});
document.querySelectorAll('.filter-select').forEach(s => s.addEventListener('change', () => { visibleCount = 10; updateInterface(); }));
document.addEventListener('DOMContentLoaded', () => {
    const sb = document.getElementById('shareCollectionBtn');
    if (sb) sb.addEventListener('click', downloadCollectionImage);
});

// ── Bootstrap ──────────────────────────────────
updateThemeUI();
applyView();
populateDynamicFilters();
updateInterface();
