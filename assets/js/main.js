// DOM elements
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

// Constants
const maxRecords = 151;
const limit = 10;

// Initial offset value
let offset = 0;

// Object mapping Pokemon types to colors
const pokeTypeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// Function to convert a Pokemon object to an HTML list item
function getPokemonListItem(pokemon) {
  const typesHTML = pokemon.types
    .map(type => `<li class="type ${type}">${type}</li>`)
    .join("");

  return `
    <li class="pokemon ${pokemon.types[0]}" style="background-color: ${pokeTypeColors[pokemon.types[0]]};">
      <span class="number">#${pokemon.id}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types style="border-color: ${pokeTypeColors[pokemon.types[0]]};">
          ${typesHTML}
        </ol>
        <img src="${pokemon.sprite}" alt="${pokemon.name}">
      </div>
    </li>`;
}

// Function to load Pokemon items
function loadPokemonItems(offset, limit) {
  pokeapi.getPokes(offset, limit).then((pokemons = []) => {
    const pokemonItemsHTML = pokemons.map(getPokemonListItem).join("");
    pokemonList.innerHTML += pokemonItemsHTML;
  });
}

// Load initial Pokemon items
loadPokemonItems(offset, limit);

// Event listener for "Load More" button
loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    // Remove the "Load More" button when all records are loaded
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});