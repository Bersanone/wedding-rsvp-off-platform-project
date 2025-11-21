//Questo è un'implementazione di una tabella hash che utilizza il metodo di separate chaining
//per gestire le collisioni. Ogni bucket della tabella hash è una lista collegata che memorizza le voci con lo stesso indice hash.
//I best case scenario per le operazioni di inserimento, ricerca e rimozione sono O(1) quando non ci sono collisioni,
//mentre i worst case scenario sono O(n) quando tutte le voci collidono e finiscono nella stessa lista collegata.
//per ovviare a ciò, la tabella viene ridimensionata quando il fattore di carico supera una soglia specificata.
import { linkedList } from "../linked_list.js";







//Creiamo una classe entry che rappresentano i paramenti chiave-valore-hash
//che verranno memorizzati nella tabella hash

class entry{
    //assegnamo i parametri d'entrata come chiave, valore e hash
    constructor(value,key,hash){
        this.key = key;
        this.value = value;
        this.hash = hash;

    }

     //Metodo per confrontare due entry in base alla chiave e all'hash
     //Restituisce true se sono uguali, altrimenti false

    equals(other){
        if(this.hash != other.hash){ return false}

        return this.key === other.key
    }


    //Metodo per stampare una entry in formato chiave: valore

    stampa(){
        return this.key+": "+this.value
    }



}




//Creiamo la classe hash table 
// questa è la parte principale dell'implementazione della tabella hash con separate chaining
//Contiene metodi per inserire, cercare e rimuovere elementi, nonché per gestire il ridimensionamento della tabella

class hashTable{
    //All'interbno del costruttore definiamo la capacità e il fattore di carico
    //Il fattore di carico determina quando ridimensionare la tabella
    constructor(capacity,loadFactor){
        //Definiamo la capacita di default
        this.DEFAULT_CAPACITY=3;
        //Definiamo il fattore di carico di default
        this.DEFAULT_LOAD_FACTOR=0.75;
        //Definioamo il fattore di carico massimo
        this.MAX_LOAD_FACTOR=0.75;

        //Inizializziamo a 0 le proprietà della tabella hash
        this.capacity=0;
        this.size=0;
        //threshold indica il numero massimo di elementi prima di ridimensionare la tabella
        this.threshold=0;

        //se viene passato un valore di capacità negativo o un fattore di carico non valido, viene generato un errore

        if(this.capacity<0){
            throw new Error("Illegal capacity: "+this.capacity)
        }

        if(loadFactor <= 0 || isNaN(loadFactor)){
            throw new Error("Illegal load factor: "+loadFactor)
        }

        //assegnamo il valore massimmo tra la capacità passata e la capacità di default

        this.capacity = Math.max(capacity || this.DEFAULT_CAPACITY);
        //assegnamo il fattore di carico massimo
        this.MAX_LOAD_FACTOR   =loadFactor ;
        //calcoliamo il rapporto tra il numero di elementi presenti e fattore di carico
        this.threshold = this.capacity*this.MAX_LOAD_FACTOR;

        //Inizializziamo la tabella hash come un array che conrtedi liste collegate

        this.table = new Array(this.capacity);
    }

    //Metodo per creare l'hash di una stringa

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


    //Metodo per verificare se la tabella è vuota

    isEmpty(){
        return this.size === 0;
    }

    //Creiamo un metodo per normalizzare l'indice da un dato come input un hash


    normalizeIndex(hash){
        return(hash & 0x7FFFFFFF) % this.capacity;
    }

    //Metodo per pulire la tabella

    clear(){
        this.size=0;
        this.table = new Array(this.capacity);
    }


    //Metodo per inserire un elemento nella tabella hash

    insert(key,value){

        //gestiamo il caso in cui la chiave è null


         if(key === null) throw new Error("Null key");

            //Calcoliamo l'hash della chiave

         const hash = this.stringHashCode(key);

         //Creiamo una nuova entry nella hash table

         let newEntry = new entry(value,key,hash);
            //Calcoliamo l'indice del bucket in cui inserire la nuova entry

         let buckeIndex = this.normalizeIndex(newEntry.hash);

         //Inseriamo la nuova entry nel bucket corrispondente

         return this.bucketInsertEntry(buckeIndex,newEntry)
    }



    //Metodod per ottenre il valore di una chiave e restituirlo
    //Restituisce null se il valore è null oppure non esiste

    get(key){
        //gestiamo il caso in cui la chiave è null
        if(key === null) return null;

        //Calcoliamo'indice hashato del bucket in cui cercare la entry

        let bucketIndex = this.normalizeIndex(this.stringHashCode(key));

        //Cerchiamo la entry nel bucket corrispondente

        let entry = this.bucketSearchEntry(bucketIndex,key)

        //Se la entry esiste, restituiamo il suo valore

        if(entry != null) return entry.value;

        //Altrimenti restituiamo null

        return null
     }



     //METODO SEMPLICE PER RIMUOVERE


     remove(key){

        //Gestiamo il caso in cui la chiave è null

        if(key === null) return null;
        //Calcoliamo l'indice hashato del bucket in cui cercare la entry da rimuovere
        let index = this.normalizeIndex(this.stringHashCode(key));
        //Rimuoviamo la entry dal bucket corrispondente
        return this.bucketRemoveEntry(index,key)

     }






