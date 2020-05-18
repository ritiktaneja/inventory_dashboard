<template>
    <div >
          <v-btn small color="success" @click="collectItems(a)"> <v-icon>check</v-icon> Collect Now</v-btn>
        
        <v-dialog
            v-model="dialog"
            scrollable 
            max-width="1000px"
            transition="dialog-transition"
          
        >
        <v-card>
            <v-card-title class="grey--text">
                Inventory Collection | 
            </v-card-title>
            <v-card-text>
                 <h3> {{object.allotedTo}} | {{object.event}}</h3>
                 <v-simple-table class="transparent">
            <table>
                <tr v-for="h in headers" :key="h.value" class="grey--text">
                <td v-for='item in object[h.value]' :key="item">
                    {{item}}
                </td>
                <td>
                    <v-btn small color="warning">Collect</v-btn>
                </td>
                </tr>
            </table>
            </v-simple-table>
                
            </v-card-text>
        </v-card>
           
        </v-dialog>
   
    </div> 
</template>

<script>
import db from '@/firebase.js'
export default {
    props : {
      object : Object  
    },

    data : function(){
        return {
            dialog:true,
               headers:[{text:'Camera',value:'camera'},{text:'Lenses',value:`lenses`},{text:'Battery',value:'battery'},{text:'Bag',value:'bag'},{text:'SDCard',value:'sdcard'},{text:'Tripod',value:'tripod'},{text:'Monopod',value:'monopod'},{text:'Other',value:'Other'}],
        }
    },
    methods : {
        // async getAllotmentData(id,type)
        // {
        //      var docRef  = db.collection('Allotment').doc(id.toString())
        // },
        async collectItem(id)
       {    
          
           var docRef  = db.collection('Allotment').doc(id.toString())
         
            await  docRef.update({
                collectedBy:'Inventory'
            })
            .then(()=>{
                console.log('Successfully collected')
            })
            .catch(err=>{
                alert('Error occured with code : '+err)
            })

       }
    }
    
}
</script>

