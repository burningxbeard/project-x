const disneydex = document.getElementById('disneydex');
const cachedCharacter = {};

const fetchCharacter = async () => {
    const url = `https://api.disneyapi.dev/character?page=20&pageSize=10`;
    const res = await fetch(url);
    const disney = await res.json();
    const character = disney.data.map((data, index) => ({
        name: data.name,
        image: data.imageUrl,
        id: index + 1

    }));

    // console.log(character);
    displayCharacter(character);
};
const displayCharacter = (character) => {
    const disneyHTMLString = character.map((dischar) =>
                `
    <li class="card" onclick="selectCharacter(${dischar.id})">
        <img class="card-image" src="${dischar.image}"/>
        <h2 class="card-title">${dischar.name}</h2>
        </a>
    </li>
        `
        )
        .join('');
    disneydex.innerHTML = disneyHTMLString;
};

const selectCharacter = async (id) => {
    if (!cachedCharacter[id]) {
        const url = `https://api.disneyapi.dev/character/${id}`;
        const res = await fetch(url);
        const dischar = await res.json();
        cachedCharacter[id] = dischar;
        displayCharacterPopup(dischar);
    } else {
        displayCharacterPopup(cachedCharacter[id]);
    }
};

const displayCharacterPopup = (dischar) => {
    // console.log(character);
    // const film = dischar.data.map((film) => film.data.films).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">X</button>
            <div class="details">
                <img class="card-image" src="${dischar.image}"/>
                <h2 class="card-title">${dischar.name}</h2>
                <p><span class="type-pill">you're a loser</span></p>
            </div>
        </div>
    `;
    disneydex.innerHTML = htmlString + disneydex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchCharacter();