const cardContainer = document.getElementById('card-container')
const libraryContainer = document.getElementById('library-container')

const newBookButton = document.getElementById('new-book');
const myForm = document.getElementById('form');
const resetBookButton = document.getElementById('reset-book');




let library = [];
class Book {
    constructor(title ="unknown", author="unknown", pages=0, date="20-03-2024", isRead=true){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.date = date;
        this.isRead = isRead;
    }
}

const  getBookInput=(book) => {
    let title = document.getElementById('form-title').value;
    let author = document.getElementById('form-author').value;
    let pages = document.getElementById('form-pages').value;
    let date = document.getElementById('form-date').value;
    let isRead = Array.from(document.querySelectorAll('.readStatus')).find(radio => radio.checked)?.nextSibling.textContent.trim() || "Not specified";
    
    return new Book(title, author, pages, date, isRead)
}


const addBook = (event) => {
    let newBook = getBookInput();
    addBookToLibraryArray(newBook);
    displayBooks();
    closeForm();
    myForm.reset()  
    event.preventDefault()

}

const addBookToLibraryArray = (newBook)=>{
    library.push(newBook)
}

const displayBooks=()=>{
    makeCard(library[library.length - 1], library.length-1)
}

const openForm = ()=>{
    myForm.style.display = 'flex'
}
const closeForm = ()=>{
    myForm.style.display = 'none'

}
const resetLibrary = ()=>{
    cardContainer.innerHTML= ""
    library = []
}

const makeCard = (book) => {
    let card = document.createElement('div');
    let title = document.createElement('h1');
    let author = document.createElement('h2');
    let pages = document.createElement('p');
    let date = document.createElement('p');
    let isRead = document.createElement('p');
    let cardButtons = document.createElement('div');
    let changeReadButton = document.createElement('button')
    let removeButton = document.createElement('button')

    card.classList.add('card');
    isRead.className = 'isReadStatus';
    changeReadButton.className = 'changeReadButton';
    changeReadButton.innerText = 'Change Read Status';
    changeReadButton.setAttribute("data-index", library.indexOf(book))
    removeButton.className = 'removeButton';
    removeButton.innerText = 'Remove Book';
    removeButton.setAttribute("data-index", library.indexOf(book))
    cardButtons.classList.add('cardButtons')

    title.textContent= book.title;
    author.textContent= `By ${book.author}`;
    pages.textContent= `~ ${book.pages} pages`;
    date.textContent= `Date Added: ${book.date}`;
    isRead.textContent= book.isRead;
    


    cardContainer.append(card);
    card.append(title, author, pages, date, isRead, cardButtons);
    cardButtons.append(changeReadButton, removeButton);  
};



// const handleChangeReadButton = (e)=>{
//     let readIndex = e.target.getAttribute('data-index');
//     let book = library[readIndex];
//     let cardToChange = document.querySelector(`[data-index ="${readIndex}]"`);
//     let readStatus = cardToChange.querySelector('.isReadStatus');
   
//     if (book.isRead === "Read") {
//         book.isRead="Still reading"
//     } else if(book.isRead === "Still reading"){
//         book.isRead = "Not Read"

//     }else{
//         book.isRead = "Read"
//     }
//     readStatus.textContent = `~ ${book.isRead}`
// }
// const handleRemoveBook = (e)=>{
//     let removeIndex = e.target.getAttribute('data-index');
//     let cardToRemove = document.querySelector(`[data-index = "${removeIndex}"]`);

//     if (cardToRemove) {
//         cardContainer.removeChild(cardToRemove);
//         library.splice(removeIndex, 1)

//     }
// }

// cardContainer.addEventListener('click', (e)=>{
//     if (e.target.classList.contains ('changeReadButton'))  {
//         handleChangeReadButton(e)
//     } else if(e.target.classList.contains('removeButton')){
//         handleRemoveBook(e)
//     }
// })   



function changeBook(e) {
    if (e.target.classList.contains("removeButton")) {
        let index = e.target.getAttribute("data-index")
        let cardToRemove = e.target.closest('.card')
        cardContainer.removeChild(cardToRemove);
        library.splice(index, 1);
        resetLibrary();
        library.forEach((book, newIndex) => makeCard(book, newIndex));
    } else if (e.target.classList.contains("changeReadButton")) {
        let index =(e.target.getAttribute("data-index"), 10);
        let cardToChange = e.target.closest('.card');
        let readStatus = cardToChange.querySelector(".isReadStatus");
        if (readStatus.textContent === "Read") {
            readStatus.textContent = "~ Still reading";
            library[index].isRead = "Still Reading";
        } else if(readStatus.textContent === "Still reading") {
            readStatus.textContent = "~ Not read";
            library[index].isRead = "Not read";
        }else{
            readStatus.textContent = "~ Read";
            library[index].isRead = "Read";

        }
    }
    
}  

myForm.addEventListener('submit',addBook);
newBookButton.addEventListener('click', openForm)
resetBookButton.addEventListener('click', resetLibrary)
libraryContainer.addEventListener('click', changeBook)

// to do:
// add event listener to change read status button
// add event listener to remove button
// changeBook function
