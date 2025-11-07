let lista = [1,2,3,5,4]

let primo = lista[0]


//Iterazione di un array con for, l'algoritmo itera in modo lineare sulla lista,
//Verifica se un determinato elemento è presente nell'array
//e stampa a video se l'elemento è stato trovato o meno

for (let i = 0;i < lista.length;i++){
    if(15 === lista[i]){
        console.log('trovato')
    } else {
        console.log('non trovato')
    }

    //L'utilizzo di break interrompe l'iterazione al primo riscontro positivo evitando ulteriori operazioni inutili
    //MOLTO IMPORTANTE
    break
}



//Aggiungere un elemento alla fine di un array    

lista.push(60,15,35);

console.log(lista);


//Aggiungere un elemento estendendo l'array

let numbers = [];
numbers[numbers.length] = [5,8,9,58,284,12,45,78,96,32,14,25,47,89,41,36,74,22,11,3];

console.log(numbers);







