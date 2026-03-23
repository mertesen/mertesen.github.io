// 1. Tüm verileri birleştirme (Senin yapın)
const allCars = [
    ...data2010, ...data2011, ...data2012, ...data2013, ...data2014,
    ...data2015, ...data2016, ...data2017, ...data2018, ...data2019,
    ...data2020, ...data2021, ...data2022, ...data2023, ...data2024,
    ...data2025, ...data2026, ...carculture2016, ...carculture2017, 
    ...carculture2018, ...carculture2019, ...carculture2020, ...carculture2021, 
    ...carculture2022, ...carculture2023, ...carculture2024, ...carculture2025, 
    ...carculture2026, ...popculture2013, ...popculture2014, ...popculture2015,
    ...popculture2016, ...popculture2017, ...popculture2018, ...popculture2019,
    ...popculture2020, ...popculture2021, ...popculture2022, ...popculture2023, 
    ...popculture2024, ...popculture2025, ...popculture2026
];

let visibleCount = 10;
let sortOrder = 'newest';
let myCollection = JSON.parse(localStorage.getItem('hw_koleksiyon')) || [];
let myWishlist = JSON.parse(localStorage.getItem('hw_wishlist')) || []; // YENİ: Wishlist'i başlat

// --- FİLTRE DOLDURMA ---
function populateDynamicFilters() {
    const yearSelect = document.getElementById('yearSelect');
    const seriesSelect = document.getElementById('seriesSelect');
    const releaseSelect = document.getElementById('releaseSelect');

    const years = [...new Set(allCars.map(c => c.year))].filter(Boolean).sort((a, b) => b - a);
    const series = [...new Set(allCars.map(c => c.series))].filter(Boolean).sort();
    const releases = [...new Set(allCars.map(c => c.release))].filter(Boolean).sort();

    years.forEach(y => yearSelect.innerHTML += `<option value="${y}">${y}</option>`);
    series.forEach(s => seriesSelect.innerHTML += `<option value="${s}">${s}</option>`);
    releases.forEach(r => releaseSelect.innerHTML += `<option value="${r}">${r}</option>`);
}

