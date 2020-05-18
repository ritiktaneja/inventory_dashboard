<template>
  <div class="home">
    <h2 class="grey--text">
      Dashboard
    </h2>
    <v-container>
      <v-row>
        
         <v-col :md="4">
          <v-card  :height="'350px'"  class="transparent ">
            <v-card-title primary-title>
              Masters
            </v-card-title>
            <v-card-text>
              <div v-html="masterStats"></div>
            </v-card-text>
          </v-card>
        </v-col>
         <v-col :md="4">
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

         <v-col :md="4">
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
      masterStats : "",
      allotmentStats : ""
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
          db.collection('Item').onSnapshot(() => {
            this.getMasterStats()
        })
  },
  mounted : function(){
    this.getNotes()
    this.getAllotmentStats()
    this.getMasterStats()
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
    getMasterStats()
    {
       this.masterStats="<h3> Geeky stuff to be added here </h3> "
    }
  }
}
</script>
