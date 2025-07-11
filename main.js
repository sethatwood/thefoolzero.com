let tarotDataGlobal;
const tarotGrid = document.getElementById("tarotGrid");

// Only initialize modal components if they exist on the page
let tarotModal, tarotModalLabel, tarotModalBody;
const tarotModalElement = document.getElementById("tarotModal");
if (tarotModalElement) {
  tarotModal = new bootstrap.Modal(tarotModalElement);
  tarotModalLabel = document.getElementById("tarotModalLabel");
  tarotModalBody = document.querySelector(".modal-body");
}

document.getElementById('year').textContent = new Date().getFullYear();

function scrollToHashSection() {
  // Get the hash without the # symbol
  const hash = window.location.hash.slice(1);
  if (hash) {
    // Find the element with matching ID
    const element = document.getElementById(hash);
    if (element) {
      // Wait a brief moment for content to load
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}

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

function createBadgeHTML(url, imgSrc, altText) {
  if (!url) return '';
  return `
    <a href="${url}" target="_blank">
      <img src="images/${imgSrc}" alt="${altText}" style="width: 36px; height: 36px; margin-left: 10px;">
    </a>`;
}

function showCardDetails(card) {
  if (!tarotModal || !tarotModalLabel || !tarotModalBody) return;
  tarotModalLabel.textContent = card.name;
  let modalContent = '';

  if (card.yt_embed_url) {
    modalContent += `
      <div class="embed-responsive embed-responsive-16by9 mt-3" style="width:300px; height:168px; margin:auto;">
        <iframe class="embed-responsive-item" src="${card.yt_embed_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
      </div>`;
  }

  modalContent += `
    <div class="text-center"><img src="cards/${card.img}" alt="${card.name}" class="img-fluid" style="width:175px;height:300px;margin-top:1rem;"></div>
    <p><strong>Card:</strong> ${card.name}</p>`;

  if (card.album) {
    const album = tarotDataGlobal.albums.find(a => a.title === card.album);
    if (album) {
      modalContent += `<p><strong>Album:</strong> ${card.album}`;
      modalContent += createBadgeHTML(album.spotify, 'badge-spot.png', 'Spotify');
      modalContent += createBadgeHTML(album.youtube, 'badge-yt.png', 'YouTube');
      modalContent += createBadgeHTML(album.apple, 'badge-apl.png', 'Apple Music');
      modalContent += createBadgeHTML(album.soundcloud, 'badge-sc.png', 'SoundCloud');
      modalContent += `</p>`;
    } else {
      modalContent += `<p><strong>Album:</strong> ${card.album}</p>`;
    }
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

  if (card.elemental) {
    modalContent += `<p><strong>Elemental:</strong> ${card.elemental}</p>`;
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

function showAlbumDetails(album) {
  if (!tarotModal || !tarotModalLabel || !tarotModalBody) return;
  tarotModalLabel.textContent = album.title;
  let modalContent = `
    <div class="text-center">
      <img src="images/${album.img}" alt="${album.title} cover" class="img-fluid">
      <div class="badge-links" style="margin-top: 20px;">`;

  // Adding Spotify badge
  if (album.spotify) {
    modalContent += `
      <a href="${album.spotify}" target="_blank">
        <img src="images/badge-spot.png" alt="Spotify" style="width: 60px; height: 60px; margin-right: 10px;">
      </a>`;
  }

  // Adding YouTube badge
  if (album.youtube) {
    modalContent += `
      <a href="${album.youtube}" target="_blank">
        <img src="images/badge-yt.png" alt="YouTube" style="width: 60px; height: 60px; margin-right: 10px;">
      </a>`;
  }

  // Adding Apple Music badge
  if (album.apple) {
    modalContent += `
      <a href="${album.apple}" target="_blank">
        <img src="images/badge-apl.png" alt="Apple Music" style="width: 60px; height: 60px; margin-right: 10px;">
      </a>`;
  }

  // Adding SoundCloud badge
  if (album.soundcloud) {
    modalContent += `
      <a href="${album.soundcloud}" target="_blank">
        <img src="images/badge-sc.png" alt="SoundCloud" style="width: 60px; height: 60px; margin-right: 10px;">
      </a>`;
  }

  modalContent += `</div></div>`;
  tarotModalBody.innerHTML = modalContent;
  tarotModal.show();
}

// Only add modal event listeners if modal exists
if (tarotModal && tarotModalBody) {
  $('#tarotModal').on('hidden.bs.modal', function (e) {
    tarotModalBody.innerHTML = '';
  });

    tarotModalBody.addEventListener('click', function(event) {
    if (!event.target.closest('iframe')) {
      tarotModal.hide();
    }
  }, { passive: true });
}

function buildAlbumSections(albumData, cardsData) {
  if (!tarotGrid) return;
  albumData.forEach(album => {
    // Create the album section which includes the album and its cards
    const albumSection = document.createElement('section');
    albumSection.classList.add('album-section');

    // Add an ID based on the album title (convert to lowercase, replace spaces/special chars with dashes)
    const albumId = album.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric chars with dash
      .replace(/(^-|-$)/g, ''); // Remove leading/trailing dashes
    albumSection.id = albumId;

    // Create the album container which will only have the album image and title
    const albumContainer = createAlbumElement(album);
    albumSection.appendChild(albumContainer);

    // Create the cards container for this album
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');

    // Filter and append cards for the current album
    const albumCards = cardsData.filter(card => card.album === album.title);
    albumCards.forEach(card => {
      const cardElement = createCardElement(card);
      cardsContainer.appendChild(cardElement);
    });

    // Append the cards container to the album section
    albumSection.appendChild(cardsContainer);

    // Append the complete album section to the main grid
    tarotGrid.appendChild(albumSection);
  });
}

function createAlbumElement(album) {
  const albumContainer = document.createElement('div');
  albumContainer.classList.add('album-container');

  const albumImage = document.createElement('img');
  albumImage.src = `images/${album.img}`;
  albumImage.alt = `${album.title} cover`;
  albumImage.classList.add('album-cover');
  albumImage.onclick = () => showAlbumDetails(album);

  const albumTitle = document.createElement('h2');
  albumTitle.classList.add('album-title');
  albumTitle.textContent = album.title;

  // Create a div for badges
  const badgesDiv = document.createElement('div');
  badgesDiv.style.display = 'flex';
  badgesDiv.style.justifyContent = 'center';
  badgesDiv.style.paddingBottom = '24px';

  // Conditionally add each badge if the URL exists
  const badges = [
    {name: 'spotify', img: 'badge-spot.png', url: album.spotify},
    {name: 'youtube', img: 'badge-yt.png', url: album.youtube},
    {name: 'apple', img: 'badge-apl.png', url: album.apple},
    {name: 'soundcloud', img: 'badge-sc.png', url: album.soundcloud}
  ];

  badges.forEach(badge => {
    if (badge.url) {
      const link = document.createElement('a');
      link.href = badge.url;
      link.target = '_blank';
      const img = document.createElement('img');
      img.src = `images/${badge.img}`;
      img.alt = badge.name;
      img.style.width = '48px';
      img.style.height = '48px';
      img.style.margin = '0 12px';
      link.appendChild(img);
      badgesDiv.appendChild(link);
    }
  });

  albumContainer.appendChild(albumImage);
  albumContainer.appendChild(albumTitle);
  albumContainer.appendChild(badgesDiv);

  return albumContainer;
}

function fetchAndStoreTarotData() {
  // Only fetch tarot data if we have a tarot grid to display it in
  if (!tarotGrid) return;

  fetch("tarot.json")
    .then((response) => response.json())
    .then((data) => {
      tarotDataGlobal = data;
      buildAlbumSections(data.albums, data.cards);
      scrollToHashSection();
    })
    .catch((error) => {
      console.error("Error fetching tarot data:", error);
    });
}

function openRandomCardModal() {
  if (tarotDataGlobal) {
    const randomIndex = Math.floor(Math.random() * tarotDataGlobal.cards.length);
    const randomCard = tarotDataGlobal.cards[randomIndex];
    showCardDetails(randomCard);
  } else {
    console.error('Tarot data not loaded yet');
  }
}

// Only add random card button listener if the button exists
const randomCardBtn = document.getElementById('randomCardBtn');
if (randomCardBtn) {
  randomCardBtn.addEventListener('click', function() {
    openRandomCardModal();
  });
}

fetchAndStoreTarotData();

// Add event listener for hash changes
window.addEventListener('hashchange', scrollToHashSection);
