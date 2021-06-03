const readline = require("readline-sync");
const mongoose = require('mongoose');

const CategoryController = require("./controllers/categoryController");
const BookController = require("./controllers/bookController");

function options(){
    console.log("Here are some options that you can use: ");
    console.log("1. Show all category");
    console.log("2. Add new category");
    console.log("3. Delete a category");
    console.log("4. See all books");
    console.log("5. Add a book");
    console.log("6. Delete a book");
    console.log("7. Search a book");
    console.log("8. Exit ");
}


async function showOptions(){
    console.log("Welcom to the library!");
    await mongoose.connect('mongodb://localhost/libraryDb',{ 
        useNewUrlParser: true ,
        useUnifiedTopology: true
    });
    let db = mongoose.connection;
    let stillRunning = true;
    while(stillRunning){
        options();
        let toDo = readline.question("Enter number of choice: ");
        console.log(toDo);
        if(toDo=="1"){
            await CategoryController.printAllCategories()
        }
        else if(toDo =="2"){
            let response = readline.question("What is the name of category? ");
            await CategoryController.addCategory(response);
        }
        else if(toDo =="3"){
            let response = readline.question("What category do you want to delete? ");
            await CategoryController.deleteCategory(response);
        }
        else if(toDo =="4"){
            await BookController.printAllBooks();
        }
        else if(toDo == "5"){
            let title = readline.question("What is the title of the book? ");
            let price = readline.question("What is the price of the book? ");
            let authors = [];
            let hasAnother = true;
            while(hasAnother){
                let author = readline.question("Who is the author of the book? ");
                authors.push(author);
                let another = readline.question("Does it have another author?(y,n) ");
                if(another != "y") hasAnother = false; 
            }
            let category = readline.question("What is the name of category? ");
           await BookController.addBook({title:title,price:price,authors:authors,category:await CategoryController.getCategoryId(category)});
        }
        else if(toDo == "6"){
            let title = readline.question("What is the title of the book you want to delete? ");
            await BookController.deleteBook(title);
        }
        else if(toDo == "7"){
            let title = readline.question("What is the book you want to search? ");
            await BookController.searchBook(title);
        }
        else{
            stillRunning=false;
        }
    }
    db.close();
}

showOptions();