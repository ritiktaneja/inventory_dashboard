<template>
  
        <v-card flat class="my-4 transparent">
        <v-simple-table  striped fixed-header class=" transparent">
            <table class="bordered striped">
                <thead >
                    <tr  class="transparent" flat>
                        <td v-for="h in headers" :key="h.text">
                            {{h.text}}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="a in allotmentData" :key="a.datetime">
                        <td  v-for="h in headers" :key="h.value" :class="a[h.value]?'':''">
                          {{a[h.value]}}
                        </td>
                    </tr>
                      <tr>
                        <td v-for="h in headers" :key="h.value" >
                            <v-combobox   small-chips  v-model="newAllotment[h.value]" multiple chips :items="items[h.value]">   
                                
                                  <template v-slot:no-data>
                                    <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                        No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    </v-list-item>
                                </template>    
                                                            
                            </v-combobox>
                        </td>
                    </tr>

                </tbody>
            </table>
        </v-simple-table>
    </v-card>

</template>

<script>
export default {

    data : function(){
        return {
            headers:[{text:'Alloted To',value:'allotedTo'},{text:'Event',value:'event'},{text:'Camera',value:'camera'},{text:'Lenses',value:`lenses`},{text:'Battery',value:'battery'},{text:'Bag',value:'bag'},{text:'Charger',value:'charger'},{text:'SDCard',value:'sdcard'},{text:'Tripod',value:'tripod'},{text:'Monopod',value:'monopod'},{text:'Others',value:'others'},{text:'Date & Time',value:'datetime'}],

            allotmentData : [
                {datetime:115500,allotedTo:'Ritik',event:'Quiz',camera:'rt-d5600',battery:'rt-d5600 black'},
                {datetime:115000,allotedTo:'Ritik',event:'Quiz',camera:'rt-d5600',battery:'rt-d5600 black'},
            ],
            newAllotment: {},
            items : {
                camera : ['Canon 700D', 'Nikon d5600']
            }
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

</style>