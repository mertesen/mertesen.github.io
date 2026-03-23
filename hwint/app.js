// ============================================================
//  HOT WHEELS ENVANTERİM — app.js
// ============================================================

const allCars = [
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

    ...ff2019premium,
    ...ff2020premium,
    ...ff2021premium,
    ...ff2023premium,
    ...ff2024premium,
    ...ff2025premium,
    ...ff2026premium,

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
];

let visibleCount = 10;
let sortOrder    = 'newest';
let myCollection = JSON.parse(localStorage.getItem('hw_koleksiyon')) || [];
let myWishlist   = JSON.parse(localStorage.getItem('hw_wishlist'))   || [];

// ── Rarity key helper ─────────────────────────
function rarityKey(car) {
    const r = (car.rarity || '').toLowerCase().replace(/\s+/g, '-');
    if (r.includes('super treasure') || r === 'sth') return 'sth';
    if (r.includes('treasure')       || r === 'th')  return 'th';
    if (r === 'chase')  return 'chase';
    if (r === 'premium') return 'premium';
    if (r === 'silver')  return 'silver';
    return 'normal';
}

// ── Filters ───────────────────────────────────
function populateDynamicFilters() {
    const yearSelect    = document.getElementById('yearSelect');
    const seriesSelect  = document.getElementById('seriesSelect');
    const releaseSelect = document.getElementById('releaseSelect');

    const years   = [...new Set(allCars.map(c => c.year))].filter(Boolean).sort((a,b) => b - a);
    const series  = [...new Set(allCars.map(c => c.series))].filter(Boolean).sort();
    const releases= [...new Set(allCars.map(c => c.release))].filter(Boolean).sort();

    years.forEach(y   => yearSelect.innerHTML    += `<option value="${y}">${y}</option>`);
    series.forEach(s  => seriesSelect.innerHTML  += `<option value="${s}">${s}</option>`);
    releases.forEach(r=> releaseSelect.innerHTML += `<option value="${r}">${r}</option>`);
}

