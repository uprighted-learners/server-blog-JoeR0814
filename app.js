const express = require('express');
const app = express();
const routes = require('./controllers/routes');
const PORT = process.env.PORT || 5500;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

