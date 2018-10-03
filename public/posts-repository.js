/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    async getPosts() {
        try {
            let data = await $.get('/posts')
            // console.log(data);
            this.posts = data;
        }
        catch (error) {
            throw error;
        }
    }

    async addPost(postText) {
        const newPost = { text: postText, comments: [] };
        try {
            let newpost = await $.post('/posts', newPost)
            this.posts.push(newpost);
        } catch (error) {
            throw error;
        }
    }

    async  removePost(index, postID) {
        try {
            await $.ajax({
                method: 'DELETE',
                url: '/posts/' + postID
            })
            this.posts.splice(index, 1);
        }
        catch (error) {
            throw error;
        }
    }
    // return $.delete('/posts/${postID}')
    //     .then((data) => {
    //         this.posts.splice(index, 1);
    //     }).fail((error) => {
    //         throw error;
    //     })

    async addComment(newComment, postIndex, postID) {
        try {
            let newcomment = await $.post(`/posts/${postID}/comments`, newComment)
            this.posts[postIndex].comments.push(newcomment);
        } catch (error) {
            throw error;
        }
    }




    async  deleteComment(postIndex, commentIndex, postID, commentID) {
        try {
            let promise = await $.ajax({
                method: 'DELETE',
                url: `/posts/${postID}/comments/${commentID}`
            })
            this.posts[postIndex].comments.splice(commentIndex, 1);
        } catch (error) {
            throw error;
        }
    };
}

export default PostsRepository