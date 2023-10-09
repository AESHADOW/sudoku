
<template>  
    <h1>Sudoku</h1>
    <hr>
    <div id="errors">{{ errors }}</div>
    
      <div id="board">
        <div v-for="r in 9">
          <comp v-for="c in 9" 
           :key="r+'-'+c" 
           :get-number="digit" 
           :comp-pos="[c-1,r-1]"
           :class="allComps[c-1][r-1].class"
           :luck-number="allComps[c-1][r-1].luck"
           :all-list="allList"
           :check-list="{
            row: checkRow,
            column: checkColumn,
            square: checkSquare
          }"
          @active="changeBorder"
          @dis="removeBorder"
          @error="errorHandler"></comp>
        </div>
          
    </div>

    <br>
    <div id="numbers">
      <div v-for="m in 9" 
      class="digits" 
      :key="m" 
      @click="getNumber(m)">{{ m }}</div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
///////////data///////////////
const digit = ref()
const errors = ref(0)
const allComps = ref([...Array(9)].map(e=>Array(9)))
const allList = ref([...Array(9)].map(e=>Array(9)))
const answer = ref([...Array(9)].map(e=>Array(9)))
//////////methods/////////////
const getNumber =(val)=>{
  digit.value = val
}


const checkRow = (s,n,x) =>{
  if(n != null){
      if( s[x].includes(n)) {
          return true
        }
        else{
            return false
        }
    }
}
    
const checkColumn = (s,n,y) =>{
    if(n != null){
  for(let i=0;i<9;i++) {  
     if( s[i][y]== n) {
          return true
        }
        }
    }
}


 const checkSquare = (s,n,p) =>{
  let arr = new Array(2)
    for(let i=0;i<2;i++){
         if (0 <= p[i] && p[i] <= 2){
            arr[i] = 0
         }
         else if(3 <= p[i] &&p[i] <= 5){
            arr[i] = 3
            }
         else {
            arr[i] = 6
           }
        }
 
    if(n!=null){
        for(let r=0;r<=2;r++){
        for(let c=0;c<=2;c++){
            if (s[arr[0]+r][arr[1]+c] == n){
                return true
            }
        }
    }
}
}
//////////////////////////////////////////////////////////////

const randomArray =()=>{
  let possibleArray = [1,2,3,4,5,6,7,8,9]
  let array = []
  for(;possibleArray.length != 0;){
    let number = 
    possibleArray[Math.floor(Math.random()*(possibleArray.length-1))]
    if (!array.includes(number)){
      array.push(number)
      possibleArray = possibleArray.filter((e)=> e != number)
    }
  }
  return array
}

const generator = () => {
  const newPuzzle = ref([])
   newPuzzle.value.push(randomArray()) 

   for(let r=0;r<8;r++){
     const arr = ref(newPuzzle.value[r].filter((e)=> e))
      let shift = 2
      if((r+1)%3) shift = 3

      for(let i=0;i<shift;i++){
        arr.value.unshift(arr.value.pop())
      }
      newPuzzle.value.push(arr.value.filter((e)=> e)) 
    }
    return newPuzzle.value
  }              

const freeRooms =()=>{
  for (let i = 0; i < 64; i++) {
    allList.value[Math.floor(Math.random()*9)][Math.floor(Math.random()*9)] = null 
  }
  allComps.value.forEach((e,r) => {
    e.forEach((v,c) =>{
      if(allList.value[r][c] != null)  v.luck = true
    });
  });
}
const componentCreator = () => {
  for (let r = 0; r < 9; r++) {
     for (let c = 0; c < 9; c++) {
      allComps.value[c][r]={
        id: r+'-'+c,
        pos: [c,r],
        class: ' ',
        lock: false
      }
      
    }
    
  }
}

const changeBorder = (value) =>{

  allComps.value.forEach((e) => {
    e.forEach((v) =>{
      if(v.pos[0] == value[0] || v.pos[1] == value[1])  v.class = 'new'
    });
  });
}
const removeBorder = (value) =>{

  allComps.value.forEach((e) => {
    e.forEach((v) =>{
      if(v.pos[0] == value[0] || v.pos[1] == value[1])  v.class = ''
    });
  });
}

const errorHandler = () =>{
  errors.value++
  if(errors.value>5) {
    alert('YOU LOST!!!')
    allList.value = answer.value
  }
}

const Start = () => {
  componentCreator()
allList.value = generator()

allList.value.forEach((e,r)=>{
  e.forEach((v,c) =>{
     answer.value[r][c] = v
  });
});

freeRooms()
}
/////////////////////////////////////////////////////////

Start()


</script>

<style>
body{
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  background-color: #0f1e35;
}
hr{
  width: 450px;
  margin:10px auto;
  color: rgb(102, 133, 236);
}
#errors{
  color: rgb(247, 63, 63);
  font-size: 2rem;
  font-weight: bold;
}
#board{
  width: 450px;
  height: 450px;
  background-color:#0e1e36;
  margin: 0 auto;
  display: flex;
  text-wrap: wrap;
}
#numbers{
  width: 450px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  text-wrap: wrap;
}

.num{
    width: 48px;
    height: 48px;
    margin: 1px;
    display: flex;
    border-radius: 10px;
    background-color: rgb(1, 7, 17);
    border: 2px solid rgb(26, 54, 107);
    justify-content: center;
    align-items: center;
    cursor: pointer;   
    font-size: 20px;
    font-weight: bold;
    color: rgb(70, 116, 202);
  }
  .num:hover{
    background-color: rgb(19, 87, 53);
    border: 2px solid rgb(29, 85, 63);
    color: white;
}
.new{
  border: 3px solid rgb(33, 99, 68);
}
.fill{
  background-color: rgb(7, 26, 56);
  border: 2px solid rgb(48, 108, 199);
  color: rgb(107, 124, 199);
}
.invalid{
  color: rgb(212, 30, 30);
}
.digits{
  width: 50px;
    height: 50px;
    margin: 1px;
    display: flex;
    background-color: rgb(5, 41, 43);
    border: 2px solid rgb(20, 145, 103);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;   
    font-size: 20px;
    font-weight: bold;
    color: rgb(112, 144, 201);
}

.digits:hover{
  background-color: rgb(26, 168, 173);
    border: 2px solid rgb(86, 148, 241);
    color: white;
}
</style>
