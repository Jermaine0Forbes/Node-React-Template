
const defaultArgs = {
    begin:1,
    end:1000,
    debug:true,
};

const getRandBtwn = (begin, end) => {
    return Math.ceil(Math.random() * end) + begin;

};

export const getNames = (arr) => arr.map((e) => e.name);

export const randomizeArr = (arr) => {
    const length = arr.length - 1;
    const entries = [];
    const randArr = [];
    let x = 0;
    let rand = 0;
    let last = length;
    let split = x.length % 2 === 0 ? x.length/2 : Math.floor(x.length/2)+x.length % 2 ;
    const firstHalf = shouldReverse(arr.slice(0, split));
    const secondHalf = shouldReverse(arr.slice(split));



    for(x; x <= length; x++){
        last =  arr.length - 1;  
        rand = getRandBtwn( 0, last);

        // if(entries.some((e) => e == rand)){
        //     continue;
        // }
        entries.push(rand);
        randArr.push(arr[rand]);
        arr.splice(rand,1);
    }
    console.log('entries')
    console.log(entries)

    return randArr;
}

const shouldReverse = (arr) => {
   return  getRandBtwn(1, 50) > 25? arr.reverse() : arr; 
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