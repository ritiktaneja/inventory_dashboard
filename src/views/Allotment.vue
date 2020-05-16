<template>
  <v-container>
    <div class="d-flex">
        <h2 class=" grey--text"> Allotments </h2>
        <v-btn small color="warning ml-auto"> <v-icon class="pr-1 ml-0 pl-0">restore</v-icon> Traceback</v-btn>
    </div>
       
    <AllotmentTable/>


  </v-container>

</template>
<script>
import AllotmentTable from '../components/allotmentTable'
export default {
    components :{
        AllotmentTable
    }
    
    
}
</script>