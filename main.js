document.getElementById('year').textContent = new Date().getFullYear();

// Fetch the JSON data and initialize the grid when the data is loaded
fetch("tarot.json")
  .then((response) => response.json())
  .then((data) => {
    initializeTarotGrid(data);
  })
  .catch((error) => {
    console.error("Error fetching tarot data:", error);
  });

const tarotGrid = document.getElementById("tarotGrid");
const tarotModal = new bootstrap.Modal(
  document.getElementById("tarotModal")
);
const tarotModalLabel = document.getElementById("tarotModalLabel");
const tarotModalBody = document.querySelector(".modal-body");

// Function to initialize the tarot grid with data
function initializeTarotGrid(tarotData) {
  tarotData.cards.forEach((card) => {
    const cardElement = createCardElement(card);
    tarotGrid.appendChild(cardElement);
  });
}

// Function to create and return a card element
function createCardElement(card) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("tarot-card-container");

    const cardElement = document.createElement("div");
    cardElement.classList.add("tarot-card");
    cardElement.style.backgroundImage = `url('cards/${card.img}')`;
    cardElement.onclick = () => showCardDetails(card);

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-name");
    cardTitle.textContent = 'The High Priestess' == card.name ? 'High Priestess' : card.name;

    cardContainer.appendChild(cardElement);
    cardContainer.appendChild(cardTitle);

    return cardContainer;
}
// Function to show card details in the modal
function showCardDetails(card) {
  console.log(card);
  tarotModalLabel.textContent = card.name;
  let modalContent = '';

  if (card.yt_embed_url) {
    modalContent += `
      <div class="embed-responsive embed-responsive-16by9 mt-3" style="width:300px; height:168px; margin:auto;">
        <iframe class="embed-responsive-item" src="${card.yt_embed_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`;
  }

  modalContent += `
    <div class="text-center"><img src="cards/${card.img}" alt="${card.name}" class="img-fluid" style="width:175px;height:300px;margin-top:1rem;"></div>
    <p><strong>Number:</strong> ${card.number}</p>
    <p><strong>Arcana:</strong> ${card.arcana}</p>`;

  if (card.album) {
    modalContent += `<p><strong>Album:</strong> ${card.album}</p>`;
  }

  if (card.keywords) {
    modalContent += `<p><strong>Keywords:</strong> ${card.keywords.join(", ")}</p>`;
  }

  if (card.meanings) {
    if (card.meanings.light) {
      modalContent += `<p><strong>Light Meanings:</strong></p><ul><li>${card.meanings.light.join('</li><li>')}</li></ul>`;
    }
    if (card.meanings.shadow) {
      modalContent += `<p><strong>Shadow Meanings:</strong></p><ul><li>${card.meanings.shadow.join('</li><li>')}</li></ul>`;
    }
  }

  if (card.questions) {
    modalContent += `<p><strong>Questions to Ask:</strong></p><ul>`;
    card.questions.forEach(question => {
      modalContent += `<li>${question}</li>`;
    });
    modalContent += `</ul>`;
  }

  if (card.archetype) {
    modalContent += `<p><strong>Archetype:</strong> ${card.archetype}</p>`;
  }

  if (card.affirmation) {
    modalContent += `<p><strong>Affirmation:</strong> ${card.affirmation}</p>`;
  }

  if (card.elemental) {
    modalContent += `<p><strong>Elemental:</strong> ${card.elemental}</p>`;
  }

  if (card.mythical_spiritual) {
    modalContent += `<p><strong>Mythical/Spiritual:</strong> ${card.mythical_spiritual}</p>`;
  }

  if (card.fortune_telling) {
    modalContent += `<p><strong>Fortune Telling:</strong></p><ul>`;
    card.fortune_telling.forEach(item => {
      modalContent += `<li>${item}</li>`;
    });
    modalContent += `</ul>`;
  }

  if (card.hebrew_alphabet) {
    modalContent += `<p><strong>Hebrew Alphabet:</strong> ${card.hebrew_alphabet}</p>`;
  }

  if (card.numerology) {
    modalContent += `<p><strong>Numerology:</strong> ${card.numerology}</p>`;
  }

  if (card.astrology) {
    modalContent += `<p><strong>Astrology:</strong> ${card.astrology}</p>`;
  }

  tarotModalBody.innerHTML = modalContent;
  tarotModal.show();
}

$('#tarotModal').on('hidden.bs.modal', function (e) {
  tarotModalBody.innerHTML = '';
});
