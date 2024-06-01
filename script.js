console.log("hello world!");
let myButton = document.getElementById("newBook");
let container = document.getElementById("container");
let currentBook = document.getElementById("currentBook");
const myLibrary = [];
const currentLibrary = [];

myButton.addEventListener("click", function(){
    let addBook = document.createElement("form");
    addBook.setAttribute("id", "addBookForm"); 
    
    // Creare campi di input per il form
    let nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('placeholder', 'Nome del libro');
    nameInput.required = true;

    let authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('name', 'author');
    authorInput.setAttribute('placeholder', 'Autore del libro');
    authorInput.required = true;

    let pagesInput = document.createElement('input');
    pagesInput.setAttribute('type', 'number');
    pagesInput.setAttribute('name', 'pages');
    pagesInput.setAttribute('placeholder', 'Numero di pagine');
    pagesInput.required = true;

    let readInput = document.createElement('input');
    readInput.setAttribute('type', 'checkbox');
    readInput.setAttribute('name', 'read');
    let readLabel = document.createElement('label');
    readLabel.textContent = 'Letto';
    readLabel.appendChild(readInput);

    let submitButton = document.createElement('button');
    submitButton.setAttribute("class", "formButton");
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Aggiungi Libro';

    // Aggiungere gli elementi di input al form
    addBook.appendChild(nameInput);
    addBook.appendChild(authorInput);
    addBook.appendChild(pagesInput);
    addBook.appendChild(readLabel);
    addBook.appendChild(submitButton);

    // Aggiungere il form al contenitore
    container.appendChild(addBook);

    addBook.addEventListener("submit", function(event){
        event.preventDefault();
        let book = nameInput.value;
    
        if(readInput.checked == true){ 
            read = "Read!"
        }
        else{
            read = "Not read";
        };

        book = new Book(nameInput.value, authorInput.value, pagesInput.value, read);
        book.info();
        myLibrary.push(book);
        displayBook(book)
        container.removeChild(addBook);
    })

})



//Constructor to add books
function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        console.log(`${this.name} from ${this.author}, ${this.pages}, ${this.read}`);
    }
}

let m1984 = new Book('1984', 'George Orwell', 328, 'Read');
let m123 = new Book('1984', 'George Orwell', 328, 'Read');
let m1234 = new Book('1984', 'George Orwell', 328, 'Read');
myLibrary.push(m123, m1234, m1984);

const displayBook = function(){
myLibrary.forEach(function(book){
    if (currentLibrary.includes(book)){
        return;
    };
    let card = document.createElement("div");
    card.setAttribute("class", "book")
    let title = book.name;
    let author = book.author;
    let pages = book.pages;
    let read = book.read;
    
    let h1 = document.createElement("h1");
    h1.innerText = title;
    let p1 = document.createElement("p");
    p1.innerText = `${author}, ${pages} pages`;
    let p2 = document.createElement("button");
    p2.setAttribute("class","status")
    p2.innerText = read;
    p2.addEventListener("click", function(event) {
        changeRead(event, read);
    });
    
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class","removeButton");
    removeButton.addEventListener("click", removeBook);
    removeButton.innerText = "Remove";    

    card.appendChild(h1);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(removeButton);
    currentBook.appendChild(card);
    
    currentLibrary.push(book);

})
}

const removeBook = function() {
    // Otteniamo il riferimento al genitore del pulsante, che è il div del libro
    let bookDiv = this.parentNode;
    // Rimuoviamo il div del libro dal DOM
    bookDiv.parentNode.removeChild(bookDiv);
};

const changeRead = function(event) {
    let bookDiv = event.target.parentNode; // Otteniamo il genitore del pulsante, che è il div del libro
    let index = Array.from(bookDiv.parentNode.children).indexOf(bookDiv); // Troviamo l'indice del div del libro nel suo genitore
    let book = myLibrary[index]; // Otteniamo il libro corrispondente dall'array myLibrary

    // Cambiamo lo stato di lettura del libro
    book.read = book.read === "Read" ? "Not Read" : "Read";

    // Aggiorniamo il testo del pulsante
    event.target.innerText = book.read;
};
displayBook();