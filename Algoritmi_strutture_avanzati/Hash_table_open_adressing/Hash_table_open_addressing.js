import { quadraticProbing } from "./Hash_table_quadratic_probing.js";


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

        this.loadFactor = loadFactor;
        this.capacity=Math.max(this.defaultCapacity,capacity);


        this.probing = new quadraticProbing();
        this.probing.adjustCapacity()


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
        this.defaultCapacity = 7;
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

    let hashTableKeys=new Array(this.getSize());

    for(let i = 0; i<this.capacity; i++){
        if(this.keys[i] !== null && this.keys[i] !== this.tombstone){
            hashTableKeys.push(this.keys[i])
        }
    }

    return hashTableKeys

}






//Metodo per restituire i valori di una hash table


getValues(){
    let hashTableValues = new Array(this.getSize());

    for(let i = 0; i < this.capacity; i++){
        if(this.values[i] !== null && this.values[i] !== this.tombstone){
            hashTableValues.push(this.values[i])
        }
    }

    return hashTableValues
}











































///////////////////////////////////              Metodi di supporto






resizeTable(){
    this.increaseSize();
    this.probing.adjustCapacity();


    this.threshold = this.capacity*this.loadFactor


    let oldKeyTable = new Array(this.capacity)
    let oldValueTable = new Array(this.capacity)


    //Scambio delle key

    let keyTableMap = this.keys
    this.key = oldValueTable
    oldKeyTable = keyTableMap



    //Scambio dei valori

    let valueTableMap = this.values
    this.values = oldValueTable
    oldKeyTable = valueTableMap



    //Resettiamo il conteggio delle chiavi dei bucket


    this.keyCount = 0;
    this.usedBuckets = 0


    for(let i = 0; i < oldKeyTable.length; i++){
        if(oldKeyTable[i] != null && oldKeyTable[i] != this.tombstone){
            this.insert(oldKeyTable[i],oldValueTable[i]);
            oldKeyTable[i] =  null;
            oldValueTable[i] = null
        }
    }





}








normalizeIndex(keyH){
    return (keyH & 0x7FFFFFFF) % this.capacity
}







gcd(a,b){
    if(b===0) return a;
    return this.gcd(b, a%b)
}



insert(key,val){
    if(key == null) throw Error('Chiave nulla');

    if(this.usedBuckets >= this.threshold) this.resizeTable();

    let offset = this.normalizeIndex(this.stringHashCode(key));

    for(let i = offset,j=1,x=1;;i=this.normalizeIndex(offset+this.probing(x++))) {

        if(this.keys[i] === this.tombstone){
            if(j == -1) j=i

        }else if (this.keys[i] != null){

            if(this.keys[i] === key){

                let oldValue = this.values[i];

                if(j == -1){
                    this.values[i] = val
                } else {

                    this.keys[i] = this.tombstone;
                    this.values[i] = null;
                    this.keys[j] = key;
                    this.values[j] = val;

                }

                this.modificationCount++;
                return oldValue;

            }

        } else {

            if(j == -1) {
                this.usedBuckets++;
                this.keyCount++;
                this.keys[j] = key;
                this.values[j] = val
            
            
            
            
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






hasKey(key){

    if(key == null) throw Error('Chiave nulla');

    let offset = this.normalizeIndex(this.stringHashCode(key))



    for(let i =0, j = -1, x=1;;i=this.normalizeIndex(offset+this.probing(x++))){

        if(this.keys[i] === this.tombstone){
            if(j === -1) j=i;


        }else if(this.keys[i] != null) {

            if(this.keys[i] === key){




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




get(key){
    if(key === null) throw Error('Chiave nulla');


    let offset = this.normalizeIndex(this.stringHashCode(key));


    for(let i = offset,j=-1,x=1;;i=this.normalizeIndex(offset+this.probing(x++))){

        if(this.keys[i] === key){

            if(j != -1){
                this.keys[j] = this.keys[i];
                this.values[j] = this.values[i];
                this.keys[i] = this.tombstone;
                this.values[i] = null;
                return this.values[j];
            } else {
                return this.values[i]
            }

        } else return null
    }
}









remove(key){

    if(key === null) throw Error('Chiave nulla');

    let offset = this.normalizeIndex(this.stringHashCode(key));


    for(let i = offset,x=1;;i=this.normalizeIndex(offset+this.probing(x++))){

        if(this.keys[i] === this.tombstone) continue;

        if(this.keys[i] === null) return null;

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



let hashTable = new HashTableOpenAddressing(10,0.7);
hashTable.insert("apple",1);
hashTable.insert("banana",2);
hashTable.insert("orange",3);
console.log(hashTable.toString());