// --- ARAÇLARI LİSTELEME (RENDER) ---
function renderCars(carsArray, containerId, isCollection = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (carsArray.length === 0) {
        container.innerHTML = "<p style='padding:20px;'>Burada henüz bir araç yok.</p>";
        return;
    }

    const limit = isCollection ? carsArray.length : visibleCount;
    const displayList = carsArray.slice(0, limit);

    displayList.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('car-card');

        const rarityClass = car.rarity ? car.rarity.toLowerCase().replace(/\s+/g, '-') : 'normal';
        const mainImg = car.imageUrl || 'https://via.placeholder.com/300x200?text=Görsel+Yok';
        const isWished = myWishlist.includes(car.id); // Wishlist kontrolü

        // Görsel yapısı
        let imageHTML = '';
        if (car.imageUrlCardboard && car.imageUrlCardboard.trim() !== "") {
            imageHTML = `
                <div class="car-image-container has-hover">
                    <img src="${mainImg}" class="img-main" loading="lazy">
                    <img src="${car.imageUrlCardboard}" class="img-hover" loading="lazy">
                </div>`;
        } else {
            imageHTML = `<div class="car-image-container"><img src="${mainImg}" class="img-main" loading="lazy"></div>`;
        }

        // Butonlar (Koleksiyon vs Katalog Ayrımı + Wishlist Butonu)
        const actionButton = isCollection 
            ? `<button class="btn-remove" onclick="removeFromCollection('${car.id}')">Çıkar</button>`
            : `<button class="btn-add" onclick="addToCollection('${car.id}')">Ekle</button>`;

        const wishButton = `
            <button class="btn-wish ${isWished ? 'active' : ''}" onclick="toggleWishlist('${car.id}')">
                ${isWished ? '❤️' : '🤍'}
            </button>`;

        carElement.innerHTML = `
            ${imageHTML}
            <div class="car-meta-tags">
                ${car.mainlineNumber ? `<span class="tag">#${car.mainlineNumber}</span>` : ''}
                ${car.toyId ? `<span class="tag">ID: ${car.toyId}</span>` : ''}
            </div>
            <h3 class="car-title">${car.name} <span class="car-year">${car.year || ''}</span></h3>
            ${car.series ? `<p class="car-info"><strong>Seri:</strong> ${car.series}</p>` : ''}
            ${car.release ? `<p class="car-info"><strong>Sürüm:</strong> ${car.release}</p>` : ''}
            <div class="badges">
                <span class="badge ${rarityClass}">${car.rarity || 'Normal'}</span>
                ${car.collectionType === 'premium' ? '<span class="badge premium-type">Premium</span>' : ''}
            </div>
            <div class="links-and-buttons">
                <a href="${car.wikiLink || '#'}" target="_blank" class="wiki-link">Wiki</a>
                <div class="card-buttons">
                    ${actionButton}
                    ${wishButton}
                </div>
            </div>
        `;
        container.appendChild(carElement);
    });
}

// --- WİSHLİST MANTIĞI ---
function toggleWishlist(carId) {
    const index = myWishlist.indexOf(carId);
    if (index === -1) {
        myWishlist.push(carId);
    } else {
        myWishlist.splice(index, 1);
    }
    localStorage.setItem('hw_wishlist', JSON.stringify(myWishlist));
    updateInterface();
}

function toggleWishlistArea() {
    const wrapper = document.getElementById('wishlistWrapper');
    const icon = document.getElementById('wishToggleIcon');
    wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    icon.textContent = wrapper.style.display === 'none' ? '🔽' : '🔼';
}

// --- ARAYÜZ GÜNCELLEME ---
function updateInterface() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeSelect').value;
    const rarityFilter = document.getElementById('raritySelect').value;
    const yearFilter = document.getElementById('yearSelect').value;
    const seriesFilter = document.getElementById('seriesSelect').value;
    const releaseFilter = document.getElementById('releaseSelect').value;
    
    // Filtreleme
    let filteredCars = allCars.filter(car => {
        const matchesSearch = (car.name?.toLowerCase().includes(searchTerm)) || 
                              (car.series?.toLowerCase().includes(searchTerm)) ||
                              (car.toyId?.toLowerCase().includes(searchTerm));
        const matchesType = typeFilter === 'all' || car.collectionType?.toLowerCase() === typeFilter;
        const matchesRarity = rarityFilter === 'all' || car.rarity?.toLowerCase() === rarityFilter;
        const matchesSeries = seriesFilter === 'all' || car.series === seriesFilter;
        const matchesRelease = releaseFilter === 'all' || car.release === releaseFilter;
        const matchesYear = yearFilter === 'all' || car.year?.toString() === yearFilter;

        return matchesSearch && matchesType && matchesRarity && matchesYear && matchesSeries && matchesRelease;
    });

    // Sıralama
    filteredCars.sort((a, b) => sortOrder === 'newest' ? b.year - a.year : a.year - b.year);

    // Listeleri hazırla
    const collectedCars = allCars.filter(car => myCollection.includes(car.id));
    const wishedCars = allCars.filter(car => myWishlist.includes(car.id));

    // Sayaçları güncelle
    document.getElementById('collectionCount').innerText = collectedCars.length;
    document.getElementById('wishlistCount').innerText = wishedCars.length;

    // Render Et
    renderCars(collectedCars, "collectionGrid", true);
    renderCars(wishedCars, "wishlistGrid", false);
    renderCars(filteredCars, "catalogGrid", false);

    updateStats();
    updateSetTracker();

    // "Daha Fazla" Butonu
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (filteredCars.length > visibleCount) {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.onclick = () => { visibleCount += 50; updateInterface(); };
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// --- KOLEKSİYON YÖNETİMİ ---
function addToCollection(carId) {
    if (!myCollection.includes(carId)) {
        myCollection.push(carId);
        localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
        updateInterface();
    }
}

function removeFromCollection(carId) {
    myCollection = myCollection.filter(id => id !== carId);
    localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
    updateInterface();
}

function toggleCollection() {
    const wrapper = document.getElementById('collectionWrapper');
    const icon = document.getElementById('toggleIcon');
    wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    icon.textContent = wrapper.style.display === 'none' ? '🔽' : '🔼';
}

function exportCollection() {
    if (myCollection.length === 0) {
        alert("Koleksiyonunuz boş, dışa aktarılacak bir şey yok!");
        return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(myCollection));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "hw_envanter_yedek.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// YENİ: İçe Aktar (Import)
document.getElementById('importFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (Array.isArray(importedData)) {
                // Eski koleksiyon ile yeni yükleneni birleştir (Mükerrer olanları sil)
                myCollection = [...new Set([...myCollection, ...importedData])];
                localStorage.setItem('hw_koleksiyon', JSON.stringify(myCollection));
                updateInterface();
                alert("Koleksiyon başarıyla içe aktarıldı!");
            } else {
                alert("Geçersiz dosya formatı. Lütfen doğru bir JSON dosyası seçin.");
            }
        } catch (error) {
            alert("Dosya okuma hatası oluştu.");
        }
        // Dosya seçiciyi sıfırla ki aynı dosyayı tekrar seçebilsin
        event.target.value = ''; 
    };
    fileReader.readAsText(file);
});

function updateSetTracker() {
    const trackerContainer = document.getElementById('setTrackerContainer');
    if (!trackerContainer) return;

    // Sadece seti belli olan araçları filtrele (Örn: "Japan Historics 5", "Circuit Legends" vb.)
    // Genelde Premium setler 5 araçlıktır, Mainline serileri (HW Turbo vb.) 10 araçlıktır.
    const sets = {};

    allCars.forEach(car => {
        if (car.release && car.release !== "") {
            if (!sets[car.release]) {
                sets[car.release] = { total: 0, owned: 0, rarity: car.collectionType };
            }
            sets[car.release].total++;
            if (myCollection.includes(car.id)) {
                sets[car.release].owned++;
            }
        }
    });

    let trackerHTML = '<h3>🧩 Set Tamamlama Durumu</h3><div class="tracker-grid">';
    
    // Sadece en az 1 araca sahip olduğun ama tamamlamadığın setleri göster (opsiyonel)
    Object.keys(sets).forEach(setName => {
        const set = sets[setName];
        if (set.owned > 0) {
            const percentage = (set.owned / set.total) * 100;
            const isCompleted = set.owned === set.total;

            trackerHTML += `
                <div class="set-item ${isCompleted ? 'completed' : ''}">
                    <div class="set-info">
                        <strong>${setName}</strong>
                        <span>${set.owned}/${set.total}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }
    });

    trackerHTML += '</div>';
    trackerContainer.innerHTML = trackerHTML;
}


