//import { quadraticProbing } from "./Hash_table_quadratic_probing.js";


/*Implementazione di una hash table che utilizza l'open addressing
Come metodo di risoluzione delle collisioni


In questa implementazione utilizzeremo la funzione di probing quadratica:

H(k, x) = h(K) + f(x) mod 2^n



H(k) è l'hash della key fornita, f(x) = (x+x^2)/2 ed n è un numero naturale, x sta al numero di tentativi fatto per trovare uno spazio libero*/


export class HashTableOpenAddressing {
    constructor(capacity,loadFactor){


        //controlli

        if(capacity <= 0) throw Error('Capacita inferiore a 0 non valida' + capacity);

        if(loadFactor <= 0) throw Error('LoadFactor inferiore a 0 non valida' + loadFactor);


        

        //Iniziallizzazione

        this.probing


        this.defaultCapacity = 7;
        this.loadFactor = loadFactor;
        this.capacity=Math.max(this.defaultCapacity,capacity);
        this.threshold= this.capacity*loadFactor;
        this.modificationCount=0;

        //'UsedBuckets' conta il numero di elemnti occupati all'interno dell'hashtable (Inclusi i tombstone)
        //mentre 'KeyCount' traccia il numero di chiavi uniche all'interno dell'hashTable
        
        this.usedBuckets=0
        this.keyCount=0


        //Array per immagazzinare le coppie key-valore

        this.keys=new Array(this.capacity)
        this.values=new Array(this.capacity)

        //Token speciale per indicare la cancellazione di una coppia chiave-valore 

        this.tombstone = new Object();
        this.defaultLoadFactor = 0.65;



    }


//metodo per l'hashing di una stringa

    stringHashCode(str){
    //inizializziamo l'hash a 0
    let hash =0;
    //selezionamo tutti i caratteri della stringa e sommiamo il loro valore unicode all'hash
    for(let i=0;i<str.length; i++){
        //la funzione charCodeAt restituisce il valore unicode del carattere alla posizione i
        hash+=str.charCodeAt(i);
    }

    //restituiamo l'hash calcolato

    return hash;

 }







//Metodo per duplicare la dimensione della tabella

increaseSize(){
    this.capacity=(this.capacity*2)+1;
}















//Metodo pwe pulire la tabella

