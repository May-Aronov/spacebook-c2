class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

     registerAddPost() {
        $('#addpost').on('click', async () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!");
            } else {
             await this.postsRepository.addPost($input.val())
             this.postsRenderer.renderPosts(this.postsRepository.posts)
                $input.val("");
            }
        });
    }

     registerRemovePost() {
        this.$posts.on('click', '.remove-post', async (event) => {
            let index = $(event.currentTarget).closest('.post').index();
            let postID = $(event.currentTarget).closest('.post').data().id;
             await  this.postsRepository.removePost(index, postID)
                this.postsRenderer.renderPosts(this.postsRepository.posts);
        });
    }

     registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }

       registerAddComment() {
        this.$posts.on('click', '.add-comment',async (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');

            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            }
            else {
                let postIndex = $(event.currentTarget).closest('.post').index();
                let postID = $(event.currentTarget).closest('.post').data().id;
                let newComment = { text: $comment.val(), user: $user.val() };

                await  this.postsRepository.addComment(newComment, postIndex, postID)
                     this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
                $comment.val("");
                $user.val("");
            }
        });

    }

      registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', async (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let postID = $(event.currentTarget).closest('.post').data().id;
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            let commentID=$(event.currentTarget).closest('.comment').data().id;
             await this.postsRepository.deleteComment(postIndex, commentIndex,postID,commentID)
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
        });
    }

    OnLoad() {
        this.postsRepository.getPosts()
            .then(() => {
                this.postsRenderer.renderPosts(this.postsRepository.posts)
            })
            .catch(function (error) {
                throw error;
            })
    }


}



export default EventsHandler