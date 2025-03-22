document.addEventListener("DOMContentLoaded", () => {
    loadPlants();
});

async function loadPlants() {
    const response = await fetch("plants.json");
    const plants = await response.json();
    displayPlants(plants);
}

function displayPlants(plants) {
    const plantList = document.getElementById("plant-list");
    plantList.innerHTML = ""; // Очищаем список перед добавлением новых

    plants.forEach(plant => {
        const plantCard = document.createElement("div");
        plantCard.classList.add("plant-card");
        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p>${plant.description}</p>
            <p><b>Уход:</b> ${plant.care}</p>
        `;
        plantList.appendChild(plantCard);
    });
}

// Форма добавления нового растения
document.getElementById("add-plant-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const newPlant = {
        name: document.getElementById("plant-name").value,
        image: document.getElementById("plant-image").value,
        description: document.getElementById("plant-description").value,
        care: document.getElementById("plant-care").value
    };

    // Загружаем существующий список и добавляем новое растение (без сохранения в файл)
    fetch("plants.json")
        .then(response => response.json())
        .then(plants => {
            plants.push(newPlant);
            displayPlants(plants); // Обновляем на сайте
            alert("Растение добавлено! (но после перезагрузки исчезнет)");
        });
});
