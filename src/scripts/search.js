'use strict';

import {pokemonResults, displayPokemon} from './pokemon';

const searchPokeDex = () => {

    //reference search input element
    const searchBar = document.getElementById('searchBar');

    //add event listener for search bar on key up
    searchBar.addEventListener('keyup', (event) => {
        console.log(event.target.value);

        //reference input string value from a user
        const searchString = event.target.value.toLowerCase();
        //reference input number value from a user
        const searchNumber = event.target.value;
        
        //filter through pokemonResults array and return pokemon by name id or type that match the users input
        const filteredPokemon = pokemonResults.filter( (mon) => {

            return (
                mon.name.toLowerCase().includes(searchString) ||
                mon.id == searchNumber ||
                JSON.stringify(mon.type).toLowerCase().includes(searchString)
            );
            
        });

        console.log(filteredPokemon);

        //display the list of filtered pokemon
        displayPokemon(filteredPokemon);

    });

}

export {searchPokeDex}