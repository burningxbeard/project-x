const pokedex = document.getElementById('pokedex');
const cachedPokemon = {};

const fetchPokemon = async () => {
    const url = `https://api.disneyapi.dev/character?page=10&pageSize=2`;
    const res = await fetch(url);
    const disney = await res.json();
    const pokemon = disney.data.map((data) => ({
        name: data.name,
        id: data._id,
        image: data.imageUrl,
        url: data.url
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
        <img class="card-image" src="${pokeman.image}" title="displayImage function" />
        <h2 class="card-title">${pokeman.id} ${pokeman.name}</h2>
        <h2 class="card-title">${pokeman.url}</h2>
        </a>
    </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://api.disneyapi.dev/characters/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        cachedPokemon[id] = pokeman;
        displayPokemanPopup(pokeman);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
};

const displayPokemanPopup = (pokeman) => {
    console.log(pokeman, 'asshole');
    // const movie = pokeman.films.map((type) => movie.films.name).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">X</button>
            <div class="details">
                <img class="card-image" src="${pokeman.image}" title="image popup"/>
                <h2 class="card-title">${pokeman.name}</h2>
                <p><span class="type-pill">hello</span></p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();