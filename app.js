'use strict';
// fetch data from api
// create object with data you want
// loop over only the 1st 151 pokemon

const searchBar = document.getElementById('searchBar');
let pokemonData = [];
let pokemonResults = [];

const getPokemonData = async () => {

    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        pokemonData.push(data);
    }

    Promise.all(pokemonData).then( (results) => {

        const pokemon = results.map( (data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_shiny'],
            type: data.types.map((type) => type.type.name)
        }));

        pokemonResults.push(...pokemon);
        //console.log(pokemon);
        displayPokemon(pokemon);
        //displayPokemon(filteredPokemon);

    });

}



const displayPokemon = (pokemon) => {

    console.log(pokemon);

    // const pokeType = pokemon.type;

    // console.log(pokeType);

    const pokeDexContainer = document.querySelector('.pokedex');

    const generateHtml = (pokemon).map( (mon) => {
        return `
        <li class="poke-card">
            <image class="poke-image" src="${mon.image}" alt="${mon.name}"/>

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

    // console.log(generateHtml);
    pokeDexContainer.innerHTML = generateHtml;

}

getPokemonData();


searchBar.addEventListener('keyup', (event) => {
    console.log(event.target.value);

    const searchEntry = event.target.value.toLowerCase();
    const searchNumber = event.target.value;

    const filteredPokemon = pokemonResults.filter( (mon) => {

        // let pokemonType = mon.type.map( types => JSON.stringify(types));

        // console.log(pokemonType);
        return (
            mon.name.toLowerCase().includes(searchEntry) ||
            mon.id == searchNumber ||
            JSON.stringify(mon.type).toLowerCase().includes(searchEntry)
        );

        // if (mon.name.toLowerCase().includes(searchEntry)) {
        //     return mon.name;
        // }
        // if (mon.id == searchNumber) {
        //     return mon.id;
        // }
        
    });

    console.log(filteredPokemon);

    displayPokemon(filteredPokemon);

});
