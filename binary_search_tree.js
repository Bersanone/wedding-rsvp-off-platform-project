//Binary serach tree

//Struttura dati ad albero in cui ogni nodo ha al massimo due figli
//Il figlio sinistro contiene valori minori del nodo padre
//Il figlio destro contiene valori maggiori del nodo padre


class Node{
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

        return this.contains(this.root,elem)

    }






    //Funzione ricursiva per trovare un determinato elemento


    contains(node,element){

        if(node === null) return false;


        let cmp = element.localeCompare(node.data);



            //Cerca sulla parte di sinistra perchè il risultato è minore del valore corrente

            if(cmp < 0){return this.contains(node.left,element)}


            //Cerca sulla parte di destra se il risultato è maggiore del valore corrente


           else if(cmp > 0){return this.contains(node.right,element)}



           //Abbiamo trovato il valore che stavamo cercando


           else return true


        

    };





    //Funzione semplificata per aggiungere un elemento


    aggiungi(elem){

        if(this.contiene(elem)){ return false}


        else{

            root = this.add(this.root,elem);

            this.nodeCount++;

            return true;

        }





    }







    //Funzione ricursiva per aggiungere un elemento


    add(node,elem){

        //Caso base troviamo un leaf node (nodo senza figli)

        if(node === null){ return node = new Node(null,null,elem)}

        else if (elem.localeCompare(node.data) < 0){
            node.left = this.add(node.left,elem)
        } else {
            node.right = this.add(node.right,elem)
        }


        return node

    }




}