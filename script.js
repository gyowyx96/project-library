class Library{
    constructor(){
        this.myButton = document.getElementById("newBook");
        this.container = document.getElementById("container");
        this.currentBook = document.getElementById("currentBook");
        this.myLibrary = [];
        this.currentLibrary = [];

        this.init();
    }
    init(){
        this.myButton.addEventListener("click", () => this.addBook());
    }
 
    addBook(){
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
        this.container.appendChild(addBook);

        addBook.addEventListener("submit", (event) => {
            event.preventDefault();
            this.submitForm(addBook, nameInput, authorInput, pagesInput, readInput)
        });
    }
     
    submitForm(addBook, nameInput, authorInput, pagesInput, readInput){
    
    let read = nameInput.value;
    
        if(readInput.checked == true){ 
            read = "Read!"
        }
        else{
            read = "Not read";
        };

        let book = new Book(nameInput.value, authorInput.value, pagesInput.value, read);
        book.info();
        this.myLibrary.push(book);
        this.displayBook(book)
        this.container.removeChild(addBook);
    }

    displayBook(){
        this.myLibrary.forEach((book) =>{
            if (this.currentLibrary.includes(book)){
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
            p2.addEventListener("click", (event) => {
                this.changeRead(event, read);
            });
            
            let removeButton = document.createElement("button");
            removeButton.setAttribute("class","removeButton");
            removeButton.addEventListener("click", () => this.removeBook(book, card));
            removeButton.innerText = "Remove";    
        
            card.appendChild(h1);
            card.appendChild(p1);
            card.appendChild(p2);
            card.appendChild(removeButton);
            this.currentBook.appendChild(card);
            
            this.currentLibrary.push(book);
        
        })
        }

    removeBook(book, card) {
            this.myLibrary = this.myLibrary.filter(b => b !== book);
            this.currentLibrary= this.currentLibrary.filter(b => b !== book);
            this.currentBook.removeChild(card);
        };

    changeRead(event) {
            let bookDiv = event.target.parentNode; // Otteniamo il genitore del pulsante, che è il div del libro
            let index = Array.from(bookDiv.parentNode.children).indexOf(bookDiv); // Troviamo l'indice del div del libro nel suo genitore
            let book = this.myLibrary[index]; // Otteniamo il libro corrispondente dall'array myLibrary
        
            // Cambiamo lo stato di lettura del libro
            book.read = book.read === "Read" ? "Not Read" : "Read";
        
            // Aggiorniamo il testo del pulsante
            event.target.innerText = book.read;
        };
    addBooks(name, author, pages, read) {
            let book = new Book(name, author, pages, read);
            this.myLibrary.push(book);
            this.displayBook();
        }
}



//Constructor to add books

class Book{
    constructor(name, author, pages, read){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info(){
        console.log(`${this.name} from ${this.author}, ${this.pages}, ${this.read}`);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const library = new Library();
    library.addBooks('1984', 'George Orwell', 328, 'Read');
});

