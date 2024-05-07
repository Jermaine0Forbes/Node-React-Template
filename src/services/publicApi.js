
const defaultArgs = {
    begin:1,
    end:1000,
    debug:true,
};

const getRandBtwn = (begin, end) => {
    return Math.floor(Math.random() * end) + begin;

};

export const randomizeArr = (arr) => {
    const last = arr.length - 1;
    const entries = [];
    const randArr = [];
    let x = 0;

    while( x < arr.length){

        let rand = getRandBtwn(0, last);
        if(entries.some((e) => e == rand)){
            continue;
        }
        entries.push(rand);
        randArr.push(arr[rand]);
        x++;
    }

    return randArr;
}

export const uniqueKey = () => Date.now() * Math.random();

export const convStat = (stat) => {
    return (stat * 0.1).toFixed(1);
}

export const getInch = (meter) => {
    return Math.floor(convStat(meter) * 39.36);
}

export const getPound = (weight) => {
    return Math.floor(convStat(weight) * 2.2);
}

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
  if(args?.debug){
    console.log(pokeArr);
  }

  setPokemon(pokeArr);
}