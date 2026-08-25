const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const addBookBtn = document.getElementById("add-book-btn");
const shelf = document.getElementById("shelf");
const doneCheckbox = document.getElementById("book-done");
const doneBookBtn = document.getElementById("change-book-status"); 
const removeBookBtn = document.getElementById("remove-book");


//Initialize all the elements 

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
        done: doneCheckbox.checked
    };

    books.push(newBook); //adds the book into the book array

    renderShelf();
    saveBooks();

    titleInput.value = "";
    authorInput.value = ""; // After input the box will clear
 });
let books = []; // this will hold all our book objects 
let selectedBook = null; // nothing selected at first

const saved = localStorage.getItem("myBooks");
if (saved) {
  books = JSON.parse(saved);
}

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
  renderShelf();
  saveBooks()
});

removeBookBtn.addEventListener("click", function () {

  if(selectedBook === null) {
    return;
  }

  books = books.filter(function(book){
    return book !== selectedBook;
  });

  selectedBook = null;
  renderShelf();
  saveBooks();

});
function saveBooks() { 
  localStorage.setItem("myBooks", JSON.stringify(books)); 
}

//console.log(getRandomHeight()); to check if it runs

function renderShelf() {
  shelf.innerHTML = "";
  
  books.forEach(function(book) { //loops through all books in the array
    const bookBlock = document.createElement("div"); //Creates a new div for a book
    bookBlock.style.backgroundColor = book.color; 
    bookBlock.style.height = book.height + "px"; //adds the details of this specific div
    bookBlock.style.width = book.width + "px";
    bookBlock.title = `${book.title} by ${book.author}`; //tooltip and new way of output
  
    if (book.done){
      bookBlock.style.opacity = "1.0";
    }
    else {
      bookBlock.style.opacity = "0.4";
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


