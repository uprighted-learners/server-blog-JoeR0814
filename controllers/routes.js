const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbPath = './api/blog.json'; // i got this from someone in class, but i found and read that the const fs=require('fs') is the same. if understood it correctly?


// READ all blog posts
router.get('/', (req, res) => {
  fs.readFile('./api/blog.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
      res.status(500).send('Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// get all from db - /get/all
// router.get('/get/all', (req, res) => {
//   try {
//     const allPost = read(dbPath);
//     res.status(200).json(allPost);
//   } catch (error) {
//     res.status(500).json({ message: 'error getting all post' });
//   }
// });

// get one from db by post_id - /get/one/:post_id
router.get('/get/one/:post_id', (req, res) => {
  try {
    const postId = req.params.post_id;
    const allPost = read(dbPath);
    const onePost = allPost.find((post) => post.post_id.toString() === postId); //finds the post that matches the post_id

    if (!onePost) {
      return res.status(404).json({ message: 'post not found' }); //error message if post is not found
    }
  } catch (error) {
    res.status(500).json({ message: 'error getting one post' });
  }
});

// CREATE a new blog post
router.post('/', (req, res) => {
  fs.readFile('./api/blog.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
      res.status(500).send('Server Error');
    } else {
      const blogs = JSON.parse(data);
      const newBlogPost = {
        post_id: req.body.post_id,
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
      };
      blogs.push(newBlogPost);
      fs.writeFile('./api/blog.json', JSON.stringify(blogs, null, 2), (err) => {
        if (err) {
          console.error(`Error writing file to disk: ${err}`);
          res.status(500).send('Server Error');
        } else {
          res.status(201).json(newBlogPost);
        }
      });
    }
  });
});




module.exports = router;

