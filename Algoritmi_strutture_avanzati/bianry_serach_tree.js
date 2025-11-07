//Binary serach tree

//Struttura dati ad albero in cui ogni nodo ha al massimo due figli
//Il figlio sinistro contiene valori minori del nodo padre
//Il figlio destro contiene valori maggiori del nodo padre





//Importiamo lo stack per utilizzarlo negli iteratori
import { stack } from "./stack.js";

import { queue } from "./Queue.js";


class nodo{
    constructor(data,left,right){

        this.data = data;

        this.left = left;

        this.right = right;

    }
}


class BinarySearchTree{
    constructor(){
        this.root = null;

        this.nodeCount = 0;
    }



    //Restituisce true se l'albero è vuoto

    isEmpty(){
        return this.size() === 0;
    }


    //Restituisce la dimensione dell'albero binbario

    size(){
        return this.nodeCount
    }





    //Funzione semplificata per trovare un elemento

    contiene(elem){

        return this.containsPriv(this.root,elem)

    }




    //Funzione ricorsiva per trovare un determinato elemento,è una funzione di supporto


    containsPriv(node,element){

        if(node === null) return false;


        let cmp = element.localeCompare(node.data);



            //Cerca sulla parte di sinistra perchè il risultato è minore del valore corrente

            if(cmp < 0){return this.containsPriv(node.left,element)}


            //Cerca sulla parte di destra se il risultato è maggiore del valore corrente


           else if(cmp > 0){return this.containsPriv(node.right,element)}



           //Abbiamo trovato il valore che stavamo cercando


           else return true


        

    };





    //Funzione semplificata per aggiungere un elemento


    aggiungi(elem){

        if(this.contiene(elem)){ return false}


        else{

            this.root = this.addPriv(this.root,elem);

            this.nodeCount++;

            return true;

        }





    }







    //Funzione privata ricorsiva per aggiungere un elemento


    addPriv(node,elem){

        //Caso base troviamo un leaf node (nodo senza figli)

        if(node === null){ return node = new nodo(elem,null,null)}

        else if (elem.localeCompare(node.data) < 0){
            node.left = this.addPriv(node.left,elem)
        } else {
            node.right = this.addPriv(node.right,elem)
        }


        return node

    }









    //Funzione privata per rimuovere un oggetto dall'albero


    removePriv(node,elem){

        //Gestiamo il null


        if(node === nuill) return null;


        //compariamo il parametro elemento econ i dati presenti nel nodo
        //Utilizziamo il metodo integrato .localeCompare()


        let cmp = elem.localeCompare(node.data)


        //Se il metodo restituisce -1 vuoldire che viene prima nell'ordinamento
        //Quindi cercheremo nel nodo di sinistra 

        if(cmp<0){
            node.left = this.removePriv(node.left,elem)
        }


        //Se il metodo restituisce 1 vuoldire che viene dopo nell'ordinamento
        //Quindi cercheremo nei nodi di destra

       else if(cmp>0){
            node.right = this.removePriv(node.right,elem)
        }




      //Questo è un caso con un solo subtree a destra o nessun subtree
      //In questo caso scambiamo con il figlio destro di se stesso
        else if(node.left === null){

            let nodeRight = node.right

            node.data = null;
            node = null;


            return nodeRight

        }

    //Questo è un caso con un solo subtree a sinistra o nessun subtree
      //In questo caso scambiamo con il figlio sinistro di se stesso

      else if(node.right === null){

        let nodeLeft = node.left

        node.data = null;

        node = null;

        return nodeLeft

      }





      //Quando rimuoviamo un nodo che ha due figli 
      // il successore del nodo che è stato rimosso può essere
      //il valore maggiore nel nodo di sinistra o quello minore nel nodo di destra
      //per risolvere questo problema cerchiamo il valore minore in tutta la parte destra del subtree
      //Potremmo anche scegliere il valore piu grande nella parte di sinistra
      //In questa implementazione partiamo dall'albnero di destra e troveremo il valore più piccolo


      else {

        //Troviamo il nodo minore nella parte di destra dell'albero

        let tmp = this.findMin(node.right)


        //Scambiamo i dati del nodo da eliminare con quelli del nodo inferiore

        node.data=tmp.data


        //Andiamo nella parte di destra del subtree e rimuoviamo ò'ultimo nodo 
        // che abbiamo trovato e con la quale abbiamo scambiato i dati

        node.right = this.removePriv(node.right,tmp.data)



      }


      return node





    }







    //Funzione di supporto per ottenere il nodo più piccolo di sinistra

    findMin(node){
        //Continuiamo a cercare a sinistra fino a che non abbiuamo più nodi a sinistra figli

        while(node.left != null){ node = node.left}

        return node

    }



    //Funzione di supporto per ottenere il nodo più piccolo di destra


    findMax(node){


                 //Continuiamo a cercare a destra fino a che non abbiuamo più nodi a destra figli


        while(node.right != null){node = node.right}

        return node

    }




    altezza(){
        return this.heightPriv(this.root);
    }








    //Funzione recorsiva per trovare l'altezza dell'albero

