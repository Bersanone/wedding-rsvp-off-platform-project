//priority queue

//una coda di priorità è una struttura dati astratta simile a una coda o a uno stack, ma con una differenza fondamentale: ogni elemento ha una "priorità" associata. Gli elementi con priorità più alta vengono estratti prima degli elementi con priorità più bassa, indipendentemente dall'ordine in cui sono stati inseriti.
//In una coda di priorità, gli elementi vengono solitamente rappresentati come coppie (valore, priorità), dove "valore" è l'elemento effettivo e "priorità" è un numero o un altro criterio che determina l'ordine di estrazione degli elementi.
//la priorità può essere rappresentata in vari modi, ad esempio con numeri interi (dove un numero più basso indica una priorità più alta) o con stringhe (dove l'ordine alfabetico determina la priorità).
//In questo caso non utilizziamo la priorità perchè ordiniamo in ordine decrescente

//in questa implementazione utilizzeremo gli array comne strutture dati


class priorityQueue {
    constructor(){

        
        this.heap = [];
        
        
        //Il metodo Map ci permette di memorizzare coppie chiave-valore
        //Si basa su un hash table per memorizzare le chiavi e i valori associati
        //In questo modo possiamo tenere traccia della posizione di ogni elemento nell'heap in o(1)
        //Quando un valore viene passatto a map viene convertito in una chiave hash che viene utilizzata per accedere rapidamente al valore associato
        //Grazie a questo possiamo evitare di dover cercare l'elemento nell'heap ogni volta che vogliamo aggiornarne la posizione

        this.priority = new Map()
        this.size = 0;
        this.capacity = 20;


    }


    //Metodo per verificare se la coda è vuota

    isEmpty(){
        return this.size === 0;
    }

    //pulisce heap e queue

    clear(){
        this.size = 0;
        this.priority.clear();
        this.heap = [];
    }

//restituisce l'heap

  showHeap(){
    return this.heap
  }


  //Restituisce il valore con la priorità più alta

peek(){
    if(this.isEmpty()){
        return null
    }
    return this.heap[0]
}


//Rimuove il primo valore

//In gergo viente chiamato poll

poll(){

    if(this.isEmpty()){
        return null
    }
    return this.removeAt(0)
}


//Controlla se un elemento è presente all'interno di una lista

isPresent(element){
    if(element === null){
        return false
    }

    //utilizziamo il metodo has di map per verificare se l'elemento è presente
    //in o(1)

    return this.priority.has(element)


}


//Aggiunge un elemento alla lista


add(element){
  
    if(element === null){
        throw new Error('Impossibile aggiungere null');
    }

    if(this.size < this.capacity){
         this.heap[this.size] = element
    } else {
        this.heap.push(element);
    }

    //Cancelliamo la vecchia posizione dell'elemento e ne assegniamo una nuova

    this.priority.set(element,this.size)

    //Facciamo risalire l'elemento appena inserito

    this.swim(this.size);

    this.size++;


}


//metodo per confrontare due nodi

less(i,j){

    let node1 = this.heap[i]
    let node2 = this.heap[j]

    return node1 < node2

}

//utilizziamo questo metodo per scambiare il valore da due array

swap(a,b){

   let node1 = this.heap[a];
   let node2 = this.heap[b];

   //Scambiamo i valori nell'array

   this.heap[a] =node2
      this.heap[b] =node1

        //Aggiorniamo anche le posizioni nella mappa

      this.priority.set(node1,b);
      this.priority.set(node2,a)

}


//Risale il nodo in o(log(n))




swim(k){

    //Utilizziamo questa formula per risalire l'heap

    /*
          A (indice 0)
     /   \
  B (1)   C (2)
 /   \     /   \
D(3) E(4) F(5) G(6)
  */ 

//sotrraendo un dal figlio di sinitra e dividendolo per 2
//otteniamo il genitore

    let parent = Math.floor((k-1) / 2);

    //continuiamo a salire finchè non raggiungiamo la fine
    //e rimaniamo minori rispetto al parent

    while(k>0 && this.less(k,parent)){
        this.swap(parent,k);

        k = parent

        parent = Math.floor((k-1)/2)
    }

}


    sink(i){

        //utilizziamo il ciclo while con true
        //se una di queste condizioni non viene rispettata diventa false uscendo dal ciclo

while(true){        //assegnamo sinistra e destra secondo lo schema di prima

        let left = 2*i+1
        let right = 2*i+2

        //assumiamo che il nodo left sia minore

        let smallest = left


        //verifichiamo che non siamo fuori dalla lsita
        //se right è minore lo impostiamo come smallest

        if(right < this.size && this.less(right,left)) smallest = right;

        //Se siamo fuori dalla lista 

        if(left >= this.size || this.less(i,smallest)) break


        //scendiamo tutto il nodo seguendo l'elemento più piccolo

        this.swap(smallest,i);

        i =smallest



}


    }








    //metodo per rimuovere un elemento

    removeAt(i){



        if(this.isEmpty()) return null;

        //riduciamo la grandezza della lista

        this.size--;

        //scambiamo l'elemento da rimuovere con l'ultimo elemento

         this.swap(i,this.size)
       

         //rimuoviamo l'ultimo elemento utilizzando .pop()
         //in questo modo otteniamo un o(1) per rimuovere l'elemento

        
        let removedData = this.heap.pop();

        this.priority.delete(removedData);

       
        //se stiamo rimuovendo l'ultimo elemento non dobbiamo fare altro


        if(i === this.size) return removedData;

      

        //otteniamo l'elemento che abbiamo spostato nella posizione i
        

        let elem = this.heap[i];

        //Proviamo a far scendere l'elemento

        this.sink(i)

        //Se l'elemento non si è mosso proviamo a farlo risalire

        if(this.heap[i] === elem) this.swim(i)


            //Ritorniamo il dato rimosso


            return removedData



    }





    //Funzione di test per verificare se la condizione dell'heap viene rispettata

    isMinHeap(i){

        let size = this.size;

        if(i>=size) return true;

        let left = 2*i+1;

        let right = 2*i+2;




        //Controlliamo che i nostri heap non eccedano 
        //la grandezza dell'heap e che rispettino la condizione di minHeap


        if(left < size && !this.less(i,left)) return false;

        if(right < size && !this.less(i,right)) return false;




        //Chiamiamo ricuresivamente le funzioni
        


        return this.isMinHeap(left) && this.isMinHeap(right)







    }

    
}



let pq = new priorityQueue();

pq.add(10);
pq.add(4);
pq.add(15);
pq.add(20);
pq.add(2);



console.log('heap inizale', pq.showHeap());

console.log('Priorità piu alta', pq.peek());


console.log('Heap rimosso', pq.poll())







