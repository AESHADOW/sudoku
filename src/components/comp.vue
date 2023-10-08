<template>
<div  :class="clsObj" @click="setNumber" @mouseenter="activeBorder" @mouseleave="disBorder">
    {{allList[compPos[0]][compPos[1]] }}
</div>
</template>

<script setup>
import { computed, ref } from 'vue';
/////////////data//////////////////////
const getN = ref()
const invalid = ref(false)
  

const clicked = ref(false)
const clsObj = computed(()=>({
    num: true,
    invalid: invalid.value,
    fill: getN.value != null,
    new: false
}))


///////////////emit&prop//////////////
const emit = defineEmits(['active','dis'])

const props = defineProps({
    getNumber:{
        type: Number
    },
    compPos:{
        type : Array
    },
    allList:{
        type: Array
    },
    checkList: Object
})
//////////////methods////////////////



const setNumber = () => {
        if(clicked.value){
        getN.value = null
    }else{
        getN.value = props.getNumber
    }

    props.checkList.row(props.allList,getN.value,props.compPos[0]) ||
    props.checkList.column(props.allList,getN.value,props.compPos[1]) ||
    props.checkList.square(props.allList,getN.value,props.compPos) ?
       invalid.value = true : invalid.value = false

    props.allList[props.compPos[0]][props.compPos[1]] = getN.value
    clicked.value = !clicked.value
}

const activeBorder = () => {
    emit('active', props.compPos)
}
const disBorder = () => {
    emit('dis', props.compPos)
}

</script>

<style>
</style>