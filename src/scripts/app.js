import {getPokemonData} from './pokemon';

import {clearBtn, clearSearch, searchPokeDex} from './search';

import {displayDate} from './date';

getPokemonData();

searchPokeDex();

clearBtn.addEventListener('click', clearSearch);

displayDate();