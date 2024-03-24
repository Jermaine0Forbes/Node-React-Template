
const defaultArgs = {
    begin:1,
    end:1000,
};

const getRandBtwn = (begin, end) => {
    return Math.floor(Math.random() * end) + begin;

};

export const getDiffNumArr = (amount, args)  => {
    
    const arr  = [];
    const {begin, end} = args;
    let num = 0;


    while( 0 < amount) {
        num = getRandBtwn(begin, end);
        if(arr.some(n => n === num)) {
            continue;
        }else{
            arr.push(num);
            amount--;
        }

    }

    return arr;
}

export const publicApi = async (api) => {
    const result = await fetch(api);
    
    if(result.ok){
        return result.json();
    }

     console.error(result.error());
     return false;
}


export const pokeApi = (id) => {

    return "https://pokeapi.co/api/v2/pokemon/"+id;

}

export const getPokemon = async (amount, setPokemon,  args = defaultArgs) => {
  const ids = getDiffNumArr(amount, args);
  const pokeArr = [];
  let api = '';
  let pokemon;

  while( 0 < amount) {
    api = pokeApi(ids[amount-1]);
    pokemon = await publicApi(api);
    if(pokemon){
        pokeArr.push(pokemon);
        amount--;
    }
  }

  setPokemon(pokeArr);
}