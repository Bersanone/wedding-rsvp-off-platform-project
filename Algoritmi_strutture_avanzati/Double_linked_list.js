//Costruiamo una classe che reppresenta i nodi della lista

class node{
    constructor(data,prev,next){

        //Definizione delle proprietà per collegare e rappresentare i nodi


        this.data = data;
        this.next = next;
        this.prev = prev
    }

}





class DoubleLinkedList{

    //Definzione dei costruttori per la rappresentazione della lista

    constructor(){
        this.size = 0;
        this.head = null;
        this.tail = null
    }




    //Grandezza della lista


    sizeOfList(){
        return this.size
    }


    //is empty?

    isEmpty(){
        
       if(this.size === 0){
        return true
       }else{
        return false
       }
    }


    //Pulizia della lista

    emptyList(){

        //Uso un puntatore per scorrere la lista

        let p = this.head

        //Scorre la lista fino alla fine

        while(p !== null ){
            

            //azzero i puntatori e i dati del nodo
            p.next = null;
            p.prev = null;
            p.data = null;


            //sposto il puntatore al nodo successivo

            p = p.next;

        }

        //Azzero i puntatori di head e tail e la grandezza della lista

        this.head = null;
        this.tail = null;
        this.p = null;

        return this.size

    }


    //Aggiungere un elemento all'inizio della lista


    addFirst(data){

        //Se la lista è vuota creo un nuovo nodo e lo assegno sia a head che a tail essendo una lista singola
        if(this.isEmpty()){
            const newNode = new node(data) 
            this.head = newNode
            this.tail = newNode
        }
        
        //Se la lista non è vuota creo un nuovo nodo e lo assegno a head e sistemo i puntatori
        else{
            //Creo un nuovo nodo e imposto il next al vecchio head
         const newNode =  new node(data,this.head)
           //Sistemo il puntatore prev del vecchio head al nuovo nodo, lo faccio perchè essendo il primo nodo non puo avere un prev se non se stesso
           this.head.prev = newNode;
              //Assegno il nuovo nodo a head
           this.head = newNode
        }

        //Incremento la grandezza della lista

        this.size++
        
    }


    //Aggiungi un elemento alla fine della lista


    addLast(data){
        //Se la lista è vuota creo un nuovo nodo e lo assegno sia a head che a tail essendo una lista singola
        if(this.isEmpty()){
            const newNode = new node(data);
            this.head = newNode
            this.tail = newNode
        }else {
            //Creo un nuovo nodo e imposto il prev al vecchio tail
            const newNode = new node(data,this.tail,null);
            //Sistemo il puntatore next del vecchio tail al nuovo nodo, lo faccio perchè essendo l'ultimo nodo non puo avere un next se non se stesso
            this.tail.next = newNode
            //Assegno il nuovo nodo a tail
            this.tail = newNode
        }

        //Incremento la grandezza della lista

        this.size++;
    }





    //Selezioona il primo elemento della lista

    peekFirst(){
        if(this.isEmpty()){ throw console.error("Impossibile selezionare il primo elemento in una lista vuota")}
        
        else{return this.head.data}
    }




    //Seleziona l'ultimo elemento della lista


