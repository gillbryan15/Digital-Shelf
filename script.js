const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const addBookBtn = document.getElementById("add-book-btn");
const shelf = document.getElementById("shelf");
const doneCheckbox = document.getElementById("book-done");
const doneBookBtn = document.getElementById("change-book-status");

addBookBtn.addEventListener("click", function(){
    const title = titleInput.value;
    const author = authorInput.value;

    if (title === ""){
        return;
    }

    const newBook = {
        title: title,
        author: author,
        color: getRandomColor(),
        height: getRandomHeight(),
        width: getRandomWidth(),
        done: doneCheckbox.checked
    };

    books.push(newBook);

    renderShelf();

    titleInput.value = "";
    authorInput.value = ""; // After input the box will clear
 });
let books = []; // this will hold all our book objects
let selectedBook = null; // nothing selected at first

function getRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function getRandomHeight() {
    const min = 100;
    const max = 250;
    const height = Math.floor(Math.random() * (max - min)) + min;

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
});

//console.log(getRandomHeight()); to check if it runs

function renderShelf() {
  shelf.innerHTML = "";
  
  books.forEach(function(book) {
    const bookBlock = document.createElement("div");
    bookBlock.style.backgroundColor = book.color;
    bookBlock.style.height = book.height + "px";
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
      
    
    shelf.appendChild(bookBlock);

    bookBlock.addEventListener("click", function (){
      selectedBook = book;
      renderShelf();

     });


   
  
  });
  
}