     //METODO PER RIMUOVERE UN ELEMENTO NELLA LISTA COLLEGATA


     bucketRemoveEntry(index, key){

        //Cerca la entry da rimuovere nel bucket corrispondente

        let entry = this.bucketSearchEntry(index, key);

        //Se la entry esiste, la rimuoviamo

        if(entry != null) {

            //cerchiamo il bucket corrispondente
            let links = this.table[index];
            //Rimuoviamo la entry dalla lista collegata
            links.remove(entry);

            //decrementiamo la dimensione della tabella

            --this.size;
            return entry.value;

        } else return null
     }







     //METODO PER INSERIRE UNA ELEMENTO NELLA LISTA COLLEGATA

     bucketInsertEntry(index,entry){

        //Otteniamo il bucket corrispondente all'indice

        let bucket = this.table[index];

        //Se il bucket non esiste, creiamo una nuova lista collegata

        if(bucket === undefined) { 
            //Creiamo una nuova lista collegata
            bucket = new linkedList();
            //Assegniamo la nuova lista collegata all'indice corrispondente
            this.table[index] = bucket
        
        }


        //Cerchiamo se la entry esiste già nel bucket

        let entryEXT= this.bucketSearchEntry(index, entry.key)

        //Se la entry non esiste, la aggiungiamo al bucket

        if(entryEXT == null){
           
            //Aggiungiamo la nuova entry al bucket
            

            bucket.add(entry);
            // sse Incrementiamo la dimensione della tabella e se supera la soglia, ridimensioniamo la tabella
        if(++this.size > this.threshold) this.resizeTable();

        //altrimenti restituiamo null

            return null;
        } else {

            //Se la entry esiste già, aggiorniamo il suo valore e restituiamo il vecchio valore

            let old = entryEXT.value
            //Aggiorniamo il valore della entry esistente con il nuovo valore
            entryEXT.value = entry.value;

            //Restituiamo il vecchio valore

            return old

        }

     }




     //METODO PER cercare UN ELEMENTO DA UN BUCKET DELLA HASH TABLE
     //QUINDI RIMUOVERE UN ELEMENTO DALLA LISTA COLLEGATA

      bucketSearchEntry(index, key){

        //Gestiamo il caso in cui la chiave è null

        if(key === null) return null;

        //Otteniamo il bucket corrispondente all'indice della tabella

        let bucket = this.table[index];

        //Se il bucket non esiste, restituiamo null

        if(bucket === undefined) return null;
        
        //Cerchiamo la entry nel bucket

        for(let entry of bucket){
            //Se la chiave della entry corrisponde alla chiave cercata, restituiamo la entry
            if(entry.key === key){
                return entry;
            }

        }

        //altrimenti restituiamo null

         return null;

      }



      //METODO PER RIDIMENSIONARE UNA TABELLA






      resizeTable(){
        //Salviamo la vechcia tabella con i relativi bucket
        const oldTable = this.table;

        //Raddoppiamo la capacità della tabella

        this.capacity *=2;
        //Aggiorniamo la soglia in base alla nuova capacità e al fattore di carico massimo
        this.threshold = this.capacity * this.MAX_LOAD_FACTOR;

        //Creiamo una nuova tabella con la nuova capacità a 0

        this.table = new Array(this.capacity);
        this.size=0;

        //Iteriamo attraverso tutti i bucket della vecchia tabella e reinseriamo le entry nella nuova tabella


        for(let bucket of oldTable){
            //Se il bucket non è null, iteriamo attraverso le entry e le reinseriamo nella nuova tabella
            if(bucket!=null){
                for(let entry of bucket){
                    //inseriamo la entry nella nuova tabella
                    this.insert(entry.key,entry.value)
                }
            }
        }

      }




    //METODO PER RESTITUIRE TUTTE LE CHIAVI DI UNA TABELLA

      returnKeys(){

        //Array per memorizzare le chiavi

        let keys = [];

        //cerchiamo in tutti gli indici della tabella

        for(let bucket of this.table){
            //Se il bucket non è null, iteriamo attraverso le entry e aggiungiamo le chiavi all'array
            if(bucket!=null){
                for(let entry of bucket){

                    keys.push(entry.key)

                }
            }
         
        }
        //Restituiamo l'array delle chiavi
               return keys
      }


      //METODO PER RESTITUIRE TUTTI I VALORI DI UNA TABELLA



        returnValues(){

            //Array per memorizzare i valori

        let values = [];

        //cerchiamo in tutti gli indici della tabella

        for(let bucket of this.table){
            //Se il bucket non è null, iteriamo attraverso le entry e aggiungiamo i valori all'array
            if(bucket!=null){
                for(let entry of bucket){

                    values.push(entry.value)

                }
            }
         
        }
        //Restituiamo l'array dei valori

              return values
      }




}









let ht = new hashTable(5,0.7);

ht.insert("nome","Mario");
ht.insert("cognome","Rossi");
ht.insert("età",30);
ht.insert("paese","Italia");
ht.insert("professione","Ingegnere");



console.log(ht.size);

ht.remove("età");




console.log(ht.size);



console.log(ht.get("nome"));
console.log(ht.get("cognome"));
console.log(ht.get("età"));