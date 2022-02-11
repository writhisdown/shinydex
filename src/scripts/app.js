import {getPokemonData} from './pokemon';

import {clearBtn, clearSearch, searchPokeDex} from './search';

getPokemonData();

searchPokeDex();

clearBtn.addEventListener('click', clearSearch);
