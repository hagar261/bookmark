var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var addBtn =  document.getElementById("addBtn");
var bookmarkCardHref = document.getElementById("bookmark-card-href");
var bookmarkNameAlert = document.getElementById("bookmarkNameAlert");
var bookmarkURLAlert = document.getElementById("bookmarkUrlAlert");
var emptyInputAlert = document.getElementById("empty-input-alert");
var formInputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput");
var bookmarkArray;
var currentIndex;


//Get data from LocalStorage after refresh:
if(localStorage.getItem("ourBookmark") != null) {

    bookmarkArray = JSON.parse(localStorage.getItem("ourBookmark"));
    displayBookmark();
}else
{
    bookmarkArray = [];
}

addBtn.addEventListener("click", function(){

    if(bookmarkName.value == '' || bookmarkUrl.value == '') {
        
        bookmarkCardHref.removeAttribute("href");
        emptyInputAlert.innerHTML = "Please fill in required data !";
    
    } else if(addBtn.innerHTML == "Add Bookmark") {
            bookmarkCardHref.setAttribute("href", "#bookmark-card");
            emptyInputAlert.innerHTML = "";
            addBookmark();
        
        } else { 
            bookmarkCardHref.setAttribute("href", "#bookmark-card");
            emptyInputAlert.innerHTML = "";
            submitEdit(currentIndex);
    }
    
    localStorage.setItem("ourBookmark" , JSON.stringify(bookmarkArray));
   

    displayBookmark();
    resetForm();
});

//Add Bookmark to Array:
function addBookmark() {
    if(validateBookMarkName() == true && validateBookMarkURL() == true)
    {
     var bookmark =
        {
        name: bookmarkName.value,
        url : bookmarkUrl.value
        }
        bookmarkArray.push(bookmark);
        localStorage.setItem("ourBookmark",JSON.stringify(bookmarkArray));
     console.log(bookmarkArray);
    }
    clearForm(); 
};

//Display Bookmark Card Function:
function displayBookmark() {

    var bookmarkContainer = "";

    for(var i=0; i < bookmarkArray.length; i++)
    {
        bookmarkContainer += 
                ` <div class="container bookmark-card p-3">
                <div class="row">
                    <div class="col-md-4 p-2">
                        <div class="bookmark-card-name">
                            <h3 class="bookmark-display-name px-4 text-center">${bookmarkArray[i].name}</h3>
                        </div>
                    </div>
                    <div class="col-md-8 p-2 px-3">
                    <div class="card-btn ">
                        <button class="btn visit-btn ">
                            <a href="https://${bookmarkArray[i].url}" target="_blank"
                            class="visit-btn text-decoration-none">Visit</a>
                        </button>
                        <button class="btn edit-btn mx-1" onclick="editBookmark(${i})">
                        <a class="edit-btn text-decoration-none" href="#to-top">Edit</a>
                        </button>
                        <button class="btn delete-btn " onclick="deleteBookmark(${i})">Delete</button>
                    </div>
                    </div>
                </div>
            </div>`
    }
    
   document.getElementById("bookmarkCardContainer") .innerHTML = bookmarkContainer;
};

//Reset Form After Adding:
function resetForm() {
    for(var i = 0; i < formInputs.length; i++)
    {
        formInputs[i].value = ''
    }

    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");

    bookmarkUrl.classList.remove("is-invalid");
    bookmarkUrl.classList.remove("is-valid");
};


function deleteBookmark(index) {

    bookmarkArray.splice(index,1);
    localStorage.setItem("ourBookmark" , JSON.stringify(bookmarkArray));
    displayBookmark();
};

//Search BookmarkFunction:
searchInput.onkeyup = function() {
    var selectedBookmark = searchInput.value;

    var bookmarkContainer = "";

    for(var i=0; i < bookmarkArray.length; i++)
    {
        if(bookmarkArray[i].name.toLowerCase().includes(selectedBookmark.toLowerCase()))
        {
            bookmarkContainer += 
            ` <div class="container bookmark-card p-3">
            <div class="row">
                <div class="col-md-4 p-2">
                    <div class="bookmark-card-name">
                        <h3 class="bookmark-display-name px-4 text-center">${bookmarkArray[i].name}</h3>
                    </div>
                </div>
                <div class="col-md-8 p-2 px-3">
                <div class="card-btn ">
                    <button class="btn visit-btn ">
                        <a href="https://${bookmarkArray[i].url}" target="_blank"
                        class="visit-btn text-decoration-none">Visit</a>
                    </button>
                    <button class="btn edit-btn mx-1" onclick="editBookmark(${i})">
                    <a class="edit-btn text-decoration-none" href="#to-top">Edit</a>
                    </button>
                    <button class="btn delete-btn " onclick="deleteBookmark(${i})">Delete</button>
                </div>
                </div>
            </div>
        </div>`
        
            } 
    }
    
    document.getElementById("bookmarkCardContainer").innerHTML = bookmarkContainer;
};


//Edit Bookmark Function:
function editBookmark(index) {

    addBtn.innerHTML = "Update Bookmark";
    bookmarkName.value = bookmarkArray[index].name;
    bookmarkUrl.value = bookmarkArray[index].url;
    currentIndex = index;
};

//Submit Edit Function:
function submitEdit(currentIndex) {

    bookmarkArray[currentIndex].name = bookmarkName.value;
    bookmarkArray[currentIndex].url = bookmarkUrl.value;

    addBtn.innerHTML = "Add Bookmark";
};

// clear form 
function clearForm() 
{
    bookmarkName.value = "";
    bookmarkUrl.value = "";
}



//Validate Bookmark Name Function:
function validateBookMarkName() {
    var regex = /^[A-Z][a-z A-z 0-9]{3,9}$/;

    if(regex.test(bookmarkName.value) == true)
    {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");

        bookmarkNameAlert.classList.add("d-none");
        bookmarkNameAlert.classList.remove("d-block");

        addBtn.disabled = false;

        return true;
    
    } else {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

        bookmarkNameAlert.classList.add("d-block");
        bookmarkNameAlert.classList.remove("d-none");

        addBtn.disabled = true;

        return false;
    };
};

//Check Duplicated Bookmark Name
function checkDuplicatedNames() {

    for(var i = 0; i < bookmarkArray.length; i++)
        {
          if(bookmarkName.value == bookmarkArray[i].name) 
          {
            bookmarkName.classList.add("is-invalid");
            bookmarkName.classList.remove("is-valid");

            bookmarkNameAlert.classList.add("d-block");
            bookmarkNameAlert.classList.remove("d-none");
  
            bookmarkNameAlert.innerHTML = "Bookmark Name Already Exists";
  
            addBtn.disabled = true;
          } 
        }
  };

bookmarkName.addEventListener("keyup", validateBookMarkName);
bookmarkName.addEventListener("blur", checkDuplicatedNames);


//Validate Bookmark URLFunction:
function validateBookMarkURL() {
    var regex = /^(www)\.[a-z0-9\-\.]+\.(com|net|org)$/i;

    if(regex.test(bookmarkUrl.value) == true)
    {
        bookmarkUrl.classList.add("is-valid");
        bookmarkUrl.classList.remove("is-invalid");

        bookmarkURLAlert.classList.add("d-none");
        bookmarkURLAlert.classList.remove("d-block");

        addBtn.disabled = false;

        return true;
   
    } else {
        bookmarkUrl.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");

        bookmarkURLAlert.classList.add("d-block");
        bookmarkURLAlert.classList.remove("d-none");

        addBtn.disabled = true;

        return false;
    }

};

bookmarkUrl.addEventListener("keyup" , validateBookMarkURL);