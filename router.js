const express = require('express');
let Post = require('./models/postModel');
const router = express.Router();

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
router.get('/posts', function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      res.status(500).send(err);
    }
    res.send(posts);
  })
});

// 2) to handle adding a post
router.post('/posts', function (req, res) {
  let NewPost = new Post(req.body)
  NewPost.save(function (err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(data);
    }
  })
});

// 3) to handle deleting a post
router.delete('/posts/:id', function (req, res) {
  let PostId = req.params.id
  Post.findByIdAndRemove({ _id: PostId }, function (err) {
    if (err) { res.status(500).send(err) }
    else { res.status(204).send() }
  })
});

// 4) to handle adding a comment to a post
router.post('/posts/:id/comments', function (req, res) {
  const postId = req.params.id;
  const newComment = req.body;
  Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }, { "new": true }, function (err, post) {
    if (err) { res.status(500).send(err) }
    else { res.status(201).send(post.comments[post.comments.length - 1]) }
  })
});



// 5) to handle deleting a comment from a post
router.delete('/posts/:postid/comments/:commentid', function (req, res) {
  let PostId = req.params.postid;
  let CommentId = req.params.commentid;
  Post.findByIdAndUpdate(PostId, { $pull: { comments: { _id: CommentId} } }, function (err) {
    if (err) { res.status(500).send(err) }
    else { res.status(204).send() }
  })
});

module.exports = router;
