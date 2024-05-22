const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbPath = './api/blog.json';

// READ all blog posts
// GET - /api/blog - get all blog posts
router.get('/blog', (req, res) => {
  try {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file from disk: ${err}`);
        res.status(500).send('Server Error');
      } else {
        res.json(JSON.parse(data));
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'error getting all posts' });
  }
});

// get one blog post by id
// GET - /api/blog/:id - get one blog post by ID
router.get('/blog/:id', (req, res) => {
  try {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file from disk: ${err}`);
        res.status(500).send('Server Error');
      } else {
        const blogs = JSON.parse(data);
        const blog = blogs.find(
          (blog) => blog.post_id === parseInt(req.params.id),
        );
        if (!blog) {
          res.status(404).json({ message: 'No post found with that ID' });
        } else {
          res.json(blog);
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'error getting one post' });
  }
});

// CREATE a new blog post with auto-incremented post_id
// POST - /api/blog - create a new blog post
router.post('/blog', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
      res.status(500).send('Server Error');
    } else {
      let blogs = JSON.parse(data);
      // Determine the new post_id by finding the maximum post_id in the array and adding 1
      const newPostId =
        blogs.length === 0
          ? 1
          : Math.max(...blogs.map((blog) => blog.post_id)) + 1;
      const newBlogPost = {
        post_id: newPostId,
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
      };
      blogs.push(newBlogPost);
      fs.writeFile(dbPath, JSON.stringify(blogs, null, 2), (err) => {
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

// update a blog post by id
// PUT - /api/blog/:id - update a blog post by ID
router.put('/api/blogPosts/:id', async (req, res) => {
  const id = req.params.id; // get the id from the request params
  const updatedPost = req.body; // get the updated post from the request body
  try {
    const data = await fs.readFile(dbPath, 'utf8'); // read the file
    // Parse the JSON data and update the post
    let posts = JSON.parse(data);
    let postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;

      // Write the updated posts back to the file
      await fs.writeFile(
        './api/blogPosts.json',
        JSON.stringify(posts, null, 2),
      );

      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ message: err.message });
  }
});

// DELETE a blog post by id
// DELETE - /api/blog/:id - delete a blog post by ID

router.delete('/api/blogPosts/:id', async (req, res) => {
  const id = req.params.id; // Get the id from the request parameters

  try {
    // Read the existing posts
    const data = await fs.readFile('./api/blogposts.json', 'utf8');

    // Parse the JSON data and remove the post
    let posts = JSON.parse(data);
    let postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      let deletedPost = posts.splice(postIndex, 1);

      // Write the updated posts back to the file
      await fs.writeFile(
        './api/blogPosts.json',
        JSON.stringify(posts, null, 2),
      );

      res.json(deletedPost[0]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

