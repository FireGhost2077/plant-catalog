const API_URL = "https://steep-hill-facf.jurjuroman3.workers.dev/";

// Функция для загрузки растений
async function loadPlants() {
    console.log("Функция loadPlants() вызвана!");
    
    const response = await fetch("https://steep-hill-facf.jurjuroman3.workers.dev/");
    const plants = await response.json();
    
    console.log("Полученные растения:", plants);

    const container = document.getElementById("plants-container");
    container.innerHTML = "";

    plants.forEach(plant => {
        console.log("Добавляю растение:", plant); // Проверяем, что код проходит
        const plantCard = document.createElement("div");
        plantCard.classList.add("plant-card");
        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p>${plant.description}</p>
            <p><strong>Уход:</strong> ${plant.care}</p>
        `;
        container.appendChild(plantCard);
    });
}


// Функция для добавления растения
async function addPlant() {
    const name = document.getElementById("plant-name").value;
    const image = document.getElementById("plant-image").value;
    const description = document.getElementById("plant-description").value;
    const care = document.getElementById("plant-care").value;

    if (!name || !image || !description || !care) {
        alert("Заполните все поля!");
        return;
    }

    const newPlant = { name, image, description, care };

    // Отправляем данные на сервер
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlant)
    });

    const result = await response.json();
    if (result.success) {
        loadPlants(); // Обновляем список после добавления
    }
}

// Загружаем растения при старте
window.onload = loadPlants;
