//Union find
// Struttura dati che tiene traccia di un partizionamento di un insieme di elementi in un numero
// di insiemi disgiunti (non sovrapposti). Permette di unire (union) due insiemi e di
// trovare (find) a quale insieme appartiene un elemento in modo molto efficiente.

class Unionfind{

    //Costruisce un istanza di Union-Find con un dato numero di 'size' elementi.

      constructor(size){
      

        if(size <= 0) throw new Error('size <= 0 is not allowed');
         

        //Numero totale di elementi nella struttura
        this.size = size

        //Numeri di componenti o gruppi iniziali
        
        this.numComponents = size;


        //Array per tenere traccia del genitore di ogni elemento
        //utilizziamo new Array per creare un array di dimensione finito 'size'
        //Se un elemento è il genitore di se stesso, allora è la radice di un albero
        this.id = new Array(size);


        //Tiene traccia della dimensione di ogni gruppo di un dato elemento

        this.sz = new Array(size);

        for(let i = 0;i<size;i++){

            // Ogni elemento è inizialmente il genitore di se stesso (radice del proprio albero)
            this.id[i] = i;

            //Ogni elemento è inizialmente in un gruppo di dimensione 1

            this.sz[i] = 1



      };
      }





     // Trova la radice del componente a cui appartiene 'p' con compressione del percorso.
    // La compressione del percorso rende le ricerche future quasi istantanee (tempo ammortizzato O(α(n))).
    

    find(p){


        //Risaliamo l'albero fino a trovare la radice


        let root = p;


    //Finché non troviamo la radice, spostiamoci verso l'alto nell'albero

        while( root != this.id[root]){

            root = this.id[root];

        }



          // 2. Compressione del percorso: collega tutti i nodi sul percorso direttamente alla radice.

            while(p !== root){

                //Salviamo il genitore di 'p'

                let next = this.id[p];

                //Colleghiamo 'p' direttamente alla radice
                this.id[p] = root;

                //Procediamo al prossimo nodo sul percorso verso la radice
                p = next;

            }

            return root

    

    };



    //Funzione per verificare se due elementi fanno parte dello stesso gruppo

    connected(p,q){

        return this.find(p) === this.find(q)

    };



    //Funzione per restituire la taglia di un gruppo


    componentSize(p){

        return this.sz[this.find(p)]
    };



    //Funzione per restituire Size


    size2(){
        return this.size
    };


    //Funzione per restituire un componente


    component(){

        return this.numComponents

    };



    //Funzione per unire i gruppi/componenti contenenti gli elementi 'p' e 'q'


    unify(p,q){

        let root1 = this.find(p);

        let root2 = this.find(q);


        //Se fanno giàò parte dello stesso gruppo restituiamo

        if(root1 === root2) return;



        //Uniamo due gruppi/componenti insieme
        //Uniamo il gruppo più piccolo all'interno di quello più grande


        if(this.sz[root1] < this.sz[root2]){
            this.sz[root2] += this.sz[root1];
            this.id[root1] = root2;
        } else {

            this.sz[root1] += this.sz[root2];
            this.id[root2] = root1

        }


        this.numComponents--




    }




}







const uf = new Unionfind(10);
console.log(`Componenti iniziali: ${uf.component()}`); // Output: 10

uf.unify(0, 1);
uf.unify(2, 3);
console.log(`Componenti dopo le prime unioni: ${uf.component()}`); // Output: 8

console.log(`0 e 1 sono connessi? ${uf.connected(0, 1)}`); // Output: true
console.log(`0 e 2 sono connessi? ${uf.connected(0, 2)}`); // Output: false

uf.unify(0, 2); // Unisce il gruppo (0,1) con il gruppo (2,3)
console.log(`Componenti dopo aver unito 0 e 2: ${uf.component()}`); // Output: 7
console.log(`1 e 3 sono connessi? ${uf.connected(1, 3)}`); // Output: true

console.log(`Dimensione del componente di 3: ${uf.componentSize(3)}`); // Output: 4