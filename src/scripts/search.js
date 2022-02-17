'use strict';

import {pokemonResults, displayPokemon} from './pokemon';

//reference search input element
const searchBar = document.getElementById('searchBar');

//reference search form element
const searchForm = document.getElementById('search');

// reference clear button
const clearBtn = document.getElementById('clearBtn');

const searchPokeDex = () => {

    //add event listener for search bar on key up
    searchBar.addEventListener('input', (event) => {
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

        controlBtn();

    });

}

//handle clear button visibility
const controlBtn = () => {
    clearBtn.classList.add('visible');

    if (searchBar.value.trim().length === 0) {
        clearBtn.classList.remove('visible');
    } 
    //console.log(searchBar.value);
}

//hide clear button and reset input
const clearSearch = () => {
    clearBtn.classList.remove('visible');
    searchBar.value = '';
    searchBar.dispatchEvent(new Event('input', {bubbles:true}));
}

export {clearBtn, clearSearch, searchPokeDex}