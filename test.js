const disneydex = document.getElementById('disneydex');
const cachedPokemon = {};

const fetchPokemon = async () => {
    const url = `https://api.disneyapi.dev/character?page=10?pageSize=10`;
    const res = await fetch(url);
    const disney = await res.json();
    const pokemon = disney.data.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: data.imageUrl
    }));
   
    displayPokemon(pokemon);
    console.log(pokemon);
};
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) =>
                `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.name}</h2>
        </a>
    </li>
        `
        )
        .join('');
    disneydex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        cachedPokemon[id] = pokeman;
        displayPokemanPopup(pokeman);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
};

const displayPokemanPopup = (pokeman) => {
    // console.log(pokeman);
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">X</button>
            <div class="details">
                <img class="card-image" src="${
                    pokeman.sprites['front_default']
                }"/>
                <h2 class="card-title">${pokeman.name}</h2>
                <p><span class="type-pill">${type}</span> | Height:</small> ${pokeman.height} | Weight: ${pokeman.weight}</p>
            </div>
        </div>
    `;
    disneydex.innerHTML = htmlString + disneydex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();