    heightPriv(node){
        if(node === null) return 0;

        //Utilizziamo la funzione ricorsiva per calcolare la parte destra e sinistra dell'albero 
        //Con max prendiamo il valore più grande dei due
        //Aggiungiamo +1 per includere anche il nodo che è stato passato come parametro


        return Math.max(this.heightPriv(node.left), this.heightPriv(node.right)) +1;

    }









    //ITERATORI
    //gli iteratori ci permettono di scorrere tutti gli elementi dell'albero in vari modi
    //In questo caso sono 4 modi:
    //1. In-Order (sinistra, radice, destra)
    //2. Pre-Order (radice, sinistra, destra)
    //3. Post-Order (sinistra, destra, radice)
    //4. Livello (per ogni livello dell'albero)

    //Utilizziamo gli stack per salvare i nodi temporaneamente durante l'iterazione in modo tale da non perdere riferimenti ai nodi



    preOrder(){

        let expectedNode = this.nodeCount;
        const rootNode = this.root;


        return{
            //Creiamo l'iteratore
            //L'iiteratore deve avere un metodo next() che restituisce il prossimo elemento nell'iterazione
            //Il Symbol.iterator è un metodo speciale che restituisce l'iteratore stesso, 
            // quindi in sostanza diciamo a javaScript come iterare su questo oggetto

            [Symbol.iterator](){
        //Creiamo uno stack per salvare i nodi temporaneamente

        const stack1 = new stack();

        //Aggiungiamo la radice allo stack

        stack1.addElement(rootNode)

                return{


                    hasNext(){

                        if(expectedNode !== this.nodeCount) throw new Error("Modifica non consentita durante l'iterazione");
                        return rootNode != null && !stack1.isEmpty();


                    },
                      
                    //Il metodo next() restituisce il prossimo elemento nell'iterazione
                    //Se non ci sono più elementi da iterare, restituisce {done: true}

                    next(){

                        //Se lo stack è vuoto, significa che abbiamo iterato su tutti i nodi e restituiamo done: true

                            if(stack1.isEmpty()) return {done: true};


                       //Recuperiamo l'ultimo elemento dallo stack
                       let node = stack1.removeLastElement()



                       //Se il figlio destro è presente, lo aggiungiamo per primo allo stack
                       //Questo perchè lo stack è LIFO (last in first out) quindi l'ultimo elemento aggiunto sarà il primo ad essere rimosso
                       //Quindi aggiungiamo prima il figlio destro e poi quello sinistro
                       //In questo modo il figlio sinistro sarà processato prima del figlio destro

                        if(node.right != null) stack1.addElement(node.right)
                        
                        if(node.left != null) stack1.addElement(node.left)
                             
                             //Restituiamo i dati del nodo corrente
                             //Restituiamo done: false per indicare che ci sono ancora elementi da iterare e non fermiamo l'iterazione
             
                            return {value: node.data, done: false}


                    }

                }
            }
        }



    }








    //Iteratore inOrder


    inOrder(){
        let expectedNode = this.nodeCount

        //Utilizziamo uno stack per salvare i nodi temporaneamente

        let stack1 = new stack()

        //Variabile per tenere traccia del nodo corrente

        let node1 = this.root

        //Aggiungiamo la radice allo stack  

        stack1.addElement(this.root)

        return{

            //Creiamo l'iteratore

            [Symbol.iterator](){

                return{

                        next(){

                            //Se lo stack è vuoto, significa che abbiamo iterato su tutti i nodi e restituiamo done: true

                            if(stack1.isEmpty()) return {done: true};





                            //Creiamo un ciclo while per scendere fino al nodo più a sinistra
                            //Il ciclo continua fino a che il nodo corrente non è null e ha un figlio sinistro

                           while(node1 != null && node1.left != null){
                            stack1.addElement(node1.left)
                            node1=node1.left
                           }



                           //Recuperiamo l'ultimo elemento dallo stack


                           node1 = stack1.removeLastElement()

                            //Se il nodo corrente ha un figlio destro, lo aggiungiamo allo stack

                           if(node1.right !== null){
                            stack1.addElement(node1.right)
                            node1=node1.right
                           }


                           //Ritorniamo i dati del nodo corrente


                            return {value: node1.data, done: false}


                    }



                }
            }
        }
    }









