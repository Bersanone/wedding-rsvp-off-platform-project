import { linkedList } from "../linked_list.js";







class entry{
    constructor(value,key,hash){
        this.key = key;
        this.value = value;
        this.hash = hash;

    }



    equals(other){
        if(this.hash != other.hash){ return false}

        return this.key === other.key
    }


    stampa(){
        return this.key+": "+this.value
    }



}




class hashTable{
    constructor(capacity,loadFactor){
        this.DEFAULT_CAPACITY=3;
        this.DEFAULT_LOAD_FACTOR=0.75;
        this.MAX_LOAD_FACTOR=0.75;
        this.capacity=0;
        this.size=0;
        this.threshold=0;

        if(this.capacity<0){
            throw new Error("Illegal capacity: "+this.capacity)
        }

        if(loadFactor <= 0 || isNaN(loadFactor)){
            throw new Error("Illegal load factor: "+loadFactor)
        }

        this.capacity = Math.max(capacity || this.DEFAULT_CAPACITY);
        this.MAX_LOAD_FACTOR   =loadFactor ;
        this.threshold = this.capacity*this.MAX_LOAD_FACTOR;

        this.table = new Array(this.capacity);
    }

    stringHashCode(str){

    let hash =0;
    for(let i=0;i<str.length; i++){
        hash+=str.charCodeAt(i);
    }

    return hash;

 }




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

         if(key === null) throw new Error("Null key");

         const hash = this.stringHashCode(key);


         let newEntry = new entry(value,key,hash);

         let buckeIndex = this.normalizeIndex(newEntry.hash);

         //DA CREARE METODO PER CERCARE NELLA LISTA COLLEGATA

         return this.bucketInsertEntry(buckeIndex,newEntry)
    }



    //Metodod per ottenre il valore di una chiave e restituirlo
    //Restituisce null se il valore è null oppure non esiste

    get(key){
        if(key === null) return null;

        let bucketIndex = this.normalizeIndex(this.stringHashCode(key));


        let entry = this.bucketSearchEntry(bucketIndex,key)

        if(entry != null) return entry.value;

        return null
     }



     //METODO SEMPLICE PER RIMUOVERE


     remove(key){

        if(key === null) return null;
        let index = this.normalizeIndex(this.stringHashCode(key));
        return this.bucketRemoveEntry(index,key)

     }






     //METODO PER RIMUOVERE UN ELEMENTO NELLA LISTA COLLEGATA


     bucketRemoveEntry(index, key){

        let entry = this.bucketSearchEntry(index, key);

        if(entry != null) {
            let links = this.table[index];
            links.remove(entry);

            --this.size;
            return entry.value;

        } else return null
     }







     //METODO PER INSERIRE UNA ELEMENTO NELLA LISTA COLLEGATA

     bucketInsertEntry(index,entry){

        let bucket = this.table[index];

        if(bucket === undefined) { 
            bucket = new linkedList();
            this.table[index] = bucket
        
        };

        let entryEXT= this.bucketSearchEntry(index, entry.key)

        if(entryEXT == null){
           
            
            

            bucket.add(entry);
        if(++this.size > this.threshold) this.resizeTable();

            return null;
        } else {

            let old = entryEXT.value
            entryEXT.value = entry.value;

            return old

        }

     }




     //METODO PER cercare UN ELEMENTO DA UN BUCKET DELLA HASH TABLE
     //QUINDI RIMUOVERE UN ELEMENTO DALLA LISTA COLLEGATA

      bucketSearchEntry(index, key){

        if(key === null) return null;

        let bucket = this.table[index];

        if(bucket === undefined) return null;


        for(let entry of bucket){
            if(entry.key === key){
                return entry;
            }

        }

         return null;

      }



      //METODO PER RIDIMENSIONARE UNA TABELLA






      resizeTable(){
        this.capacity *=2;
        this.threshold = this.capacity * this.MAX_LOAD_FACTOR;

        let newTable = new Array(this.capacity);
        
        

        for(let i = 0;i<this.table.length;i++){
            if(this.table[i] != null){
                for(let entry of this.table[i]){
                    let bucketIndex = this.normalizeIndex(entry.hash);
                    let bucket = newTable[bucketIndex];
                    if(bucket === undefined) {
                        bucket = new linkedList();
                        newTable[bucketIndex] = bucket
                    }
                    bucket.add(entry)
                 }
            }
        }

        this.table = newTable
      }




    //METODO PER RESTITUIRE TUTTE LE CHIAVI DI UNA TABELLA

      returnKeys(){

        let keys = [];

        for(let bucket of this.table){
            if(bucket!=null){
                for(let entry of bucket){

                    keys.push(entry.key)

                }
            }
         
        }
               return keys
      }


      //METODO PER RESTITUIRE TUTTI I VALORI DI UNA TABELLA



        returnValues(){

        let values = [];

        for(let bucket of this.table){
            if(bucket!=null){
                for(let entry of bucket){

                    values.push(entry.value)

                }
            }
         
        }

              return values
      }





      //FINIRE DI COMMENTARLI E TESTARLI




}









let ht = new hashTable(5,0.7);

ht.insert("nome","Mario");
ht.insert("cognome","Rossi");
ht.insert("età",30);



console.log(ht.size);

ht.remove("età");




console.log(ht.size);



console.log(ht.get("nome"));
console.log(ht.get("cognome"));
console.log(ht.get("età"));