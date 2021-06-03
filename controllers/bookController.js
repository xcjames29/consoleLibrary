const Book = require("../models/book");

const printAllBooks = async () => {
    let books = await Book.find();
    console.log(books);
    console.log("---------");
    if (books.length === 0) console.log(" 0 Results.")
    books.forEach(e => {
        console.log(e.title +" | Price: " + e.price +" | Authors:" + e.authors  ); 
    });
    console.log("---------");
}


const addBook = async (data) => {
    try {
        let record =  await Book.findOne({title:data.title});
        console.log("asdasdasdasdas")
        if(!record){
            const book = Book({ title: data.title, price: parseInt(data.price), authors:data.authors, category:data.category});
            await book.save();
            console.log(data.title + " is added");

        }
        else{
            console.log(data.title + " is already exist!");
        }
    }
    catch (e) {
        console.log(e);
    }
}

const deleteBook = async(title) =>{
    try {
        let data =  await Book.findOne({title:title});
        if(data){
         await Book.deleteOne({title:title}, (err)=>{
             if(err){
                 console.log(err)
             }
             else{
              console.log(title +" is deleted.")
             }
         })
        }
        else{
            console.log(title +" is not available!");
        }
     }
     catch (e) {
         console.log(e.message);
     }
}

const searchBook= async (title)=>{
    let data =  await Book.findOne({title:title});

    console.log("---------");
    if (!data) console.log(" 0 Results.")
    else console.log(data.title +" | Price: " + data.price +" | Authors:" + data.authors  ); 
    console.log("---------");
}

module.exports = {
    printAllBooks,
    addBook,
    deleteBook,
    searchBook
};