   clear(){

    //cicliamo tutti gli elementi della tabella e li impostiamo a null
    for(let i=0;i<this.capacity;i++){
        this.keys[i]=null
        this.values[i]=null

    }
    this.keyCount=0;
    this.usedBuckets=0;
    this.modificationCount++
   }









//Metodo per restituire le dimensioni della tabella

getSize(){
    return this.keyCount;
}


//Metodo per restituire la capacità delle tabelle

getCapacity(){
    return this.capacity;
}


//Metodo booleano per indicare se una tabella è vuota oppure no

isEmpty(){
    return this.keyCount === 0;
}




//Metodo per restituire le chiavi in una hash table

getKeys(){

    //Creiamo un array per le chiavi

    let hashTableKeys=new Array(this.getSize());

    //Cicliamo tutti gli elementi della tabella e aggiungiamo le chiavi non nulle e non tombstone all'array

    for(let i = 0; i<this.capacity; i++){
        if(this.keys[i] !== null && this.keys[i] !== this.tombstone){
            hashTableKeys.push(this.keys[i])
        }
    }

    return hashTableKeys

}






//Metodo per restituire i valori di una hash table


getValues(){
    //Creiamo un array per i valori
    let hashTableValues = new Array(this.getSize());

    //Cicliamo tutti gli elementi della tabella e aggiungiamo i valori non nulli e non tombstone all'array

    for(let i = 0; i < this.capacity; i++){
        if(this.values[i] !== null && this.values[i] !== this.tombstone){
            hashTableValues.push(this.values[i])
        }
    }

    return hashTableValues
}


///////////////////////////////////              Metodi di supporto



//Metodo per ridimensionare la tabella
//Quando il numero di bucket usati supera la soglia threshold 
//la tabella viene ridemensionata e tutte le coppie chiave-valore vengono reinserite nella nuova tabella


resizeTable(){

    //Salviamo i vecchi array di chiavi e valori

    this.threshold = this.capacity*this.loadFactor
    let oldKeyTable = this.keys
    let oldValueTable = this.values

    //Chiamiamo il metodo per aumentare la dimensione della tabella 
    //e aggiustiamo la capacità per essere sicuri che sia un numero primo 
    //In questo modo riduciamo i loop infiniti durante le operazioni di inserimento e ricerca

    this.increaseSize();
    this.adjustCapacity();


    



    //Resettiamo il conteggio delle chiavi dei bucket 
    //e resttiamo gli array delle chiavi e dei valori
    //Prendiamo la nuova capacita calcolata da .adjustCapacity()

    this.keys = new Array(this.capacity);
    this.values = new Array(this.capacity);
    this.keyCount = 0;
    this.usedBuckets = 0


    //Cicliamo all'interno dei vecchi array 
    //e reinseriamo le coppie chiave-valore nella nuova tabella


    for(let i = 0; i < oldKeyTable.length; i++){
        //escludiamo sempre le tombstone e le chiavi nulle
        if(oldKeyTable[i] != null && oldKeyTable[i] != this.tombstone){
            this.insert(oldKeyTable[i],oldValueTable[i]);
            oldKeyTable[i] =  null;
            oldValueTable[i] = null
        }
    }





}






//Metodo per calcolare l'hash di un indice

normalizeIndex(keyH){
    return (keyH & 0x7FFFFFFF) % this.capacity
}






//metodo per trovare il grande comune divisore tra due numeri
gcd(a,b){
    if(b===0) return a;
    return this.gcd(b, a%b)
}


//Metodo per inserire una coppia di chiave valore all'interno della tabella

insert(key,val){
    //Se viene passata una chiave nulla lanciamo un errore
    if(key == null) throw Error('Chiave nulla');

    //Se il numero di bucket usati supera la soglia ridimensioniamo la tabella

    if(this.usedBuckets >= this.threshold) this.resizeTable();

    //Calcoliamo l'indice di partenza per l'inserimento
    //In questo caso passiamo l'hash della chiave al metodo normalizeIndex
    //Per poi ottenere un indice valido all'interno della tabella

    let offset = this.normalizeIndex(this.stringHashCode(key));

    //In questo ciclo lo spazio vuoto in mezzo ai punti virgola dice a JavaScript
    //che il ciclo non ha una condizione di terminazione esplicita
    //e continuerà fino a quando non incontrerà un'istruzione di ritorno o di interruzione
    //Sostanzialmente è come aggiungere un while(true) all'interno del ciclo for
     


    //Inizializziamo i vari contatori
    //Impostiamo j a -1 per indicare che non abbiamo ancora trovato una tombstone 
    // e non fermiamo il ciclo
    
    //Finche non scatta una condizione di ritorno 
    // il ciclo continua a cercare uno spazio libero
    //Aggiungebndo all'indice di partenza l'output della funzione di probing
    for(let i = offset,j=-1,x=1; ;i=this.normalizeIndex(offset+this.probe(x++))) {
      
        //Se troviamo una tombstone salviamo il suo indice in j
        if(this.keys[i] === this.tombstone){
            if(j == -1) j=i

    //Se troviamo una chiave non nulla controlliamo se è uguale a quella che vogliamo inserire

        }else if (this.keys[i] != null){

            if(this.keys[i] === key){

                //In caso di chiave già esistente salviamo il vecchio valore

                let oldValue = this.values[i];

                //se j è -1 significa che non abbiamo trovato tombstone
                //quindi sovrascriviamo il valore alla posizione i

                if(j == -1){
                    this.values[i] = val
                    //Altrimenti spostiamo la coppia chiave-valore alla posizione j
                    //e impostiamo la posizione i come tombstone

                } else {

                    this.keys[i] = this.tombstone;
                    this.values[i] = null;
                    this.keys[j] = key;
                    this.values[j] = val;

                }

                //Incrementiamo il contatore delle modifiche e ritorniamo il vecchio valore

                this.modificationCount++;
                return oldValue;

            }

            //Se troviamo uno spazio vuoto (null) verifichiamo se abbiamo trovato una tombstone in precedenza

        } else {

            //Se la variabile j è ancora -1 significa che non abbiamo trovato tombstone
            //quindi inseriamo la nuova coppia chiave-valore alla posizione i
            //e incrementiamo i contatori delle chiavi e dei bucket usati

            if(j == -1) {
                this.usedBuckets++;
                this.keyCount++;
                this.keys[i] = key;
                this.values[i] = val
            
            
            
            //Se j non è -1 significa che abbiamo trovato una tombstone
            //quindi spostiamo la coppia chiave-valore alla posizione j

            } else {

                this.keyCount++;
                this.keys[j] = key;
                this.values[j] = val


            } 


            this.modificationCount++;
            return null



        } 

    }


}



//Metodo per verificare l'esistenza di una chiave nella tabella



hasKey(key){

    if(key == null) throw Error('Chiave nulla');

    //Assegnamo come punto di partenza l'indice calcolato dall'hash della chiave

    let offset = this.normalizeIndex(this.stringHashCode(key))


    //Utilizziamo un ciclo infinito per cercare la chiave
    //Aumentiamo l'indice di partenza con l'output della funzione di probing
    //Finchè non troviamo la chiave o uno spazio vuoto

    for(let i =0, j = -1, x=1;;i=this.normalizeIndex(offset+this.probe(x++))){
        
        //Se troviamo una tombstone salviamo il suo indice in j
        if(this.keys[i] === this.tombstone){
            if(j === -1) j=i;

        //Se troviamo una chiave non nulla controlliamo se è uguale a quella cercata
        }else if(this.keys[i] != null) {

            if(this.keys[i] === key){

                //se j non è -1 significa che abbiamo trovato una tombstone
                //quindi spostiamo la coppia chiave-valore alla posizione j
                //e impostiamo la posizione i come tombstone


                if(j!=-1){

                    this.keys[j] = this.keys[i];
                    this.values[j] = this.values[i];
                    this.keys[i] = this.tombstone;
                    this.values[i] = null

                }
             
                return true


            }





        } else return false
    }

}



//Metodo per restituire il valore associato a una chiave

get(key){
    if(key === null) throw Error('Chiave nulla');

    //usiamo l'hash della chiave come punto di partenza

    let offset = this.normalizeIndex(this.stringHashCode(key));

     //Cicliamo finchè non troviamo la chiave o uno spazio vuoto
     //Aumentiamo l'indice di partenza con l'output della funzione di probing
    for(let i = offset,j=-1,x=1;;i=this.normalizeIndex(offset+this.probe(x++))){

        //Se troviamo la corrispondenza con la chiave passata

        if(this.keys[i] === key){

            //Se j non è -1 significa che abbiamo trovato una tombstone
            //quindi spostiamo la coppia chiave-valore alla posizione j
            //e impostiamo la posizione i come tombstone

            if(j != -1){
                this.keys[j] = this.keys[i];
                this.values[j] = this.values[i];
                this.keys[i] = this.tombstone;
                this.values[i] = null;
                //restituiamo il valore associato alla chiave con indice j
                return this.values[j];
            } else {
                //restituiamo il valore associato alla chiave con indice i ù
                // se non è una tombstone
                return this.values[i]
            }

        } else return null
    }
}









remove(key){

    if(key === null) throw Error('Chiave nulla');

    //usiamo l'hash della chiave come punto di partenza

    let offset = this.normalizeIndex(this.stringHashCode(key));


    //Cicliamo finchè non troviamo la chiave o uno spazio vuoto
    //Aumentiamo l'indice di partenza con l'output della funzione di probing



    for(let i = offset,x=1;;i=this.normalizeIndex(offset+this.probe(x++))){
        //Se troviamo una tombstone continuiamo perchè
        //l'elemento è stato cancellato in precedenza
        if(this.keys[i] === this.tombstone) continue;


        //Se troviamo uno spazio vuoto (null) significa che la chiave non esiste

        if(this.keys[i] === null) return null;

        //Se troviamo la chiave passata come parametro
        //la cancelliamo impostando la sua posizione come tombstone
        //aggiorniamo i contatori e restituiamo il vecchio valore

        if (this.keys[i] === key){
            this.keyCount--;
            this.modificationCount++;
            let oldValue = this.values[i];
            this.keys[i] = this.tombstone;
            this.values[i] = null;
            return oldValue
        }

    }

}






toString(){
    let str=''

    str+='{';

    for(let i = 0; i<this.capacity; i++){
        if(this.keys[i] != null && this.keys[i] != this.tombstone) str+=this.keys[i] +'==>' + this.values[i] + ',';

    }

    str+='}'



    return str
}


}



