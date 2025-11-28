
import { HashTableOpenAddressing } from "./Hash_table_open_addressing.js"







export class quadraticProbing extends HashTableOpenAddressing {

    constructor(capacity,loadFactor){
        super(capacity, loadFactor)

    }



    //Funzione che trova la prossima potenza di due superiore a quella del numero dato


    powerOfTwo(n){

        return Math.clz32(n)

    }






    //Funzione per il calcolo di probing


    probe(x){

        return (x*x+x)>>1

    }





    //Funzione per incrementare la dimensione per la potenza di 2 successiva alla grandezza attuale della tabella 




    increaseCapacity(){

        this.capacity = this.powerOfTwo(this.capacity)
        
    }







    //Funzione per aggiusatre la capacità di un hash table


    adjustCapacity(){
        let p2 = Math.clz32(this.capacity);
        if(this.capacity === p2) return;
        this.increaseCapacity()
    }



}



let hashTable = new quadraticProbing(10,0.7);
hashTable.insert("apple",1);
hashTable.insert("banana",2);
hashTable.insert("orange",3);
hashTable.insert("grape",4);
hashTable.insert("melon",5);
hashTable.insert("kiwi",6);
hashTable.insert("pear",7);
hashTable.insert("peach",8);
hashTable.insert("plum",9);
hashTable.insert("mango",10);
hashTable.remove("orange");
console.log(hashTable.toString());
console.log(hashTable.get("banana"));