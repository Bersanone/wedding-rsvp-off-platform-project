let fs = require('fs');



//algoritmo ricorsivo per sommare tutti i numeri all'interno di un array

function sumNumbers(n) {
     
    //Ci assicuriamo che l'array non sia vuoto

    if(n.length === 0) return 0;

    //Prendiamo tutti i numeri tranne il primo

    let summed = sumNumbers(n.slice(1));

    //Restituiamo il primo numero più la somma degli altri numeri in modo ricorsivo

    return n[0] + summed;

}


//console.log(sumNumbers([10,5,8,9,11]))









//Algoritmo di quicksort
//Da una lista di numeri prende il primo numero e lo usa come pivot
//Tutti i numeri più piccoli del pivot vanno a sinistra, tutti i numeri più grandi del pivot vanno a destra
//Ripete il processo in modo ricorsivo per ogni parte della lista fino a quando non rimane un solo numero o la lista è vuota
//Restituisce la lista ordinata

function quicksort(n){

    //Se la lista è vuota o contiene un solo elemento, è già ordinata

    if(n.length <= 1) return n; 

    //Creiamo due liste vuote per i numeri minori e maggiori del pivot

    let less_than_pivot = [];
    let greater_than_pivot = [];

    //Prendiamo il primo numero come pivot (numero di riferimento per il confronto e l'ordinamento)
    
    let pivot = n[0];


    //Loop per confrontare gli altri numeri con il pivot

    for(let i = 1; i < n.length; i++)
        if(n[i] <= pivot){
            //Se il numero è minore o uguale al pivot, lo aggiungiamo alla lista dei numeri minori
            less_than_pivot.push(n[i]);
        } else {
            //Se il numero è maggiore del pivot, lo aggiungiamo alla lista dei numeri maggiori
            greater_than_pivot.push(n[i]);
        }


        //Chiamata ricorsiva per continuare a dividere le liste fino a quando non rimaniamo con il caso base
        //Concatena i risultati in un'unica lista ordinata

        return quicksort(less_than_pivot).concat([pivot], quicksort(greater_than_pivot));


}


//console.log(quicksort([10,5,8,9,11]))



//Ricerca lineare di stringhe in un array

let arrai = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


function ricerca_lineare(arr, target){
    for(let i = 0; i<arr.length; i++){
        if (target === arr[i]){
            return arr.indexOf(arr[i]);
        } 

    }


    return null // <-- CORRETTO
}


//console.log(ricerca_lineare(arrai, 'f'));





//Quick sort dell'alfabeto disordinato

let alfabeto_disordinato = ['d', 'a', 'c', 'f', 'b', 'e', 'h', 'g', 'j', 'i', 'l', 'k', 'n', 'm', 'p', 'o', 'r', 'q', 't', 's', 'v', 'u', 'x', 'w', 'z', 'y'];

// Array di 50 nomi fittizi
let nomi_fittizi = [
    "Luca", "Marco", "Giulia", "Francesca", "Alessandro", "Martina", "Davide", "Sara", "Simone", "Chiara",
    "Matteo", "Elisa", "Andrea", "Valentina", "Giorgio", "Federica", "Stefano", "Alice", "Riccardo", "Ilaria",
    "Michele", "Laura", "Antonio", "Silvia", "Roberto", "Paola", "Fabio", "Elena", "Daniele", "Marta",
    "Giovanni", "Angela", "Emanuele", "Beatrice", "Nicola", "Veronica", "Tommaso", "Camilla", "Filippo", "Serena",
    "Alberto", "Noemi", "Gabriele", "Gloria", "Pietro", "Rosa", "Salvatore", "Anna", "Massimo", "Claudia"
];





function quicksort_alfabeto(n){

    //Se la lista è vuota o contiene un solo elemento, è già ordinata

    if(n.length <= 1) return n; 

    let less_than_pivot = [];
    let greater_than_pivot = [];
    
    let pivot = n[0];


    //Loop per confrontarte io numeri con il pivot

    for(let i = 1; i < n.length; i++)
        if(n[i] <= pivot){
            less_than_pivot.push(n[i]);
        } else {
            greater_than_pivot.push(n[i]);
        }


        //Chiamata ricorsiva per continuare a dividere le liste fino a quando non rimaniamo con il caso base
        //Concatena i risultati in un'unica lista ordinata

        return quicksort(less_than_pivot).concat([pivot], quicksort(greater_than_pivot)).join('\n'); //aggiungiamo join per stampare ogni elemento su una nuova riga 


}



//console.log(quicksort_alfabeto(alfabeto_disordinato));
//console.log(quicksort_alfabeto(nomi_fittizi));






//Ricerca binaria


let arr = fs.readFileSync('sorted.txt', 'utf-8').split('\n').map(line => line.trim());

function binary_search(arr,target){
    let start = 0;
    let end = arr.length - 1;

    while(start <= end){
     let mid = Math.floor((start + end) / 2);
        if(arr[mid] === target){
            return mid;
        }else if(arr[mid] < target){
            start = mid +1;
        }else if(arr[mid] > target){
            end = mid -1;
        }
    }
    return null;
}

console.log(binary_search(arr, 'Alberto'));