(function(){
var Muusikapurk = function(){

     this.links = [];


    init: function{
      console.log('Rakendus läks tööle');

      //saan kätte purgid localStorage kui on
      if(localStorage.links){
          //võtan stringi ja teen tagasi objektideks
          this.links = JSON.parse(localStorage.links);
          console.log('laadisin localStorageist massiiivi ' + this.links.length);

          //tekitan loendi htmli
          this.links.forEach(function(link){

              var new_link = new link(link.title, link.URL);

              var li = new_link.createHtmlElement();
              document.querySelector('.list-of-links').appendChild(li);

          });

        }
    },


     deleteLink: function (event){
       //millele vajutasin SPAN
       console.log(event.target);

       //parent ehk millesees ta on LI
       console.log(event.target.parentNode);

       //mille sees see on UL
       console.log(event.target.parentNode.parentNode);

       //id
       console.log(event.target.dataset.id);

       var c = confirm("Oled kindel?");
       // keeldus
       if(!c){return;}
       console.log('kustutan');
       //kustutan HTMLI
       var ul = event.target.parentNode.parentNode;
       var li = event.target.parentNode;
       ul.removeChild(li);

       //kustutan objekti ja uuendan localStorage
       var delete_id = event.target.dataset.id;

       for(var i = 0; i <this.links.length; i++){

         if(this.links[i].id == delete_id){
            //see on see
            this.links.splice(i, 1);
            break;
         }
       }
     localStorage.setItem('links', JSON.stringify(this.links));
     },

     addNewClick: function(event){
       //salvestame purgi
       //console.log(event);

       var title = document.querySelector('.title').value;
       var URL = document.querySelector('.URL').value;

       //console.log(title + ' ' + URL);
       //1) tekitan uue link'i

       var new_link = new link(title, URL);

       //lisan massiiivi purgi
       this.links.push(new_link);
       console.log(JSON.stringify(this.links));
       // JSON'i stringina salvestan localStorage'isse
       localStorage.setItem('links', JSON.stringify(this.links));


    }


    var link = function(new_id, new_title, new_URL){
      this.id = new_id;
      this.title = new_title;
      this.URL = new_URL;
      console.log('created new link');
    };



   link.prototype = {
     createHtmlElement: function(){

       // võttes title ja URL ->
       /*
       li
        span.letter
          M <- title esimene täht
        span.content
          title | URL
       */

       var li = document.createElement('li');

       var span = document.createElement('span');
       span.className = 'letter';

       var letter = document.createTextNode(this.title.charAt(0));
       span.appendChild(letter);

       li.appendChild(span);

       var span_with_content = document.createElement('span');
       span_with_content.className = 'content';

       var content = document.createTextNode(this.title + ' | ' + this.URL);
       span_with_content.appendChild(content);

       li.appendChild(span_with_content);

       // DELETE button
       var span_delete = document.createElement('span');
       span_delete.style.color = "red";
       span_delete.style.cursor = " pointer";

       //delete ID
       span_delete.setAttribute("data-id", this.id);

       span_delete.innerHTML = " Delete";
       li.appendChild(span_delete);

       //nupuvajutus
       span_delete.addEventListener("click", Moosipurk.instance.deletelink.bind(Moosipurk.instance));


       return li;

     }
   };
})();
