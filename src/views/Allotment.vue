<template>
  <v-container>
    <div class="d-flex">
        <h2 class=" grey--text"> Allotments </h2>
        <v-spacer></v-spacer>
        <AllotItem class="mx-1" @inventoryUpdated="snackbar=true" />
        
    </div>
       
    <AllotmentTable/>
    <div class="mt-5 d-flex">
      <v-spacer></v-spacer>
    <v-btn small color="warning "> <v-icon class="pr-1 ml-0 pl-0">restore</v-icon> Traceback</v-btn>
    </div>

  </v-container>

</template>
<script>
import AllotmentTable from '../components/allotmentTable'
import AllotItem from '../components/allotItem'
export default {
    components :{
        AllotmentTable,
        AllotItem
    }
    
    
}
</script>