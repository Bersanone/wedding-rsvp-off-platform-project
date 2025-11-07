import { linkedList} from "./linked_list.js";









function mergeSort(lista){  
    

//Ordina una linked list in modo crescente
//Divide ricorsivamente la lista in due metà fino a quando ogni sottolista contiene un solo nodo
//unisce in successione le sottoliste ordinate per formare una lista ordinata più grande
//Restituisce una linked list ordinata

if(lista.size() <= 1 || !lista.head || !lista.head.next) return lista; //Caso base: una lista con 0 o 1 nodo è già ordinata


//Chiamata alla funzione split per ottenere le due parti della lista

let {left: leftSplitted, right: rightSplitted} = split(lista);

//Chiamata ricorsiva della funzione mergeSort
//Continua a chiamare fino a che non rimaniamo con il caso base

let left = mergeSort(leftSplitted);
let right = mergeSort(rightSplitted);

//Unisce tutte le sublist in una singola ordinata
return merge(left,right)

function split(lista){

    //Funzione per dividere la linked list in due metà
    //Continua a dividere la lista fino a quando non si raggiunge il caso base



    //nel caso la lista fosse vuota restituisce solo la parte left con il valore di lista
    if(lista == null || lista.head == null){
        const left = lista;
        const right = null;
        return {left, right};
    }else{

        //chiamiamo la funzione size e la dividiamo in duie per trovare il midpoint
        let size = lista.size();
        let mid = Math.floor(size/2);


        //sottraiamo 1 dal midpoint
        //La funzione size restituisce il numero di elemnti in una lista, se teniamo questo numero come index eccede e restituisce errore 
        //Ad esempio una lista di 3 elementi, la funzione size calcola il numero di elementi all'interno della lista perciò 3
        //mentre l'index massimo è 2, perchè il conteggio parte sempre da 0
 
        let midNode = lista.nodeAt(mid -1);
        
        //La parte di sinistra conterra la lista che viene passata dall'input
        let left = lista;

        //Mentre la parte di destra sarà una nuova lista collegata
        let right = new linkedList();

        //Assegniamo il primo valore dopo la lista collegata  all'head della nuova lista
        //Questo serve per collegarle e avere un riferimento coerente
        right.head = midNode.next;

        //Rimuoviamo il next a mid perchè è già stato collegato con right
        midNode.next = null;

        //Restituiamo le altre metà

        return {left, right};
    }
    
}

function merge(left, right){

    //Creiamo un nuova lista che verrà restituita con i numeri ordinati alla fine

    let merged = new linkedList();


    //aggiungiamo un nodo fittizio per semplificare l'unione, poi lo rimuoviamo alla fine

    merged.add(0);

    //Impostiamo il puntatore all'inzio della linked list

    let current = merged.head;


    //Otteniamo i nodi iniziali delle due liste

    let left_head = left.head;
    let right_head = right.head;


    //Continuiamo ad iterare le due liste fino a quando non raggiungiamo la fine di una delle due

    while(left_head || right_head){

        //In caso l'head di left è vuoto consideriamo solo la parte di destra
        
        if(left_head == null){
            current.next = right_head;

            //Aggiorniamo la variabile per continuare a scorrere i nodi e non triggerare la stopping condition
            right_head = right_head.next;

            //Stesso discorso di prima ma al contrario
        }else if(right_head == null){
            current.next  = left_head;
            left_head = left_head.next

            //Se il dato left è minore di quello right viene aggiunto alla nuova lista

        }else if (left_head.data <= right_head.data){
            
            //Aggiorniamo il nodo con il valore minore
            current.next = left_head;

            //Aggiorniamo Head così da poter continuare ad iterare e non fermare il loop

            left_head = left_head.next;

            //Caso contrario
        } else{
            current.next = right_head
            right_head = right_head.next

        }

            current = current.next;


        }

        //Aggiungiamo eventuali rimanenze
        if(left_head){
            current.next = left_head

        } else if(right_head){
            current.next = right_head
        }

        //Sacrtiamo il nodo inizle fittizio che abbiamo creato in precedenza
        //Lo sostituiamo conm il primo elemento della lista merged
        merged.head = merged.head.next

        //Restituiamo la lista ordinata
             return merged;

    }
   



}






let l = new linkedList();

l.add(16);
l.add(4);
l.add(66);
l.add(598);
l.add(81);
l.add(1);
l.add(84581);
l.add(812
);
l.add(481);


l.printList()


const sortedList = mergeSort(l);


sortedList.printList()
