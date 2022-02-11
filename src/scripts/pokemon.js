'use strict';

//stores new array of objects containing pokemon image, id, name, and types
let pokemonResults = [];

//fetch pokemon data from Poke API
const getPokemonData = async () => {

    //stores raw data from Poke API
    let pokemonData = [];

    //loop through original 151 pokemon, fetch data and push to pokemonData array
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        pokemonData.push(data);
    }

    //retrieve all results together 
    Promise.all(pokemonData).then( (results) => {

        //retrieve only name, id, image, and type from each object
        const pokemon = results.map( (data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_shiny'],
            image_alt: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name)
        }));

        //push new array of pokemon to pokemonResults array usign spread operator
        pokemonResults.push(...pokemon);
        //console.log(pokemon);
        //dispaly the pokemonlist in the DOM
        displayPokemon(pokemon);
        //displayPokemon(filteredPokemon);

    });

}


//function creates an HTML list item for each pokemon
const displayPokemon = (pokemon) => {

    console.log(pokemon);

    //reference unordered list element
    const pokeDexContainer = document.querySelector('.pokedex');

    //create list item  with inner elements
    const generateHtml = (pokemon).map( (mon) => {
        return `
        <li class="poke-card">
            <image class="poke-image--shiny" src="${mon.image}" alt="${mon.name}"/>
            <image class="poke-image" src="${mon.image_alt}" alt="${mon.name}"/>

            ${  
                ( ids => {

                    if (ids < 10) {
                        return `<h2 class="poke-id">00${ids}</h2>`
                    }
                    if (ids >= 10 && ids < 100) {
                        return `<h2 class="poke-id">0${ids}</h2>`
                    }
                    if (ids >= 100) {
                        return `<h2 class="poke-id">${ids}</h2>`
                    }

                })(mon.id)
            }

            <h1 class="poke-name">${mon.name}</h1>

            ${mon.type.map( (types) => {
                    
                return `<span class="poke-type ${types}">${types}</span>`;

            }).join('')}

        </li>
        `
    }).join('');

    //insert list itmes inside of unordered list
    pokeDexContainer.innerHTML = generateHtml;
     // console.log(generateHtml);
}

// getPokemonData();

export {pokemonResults, getPokemonData, displayPokemon}