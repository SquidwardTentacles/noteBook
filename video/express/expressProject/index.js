 let arr = [1,2,3,4,5,6,7,8,9,1,2,3,3,3,5,5,6]
 let arr2 = []
 for (let i = 0; i < arr.length; i++) {
   for (let j = 0; j < arr.length; j++) {
     if(arr[j]==arr[i]) {
      arr2.push(arr[j])
     }
   }
 }
 console.log(arr2);
 