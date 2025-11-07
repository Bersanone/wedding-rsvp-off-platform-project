class queue {
    constructor() {
         
        this.line = [];
        this.size = 0;

    }




    //Lunghezza della lista

    itSize(){
        return this.size
    }


    //isEmpty?

    isEmpty(){
        if(this.size === 0){
            return true
        }

        return false
    }


    //peek first

    peek(){
        if(this.isEmpty()){
            throw new Error("lista vuota")
        }

        return this.line[0]
    }



    // Togliamo il primo elemento dalla coda

    poll(){
        if(this.isEmpty()){
                   throw new Error("lista vuota")

        }

                this.size--;

                //Utilizziamo shift() per eliminare il primo elemento della lista

        return this.line.shift()

    }


    //Aggiungiamo un elemento all'inizio della coda


    offer(data){
        
                this.size++;

                //Utilizziamo push() per aggiungere un elemento alla fine della lista
        return this.line.push(data);

    }

    //stampa la coda


        getLine(){
        if(this.isEmpty()){
            throw new Error("Lo stack è vuoto")
        }

        let result = []

        for(let i=0;i<this.line.length;i++){
           result.push(this.line[i])
        }

        return result
    
    
    }



}




let l = new queue();

l.offer(25);
l.offer(215);
l.offer(258);
l.offer(255);

console.log(l.peek()
)

console.log(l.getLine())



export{queue}

