function merge_sort(arr) {

    //Ordina un array in maniera crescente utilizzando l'algoritmo di ordinamento Merge Sort

    //Divide: trova la metà della lista e le divide in sotto liste
    //Conquer: ordina ricorsivamente le sotto liste create nello step precedente    
    //Combine: unisce le sotto liste ordinate per creare una lista ordinata finale
    
    //La funzione principale impiega tempo O(n log n)
    //


   if(arr.length<=1){  
    return arr; //Caso base: se l'array ha lunghezza 0 o 1, è già ordinato
   }


   //Funzione per dividere l'array in due parti
   //Impiega tempo O(log n) per dividere l'array
   //perciò il tempo cresce in maniera logaritmica quindi dipende dalla lunghezza dell'array

   function splitList(arr){
    const half = Math.floor(arr.length/2); //Trova la metò dell'array
    const left = arr.slice(0, half);
    const right = arr.slice(half);

     return [left, right];
   }


   



    //Funzione per unire due array ordinati in un unico array ordinato

    //Questa funzione impiega tempo O(n) perchè deve scorrere tutti gli elementi di entrambi gli array
    //Quindi il tempo di esecuzione cresce linearmente con la lunghezza totale degli array

    function merge(left, right){
        const result=[]; //Array che conterrà il risultato finale
        let i = 0; //Indice per l'array left
        let j=0; //Indice per l'array right



    //Ciclo di while per confrontare due elementi.
    //Aggiunge l'elemento più piccolo all'array result e incrementa l'indice corrispondente

    while(i<left.length && j<right.length){
        //Condizione if per verificare se l'elemento nell'array left è minore di quello nell'array right
        if(left[i] < right[j]){
            //In caso affermativo, aggiunge l'elemento di left a result.
            result.push(left[i])
            //Incrementa l'indice i per passare al prossimo elemento di left
            i++;
        }else{
            //In caso i > j, aggiunge l'elemento di right a result
            result.push(right[j]);
            //Incrementa l'indice j per passare al prossimo elemento di right
            j++;
            
        }
    }


    //While per assicurarsi che tutti gli elementi di left e right vengano aggiunti a result
    //Questa condizione è necessaria perché uno dei due array potrebbe avere elementi rimanenti dopo il ciclo principale
    //ad esempio quando dividiamo un array con un numero dispari di elementi


    while(i<left.length){
        result.push(left[i]);
        i++;
    }

    while(j<right.length){
        result.push(right[j]);
        j++;
    }


    return result; //Ritorna l'array ordinato

}

const splitted = splitList(arr);
const leftSplit = splitted[0];
const rightsplit = splitted[1];


//MOLTO IMPORTANTE: la funzione merge_sort viene chiamata ricorsivamente su entrambe le metà dell'array
//Questo è il passo "Conquer" dell'algoritmo Merge Sort
//senza questa chiamata ricorsiva, l'algoritmo non funzionerebbe correttamente essendo che non ordina le sotto liste
return merge(
    merge_sort(leftSplit),
    merge_sort(rightsplit)
)

}


//Funzione per verificare se un array è ordinato in maniera crescente

function verify(list){
    const l = list;
    //Caso base: se l'array è vuoto o ha un solo elemento, è considerato ordinato
    if(l.length == 0 || l.length == 1) return true;

    //Controlla se il primo elemento è minore del secondo.
    // se true chiama ricorsivamente la funzione sul resto dell'array
    //diminuiamo l'array di 1 elemento ad ogni chiamata ricorsiva fino alla fine della lista
    return l[0] < l[1] && verify(l.slice(1, l.length))
}




const lista = [38, 27, 43, 3, 9, 82, 10,1,5,514,51,15,157,1451,48,841,154,5418,41541,8718];

console.log(verify(lista)) //Deve restituire false
console.log(merge_sort(lista)) //Deve restituire l'array ordinato
console.log(verify(merge_sort(lista))) //Deve restituire true

