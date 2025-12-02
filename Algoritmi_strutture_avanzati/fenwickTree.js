class fenwickTree{

    constructor(){
        //Array che rappresenta l'albero di fenwick
        this.tree = new Array()

        //Sezione per la gestione degli aggiornamenti
        //Dimensione dell'array originale
        //array che rappresenta l'albero di fenwick originale
        //array che rappresenta l'albero di fenwick aggiornato
        this.sz = 0
        this.originalTree = []
        this.updatedTree = []
    }

    //creiamo un nuovo albero di fenwick di dimensione sz

    createNewTree(sz){
    this.tree = new Array(sz+1)
    }

    //Funzione per calcolare il least significant bit
    //Ovverra il bit meno significativo di i

    //converte in binario e ritorna l'1 più a destra
    //ad esempio 12 = 1100 ritorna 4 = 100

    lsb(i){

        return i & -i

    }



    //Funzione per aggiungere valori all'albero di fenwick

    addValues(values){
        //se non viene passato nessun valore ritorna errore
        if(values === null) return 'Valori null non accettati';

        //inizializziamo l'albero di fenwick con i valori passati
        this.tree=[...values]
        
        //cicliamo all'interno dei valori per costruire l'albero

        for(let i = 0;i < values.length; i++){
            //calcoliamo il genitore aggiungendo il least significant bit
            let j = i + this.lsb(i);
            //aggiorniamo il valore del genitore
            //Aggiungiamo un controllo per evitare di uscire dai limiti dell'array
            if(j < this.tree.length) this.tree[j] += this.tree[i]
        }
    }


    //Funzione per calcolare la somma dei prefissi fino all'indice i


    prefixSum(i,arr = this.tree){

        //creiamo una variabile per tenere traccia della somma

        let sum = 0;

        //cicliamo finché i non diventa 0

        while(i != 0){
            //aggiungiamo il valore corrente alla somma
            sum+=arr[i];
            //aggiorniamo i sottraendo il least significant bit
            i -= this.lsb(i)
        }

        //restituiamo la somma

        return sum

    }

    //Funzione per calcolare la somma in un intervallo [i,j]


    somma(i,j){
        //Se i è maggiore di j ritorniamo un messaggio di errore
        if(j<i) return 'J deve essere maggiore o uguale a i'
        //Ritorniamo la differenza tra la somma dei prefissi fino a j e la somma dei prefissi fino a i-1
        return this.prefixSum(j) - this.prefixSum(i-1)
    }

    //Funzione per aggiungere un valore all'indice i

    addAtIndex(i,k){
        //Cicliamo finché i è minore della lunghezza dell'albero
        while(i<tree.length){
            //Aggiungiamo k all'indice i
            this.tree[i] += k;
            //Aggiorniamo i aggiungendo il least significant bit
            i+=this.lsb(i)
        }
    }


    //Funzione per settare un valore all'indice i

    set(i,k){
        //Calcoliamo il valore corrente all'indice i
        let v = this.somma(i,i);
        //Aggiungiamo la differenza tra k e v all'indice i
        this.addAtIndex(i,k-v)
    }

    //Funzione per convertire l'albero in stringa

    toStr(){
        return this.updatedTree.toString()
    }


    //Funzione per costruire gli alberi di fenwick per gli aggiornamenti range

    
    constructUpdate(values){

        //se non viene passato nessun valore ritorna errore

        if(values === null) return 'Inserire valori validi'

        //inizializziamo la dimensione dell'array con il numero di valori passati

        this.sz = values.length;
        //impostiamo il primo valore a 0 per convenzione
        values[0] = 0

        //creiamo l'albero di fenwick con i valori passati

        let tree1 = [...values]

        //cicliamo fino a che i è minore della dimensione dell'albero

        for(let i = 1;i<this.sz;i++){
            //calcoliamo il genitore aggiungendo il least significant bit
            let parent = i+this.lsb(i);
            //Se il parent rientra nel range dell'array aggiorniamo il valore del genitore
            if(parent < this.sz) tree1[parent] += tree1[i]
        }

        //Impostiamo l'albero originale e quello aggiornato

        this.originalTree = tree1

        //Creiamo una copia dell'albero aggiornato
        this.updatedTree=[...tree1]

    }

    //Funzione per aggiungere un valore v all'indice i nell'albero aggiornato

    addUpdate(i,v){
        //Cicliamo finché i è minore della dimensione dell'albero
        while(i<this.sz){
            //Aggiungiamo v all'indice i dell'albero aggiornato
            this.updatedTree[i] += v;
            //Aggiorniamo i aggiungendo il least significant bit
            i+=this.lsb(i)
        }
    }

    //Funzione per aggiornare un intervallo [l,r] con il valore v

    updateRanges(l,r,v){

        //Aggiungiamo v all'indice l e -v all'indice r+1

        this.addUpdate(l,+v);
        this.addUpdate(r+1,-v)

    }

    //Funzione per ottenere il valore all'indice i dopo gli aggiornamenti
    get(i){

        return this.prefixSum(i,this.updatedTree) - this.prefixSum(i-1,this.originalTree)

    }


}




const fenwick = new fenwickTree();
fenwick.constructUpdate([0,5,3,7,9,6,2,1,8]);
fenwick.updateRanges(2,6,3);
// //12
console.log(fenwick.get(6)); //5
console.log(fenwick.get(3)); //10
console.log(fenwick.get(1)); //5

console.log(fenwick.toStr());
