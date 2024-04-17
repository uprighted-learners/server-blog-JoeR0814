const express = require('express');
const app = express();
const routes = require('./controllers/routes');
const PORT = process.env.PORT || 7000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', routes);

//controllers
app.use('/blog', blogController);

function read(path) {
  //allows us to get the path leading to our json file
  const file = fs.readFileSync(path);
  return !file.length ? [] : JSON.parse(file); // this is an if else but its a ternary
}

// app.get('/get/all', (req, res) => {
//   try {
//     const allPost = read(dbPath);
//     res.status(200).json(allPost);
//   } catch (error) {
//     res.status(500).json({ message: 'error getting all post' });
//   }
// });

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