    postOrderTraversal(){
        let expectedNode = this.nodeCount;
        let rootNode = this.root;

        //Utilizziamo due stack per salvare i nodi temporaneamente

                let stack1 = new stack();
                let stack2 = new stack();

                //Aggiungiamo la radice allo stack1
                stack1.addElement(rootNode);

                //Creiamo un ciclo che viene eseguito fino a che lo stack1 non è vuoto
                while(!stack1.isEmpty()){
                    let node = stack1.removeLastElement(); 
                    //Se il nodo non è null, lo aggiungiamo allo stack2
                    if(node != null){
                        stack2.addElement(node);
                        //Aggiungiamo prima il figlio sinistro e poi quello destro allo stack1
                        //e ripetiamo il processoi  fino a che lo stack1 non è vuoto
                        if(node.left !== null) stack1.addElement(node.left);
                        if(node.right !== null) stack1.addElement(node.right);
                    }
                }

                 //Restituiamo l'iteratore
                return{


                    [Symbol.iterator](){
  

                //Aggiungiamo la radice allo stack1

                stack1.addElement();


                //Creiamo un ciclo che viene eseguito fino a che lo stack1 non è vuoto

                while(!stack1.isEmpty()){
                    let node = stack1.removeLastElement()
                    //Se il nodo non è null, lo aggiungiamo allo stack2
                    if(node != null){
                        stack2.addElement(node);
                        //Aggiungiamo prima il figlio sinistro e poi quello destro allo stack1
                        //e ripetiamo il processoi  fino a che lo stack1 non è vuoto
                        if(node.left !== null) stack1.addElement(node.left)

                        if(node.right !== null) stack1.addElement(node.right)

                    }
                }

                return{

                            //Il metodo next() restituisce il prossimo elemento nell'iterazione
                            //continua fino a che lo stack2 non è vuoto
                            next(){

                                if(stack2.isEmpty()){
                                    return {done: true}
                                }
                                //continua a rimuovere gli elementi dallo stack2 e li restituisce

                                return {value: stack2.removeLastElement().data, done: false}
                            }
                        }
                    }
                }

    }
    





    levelOrderTraversal(){

        //Creiamo una nuova coda per salvare i nodi temporaneamente


        let queue1 = new queue();

        //Aggiungiamo la radice alla coda

        queue1.offer(this.root);

        //Restituiamo l'iteratore

        return{
            [Symbol.iterator](){
                return{

                    //Continuerà a scorrere i nodi fino a che la coda non è vuota
                    

                 next(){
                    if(queue1.isEmpty()){
                        return {done: true}
                    }

                    //Recuperiamo il primo nodo dalla coda

                    let node1 = queue1.poll();


                    //Aggiungiamo i figli di sinistra e destra del nodo corrente alla coda
                    //La condizione continuerà fino a che non avremo visitato tutti i nodi


                    if(node1.left !== null){queue1.offer(node1.left)}

                                        if(node1.right !== null){queue1.offer(node1.right)}


                                        //Restituiamo i dati del nodo corrente


                                        return {value: node1.data, done: false}


                 }

                }
            }
        }




    }








    //FINIRE DI SISTEMARE GLI ITERATORI
    





    }







    let a = new BinarySearchTree();


    a.aggiungi("mango");
    a.aggiungi("apple");
    a.aggiungi("banana");
    a.aggiungi("peach");
    a.aggiungi("grape");
    a.aggiungi("orange");
    a.aggiungi("kiwi");
    a.aggiungi("pineapple");
    a.aggiungi("strawberry");
    a.aggiungi("blueberry");
    a.aggiungi("raspberry");
    a.aggiungi("blackberry");
    a.aggiungi("watermelon");
    a.aggiungi("cantaloupe");
    a.aggiungi("honeydew");
    a.aggiungi("papaya");
    a.aggiungi("coconut");
    a.aggiungi("avocado");
    a.aggiungi("lemon");
    a.aggiungi("lime");
    a.aggiungi("grapefruit");
    a.aggiungi("cherry");
    a.aggiungi("plum");
    a.aggiungi("apricot");
    a.aggiungi("nectarine");
    a.aggiungi("pomegranate");
    a.aggiungi("fig");
    a.aggiungi("date");
    a.aggiungi("cranberry");
    a.aggiungi("elderberry");
    a.aggiungi("gooseberry");
    a.aggiungi("currant");
    a.aggiungi("persimmon");
    a.aggiungi("dragonfruit");
    a.aggiungi("passionfruit");
    a.aggiungi("guava");
    a.aggiungi("lychee");
    a.aggiungi("rambutan");
    a.aggiungi("jackfruit");
    a.aggiungi("durian");
    a.aggiungi("starfruit");
    a.aggiungi("kiwano");
    a.aggiungi("tangelo");
    a.aggiungi("clementine");
    a.aggiungi("mandarin");
    a.aggiungi("tangerine");
    a.aggiungi("yuzu");
    a.aggiungi("kumquat");
    a.aggiungi("pomelo");
    a.aggiungi("breadfruit");
    a.aggiungi("soursop");
    a.aggiungi("cherimoya");
    a.aggiungi("ackee");
    a.aggiungi("tamarind");
    a.aggiungi("plantain");
    a.aggiungi("quince");
    a.aggiungi("medlar");


 



console.log("Altezza dell'albero:", a.altezza());


console.log("PRE ORDER");
for(let data of a.preOrder()){
    console.log(data)
}


console.log("\nLEVEL ORDER");
//Cicliamo l'iteratore preOrder
//e stampiamo i dati di ogni nodo 

for(let data of a.levelOrderTraversal()){
    console.log(data)
}


console.log("\nPOST ORDER");
for(let data of a.postOrderTraversal()){
    console.log(data)
}


console.log("\nIN ORDER");
for(let data of a.inOrder()){
    console.log(data)
}