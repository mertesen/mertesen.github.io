// 1. Tüm yılları tek bir düz listede birleştiriyoruz
const allCars = [
    ...data2010, ...data2011, ...data2012, ...data2013, ...data2014,
    ...data2015, ...data2016, ...data2017, ...data2018, ...data2019,
    ...data2020, ...data2021, ...data2022, ...data2023, ...data2024,
    ...data2025, ...data2026
];

let visibleCount = 10; // Başlangıçta kaç araç görünecek
let sortOrder = 'newest'; // 'newest' veya 'oldest'

// 2. Local Storage
let myCollection = JSON.parse(localStorage.getItem('hw_koleksiyon')) || [];

// 3. Render Fonksiyonu (Aynı kalıyor)
function renderCars(carsArray, containerId, isCollection = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (carsArray.length === 0) {
        container.innerHTML = "<p>Sonuç bulunamadı.</p>";
        return;
    }

    // Performans için katalogda çok fazla araç varsa sadece ilk 100'ünü gösterelim
    const limit = isCollection ? carsArray.length : 100;
    const displayList = carsArray.slice(0, limit);

    displayList.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('car-card');

        // Rarity null gelirse hata vermemesi için koruma
        const rarity = car.rarity ? car.rarity.toLowerCase() : 'normal';

        const buttonHTML = isCollection 
            ? `<button class="btn-remove" onclick="removeFromCollection('${car.id}')">Çıkar</button>`
            : `<button class="btn-add" onclick="addToCollection('${car.id}')">Ekle</button>`;

        carElement.innerHTML = `
            <img src="${car.imageUrl || 'https://via.placeholder.com/150'}" alt="${car.name} loading="lazy"">
            <h3 class="car-title">${car.name}</h3>
            <p class="car-info"><strong>Seri:</strong> ${car.series} (${car.year})</p>
            <div class="badges">
                <span class="badge ${rarity}">${car.rarity || 'Normal'}</span>
            </div>
            <div class="links-and-buttons">
                <a href="${car.wikiLink}" target="_blank" class="wiki-link">Wiki</a>
                ${buttonHTML}
            </div>
        `;
        container.appendChild(carElement);
    });
}

// 4. Arayüzü Güncelleme (Arama ve Koleksiyonu aynı anda yönetir)
function updateInterface() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // 1. Filtreleme
    let filteredCars = allCars.filter(car => 
        (car.name && car.name.toLowerCase().includes(searchTerm)) || 
        (car.series && car.series.toLowerCase().includes(searchTerm)) ||
        (car.rarity && car.rarity.toLowerCase().includes(searchTerm))
    );

    // 2. Sıralama (Yıla göre)
    filteredCars.sort((a, b) => {
        return sortOrder === 'newest' ? b.year - a.year : a.year - b.year;
    });

    // 3. Koleksiyonu render et (Koleksiyonda limit olmasın)
    const collectedCars = allCars.filter(car => myCollection.includes(car.id));
    renderCars(collectedCars, "collectionGrid", true);

    // 4. Kataloğu render et (Limitli)
    renderCars(filteredCars.slice(0, visibleCount), "catalogGrid", false);

    // 5. "Daha Fazla" butonu kontrolü
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (filteredCars.length > visibleCount) {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.onclick = () => {
            visibleCount += 100;
            updateInterface();
        };
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// 5. Koleksiyon İşlemleri (Aynı kalıyor)
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

// 6. Arama Girişi Dinleyicisi (Input değiştikçe interface güncellenir)
document.getElementById('searchInput').addEventListener('input', updateInterface);

document.getElementById('sortSelect').addEventListener('change', function(e) {
    sortOrder = e.target.value;
    visibleCount = 100; // Sıralama değişince listeyi başa saralım
    updateInterface();
});

// Arama yapıldığında da listeyi başa saralım ki en iyi sonuçları en başta görelim
document.getElementById('searchInput').addEventListener('input', () => {
    visibleCount = 100;
    updateInterface();
});

// İlk açılışta verileri bas
updateInterface();