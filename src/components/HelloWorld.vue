<template>
  <b-container class="main-container">
    <b-row>
        <b-col cols="7" class="content-container" id="image-container">
          <b-row>
              <b-col class="content-container">
                <div v-if="imgUri==''" class="img-holder placeholder"></div>
                <div v-else class="img-holder" v-bind:style="{ 'background-image': 'url(' + imgUri + ')' }"></div>
              </b-col>
          </b-row>
          <b-row>
              <b-col cols="9" class="content-container">
                <input v-model="imgUri" placeholder="image URI" class="img-uri-input">
              </b-col>
              <b-col cols="3" class="content-container">
                <button v-on:click="labelImg(imgUri)" id="btn-analyze">Analyze</button>
              </b-col>
          </b-row>
        </b-col>

        <b-col cols="5" class="content-container" id="results-container">
          Top Results
          <b-row>
                <div v-if = "loadingResults===true" id="loader" style="width: 100%; height: 200px;"></div>
                <div v-show = "loadingResults===false && errorInResponse===false" id="chartdiv" style="width: 100%; height: 400px;"></div>
                <div v-show= "errorInResponse===true" id="errMsgHolder">{{errorMsg}}</div>
          </b-row>
          <b-row>
          </b-row>
        </b-col>
    </b-row>
 </b-container>
</template>

<script>
import {
    labelImage,
    showResultsLoader,
    hideResultsLoader
  } from '../functions.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUri: '',
      imageLabels:[],
      loadingResults: false,
      errorInResponse: false,
      errorMsg: ''
    }
  },
  methods: {
       labelImg(imgUrl){
         this.errorInResponse = false;
         this.loadingResults = true
         labelImage(imgUrl).then(value =>{
           try{
             this.checkForErrorsAndThrow(value)
             this.imageLabels = value.response.responses[0].labelAnnotations.slice(0, 0+4)
             this.makeChart(this.imageLabels)
           }catch(err){
             this.errorMsg = err
             this.errorInResponse = true
           }finally {
             this.loadingResults = false
           }
         })
       },
       checkForErrorsAndThrow(value){
         if(!value) throw "No response"
         if(value.errorMsg) throw value.errorMsg
       },
       makeChart(data){
         AmCharts.makeChart("chartdiv",
           {
             "type": "serial",
             "categoryField": "type",
             "chartCursor": {},
             "graphs": [
               {
                 "type": "column",
                 "title": "Image Labels",
                 "valueField": "score",
                 "fillAlphas": 1,
                 "fillColors": "#2D4671",
                 "lineColor": "#2D4671"
               }
             ],
             "dataProvider": data,
             "categoryField": "description"
           }
         );
       }
  },
  created () {

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
  background-color: #778BAE;
}
.img-holder.placeholder{
  background: url('../assets/logo.png') no-repeat center;
  background-size: contain;
  padding: 5em;
  opacity: .6;
}

.img-uri-input{
  width: 100%;
}

#loader{
  background: url('../assets/loader.svg') no-repeat center;
  background-size: contain;
}

#btn-analyze{
  padding: 10px 30px 10px 30px;
  border-radius: 5px;
  background-color: #152C53;
  color: white;
  cursor: pointer;
}

#errMsgHolder{
  text-align: center;
  width: 100%;
  margin-top: 5em;
  color: red;
}

</style>