    peekLast(){
        if(this.isEmpty()){throw console.error("Impossibile selezionare l'ultimo elemento in una lista vuota")}
    
        else{return this.tail.data}

}








//Rimuove il primo valore della lista

removefirst(){
    
    //imposto una variabile che salva il dato del nodo che sto per eliminare
    let data = this.head.data


    //Se la lista è vuota non posso eliminare nulla

    if(this.isEmpty()){
        this.tail = null
        this.head = null
        throw console.error("Impossibile eliminare il primo elemento in una lista vuota")
    }else{

        
      //Sistemo i puntatori di head al nodo successivo del vecchio head e azzero il prev del nuovo head
        this.head = this.head.next
        this.head.prev = null
       
    }

        //Decremento la grandezza della lista

    this.size--

    //Ritorno il dato del nodo eliminato

    return data
}










//Rimuove l'ultimo elemento di una lista



   

removeLast(){

    //imposto una variabile che salva il dato del nodo che sto per eliminare

    let data = this.tail.data

    //Se la lista è vuota non posso eliminare nulla

        if(this.isEmpty()){
        this.tail = null
        this.head = null
        throw console.error("Impossibile eliminare l'ultimo elemento in una lista vuota")
    }else{


        //Sistemo i puntatori di tail al nodo precedente del vecchio tail e azzero il next del nuovo tail
       
        this.tail = this.tail.prev
        this.tail.next = null
        

      
    }

    //Decremento la grandezza della lista
     this.size--;


    //Ritorno il dato del nodo eliminato
    return data

}









//Rimuove un nodo

remove(node){


    //Se il nodo non ha un prev è perforza il primo nodo della lista e lo elimino con la funzione apposita


    if(node.prev === null) return this.removefirst();


    //Se il nodo non ha un next è perforza l'ultimo nodo della lista e lo elimino con la funzione apposita
        if(node.next === null) return this.removeLast();


        //aggiustamento dei puntatori


        //imposto il next del nodo precedente al nodo successivo del nodo da eliminare

        node.prev.next = node.next

        //imposto il prev del nodo successivo al nodo precedente del nodo da eliminare
        node.next.prev = node.prev


        const data = node.data


        //Azzero i puntatori e i dati del nodo


        node.data = null
        node.prev = null
        node.next = null


        //Decremento la grandezza della lista


        this.size--;


        return data


}







  

//Rimuove un nodo tramite un index



removeAt(index){
    

    if(index < 0 || index >= this.sizeOfList()) return console.log('Index non valido')


        let i;

        let trav;

    

        //Ottimizzazione della ricerca del nodo, se l'index è nella prima metà della lista parto da head altrimenti parto da tail


if(index < this.sizeOfList()/2){
    trav = this.head

    //Se index è minore della metà della lista scorro la lista fino a raggiungere l'index
    for(i = 0;i !== index;i++){

        //Sposto il puntatore al nodo successivo
        trav = trav.next

    }
} else {

    //Se index è maggiore della metà della lista scorro  la lista a ritroso fino a raggiungere l'index
    trav = this.tail
    for(i = this.sizeOfList()-1; i !== index; i--){

        //Sposto il puntatore al nodo precedente
        trav = trav.prev
    }
}

//Rimuovo il nodo trovato con la funzione apposita

return this.remove(trav)

}






//Rimuove un nodo tramite il dato contenuto


removeData(data){
    let t = this.head
//Scorro la lista fino alla fine

   while(t !== null){

        //Se trovo il dato lo elimino con la funzione apposita e ritorno true
    if(t.data === data){
        this.remove(t)
        
      return true
    }

    //Sposto il puntatore al nodo successivo
      t = t.next

   }

    return false
}









//Trova l'index di un nodo tramite il valore

indexOf(data){
    
    let index = 0;
    let t = this.head;
    

    //Scorro la lista fino alla fine
    while( t !== null){

        //Se trovo il dato ritorno l'index
        if(t.data === data){
            return index;
        }

        //Sposto il puntatore al nodo successivo e incremento l'index
        index++;
        t = t.next
    }

    return -1

}







//controlla se un nodoè presente nella lista oppure no


isHere(data){
return this.indexOf(data) !== -1;

}



//stampa la lista


lisToString(){

    if(this.isEmpty()){
        return "[]"
    }

    let result = "[";

    let t = this.head



    while(t !== null){
       result += t.data;
       result += ', ';
       t = t.next
    }


    result += ']';

    return result


}


}









const l = new DoubleLinkedList();

l.addFirst(2);
l.addLast(5);
l.addLast(95);
l.addLast(950);
l.addLast(975);
l.addLast(195);
l.addLast(9455);

l.removeLast()

console.log(l.sizeOfList()
)

console.log(l.lisToString())


