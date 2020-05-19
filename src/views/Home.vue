<template>
  <div class="home">
    <h2 class="grey--text">
      Dashboard
    </h2>
    <v-container>
      <v-row>
        
        <v-col md="4">
          <v-card :height="'350px'" class="transparent">
            <v-card-title>
              Available Items
            </v-card-title>
            <v-card-text>
             <v-btn class="ma-1" @click="dialog=true, obj=h" v-for="h in headers" :key="h.value"> {{h.text}} </v-btn>              
            </v-card-text>
          </v-card>

             <v-dialog
            v-model="dialog"
            
            max-width="500px"
            transition="dialog-transition"
          >
            <v-card flat class="">
              <v-card-title primary-title>
                {{obj.text}}
              </v-card-title>
              <v-card-text>
                  
              <v-list dense>
              
                  <v-list-item v-for="(item,i) in items[obj.value]" :key="i">
                   {{i+1}}.  <b class="mx-2"> {{item}}</b>
                  </v-list-item>
              </v-list>
              </v-card-text>
              
            </v-card>
          </v-dialog>

        </v-col> 
        
         <v-col cols="12" md="4" xs="12" >
          <v-card  :height="'350px'" class="transparent">
           <v-card-title >
             Allotments
           </v-card-title>
           <v-card-text>
             <div v-html="allotmentStats">
             </div>
           </v-card-text>
          </v-card>

       

        </v-col>

         <v-col class="s12">
          <v-card :height="'350px'"  class="transparent">
           <v-card-title>
             Notes
           </v-card-title>
           <v-card-text>
            <v-textarea v-model="notes"  id="" cols="30" rows="6"></v-textarea>
            <v-text-field
            required
            label='Enter note here'
              @keyup.enter="addNote()"
              v-model="note"
              single-line
            ></v-text-field>
           </v-card-text>
          </v-card>
        </v-col>


      </v-row>

    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

import db from '@/firebase'

export default {
  name: 'Home',
  data : function(){
    return {
      notes : "",
      note : "",
      dialog:false,
      obj : "",
      masterStats : "",
      allotmentStats : "",
      items : {},
      headers:[{text:'Camera',value:'camera'},{text:'Lenses',value:`lenses`},{text:'Battery',value:'battery'},{text:'Bag',value:'bag'},{text:'Charger',value:'charger'},{text:'SDCard',value:'sdcard'},{text:'Tripod',value:'tripod'},{text:'Monopod',value:'monopod'},{text:'Lenscap',value:'lenscap'},{text:'BackCover',value:'backcover'},{text:'Others',value:'others'}],
      }
  },
  components: {
   
  },

  created () {
       db.collection('inventoryNotes').onSnapshot(() => {
            this.getNotes()
        })
          db.collection('Allotment').onSnapshot(() => {
            this.getAllotmentStats()
        })
         
  },
  mounted : function(){
    this.getNotes()
    this.getAllotmentStats()
    this.availableItems()
   
  },
  methods : {
   async getNotes()
    {
       const snapshot = await db.collection('inventoryNotes').orderBy("datetime","asc").get()
       this.notes= ""
       
          this.notes +=snapshot.docs.map(doc => { return "\n"+ doc.data().notes}) ;
    },
    async addNote() 
    {
      if(this.note.trim() != "")
      await db.collection('inventoryNotes').add({notes:this.note,datetime:Date.now()})
      .then (()=>{
        console.log('note successfully added')
      })
      .catch(e=>{
        alert('Error occured with code '+ e)
      })
      this.note = ""
    },
    async getAllotmentStats()
    {
      //const snapshot = await db.collection('Allotment').orderBy("datetime","asc").get()
      
      this.allotmentStats="<h3> Geeky stuff to be added here </h3> "
      

    },
   
     async availableItems()
            {
                var ref= this;
                const snapshot = await db.collection('Item').get()
                this.items = {}
               await snapshot.docs.forEach(async doc => {
                    doc = doc.data()
                    
                   
                    var name = doc.id;
                    if(name)
                    {
                    name= name.toString()
                    
                   
                    var flag=true;
                    await db.collection("currentAllotment").doc(name).get().then(d=>{
                        if(d.exists)
                        flag = false
                    });
                   
                     if(!ref.items[doc.type])
                    ref.items[doc.type] = []
                    if(flag)
                    ref.items[doc.type].push(name)
                    }      
                })
                // console.log("items : "+JSON.stringify(this.items))
            },
  }
}
</script>
