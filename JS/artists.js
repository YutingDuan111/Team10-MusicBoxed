// JS/artists.js

async function loadArtists() {
  const artistContainer = document.getElementById('artist-list');
  if (!artistContainer) return;

  try {
    const response = await fetch('http://localhost:3000/api/artists');
    const artists = await response.json();

    artistContainer.innerHTML = ''; 

    artists.forEach(artist => {
      const card = `
        <div class="artist-card">
          <img src="${artist.imageUrl}" alt="${artist.name}">
          <h3>${artist.name}</h3>
          <p>${artist.genre}</p>
        </div>
      `;
      artistContainer.innerHTML += card;
    });
  } catch (error) {
    console.error('Error loading artists:', error);
  }
}

// Start loading when the page is ready
document.addEventListener('DOMContentLoaded', loadArtists);