// ── Build a single card element ───────────────
function buildCard(car, isCollection) {
    const el = document.createElement('div');
    el.classList.add('car-card', `rarity-${rarityKey(car)}`);
    el.dataset.carId = car.id;

    const mainImg   = car.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image';
    const hasHover  = car.imageUrlCardboard && car.imageUrlCardboard.trim() !== '';
    const isWished  = myWishlist.includes(car.id);
    const inColl    = myCollection.includes(car.id);

    const imgContainerClass = hasHover ? 'car-image-container has-hover' : 'car-image-container';
    const hoverImg = hasHover
        ? `<img src="${car.imageUrlCardboard}" class="img-hover" loading="lazy">`
        : '';

    const actionBtn = isCollection
        ? `<button class="btn-remove" onclick="removeFromCollection('${car.id}')">Çıkar</button>`
        : inColl
            ? `<button class="btn-remove" onclick="removeFromCollection('${car.id}')">✓ Var</button>`
            : `<button class="btn-add"    onclick="addToCollection('${car.id}', event)">+ Ekle</button>`;

    const wishBtn = `<button class="btn-wish ${isWished ? 'active' : ''}" onclick="toggleWishlist('${car.id}')">${isWished ? '❤️' : '🤍'}</button>`;

    const rKey = rarityKey(car);

    el.innerHTML = `
        <div class="${imgContainerClass}" onclick="openModal('${car.id}')">
            <img src="${mainImg}" class="img-main" loading="lazy">
            ${hoverImg}
            <span class="img-zoom-hint">🔍 Detay</span>
        </div>
        <div class="car-body">
            <div class="car-meta-tags">
                ${car.mainlineNumber ? `<span class="tag">#${car.mainlineNumber}</span>` : ''}
                ${car.toyId ? `<span class="tag">ID: ${car.toyId}</span>` : ''}
                ${car.seriesNumber ? `<span class="tag">${car.seriesNumber}</span>` : ''}
            </div>
            <h3 class="car-title">${car.name} <span class="car-year">${car.year || ''}</span></h3>
            ${car.series  ? `<p class="car-info"><strong>Seri:</strong> ${car.series}</p>` : ''}
            ${car.release ? `<p class="car-info"><strong>Sürüm:</strong> ${car.release}</p>` : ''}
            <div class="badges">
                <span class="badge ${rKey}">${car.rarity || 'Normal'}</span>
                ${car.collectionType === 'premium' ? '<span class="badge premium-type">Premium</span>' : ''}
                ${car.collectionType === 'silver'  ? '<span class="badge silver">Silver</span>'  : ''}
            </div>
        </div>
        <div class="links-and-buttons">
            <a href="${car.wikiLink || '#'}" target="_blank" class="wiki-link">Wiki ↗</a>
            <div class="card-buttons">
                ${actionBtn}
                ${wishBtn}
            </div>
        </div>
    `;
    return el;
}

// ── Render a list of cars into a container ────
function renderCars(carsArray, containerId, isCollection = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (carsArray.length === 0) {
        container.innerHTML = "<p style='padding:20px;color:var(--text2);'>Burada henüz bir araç yok.</p>";
        return;
    }

    const limit       = isCollection ? carsArray.length : visibleCount;
    const displayList = carsArray.slice(0, limit);
    displayList.forEach(car => container.appendChild(buildCard(car, isCollection)));
}

// ── Missing items notifier ────────────────────
function updateMissingItems() {
    const sets = {};

    allCars.forEach(car => {
        if (!car.release || car.release === '') return;
        if (!car.seriesNumber || !car.seriesNumber.includes('/')) return;

        const total = parseInt(car.seriesNumber.split('/')[1]);
        if (isNaN(total)) return;

        const key = `${car.series}||${car.release}||${car.year}||${total}`;
        if (!sets[key]) sets[key] = { total, owned: 0, cars: [], series: car.series, release: car.release, year: car.year };
        sets[key].cars.push(car);
        if (myCollection.includes(car.id)) sets[key].owned++;
    });

    // Find sets where we own some but not all — sort by closest to completion
    const nearly = Object.values(sets)
        .filter(s => s.owned > 0 && s.owned < s.total)
        .sort((a, b) => (b.owned / b.total) - (a.owned / a.total))
        .slice(0, 8);

    const container = document.getElementById('missingItemsContainer');
    if (!container) return;

    if (nearly.length === 0) {
        container.innerHTML = '';
        return;
    }

    const items = nearly.map(s => {
        const missing = s.cars.filter(c => !myCollection.includes(c.id));
        const missingNames = missing.map(c =>
            `<div class="missing-item">
                <span class="missing-badge">${s.owned}/${s.total}</span>
                <div>
                    <div class="missing-item-name">${c.name}</div>
                    <div class="missing-item-sub">${s.series} · ${s.release}</div>
                </div>
            </div>`
        ).join('');
        return missingNames;
    }).join('');

    container.innerHTML = `
        <div class="missing-banner">
            <h3>🎯 Neredeyse Tam — Eksik Parçalar</h3>
            <div class="missing-items-grid">${items}</div>
        </div>
    `;
}

// ── Update full interface ─────────────────────
function updateInterface() {
    const searchTerm   = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter   = document.getElementById('typeSelect').value;
    const rarityFilter = document.getElementById('raritySelect').value;
    const yearFilter   = document.getElementById('yearSelect').value;
    const seriesFilter = document.getElementById('seriesSelect').value;
    const releaseFilter= document.getElementById('releaseSelect').value;
    sortOrder          = document.getElementById('sortSelect').value;

    let filtered = allCars.filter(car => {
        const matchSearch  = (car.name?.toLowerCase().includes(searchTerm)) ||
                             (car.series?.toLowerCase().includes(searchTerm)) ||
                             (car.toyId?.toLowerCase().includes(searchTerm)) ||
                             (car.release?.toLowerCase().includes(searchTerm));
        const matchType    = typeFilter    === 'all' || car.collectionType?.toLowerCase() === typeFilter;
        const matchRarity  = rarityFilter  === 'all' || rarityKey(car) === rarityFilter || car.rarity?.toLowerCase() === rarityFilter;
        const matchSeries  = seriesFilter  === 'all' || car.series === seriesFilter;
        const matchRelease = releaseFilter === 'all' || car.release === releaseFilter;
        const matchYear    = yearFilter    === 'all' || car.year?.toString() === yearFilter;
        return matchSearch && matchType && matchRarity && matchSeries && matchRelease && matchYear;
    });

    filtered.sort((a, b) => sortOrder === 'newest' ? b.year - a.year : a.year - b.year);

    const collectedCars = allCars.filter(car => myCollection.includes(car.id));
    const wishedCars    = allCars.filter(car => myWishlist.includes(car.id));

    document.getElementById('collectionCount').innerText = collectedCars.length;
    document.getElementById('wishlistCount').innerText   = wishedCars.length;

    renderCars(collectedCars, 'collectionGrid', true);
    renderCars(wishedCars,    'wishlistGrid',   false);
    renderCars(filtered,      'catalogGrid',    false);

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

// ── Collection management ─────────────────────
function addToCollection(carId, event) {
    if (!myCollection.includes(carId)) {
        myCollection.push(carId);
        localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));

        // Mini fly animation on the clicked button
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
    myCollection = myCollection.filter(id => id !== carId);
    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
    updateInterface();
}

function toggleWishlist(carId) {
    const idx = myWishlist.indexOf(carId);
    idx === -1 ? myWishlist.push(carId) : myWishlist.splice(idx, 1);
    localStorage.setItem('hw_wishlist', JSON.stringify(myWishlist));
    updateInterface();
}

// ── Toggle sections ───────────────────────────
function toggleCollection() {
    const wrapper = document.getElementById('collectionWrapper');
    const icon    = document.getElementById('toggleIcon');
    wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    icon.textContent = wrapper.style.display === 'none' ? '🔽' : '🔼';
}

function toggleWishlist_area() {
    const wrapper = document.getElementById('wishlistWrapper');
    const icon    = document.getElementById('wishToggleIcon');
    wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    icon.textContent = wrapper.style.display === 'none' ? '🔽' : '🔼';
}
// keep backward compat for inline onclick
function toggleWishlistArea() { toggleWishlist_area(); }

// ── Export / Import ───────────────────────────
function exportCollection() {
    if (myCollection.length === 0) { alert('Koleksiyonunuz boş!'); return; }
    const a = document.createElement('a');
    a.href     = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(myCollection));
    a.download = 'hw_envanter_yedek.json';
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
                myCollection = [...new Set([...myCollection, ...data])];
                localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
                updateInterface();
                alert('Koleksiyon başarıyla içe aktarıldı!');
            } else { alert('Geçersiz dosya formatı.'); }
        } catch { alert('Dosya okuma hatası.'); }
        e.target.value = '';
    };
    reader.readAsText(file);
});

// ── Stats ─────────────────────────────────────
function updateStats() {
    const collectedCars = allCars.filter(c => myCollection.includes(c.id));

    const categoryKeywords = {
        'JDM 🎌':       ['nissan','honda','toyota','mazda','subaru','mitsubishi','datsun','skyline','silvia','supra','ae86'],
        'Muscle 🦅':    ['ford','mustang','chevy','chevrolet','camaro','dodge','plymouth','pontiac','charger','challenger','corvette'],
        'Euro 🇪🇺':     ['porsche','bmw','mercedes','audi','volkswagen','lamborghini','ferrari','fiat','renault','bugatti','alfa'],
        'Trucks 🛻':    ['f-150','silverado','ram','jeep','land cruiser','tundra','baja','hummer','bronco','ranger'],
        'Pop Culture 🎬':['batman','barbie','delorean','k.i.t.t','mystery machine','mario','spider'],
        'Supercars 🏁': ['bugatti','koenigsegg','pagani','mclaren','lotus','lykan'],
    };

    let catCounts = {};
    Object.keys(categoryKeywords).forEach(k => catCounts[k] = 0);
    collectedCars.forEach(car => {
        const nl = car.name.toLowerCase();
        for (const [cat, kws] of Object.entries(categoryKeywords)) {
            if (kws.some(kw => nl.includes(kw))) { catCounts[cat]++; break; }
        }
    });

    const seriesMap = {};
    allCars.forEach(car => {
        if (car.series && car.seriesNumber && car.seriesNumber.includes('/')) {
            const total = parseInt(car.seriesNumber.split('/')[1]);
            const key   = `${car.series} (${car.year})`;
            if (!isNaN(total)) {
                if (!seriesMap[key]) seriesMap[key] = { collected: 0, total, year: car.year };
                if (myCollection.includes(car.id)) seriesMap[key].collected++;
            }
        }
    });

    const statsHTML = `
        <div class="advanced-stats">
            <div class="stat-card">
                <h3>📊 Koleksiyon Özeti</h3>
                <div class="stats-summary-grid">
                    <p>Toplam: <strong>${collectedCars.length}</strong> / ${allCars.length}</p>
                    <p>Premium: <strong>${collectedCars.filter(c => c.collectionType === 'premium').length}</strong></p>
                    <p>Silver: <strong>${collectedCars.filter(c => c.collectionType === 'silver').length}</strong></p>
                    <p>STH: <strong>${collectedCars.filter(c => rarityKey(c) === 'sth').length}</strong></p>
                    <p>Chase: <strong>${collectedCars.filter(c => rarityKey(c) === 'chase').length}</strong></p>
                    <p>TH: <strong>${collectedCars.filter(c => rarityKey(c) === 'th').length}</strong></p>
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
    `;

    const c = document.getElementById('statsContainer');
    if (c) c.innerHTML = statsHTML;
}

function updateSetTracker() {
    const tc = document.getElementById('setTrackerContainer');
    if (!tc) return;

    const sets = {};
    allCars.forEach(car => {
        if (car.release && car.release !== '') {
            if (!sets[car.release]) sets[car.release] = { total: 0, owned: 0 };
            sets[car.release].total++;
            if (myCollection.includes(car.id)) sets[car.release].owned++;
        }
    });

    let html = '<h3>🧩 Set Tamamlama Durumu</h3><div class="tracker-grid">';
    Object.keys(sets).forEach(setName => {
        const s = sets[setName];
        if (s.owned > 0) {
            const pct  = (s.owned / s.total) * 100;
            const done = s.owned === s.total;
            html += `<div class="set-item ${done ? 'completed' : ''}">
                <div class="set-info"><strong>${setName}</strong><span>${s.owned}/${s.total}</span></div>
                <div class="progress-bar"><div class="progress" style="width:${pct}%"></div></div>
            </div>`;
        }
    });
    html += '</div>';
    tc.innerHTML = html;
}

// ── DETAIL MODAL ──────────────────────────────
function openModal(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;

    const modal    = document.getElementById('carModal');
    const box      = document.getElementById('carModalBox');
    const rKey     = rarityKey(car);
    const inColl   = myCollection.includes(car.id);
    const isWished = myWishlist.includes(car.id);

    // Set rarity class on box
    box.className = `modal-box rarity-${rKey}`;

    const hasCardboard = car.imageUrlCardboard && car.imageUrlCardboard.trim() !== '';
    const mainImg      = car.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image';

    const imagesHTML = hasCardboard
        ? `<div class="modal-images">
            <div>
                <div class="modal-img-wrap"><img src="${mainImg}" alt="${car.name}"></div>
                <div class="modal-img-label">Araç Görseli</div>
            </div>
            <div>
                <div class="modal-img-wrap"><img src="${car.imageUrlCardboard}" alt="${car.name} karton"></div>
                <div class="modal-img-label">Karton Ambalaj</div>
            </div>
          </div>`
        : `<div class="modal-images single">
            <div>
                <div class="modal-img-wrap"><img src="${mainImg}" alt="${car.name}"></div>
                <div class="modal-img-label">Araç Görseli</div>
            </div>
          </div>`;

    const details = [
        { label: 'Yıl',            value: car.year        || '—' },
        { label: 'Toy ID',         value: car.toyId       || '—' },
        { label: 'Seri',           value: car.series      || '—' },
        { label: 'Sürüm',          value: car.release     || '—' },
        { label: 'Seri No',        value: car.seriesNumber|| '—' },
        { label: 'Mainline No',    value: car.mainlineNumber || '—' },
        { label: 'Nadirlik',       value: car.rarity      || '—' },
        { label: 'Koleksiyon Tipi',value: car.collectionType ? car.collectionType.charAt(0).toUpperCase() + car.collectionType.slice(1) : '—' },
    ].filter(d => d.value !== '—');

    const detailRows = details.map(d =>
        `<div class="modal-detail-row">
            <span class="modal-detail-label">${d.label}</span>
            <span class="modal-detail-value">${d.value}</span>
        </div>`
    ).join('');

    const noteHTML = car.extraNote
        ? `<div class="modal-note">📝 ${car.extraNote}</div>`
        : '';

    const addRemoveBtn = inColl
        ? `<button class="modal-btn modal-btn-remove" onclick="removeFromCollection('${car.id}'); updateModalButtons('${car.id}')">✓ Koleksiyondan Çıkar</button>`
        : `<button class="modal-btn modal-btn-add"    onclick="addToCollection('${car.id}'); updateModalButtons('${car.id}')">+ Koleksiyona Ekle</button>`;

    const wishBtnHTML = `<button class="modal-btn modal-btn-wish ${isWished ? 'active' : ''}" id="modalWishBtn" onclick="toggleWishlist('${car.id}'); updateModalButtons('${car.id}')">${isWished ? '❤️ İstek Listesinde' : '🤍 İstek Listesine Ekle'}</button>`;

    document.getElementById('carModalContent').innerHTML = `
        <div class="modal-header">
            <div class="badges">
                <span class="badge ${rKey}">${car.rarity || 'Normal'}</span>
                ${car.collectionType === 'premium' ? '<span class="badge premium-type">Premium</span>' : ''}
                ${car.collectionType === 'silver'  ? '<span class="badge silver">Silver</span>'  : ''}
            </div>
            <h2 class="modal-title">${car.name}</h2>
            <p class="modal-subtitle">${car.year || ''} ${car.series ? '· ' + car.series : ''} ${car.release ? '· ' + car.release : ''}</p>
        </div>

        ${imagesHTML}

        <div class="modal-details">
            ${noteHTML}
            <div class="modal-detail-grid">${detailRows}</div>
        </div>

        <div class="modal-actions" id="modalActions">
            ${addRemoveBtn}
            ${wishBtnHTML}
            <a href="${car.wikiLink || '#'}" target="_blank" class="modal-btn modal-btn-wiki">🔗 Wiki</a>
        </div>
    `;

    // Store current car id for button refreshes
    modal.dataset.currentCarId = car.id;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateModalButtons(carId) {
    // Re-render just the action buttons in the open modal
    const car      = allCars.find(c => c.id === carId);
    if (!car) return;
    const inColl   = myCollection.includes(carId);
    const isWished = myWishlist.includes(carId);

    const actions = document.getElementById('modalActions');
    if (!actions) return;

    actions.innerHTML = `
        ${inColl
            ? `<button class="modal-btn modal-btn-remove" onclick="removeFromCollection('${carId}'); updateModalButtons('${carId}')">✓ Koleksiyondan Çıkar</button>`
            : `<button class="modal-btn modal-btn-add"    onclick="addToCollection('${carId}'); updateModalButtons('${carId}')">+ Koleksiyona Ekle</button>`
        }
        <button class="modal-btn modal-btn-wish ${isWished ? 'active' : ''}" onclick="toggleWishlist('${carId}'); updateModalButtons('${carId}')">${isWished ? '❤️ İstek Listesinde' : '🤍 İstek Listesine Ekle'}</button>
        <a href="${car.wikiLink || '#'}" target="_blank" class="modal-btn modal-btn-wiki">🔗 Wiki</a>
    `;

    updateInterface(); // refresh the grid cards in background
}

function closeModal() {
    document.getElementById('carModal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('carModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Close on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    // Keyboard shortcut: "/" focuses search
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// ── Theme ─────────────────────────────────────
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

// ── View toggle (grid / list) ─────────────────
let currentView = localStorage.getItem('hw_view') || 'grid';
const viewToggle = document.getElementById('viewToggle');

function applyView() {
    const grids = ['catalogGrid','collectionGrid','wishlistGrid']
        .map(id => document.getElementById(id)).filter(Boolean);
    grids.forEach(g => currentView === 'list' ? g.classList.add('list-view') : g.classList.remove('list-view'));
    viewToggle.textContent = currentView === 'list' ? '🖼️' : '📄';
    localStorage.setItem('hw_view', currentView);
}

viewToggle.addEventListener('click', () => {
    currentView = currentView === 'grid' ? 'list' : 'grid';
    applyView();
});

// ── Share collection as image ─────────────────
function downloadCollectionImage() {
    const el  = document.getElementById('statsContainer');
    const btn = document.getElementById('shareCollectionBtn');
    if (!el || !window.html2canvas) { alert('Kütüphane yüklenemedi.'); return; }

    const orig = btn.innerHTML;
    btn.innerHTML = '⏳ Hazırlanıyor...';
    btn.disabled  = true;

    html2canvas(el, {
        scale: 2,
        backgroundColor: document.body.classList.contains('dark-mode') ? '#1a1a1a' : '#ffffff',
        useCORS: true,
        logging: false,
        onclone: (doc) => {
            const header = doc.createElement('div');
            header.innerHTML = `<div style="padding:15px;text-align:center;border-bottom:2px solid #e8192c;margin-bottom:15px;">
                <h1 style="color:#e8192c;margin:0;font-size:24px;">Hot Wheels Koleksiyonum</h1>
                <p style="color:gray;margin:5px 0 0;font-size:12px;">Tarih: ${new Date().toLocaleDateString('tr-TR')} | Toplam: ${myCollection.length}</p>
            </div>`;
            doc.getElementById('statsContainer').prepend(header);
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.href     = canvas.toDataURL('image/png');
        link.download = `HW-Koleksiyonum-${new Date().toISOString().slice(0,10)}.png`;
        document.body.appendChild(link); link.click(); link.remove();
        btn.innerHTML = orig; btn.disabled = false;
    }).catch(() => {
        btn.innerHTML = orig; btn.disabled = false;
        alert('Görsel oluşturulamadı.');
    });
}

// ── Event listeners ───────────────────────────
document.getElementById('searchInput').addEventListener('input', () => { visibleCount = 10; updateInterface(); });
document.querySelectorAll('.filter-select').forEach(s => s.addEventListener('change', () => { visibleCount = 10; updateInterface(); }));

document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareCollectionBtn');
    if (shareBtn) shareBtn.addEventListener('click', downloadCollectionImage);
});

// ── Bootstrap ─────────────────────────────────
updateThemeUI();
applyView();
populateDynamicFilters();
updateInterface();
