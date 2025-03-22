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
