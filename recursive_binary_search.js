function recursive_binary_search(list,target){
    if(list.length === 0){
        return false
    }else{
        let midpoint = Math.floor(list.length / 2)
      
        if(list[midpoint] === target){
            return true
        }else if(list[midpoint] < target){
            return recursive_binary_search(list.slice(midpoint + 1),target)
        }else{
            return recursive_binary_search(list.slice(0,midpoint),target)
        }
    
    
    
    }


}

let numeri = [1,2,3,4,5,6,7,8,9,10]

let risultato = recursive_binary_search(numeri,90)

function verifica(risultato){
    if(risultato){
        return console.log(`l\'elemento è stato trovato: ${risultato}`)
    } else {
        return console.log('l\'elemento non è stato trovato')
    }
}


verifica(risultato)
