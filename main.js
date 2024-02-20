document.getElementById('year').textContent = new Date().getFullYear();

// Fetch the JSON data and initialize the new layout with albums and cards
fetch("tarot.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.albums, data.cards)
    buildAlbumSections(data.albums, data.cards);
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

tarotModalBody.addEventListener('click', function(event) {
  if (!event.target.closest('iframe')) {
    tarotModal.hide();
  }
});

function buildAlbumSections(albumData, cardsData) {
  albumData.forEach(album => {
    // Create the album container
    const albumContainer = document.createElement('div');
    albumContainer.classList.add('album-container');

    // Create the album cover image
    const albumImage = document.createElement('img');
    albumImage.src = `images/${album.img}`;
    albumImage.alt = album.title;
    albumImage.classList.add('album-cover');
    albumImage.style.width = '180px';
    albumImage.style.height = '180px';
    albumContainer.appendChild(albumImage);

    // Create the album title
    const albumTitle = document.createElement('h2');
    albumTitle.classList.add('album-title');
    albumTitle.textContent = album.title;
    albumContainer.appendChild(albumTitle);

    // Create the cards container
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');

    // Filter cards by album and add to cards container
    const albumCards = cardsData.filter(card => card.album === album.title);
    albumCards.forEach(card => {
      const cardElement = createCardElement(card);
      cardsContainer.appendChild(cardElement);
    });

    // Add the cards container to the album container
    albumContainer.appendChild(cardsContainer);

    // Add the album container to the main grid
    tarotGrid.appendChild(albumContainer);
  });
}
