<template>
  
        <v-card flat class="my-4 transparent">
        <v-simple-table   fixed-header class=" transparent">
            <table class="bordered striped">
                <thead >
                    <tr  class="transparent" flat>
                        <td v-for="h in headers" :key="h.text">
                            {{h.text}}
                        </td>
                        <td>
                           Collected by
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="a in allotmentData" :key="a.id" :class="a['collectedBy']?'striked':''" >
                        <td @click="$event.target.classList.toggle('striked')" v-for="h in headers" :key="h.value" :class="a[h.value]?'':'grey lighten-2'">
                          {{typeof a[h.value] == 'object' ? a[h.value].join(", "):a[h.value]}}
                          
                        </td>
                        <td v-if="!a['collectedBy']" >
                            <v-btn small color="success" @click="collectItem(a['id'])"> <v-icon>check</v-icon> Collect Now</v-btn>
                        </td>
                        <td v-else>
                              {{a.collectedBy}}
                        </td>
                       
                    </tr>
                      <!-- <tr>
                        <td v-for="h in headers" :key="h.value" >
                            <v-combobox   small-chips  v-model="newAllotment[h.value]" multiple chips :items="items[h.value]">   
                                
                                  <template v-slot:no-data>
                                    <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                        No results matching "<strong>{{newAllotment[h.value]}}</strong>". Press <kbd>enter</kbd> to create a new one
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                </template>    
                                                            
                            </v-combobox>
                        </td>
                    </tr> -->

                </tbody>
            </table>
        </v-simple-table>
    </v-card>

</template>

<script>
import db from '@/firebase'
export default {

    data : function(){
        return {
            headers:[{text:'Alloted To',value:'allotedTo'},{text:'Event',value:'event'},{text:'Camera',value:'camera'},{text:'Lenses',value:`lenses`},{text:'Battery',value:'battery'},{text:'Bag',value:'bag'},{text:'SDCard',value:'sdcard'},{text:'Tripod',value:'tripod'},{text:'Monopod',value:'monopod'},{text:'Date & Time',value:'datetime'}],

            allotmentData : [
                {datetime:115500,allotedTo:'Ritik',event:'Quiz',camera:'rt-d5600',battery:'rt-d5600 black',collectedBy:'DoPy'},
                {datetime:115000,allotedTo:'Ritik',event:'Quiz',camera:'rt-d5600',battery:'rt-d5600 black',bag:'Canon Black'},
            ],
            newAllotment: {},
            items : {
                camera : ['Canon 700D', 'Nikon d5600'],
                
            }
        }
   },
   mounted: function() 
   {
     this.getAllotmentData()

   
     
   },
   created(){
      db.collection('Allotment').onSnapshot(res => {
            const changes = res.docChanges()

            changes.forEach(change=>{
                 if(change.type==='added')
                 this.allotmentData.push({
                     ...change.doc.data()
                     
                 })
                 else 
                 this.getAllotmentData()
                 
            })
        })
   },
   methods:{
      async getAllotmentData(){
             const snapshot = await db.collection('Allotment').get()
            this.allotmentData = snapshot.docs.map(doc => {var data = doc.data(); data.id = doc.id; return data }).sort((a,b)=>{
                
                if (a.datetime>b.datetime)
                    return -1
                else 
                    return 1
            }).map(x=>{
                x.datetime = new Date(x.datetime).toGMTString();
                return x;
            })
       },
      async collectItem(id)
       {    
          
           var docRef  = db.collection('Allotment').doc(id.toString())
           prompt('Are you sure ?')
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
     
   },
   computed : {
       
       
    }
    
}
</script>

<style scoped>

td,table{
    border : .5px solid lightgrey !important;
}
.striked {
    background: grey;
    text-decoration: line-through;
}
</style>