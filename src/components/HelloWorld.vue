<template>
  <b-container class="main-container">
    <b-row>
        <b-col cols="8" class="content-container" id="image-container">
          <b-row>
              <b-col class="content-container">
                <div v-if="imgUri==''" class="img-holder placeholder"></div>
                <div v-else class="img-holder" v-bind:style="{ 'background-image': 'url(' + imgUri + ')' }"></div>
              </b-col>
          </b-row>
          <b-row>
              <b-col class="content-container">
                <input v-model="imgUri" placeholder="image URI" class="img-uri-input">
              </b-col>
          </b-row>
          <b-row>
              <b-col class="content-container">
                <button v-on:click="labelImg(imgUri)">Analyze</button>
              </b-col>
          </b-row>

        </b-col>
        <b-col cols="4" class="content-container" id="results-container">results</b-col>
    </b-row>
 </b-container>
</template>

<script>
import {
    labelImage
  } from '../functions.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUri: ''
    }
  },
  methods: {
       labelImg(imgUrl){
         var response = labelImage(imgUrl)
         console.log(response)
       }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.main-container{
  overflow: auto;
  min-height: 30em;
}
.content-container{
  padding: 1em;
}

.img-holder{
  min-height: 60vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.img-holder.placeholder{
  background: url('../assets/placeholder.png') no-repeat center;
  background-size: contain;
}

.img-uri-input{
  width: 50%;
}


</style>
