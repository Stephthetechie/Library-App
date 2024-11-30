const cardContainer = document.getElementById('card-container')
const newBookButton = document.getElementById('new-book');
const myForm = document.getElementById('form');
const viewBook = document.getElementById('view-book');
const heading = document.querySelector('.heading');

let library = JSON.parse(localStorage.getItem("library"))|| [];


class Book {
    constructor(title ="unknown", author="unknown", pages=0, date="20-03-2024", isRead=true, genre= "unknown"){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.date = date;
        this.isRead = isRead;
        this.genre = genre
    }
}

const  getBookInput=(book) => {
    let title = document.getElementById('form-title').value;
    let author = document.getElementById('form-author').value;
    let pages = document.getElementById('form-pages').value;
    let date = document.getElementById('form-date').value;
    let genreSelect = document.getElementById('form-genre');
    let genre = genreSelect.options[genreSelect.selectedIndex].text;
    let isRead = Array.from(document.querySelectorAll('.readStatus')).find(radio => radio.checked)?.nextSibling.textContent.trim() || "Not specified";
    return new Book(title, author, pages, date, isRead, genre)
}


const addBook = (event) => {
        event.preventDefault();
    let newBook = getBookInput();
    addBookToLibraryArray(newBook);
    localStorage.setItem("library", JSON.stringify(library))
    closeForm();
    myForm.reset()  
    window.location.href="myLibrary.html";   
    displayBooks();
    alert("New Book added!");
}

viewBook.addEventListener('click', ()=>{
    localStorage.setItem("library", JSON.stringify(library))
    window.location.href="myLibrary.html";
})



const addBookToLibraryArray = (newBook)=>{
    library.push(newBook)
}

const displayBooks=()=>{
    makeCard(library[library.length - 1], library.length-1)
}

const openForm = ()=>{
    myForm.style.display = 'flex'
    heading.classList.add('move-up')
}
const closeForm = ()=>{
    myForm.style.display = 'none'
    heading.classList.remove('move-up')
}

myForm.addEventListener('submit',addBook);
newBookButton.addEventListener('click',()=>{
    if(myForm.style.display === 'none'){
        openForm();
        myForm.classList.add('move-up')
    }else{
        closeForm();
        myForm.classList.remove('move-up')
    }
});



