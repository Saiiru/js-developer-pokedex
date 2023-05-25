// Create an object to hold PokeAPI-related functionality
const pokeapi = {};

// Define a function to retrieve detailed information about a specific Pokemon
pokeapi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(data => {
      // Extract the desired information from the Pokemon details
      return {
        id: data.id, // Store the Pokemon's ID
        name: data.name, // Store the Pokemon's name
        abilities: data.abilities.map(ability => ability.ability.name), // Extract the ability names
        types: data.types.map(type => type.type.name), // Extract the type names
        sprite: data.sprites.front_default // Store the URL of the default sprite image
      };
    });
};

// Define a function to retrieve a list of Pokemon with their details
pokeapi.getPokes = (offset = 0, limit = 10) => {
  const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  return fetch(URL)
    .then(response => response.json())
    .then(data => data.results) // Extract the list of Pokemon from the API response
    .then(pokemons => Promise.all(pokemons.map(pokemon => pokeapi.getPokemonDetail(pokemon))))
    // Retrieve the details of each Pokemon concurrently using Promise.all
    .then(details => {
      console.log(details); // Log the retrieved Pokemon details
       return details; // Return the retrieved Pokemon details
    })
    .catch(error => console.log(error)); // Handle any errors that occurred during the fetch operations
};

// Call the getPokes function to initiate the retrieval of Pokemon details
pokeapi.getPokes();