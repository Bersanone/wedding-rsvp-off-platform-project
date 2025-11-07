function ricerca_binaria(list,target){
  let start = 0;
  let end = list.length - 1;

  while(start<=end){
    let midpoint = Math.floor((start + end) / 2)

    let value = list[midpoint]

    if(value === target){
      return console.log(`L'elemento si trova alla posizione: ${midpoint}`)
    }else if(value < target){
    start = midpoint + 1
    }
    else {
      end = midpoint-1
    }
  }
       return null
}



console.log(ricerca_binaria([1,2,3,4,5,6,7,8,9,10],8)) 
