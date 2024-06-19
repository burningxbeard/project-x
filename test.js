console.log('First console dot log')
const fetchDisney = async () => {
    const url = 'https://api.disneyapi.dev/character?page=30&pageSize=5';
    const response = await fetch(url);
    const disney = await response.json();
    const character = disney.data.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: data.imageUrl,
        url: url,
    }));
    console.log(character)
    
};

fetchDisney();
