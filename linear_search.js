function linear_search (list,target){
  for(let i = 0;i < list.length;i++){
  if (list[i] === target){return console.log(`L'elemnto si trova:${i}`)}
  }
  return console.log('ti è andata male')
}


console.log(linear_search([1,2,5,5,7,41,1],41))