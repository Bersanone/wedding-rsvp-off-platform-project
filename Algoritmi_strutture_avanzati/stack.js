class stack {

   //Lo stack in informatica è una struttura dati che segue il principio LIFO (Last In First Out), ovvero l'ultimo elemento inserito è il primo ad essere rimosso. 
   // Si può immaginare come una pila di piatti: puoi aggiungere un piatto in cima alla pila e rimuovere il piatto che si trova in cima.
   // Questa implementazione utilizza un array per memorizzare gli elementi della pila.


    constructor(){
        this.stack = [];
        this.size = 0;
    }


    //Metodo per aggiungere un elemento in cima alla pila

    addElement(data){
        this.stack.push(data);
        this.size++;
    }


    //Metodo per rimuovere il primo elemento della lista

    removeLastElement(){
        if(this.isEmpty()){
            throw new Error("Stack is empty");
        }
        this.stack.pop();
        this.size--;

    }


    //Grandezza della pila

    sizeStack(){
        return this.size
    }



    //is empty?

    isEmpty(){
        if(this.size === 0){
            return true
        }else{
            return false
        }
    }



    //prendi l'ultimo elemento della pila


    topElement(){
        if(this.isEmpty()){
            throw new error("Stack is empty");
        }else{
            //Utilizzia size - 1 perchè gli array partono da 0 mentre size da 1
            return this.stack[this.size - 1]
        }
    }




    //stampa tutto lo stack

    getStack(){
        if(this.isEmpty()){
            throw new error("Lo stack è vuoto")
        }

        let result = []

        for(let i=0;i<this.stack.length;i++){
           result.push(this.stack[i])
        }

        return result
    
    
    }
}




let s = new stack();


s.addElement(3);
s.addElement(5);
s.addElement(8);
s.addElement(13);

s.removeLastElement();

s.addElement(85)


console.log(s.topElement()
)



console.log(s.getStack())




export {stack};