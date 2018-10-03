import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);
// eventsHandler.OnLoad();
// postsRepository.getPosts()
// .then(function (){postsRenderer.renderPosts(postsRepository.posts)})
// .catch( function(err){throw err});
eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();
eventsHandler.OnLoad()

