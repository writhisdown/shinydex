'use strict';
// fetch data from api
// create object with data you want
// loop over only the 1st 151 pokemon

const searchBar = document.getElementById('searchBar');
const pokemonData = [];
// let pokeDexResults = [];

searchBar.addEventListener('keyup', (event) => {
    console.log(event.target.value);

    const searchEntry = event.target.value.toLowerCase();

    const filteredPokemon = pokemonData.filter( (pokemonResult) => {
        return (
            pokemonResult.name.toLowerCase().includes(searchEntry) ||
            pokemonResult.id == searchEntry ||
            pokemonResult.type == searchEntry
        )
    });

    displayPokemon(filteredPokemon);

});

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

        //console.log(pokemon);
        displayPokemon(pokemon);

    });

        // const pokemon = {
        //     name: data.name,
        //     id: data.id,
        //     image: data.sprites['front_shiny'],
        //     type: data.types.map((type) => type.type.name).join(', ')
        // }

        //console.log(pokemon);
}



const displayPokemon = (pokemon) => {

    console.log(pokemon);

    // const pokeType = pokemon.type;

    // console.log(pokeType);

    const pokeDexContainer = document.querySelector('.pokedex');

    // const leadZero = (pokeId) => {
    //     // return '0';
    //     if (pokeId.length === 2) {
    //         return `<span>0</span>`;
    //     } 
    //     if (pokeId.length === 1) {
    //         return `<span>00</span>`;
    //     } 
    // }

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
                if (types == 'grass') {
                    return `<span class="poke-type grass">${types}</span>`;
                }
                if (types == 'water') {
                    return `<span class="poke-type water">${types}</span>`;
                }
                if (types == 'fire') {
                    return `<span class="poke-type fire">${types}</span>`;
                }
                if (types == 'electric') {
                    return `<span class="poke-type electric">${types}</span>`;
                }
                if (types == 'normal') {
                    return `<span class="poke-type normal">${types}</span>`;
                }
                if (types == 'fighting') {
                    return `<span class="poke-type fighting">${types}</span>`;
                }
                if (types == 'flying') {
                    return `<span class="poke-type flying">${types}</span>`;
                }
                if (types == 'poison') {
                    return `<span class="poke-type poison">${types}</span>`;
                }
                if (types == 'ground') {
                    return `<span class="poke-type ground">${types}</span>`;
                }
                if (types == 'rock') {
                    return `<span class="poke-type rock">${types}</span>`;
                }
                if (types == 'bug') {
                    return `<span class="poke-type bug">${types}</span>`;
                }
                if (types == 'ghost') {
                    return `<span class="poke-type ghost">${types}</span>`;
                }
                if (types == 'steel') {
                    return `<span class="poke-type steel">${types}</span>`;
                }
                if (types == 'psychic') {
                    return `<span class="poke-type psychic">${types}</span>`;
                }
                if (types == 'ice') {
                    return `<span class="poke-type ice">${types}</span>`;
                }
                if (types == 'dragon') {
                    return `<span class="poke-type dragon">${types}</span>`;
                }
                if (types == 'dark') {
                    return `<span class="poke-type dark">${types}</span>`;
                }
                if (types == 'fairy') {
                    return `<span class="poke-type fairy">${types}</span>`;
                }

            } ).join('')}

        </li>
        `
    }).join('');

    // console.log(generateHtml);
    pokeDexContainer.innerHTML = generateHtml;

}

getPokemonData();
