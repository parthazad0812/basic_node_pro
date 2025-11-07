const express = require("express");
const app = express();
const port = 8000;

const books = [
  { id: 1, title: "Harry Potter", author: "J.K.Rowling" },
  { id: 2, title: "Goblets of Fire", author: "Parth" },
  { id: 3, title: "Follow the path of Dao from infancy", author: "Ancient Xi" },
];

// Routes
// json->key value pair
app.get("/books", (req, res) => {
  res.setHeader("x-Made-by", "Parth");
  res.json(books);
});

// Dynamic para- here id -> :id (means anything) act as param

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must by of type number",
    });
  }

  const book = books.find((e) => e.id === id);

  if (!book) {
    return res.status(404).json({
      error: `Book with id ${id} not found, It doesn't exist!`,
    });
  }

  return res.json(book);
});

//// Middlewares (plugins) ( for body here other wise no o/p would be shown {})
app.use(express.json());

app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || title == "") {
    return res.json({
      error: "Title is requried",
    });
  }

  if (!author || author == "") {
    return res.json({
      error: "Author is requried",
    });
  }

  const id = books.length + 1;

  const book = { id, title, author };
  books.push(book);

  return res
    .status(201)
    .json({ message: `Book added successfully with id ${id}` });
});


app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must by of type number",
    });
}

  const del_book=books.findIndex(e=>e.id===id)

  if(del_book<0){
    return res.status(404).json({
        error:`Book with id ${id} not found, It doesn't exist!`,
    })
  }

  books.splice(del_book,1);

  return res.status(200).json({
    message:`Book with id ${id} deleted successfully!`,
  })

});

app.listen(port, () => {
  console.log(`Server is running on -> http://localhost:${8000}`);
});
