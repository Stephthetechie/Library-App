const libraryContainer = document.getElementById('library-container');
const cardContainer = document.getElementById('card-container');

const backHomeButton = document.getElementById('back-home');
const resetBookButton = document.getElementById('reset-book');

let library = JSON.parse(localStorage.getItem("library")) || [];

const makeCard = (book) => {
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) {
        console.error("cardContainer not found in the DOM.");
        return;
    }

    let card = document.createElement('div');
    let title = document.createElement('h1');
    let author = document.createElement('h2');
    let pages = document.createElement('p');
    let date = document.createElement('p');
    let isRead = document.createElement('p');
    let genre = document.createElement('p');
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
    genre.textContent= `Genre: ${book.genre}`;
    isRead.textContent= `~ ${book.isRead}`;
    


    cardContainer.append(card);
    card.append(title, author, pages, date, isRead, genre, cardButtons);
    cardButtons.append(changeReadButton, removeButton);  
};


library.forEach(book =>{
    makeCard(book)
    // alert("New Book added!");
});
const resetLibrary = ()=>{ 
    library = []
    localStorage.setItem("library", JSON.stringify(library)); 
    cardContainer.innerHTML= ""
}

function changeBook(e) {
    if (e.target.classList.contains("removeButton")) {
        let index = parseInt(e.target.getAttribute("data-index"), 10);
        library.splice(index, 1);
        localStorage.setItem("library", JSON.stringify(library));
        e.target.closest('.card').remove();
        displayBooks();
        updateIndices()
    } else if (e.target.classList.contains("changeReadButton")) {
        let index =(e.target.getAttribute("data-index"), 10);
        let cardToChange = e.target.closest('.card');
        let readStatus = cardToChange.querySelector(".isReadStatus");
        if (readStatus.textContent === "~ Read") {
            readStatus.textContent = "~ Still reading";
            library[index].isRead = "Still Reading";
        } else if(readStatus.textContent === "~ Still reading") {
            readStatus.textContent = "~ Not read";
            library[index].isRead = "Not read";
        }else{
            readStatus.textContent = "~ Read";
            library[index].isRead = "Read";

        }
    }
    
}  

const updateIndices = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.querySelector('.changeReadButton').setAttribute('data-index', index);
        card.querySelector('.removeButton').setAttribute('data-index', index);
    });
};

resetBookButton.addEventListener('click', resetLibrary)
libraryContainer.addEventListener('click', changeBook)
backHomeButton.addEventListener('click', () => {
    window.location.href = "index.html"; 
});