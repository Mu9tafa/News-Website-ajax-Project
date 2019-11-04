

var news ;
var category = 'general';
var country = 'EG';
var searchInp = document.getElementById("searchInp");
var term;

searchInp.addEventListener("blur", function() {
    term = searchInp.value;
    globalSearch();
}) 

getNews();

var links = document.getElementsByClassName("top-link");

for(var i = 0; i< links.length; i++) {
    links[i].addEventListener("click", function(e){
        category = e.target.innerHTML;
        console.log(category)
        getNews();

    })
}

var sidelinks = document.getElementsByClassName("side-link");

for(var i = 0; i< sidelinks.length; i++) {
    sidelinks[i].addEventListener("click", function(e){
        country = e.target.name;
        console.log(country)
        getNews();

    })
}




function getNews(){

    var req ;

    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url =`https://newsapi.org/v2/top-headlines?country=`+country+`&category=`+category+`&apiKey=61706a8b2ce84af4b36f7d6029fa494d`;
    req.open("GET", url);

    req.onreadystatechange = function(){

        if(req.status ==200 && req.readyState == 4) {
            news = JSON.parse(req.response);
            news = news.articles;
            displayNews();
        }
    }

    req.send();
}


function displayNews(){

    var temp ='';

    for(var i = 0; i<news.length; i++) {
        temp +=`<div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="new ">
                        <img src="`+news[i].urlToImage+`" class="img-fluid">
                        <h5>`+news[i].title+`</h5>
                        <p class="text-muted">`+news[i].description+`</p>
                        <p class="w">`+news[i].author+`</p>
                    </div>
                </div>`
    }

    document.getElementById("rowData").innerHTML = temp;

}

function  globalSearch() {
    var req ;

    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url =`https://newsapi.org/v2/everything?q=`+term+`&from=2019-07-25&sortBy=publishedAt&apiKey=61706a8b2ce84af4b36f7d6029fa494d`;
    req.open("GET", url);

    req.onreadystatechange = function(){

        if(req.status ==200 && req.readyState == 4) {
            news = JSON.parse(req.response);
            news = news.articles;
            displayNews();
        }
    }

    req.send();
}