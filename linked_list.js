//Linked List

class Node{

    //Una classe Node rappresenta un nodo singolo in una lista collegata.
    //Il modello ha due attrributi data - e il link che memorizza il riferimento al nodo successivo next
    constructor(data){

        //Assegnare i dati al nodo e inizializza il riferimento al nodo successivo come null
        this.data = data;   //Molto importante, senza questa assegnazione non si leggono i dati

        this.next = null;


     
    }

}

class linkedList{
    constructor(){
        this.head = null;
    }

    //funzione per una lista vuota

    isEmpty(){
        return this.head === null;
    }

    //Controllo delle dimensioni della lista

    size(){

        //Restituisce il numero di nodi nella lista collegata
        //In tempo lineare O(n)


        //Inizializza current con la testa della lista e count a 0
        let current = this.head;
        let count = 0;

        //Il while scorre tutta la lista collegata
        //Si ferma quando current è null, ovvero quando raggiunge la fine della lista

        while(current){
            count++;
            current = current.next;
        }

        return count;
    }

    //aggiungere un nodo all'inizio della lista
    //Questa operazione ha un tempo costante O(1), abbiamo il best case scenario

    add(data){

        //Crea un nuovo nodo con i dati forniti
        const newNode = new Node(data);

        //Imposta il next come la testa attuale della lista
        newNode.next = this.head;

        //Salva il nuovo nodo come la testa della lista
        //Step molto importante, senza non si riesce a collegare il nuovo nodo alla lista
        //Il risultato è che la lista rimane vuota, quindi restituisce sempre 0
        this.head = newNode;

    }


    //Rappresentazione della lista e dei dati in essa contenuti
    //In tempo lineare O(n)

    printList(){
     let node = [];
       let current = this.head;



       //Ciclo while per scorrere tutta la lista collegata
       //Si ferma quando current è null, ovvero quando raggiunge la fine della lista
        while(current){

            //Se il puntatore current è uguale alla testa della lista aggiunge l'etichetta Head
        
            if(current === this.head){
              node.push(`[Head: ${current.data}]`)
            } 
            
            //Se il puntatore current è uguale alla coda della lista aggiunge l'etichetta Tail
            else if(current.next === null){
               node.push(`[Tail: ${current.data}]`)
            } 
            
            //Altrimenti aggiunge solo il dato del nodo

            else {
                node.push(`[${current.data}]`)
            }


            //Aggiorna il puntatore current al nodo successivo
            //Senza questo passaggio il ciclo while non termina mai

            current = current.next;

        

        }

        //Unisce tutti gli elementi dell'array node in una singola stringa separata da " -> "
        //Da mettere fuori dal ciclo while, altrimenti stampa solo il dato della prima iterazione
        return console.log(node.join(" -> "));
    }





    //Ricerca di un nodo tramite chiave (data contenuti nel nodo) nella lista collegata
    //In tempo lineare O(n)


    search(key){
        let current = this.head;


        //Ciclo while per scorrere tutta la lista collegata
        //Si ferma quando current è null, ovvero quando raggiunge la fine della lista

        while(current){
            if(current.data === key){
                return console.log(current);
            } else {
                current = current.next;
            }
        }
        
        return null; // Se il nodo con il valore specificato non viene trovato, restituisce null

    }


    //Restituisce il nodo alla posizione specificata


    nodeAt(index){

        if (index === 0 ){
             return this.head;} //Se l'indice è 0, restituisce la testa della lista
          else{
            let current = this.head;
            let position = 0;

            while(position < index){
                current = current.next;
                position++;
            }
            
            return current; //Restituisce il nodo alla posizione specificata
          }
    }




    //Insereimento di un nodo in una posizione specifica
    //L'inserimento impiega un tempo constante O(1), Ma la ricerca della posizione richiede un tempo lineare O(n)
    //Ad ogni modo, l'operazione complessiva di inserimento in una posizione specifica richiede un tempo lineare O(n)
   
    insert(data, index){

        //Se l'indice è 0, aggiunge il nodo all'inizio della lista
        if(index === 0){
            this.add(data);
            return;
        }


        //Se l'index è negativo, restituisce un errore
        if(index<0){
            return console.log("index non valido")
        }


        //Se l'index è maggiore di 0, inserisce il nodo nella posizione specificata

        if(index > 0){
            let new_data = new Node(data);

            //Inizializza position con l'indice specificato e current con la testa della lista
            let position = index;
            let current = this.head;


            //Ciclo while per scorrere tutta la lista collegata
            //Si ferma quando position è uguale a 1


            while(position>1){
                current = current.next;
                position--;

            }

            //Dopo il ciclo while, current punta al nodo precedente alla posizione di inserimento
            //Quindi aggiorna i riferimenti per inserire il nuovo nodo nella posizione specificata

            let previous_node = current;


            //Mentre next_node punta al nodo successivo alla posizione di inserimento
            //In questo modo non si perde il collegamento con il resto della lista
            let next_node = current.next;



            //Aggiorna i riferimenti per inserire il nuovo nodo nella posizione specificata
            //Il nodo precedente punta al nuovo nodo

            previous_node.next = new_data;



            //Il nuovo nodo punta al nodo successivo

            new_data.next = next_node;


        }

    }



    //Rimozione di un nodo tramite chiave (data contenuti nel nodo) nella lista collegata
    //Impiega un tempo lineare O(n)

    remove(key){

        let current = this.head;
        let previous = null;
        let found = false;


        //Ciclo while per scorrere tutta la lista collegata
        //Si ferma quando current è null, ovvero quando raggiunge la fine della lista
        //E quando found è true, ovvero quando trova il nodo con il valore specificato

        while(current && !found){

            //Se il nodo da rimuovere è la testa della lista, aggiorna la testa ASSEGANDO IL NODO SUCCESSIVO COME TESTA

            if(current.data === key && current === this.head){
                found = true;
                this.head = current.next;
            } 
            //Se il nodo da rimuovere non è la testa della lista, aggiorna il riferimento del nodo precedente per saltare il nodo corrente
            //In questo modo si rimuove il nodo corrente dalla lista collegata
            else if(current.data === key){
                found = true;
                previous.next = current.next;
            } 
            //SE IL NODO NON È STATO TROVATO, RIMPOSTA I PUNTATORI PER CONTINUARE LA RICERCA
            else {
                previous = current;
                current = current.next;
            }
        }

        return current;
    }






        *[Symbol.iterator]() {
        let currentNode = this.head; // Inizia dal primo nodo (la testa)

        // Continua finché ci sono nodi nella lista
        while (currentNode !== null) {
            // 'yield' restituisce il valore del nodo corrente e mette in pausa l'esecuzione
            yield currentNode.data; 
            // Passa al nodo successivo per la prossima iterazione
            currentNode = currentNode.next;
        }
    }




    



     

    
}






export  {linkedList, Node};
