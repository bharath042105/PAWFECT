const form = document.getElementById('adoptionForm');
const petList = document.getElementById('petList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);

    const response = await fetch('/submit', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    displayPets(data);
});

async function fetchPets() {
    const response = await fetch('/pets');
    const data = await response.json();
    displayPets(data);
}

function displayPets(pets) {
    petList.innerHTML = '';
    pets.forEach(pet => {
        const petDiv = document.createElement('div');
        petDiv.classList.add('pet-item');

        const petInfo = document.createElement('div');
        petInfo.textContent = `Pet Name: ${pet.petName}, Owner Name: ${pet.ownerName}`;

        if (pet.imageUrl) {
            const petImage = document.createElement('img');
            petImage.src = pet.imageUrl;
            petImage.alt = `${pet.petName} image`;

            petDiv.appendChild(petImage);
        }

        petDiv.appendChild(petInfo);
        petList.appendChild(petDiv);
    });
}

fetchPets();
