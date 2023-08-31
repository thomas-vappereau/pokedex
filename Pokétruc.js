let poketableau = [];
let weaknesses = [];

async function run() {
    await getPokemons();
	await getWeakness();
	renderPokemon(poketableau,weaknesses);
}

run()

async function getPokemons() {
    let result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1010");
    let promises = [];
    result.data.results.map(function (pokemon) {
        promises.unshift(axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name));

    });
    poketableau = await Promise.all(promises);
	console.log(poketableau);
}

async function getWeakness(){
	let result = await axios.get("https://pokeapi.co/api/v2/type?limit=18");
	let promises = [];
	result.data.results.map(function (type) {
		promises.unshift(axios.get("https://pokeapi.co/api/v2/type/" + type.name));
	});

	weaknesses = await Promise.all(promises);
	console.log(weaknesses);
}

function renderPokemon(poketableau) {
    poketableau.map(function (result) {
		let NAME = result.data.name;
		let ID = result.data.id;
		let IMG = result.data.sprites.other["official-artwork"].front_default;
		
		let types = getTypes(result.data.types);

		let TYPES = '';
		types.map( function (types){
			TYPES = TYPES + `<td><img class="type" src="./IMG/`+types+`.png"/></td>`;
		});

		let HP = result.data.stats[0].base_stat;
		let ATK = result.data.stats[1].base_stat;
		let DEF = result.data.stats[2].base_stat;
		let SPEATK = result.data.stats[3].base_stat;
		let SPEDEF = result.data.stats[4].base_stat;
		let SPD = result.data.stats[5].base_stat;
		
        let affichage =
            `<tr>
				<td><img id="artwork" src=`+IMG+`></td>
				<td id="name">`+NAME+`</td>
				<td id="id">`+ID+`</td>
				<td><table id="type"><tr>`+TYPES+`</tr></table></td>
				<td>
					<table>
						<tr>
							<td class="stat-label">HP</td>
							<td>`+HP+`</td>
						  
						</tr>
						<tr>
							<td class="stat-label">Attack</td>
							<td>`+ATK+`</td>
						</tr>
						<tr>
							<td class="stat-label">Defense</td>
							<td>`+DEF+`</td>
						</tr>
						<tr>
							<td class="stat-label">SPE Attack</td>
							<td>`+SPEATK+`</td>
						</tr>
						<tr>
							<td class="stat-label">SPE Defense</td>
							<td>`+SPEDEF+`</td>
						</tr>
						<tr>
							<td class="stat-label">Speed</td>
							<td>`+SPD+`</td>
						</tr>
					</table>
				</td>
			</tr>`
        pokearray.insertAdjacentHTML('afterbegin', affichage);
    })
}

function getTypes(types) {
    let TYPE = [];
	types.map(function (types) {
		TYPE.push(types.type.name);
    });
    return TYPE;
}