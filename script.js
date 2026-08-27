const titleInput = document.getElementById("book-title"); //title
const authorInput = document.getElementById("book-author"); //author
const addBookBtn = document.getElementById("add-book-btn"); //Add button
const shelf = document.getElementById("shelf"); //shelf 
const doneCheckbox = document.getElementById("book-done"); //done check box
const doneBookBtn = document.getElementById("change-book-status"); // done button
const removeBookBtn = document.getElementById("remove-book"); // remove button
const selectedBookLabel = document.getElementById("selected-book-label"); //Book label (title and author)
const showAddFormBtn = document.getElementById("show-add-form-btn"); //Add form button
const addForm = document.getElementById("add-form"); //collapsible form
const currentPageInput = document.getElementById("book-current-page"); //current page
const totalPagesInput = document.getElementById("book-total-pages"); //total page
const progressBarFill = document.getElementById("progress-bar-fill"); //progress bar
const updatePageInput = document.getElementById("update-page-input"); //update page 
const updatePageBtn = document.getElementById("update-page-btn"); // update button
const streakLabel = document.getElementById("streak-label");//streak

//Initialize all the elements 

showAddFormBtn.addEventListener("click", function() { //basically collapses the form when button click
  if (addForm.style.display === "flex") {
    addForm.style.display = "none";
  } else {
    addForm.style.display = "flex";
  }
});

addBookBtn.addEventListener("click", function(){  //Button for adding books
    const title = titleInput.value; //empty box next to button
    const author = authorInput.value;

    if (title === ""){ //means if nothing in the title box, it doesnt do anything
        return;
    }

    const newBook = { //book object
        title: title,
        author: author,
        color: getRandomColor(),
        height: getRandomHeight(),
        width: getRandomWidth(),
        done: doneCheckbox.checked,
        currentPage: Number(currentPageInput.value) || 0,
        totalPages: Number(totalPagesInput.value) || 1
    };

    books.push(newBook); //adds the book into the book array
    
    updateStreak();
    renderShelf();
    saveBooks();

    titleInput.value = "";
    authorInput.value = "";
    currentPageInput.value = "";
    totalPagesInput.value = ""; // After input the box will clear
 });
let books = []; // this will hold all our book objects 
let selectedBook = null; // nothing selected at first
let currentStreak = 0; //initialize streak
let lastActiveDate = null; //nothing in the date yet

const saved = localStorage.getItem("myBooks");
const savedStreak = localStorage.getItem("myStreak");
const savedLastActive = localStorage.getItem("myLastActive"); //retrieve what is saved in this

if (saved) {
  books = JSON.parse(saved); //converts strings back to object
}
if (savedStreak) {
  currentStreak = Number(savedStreak);
}
if (savedLastActive) {
  lastActiveDate = savedLastActive;
}

function saveBooks() { 
  localStorage.setItem("myBooks", JSON.stringify(books)); //save under label "myBooks" //converts objects to string
}

updateStreak();
renderShelf();

function getRandomColor() { 
  const red = Math.floor(Math.random() * 255); //math random gets a random number between 0-1
  const green = Math.floor(Math.random() * 255);//math floor rounds up the number to the closest integer
  const blue = Math.floor(Math.random() * 255);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
  
}

function getRandomHeight() {
    const min = 100;
    const max = 250;
    const height = Math.floor(Math.random() * (max - min)) + min; //max - min is the range, + min is so that we atleast get the min height.

    return height;
}

function getRandomWidth(){
    const min = 10;
    const max = 50;
    const width = Math.floor(Math.random() * (max - min)) + min;

    return width;
}

doneBookBtn.addEventListener("click", function() {
  if (selectedBook === null) {
    return; // nothing selected, do nothing
  }
  selectedBook.done = !selectedBook.done;

  updateStreak();
  renderShelf();
  saveBooks();
});

removeBookBtn.addEventListener("click", function () {

  if(selectedBook === null) { //does nothing if no book is selected
    return;
  }

  books = books.filter(function(book){ //filters the books array and returns a new filtered array
    return book !== selectedBook; //goes through each book, if true to this condition, we keep the book, if false, we remove it
  });

  selectedBook = null; //clears selection since selected book no longer exists

  renderShelf();
  saveBooks(); //every time we render a shelf, we save it, like a checkpoint

});

updatePageBtn.addEventListener("click", function() {
  if (selectedBook === null) {
    return;
  }

  const newPage = Number(updatePageInput.value); //initialize variable newPage to the input

  if (updatePageInput.value === "") {
    return;
  }

  selectedBook.currentPage = newPage; //updates the currentPage value to the newPage value

  updateStreak();
  renderShelf();
  saveBooks();

  updatePageInput.value = "";
});

function updateStreak() {
  const today = new Date().toDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();

  if (lastActiveDate === today) {
    // already counted today, do nothing
    return;
  } else if (lastActiveDate === yesterdayString) {
    currentStreak = currentStreak + 1;
  } else {
    currentStreak = 1;
  }

  lastActiveDate = today;

  localStorage.setItem("myStreak", currentStreak);
  localStorage.setItem("myLastActive", lastActiveDate);

  streakLabel.textContent = "🔥 Streak: " + currentStreak + " days";
}

//console.log(getRandomHeight()); to check if it runs

function renderShelf() {
  shelf.innerHTML = "";

  if (selectedBook) {
  selectedBookLabel.textContent = "Selected: " + selectedBook.title + " by " + selectedBook.author;
  const percent = (selectedBook.currentPage / selectedBook.totalPages) * 100;
  progressBarFill.style.width = percent + "%";
} else {
  selectedBookLabel.textContent = "No book selected";
  progressBarFill.style.width = "0%";
}
  
  books.forEach(function(book) { //loops through all books in the array
    const bookBlock = document.createElement("div"); //Creates a new div for a book
    bookBlock.style.backgroundColor = book.color; 
    bookBlock.style.height = book.height + "px"; //adds the details of this specific div
    bookBlock.style.width = book.width + "px";
    bookBlock.title = `${book.title} by ${book.author}`; //tooltip and new way of output
  
    if (book.done){
      bookBlock.style.opacity = "1.0"; //opacity is set to maximum
    }
    else {
      bookBlock.style.opacity = "0.4"; //opacity is set to 40%
    }

    if (book === selectedBook) {
  bookBlock.style.border = "3px solid black";
} else {
  bookBlock.style.border = "none";
}
      
    
    shelf.appendChild(bookBlock); //Places book at the end of the DOM

    bookBlock.addEventListener("click", function (){ // this selects books, must be inside the renderShelf function
      selectedBook = book;
      renderShelf();
      saveBooks();

     });


   
  
  });
  
}


