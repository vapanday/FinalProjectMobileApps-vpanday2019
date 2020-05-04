
 document.addEventListener("DOMContentLoaded", function(){

    document.getElementById('data').onclick = doinfo;

    
  });

 var doinfo = function(){
    console.log("REQUESTING COUNTRY");
    //Performs api call
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var loc = JSON.parse(this.responseText);
            console.log(loc);
            showinfo(loc); //Generates data
        }
        else
        { 
            console.log("this.readyState=",this.readyState);
            console.log("this.status=",this.status);
        }
    };
    var dataprefix = "https://corona.lmao.ninja/v2/countries/";
    var datasuffix = document.getElementById("loc").value;
    var data = dataprefix + datasuffix;
    console.log("requesting:", data);
    xmlhttp.open("GET", data, true)
    xmlhttp.send();
 }

 function showinfo(conditions) { 
    let workspace = document.getElementById("output");
    workspace.innerHTML = "";

    var header = document.createElement('h4'); 
    var textnode = document.createTextNode(conditions.country);
    header.appendChild(textnode);
    workspace.appendChild(header);
    
    var result = new CanvasJS.Chart("bar1", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Corona Stats"
        },
        data: [{        
            type: "column",  
            dataPoints: [      
                { y: conditions.cases, label: "Cases" },
                { y: conditions.deaths,  label: "Deaths" },
                { y: conditions.recovered,  label: "Recovered" },
                { y: conditions.active,  label: "Active" },
                { y: conditions.critical,  label: "Critical" },
                { y: conditions.tests, label: "Tests" }
            ]
        }]
    });
    result.render();

    var result2 = new CanvasJS.Chart("bar2", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Today's Stats"
        },
        data: [{        
            type: "column",  
            dataPoints: [      
                { y: conditions.todayCases, label: "Today's Cases" },
                { y: conditions.todayDeaths,  label: "Today's Deaths" }
            ]
        }]
    });
    result2.render();
  }