// --- TEMA VE GÖRÜNÜM ---
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

function updateThemeUI() {
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateThemeUI();
});

let currentView = localStorage.getItem('hw_view') || 'grid';
const viewToggle = document.getElementById('viewToggle');

function applyView() {
    const grids = [document.getElementById('catalogGrid'), document.getElementById('collectionGrid'), document.getElementById('wishlistGrid')];
    grids.forEach(grid => {
        if(grid) currentView === 'list' ? grid.classList.add('list-view') : grid.classList.remove('list-view');
    });
    viewToggle.textContent = currentView === 'list' ? '🖼️' : '📄';
    localStorage.setItem('hw_view', currentView);
}

viewToggle.addEventListener('click', () => {
    currentView = currentView === 'grid' ? 'list' : 'grid';
    applyView();
});

// --- İSTATİSTİKLER ---
function updateStats() {
    const collectedCars = allCars.filter(car => myCollection.includes(car.id));
    const stats = {
        total: collectedCars.length,
        premium: collectedCars.filter(c => c.collectionType === 'premium').length,
        sth: collectedCars.filter(c => c.rarity === 'STH').length,
        chase: collectedCars.filter(c => c.rarity === 'Chase').length
    };
    const statsHTML = `
        <div class="stats-bar">
            <span>📊 Toplam: <strong>${stats.total}</strong></span>
            <span>💎 Premium: <strong>${stats.premium}</strong></span>
            <span>🔥 STH: <strong>${stats.sth}</strong></span>
            <span>🎯 Chase: <strong>${stats.chase}</strong></span>
        </div>`;
    const container = document.getElementById('statsContainer');
    if (container) container.innerHTML = statsHTML;
}

// --- ÇALIŞTIR ---
document.getElementById('searchInput').addEventListener('input', () => { visibleCount = 10; updateInterface(); });
document.querySelectorAll('.filter-select').forEach(sel => sel.addEventListener('change', () => { visibleCount = 10; updateInterface(); }));

updateThemeUI();
applyView();
populateDynamicFilters();
updateInterface();
