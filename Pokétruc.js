let pokearray = document.getElementById("pokearray")
let poketableau = []
let types = []

async function run() {
    await getPokemons()
    renderPokemon(poketableau)
}

run()

async function getPokemons() {
    let result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1008");
    let promises = [];
    result.data.results.map(function (pokemon) {
        promises.unshift(axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name));

    });
    poketableau = await Promise.all(promises);
}

function renderPokemon(poketableau) {
    poketableau.map(function (result) {
		var NAME = result.data.name;
		var ID = result.data.id;
		
		if (ID == 108) {
			var IMG = './antoine.png';
		}
		
		var IMG = result.data.sprites.other["official-artwork"].front_default;
		
		var TYPE = getTypes(result.data.types);
		
		var HP = result.data.stats[0].base_stat;
		var ATK = result.data.stats[1].base_stat;
		var DEF = result.data.stats[2].base_stat;
		var SPEATK = result.data.stats[3].base_stat;
		var SPEDEF = result.data.stats[4].base_stat;
		var SPD = result.data.stats[5].base_stat;
		
        let affichage =
            `<tr>
				<td><img id="artwork" src=`+IMG+`></td>
				<td id="name">`+NAME+`</td>
				<td id="id">`+ID+`</td>
				<td><table><tr>`+TYPE+`</tr></table></td>
				<td>
					<table>
						<tr>
							<td>HP</td>
							<td>`+HP+`</td>
						  
						</tr>
						<tr>
							<td>Attack</td>
							<td>`+ATK+`</td>
						</tr>
						<tr>
							<td>Defense</td>
							<td>`+DEF+`</td>
						</tr>
						<tr>
							<td>Special Attack</td>
							<td>`+SPEATK+`</td>
						</tr>
						<tr>
							<td>Special Defense</td>
							<td>`+SPEDEF+`</td>
						</tr>
						<tr>
							<td>Speed</td>
							<td>`+SPD+`</td>
						</tr>
					</table>
				</td>
			</tr>`
        pokearray.insertAdjacentHTML('afterbegin', affichage);
    })
}

function getTypes(types) {
    let a = "";
    types.map(function (type) {
        a = a + `<td id="type">${type.type.name}</td>`
    });
    return a;
}