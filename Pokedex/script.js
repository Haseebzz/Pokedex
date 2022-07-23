const totalPokemon = 494;
let pokedex = {};
const listo = document.getElementById("pokemon-list");

window.onload = async function(){
    for(let i = 1;i<=totalPokemon;i++){
    await getPokemon(i);
    let pokemon = document.createElement('div');//<div>
    pokemon.id = i;
    pokemon.classList.add('pokemon-name');
    pokemon.addEventListener('click', update);
    pokemon.innerText = i.toString() + '.' +pokedex[i]['name'].toUpperCase();
    listo.append(pokemon);
}
   document.getElementById('pokemon-description').innerText = pokedex[1]['desc'];

   //console.log(pokedex);
}

let url = 'https://pokeapi.co/api/v2/pokemon/';
async function getPokemon(num){
    let res = await fetch(url + num.toString());
    let resData = await res.json();
    //console.log(resData);

    let pokemonName = resData.name;
    let pokemonType = resData.types;
    let pokemonImg = resData.sprites.front_default;
    
    res = await fetch(resData.species.url);
    let pokemonDescription = await res.json();
    pokemonDescription = pokemonDescription.flavor_text_entries[9].flavor_text;

    pokedex[num] = {'name': pokemonName, 'img': pokemonImg, 'types': pokemonType, 'desc': pokemonDescription};
}

function update(){
    document.getElementById('pokemon-image').src = pokedex[this.id]['img'];

    let typesDiv = document.getElementById('pokemon-type');

    while(typesDiv.firstChild){
        typesDiv.firstChild.remove()
    }

    let types = pokedex[this.id]['types'];

    for(let i = 0;i<types.length;i++){
        let type = document.createElement('span');
        type.innerText = types[i]['type']['name'].toUpperCase();
        type.classList.add('type-box');
        type.classList.add(types[i]['type']['name']);
        typesDiv.append(type);
    }
    document.getElementById('pokemon-description').innerText = pokedex[this.id]['desc'];
}