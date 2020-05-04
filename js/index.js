// Wait until DOM is ready to register callbacks
 document.addEventListener("DOMContentLoaded", function(){
    //Do this when DOM is loaded
    //Set event listeners/handlers for buttons
    document.getElementById('info').onclick = doinfo;

    
  });

 var doinfo = function(){
    console.log("REQUESTING COUNTRY");
    //Performs api call
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var country = JSON.parse(this.responseText);
            console.log(country);
            showinfo(country); //Generates content
        }
        else
        { 
            console.log("this.readyState=",this.readyState);
            console.log("this.status=",this.status);
        }
    };
    var dataprefix = "https://corona.lmao.ninja/v2/countries/";
    var datasuffix = document.getElementById("country").value;
    var data = dataprefix + datasuffix;
    console.log("requesting:", data);
    xmlhttp.open("GET", data, true)
    xmlhttp.send();
 }

 //Organizes the contents from the api call into tables and displays them in the content div
 function showinfo(conditions) { 
    let workspace = document.getElementById("results");
    workspace.innerHTML = "";

    var header = document.createElement('h4'); 
    var textnode = document.createTextNode(conditions.country);
    header.appendChild(textnode);
    workspace.appendChild(header);
    
    //Creates the graph where the overall corona stats will be displayed
    var result = new CanvasJS.Chart("graph1", {
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

    //Creates the graph where the most recent corona stats will be displayed
    var result2 = new CanvasJS.Chart("graph2", {
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