<template>
    <div >
          
           <v-btn v-if="!object.notCollected" small color="secondary" @click="dialog=true"> <v-icon>check</v-icon> Collection History</v-btn>
          
            <v-btn v-else small color="success" @click="dialog=true"> <v-icon>check</v-icon> Collect Now</v-btn>
           
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
                <tr v-for="(h,index) in headers" :key="index" class="grey--text">
                <td>
                    {{h.text}}
                </td>
                <td v-for='(item,index) in object[h.value]' :key="index">
                   
                    <div v-if="typeof item != 'object' || !item.collectedBy">
                    {{item.name || item}} <br> <v-btn small color="warning" @click="collectItems(item.name || item,h.value)">Collect</v-btn>
                    </div>

                    <div v-else class="black--text">
                    {{item.name}}
                                   <br>
                     <span class="green pa-1" style="border-radius:8%!important;">Collected by : {{item.collectedBy}} </span>
                   
                    </div>
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
import firebase from 'firebase/app'
import 'firebase/firestore'

import db from '@/firebase.js'
export default {
    props : {
      object : Object   //object.id is Allotment id here
    },

    data : function(){
        return {
            dialog:false,
               headers:[{text:'Camera',value:'camera'},{text:'Lenses',value:`lenses`},{text:'Battery',value:'battery'},{text:'Bag',value:'bag'},{text:'SDCard',value:'sdcard'},{text:'Tripod',value:'tripod'},{text:'Monopod',value:'monopod'},{text:'Other',value:'Other'}],
        }
    },
    methods : {
        // async getAllotmentData(id,type)
        // {
        //      var docRef  = db.collection('Allotment').doc(id.toString())
        // },
        async collectItems(object_name,type)
       {    
          
           var docRef  = db.collection('Allotment').doc(this.object.id.toString())
            console.log(type+object_name)
            var batch = db.batch()
            await batch.update(docRef, { [type] : firebase.firestore.FieldValue.arrayRemove({name : object_name})})
            await batch.update(docRef, { [type] : firebase.firestore.FieldValue.arrayRemove(object_name)})
            await batch.update(docRef, { [type] : firebase.firestore.FieldValue.arrayUnion({name:object_name,collectedBy:this.$store.state.username || 'Inventory'})})
            batch.commit()
            .then(()=>{
                console.log('Successfully Updated')
            })
            .catch(err=>{
                alert('Error occured with code : '+err)
            })
            
           
            db.collection("currentAllotment").doc(object_name).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
          

       }
    }
    
}
</script>

