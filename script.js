const API_URL = "https://steep-hill-facf.jurjuroman3.workers.dev/"; // Замени на свой адрес

document.addEventListener("DOMContentLoaded", () => {
    loadPlants();
});

async function loadPlants() {
    const response = await fetch(API_URL);
    const plants = await response.json();
    displayPlants(plants);
}

function displayPlants(plants) {
    const plantList = document.getElementById("plant-list");
    plantList.innerHTML = "";

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
document.getElementById("add-plant-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPlant = {
        name: document.getElementById("plant-name").value,
        image: document.getElementById("plant-image").value,
        description: document.getElementById("plant-description").value,
        care: document.getElementById("plant-care").value
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlant)
    });

    if (response.ok) {
        loadPlants(); // Обновляем список после добавления
        alert("Растение успешно добавлено!");
    } else {
        alert("Ошибка при добавлении растения.");
    }
});
