
import Vue from "vue";
import VueHtmlToPaper from "vue-html-to-paper";
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" ,
    "https://cdn.jsdelivr.net/npm/animate.css@^4.0.0/animate.min.css" ,
    "https://cdn.jsdelivr.net/npm/quasar@1.12.8/dist/quasar.min.css" 
    
  ]
}

Vue.use(VueHtmlToPaper, options);
