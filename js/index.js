

var bookmarkName = document.getElementById("nameWebsite");
var urlWebsite = document.getElementById("urlWebsite");

var Submit = document.getElementById("Submit");
var allBookmarks = [];

var temp;


if(localStorage.getItem("allBookmarks") != null){ 
    allBookmarks = JSON.parse(localStorage.getItem("allBookmarks"));
    display();
}

function createBookmark(){
    if(validateUrl() == true && bookmarkName.value != "" && urlWebsite.value != ""){
        if(Submit.innerHTML == "Submit"){
            var bookmark = {
                nameweb: bookmarkName.value,
                urlweb: urlWebsite.value
            }
            allBookmarks.push(bookmark);
            clearForm();
            display();
            localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
        }else{
            var updateBookmark = {
                nameweb: bookmarkName.value,
                urlweb: urlWebsite.value
            }
            allBookmarks.splice(temp, 1, updateBookmark);
            clearForm();
            display();
            localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
            Submit.innerHTML = "Submit";
        }
    }
    else{
        document.getElementById("alertUrl").style.display="block";
        document.getElementById("alertName").style.display="block";
    }
}

function validateUrl(){
    var regExp = /^(https:|http:)\w{3,}[.]com$/i;
    return regExp.test(urlWebsite.value)
}

function clearForm(){
    bookmarkName.value = "";
    urlWebsite.value = "";
}

function display(){

    var cartoona = "";

    for(var i = 0; i<allBookmarks.length; i++){
        cartoona += `
        <div class="web my-4 d-flex justify-content-around">
        <h3>${allBookmarks[i].nameweb}</h3>
        <div class="web-btn">
          <button class="bg-primary btn"><a class="text-white" href="${allBookmarks[i].urlweb}" target="_blank">visit</a></button>
          <button onclick="deleteBookmark(${i});" class="bg-danger mx-2 btn text-white">Delete</button>
          <button onclick="upDateBookmark(${i});" class="bg-success btn text-white">Update</button>
        </div>
      </div>`
    }
    document.getElementById("bookmarkList").innerHTML = cartoona;
}

function deleteBookmark(index){
    allBookmarks.splice(index,1);
    display();
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks))
}


function upDateBookmark(index){
     bookmarkName.value = allBookmarks[index].nameweb;
     urlWebsite.value = allBookmarks[index].urlweb;
     Submit.innerHTML = "Update";

     temp = index;
}