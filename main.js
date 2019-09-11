var baseurl = "https://api.github.com/users/";

function submit(){
    var name = document.getElementById("name");
    getGitUsers(name.value);
}

function getGitUsers(name){

console.log(baseurl + name + "/repos");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",baseurl + name + "/repos" ,true);
  xmlhttp.onreadystatechange = function() {
  var main="";
    if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
       var responseData=JSON.parse(xmlhttp.responseText);
       var tbltop = `<table>
       <tr><th>Id</th>  <th>Repos Name</th> <th>Repos full_name</th><th>language</th> <th>Owner</th><th>Button</th></tr>`;
      //main table content we fill from data from the rest call
      var main ="";
      
      for (i = 0; i < responseData.length; i++){
        main += "<tr><td>"+responseData[i].id
                    +"</td><td>"+responseData[i].name+"</td><td>"+responseData[i].full_name
                    +"</td><td>"+responseData[i].language+ "</td><td>"+ name
                    +"</td><td>"+ "<button class='mark'>Mark important</button>"
                    +"</td></tr>";
      }
      var tblbottom = "</table>";
      var tbl = tbltop + main + tblbottom;
      document.getElementById("data").innerHTML = tbl;

      let buttons = document.querySelectorAll(".mark");
      buttons.forEach(button =>
      button.addEventListener("click", _ => handleMarkImportant(button))
      );
    }
  };
  xmlhttp.send();
}


function handleMarkImportant(button) {
    let impTable = document.getElementById("impTable");
    var repoInfo = button.parentElement.parentElement;
    let id = repoInfo.firstChild.textContent;
    let ids = Array.from(impTable.children).map(row => row.firstChild.textContent);
    if(!ids.includes(id)){
      var item = repoInfo.cloneNode(true);
      item.lastChild.remove();
      if(item.firstChild)
      impTable.appendChild(item);
    }
  }
