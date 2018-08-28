
const posts = [];
let id = 1;
let Idcomment=1

let newPost = function () {
    let newpost = {};
    newpost.Text = $('.form-control').val();
    newpost.Id = id;
    newpost.comments = [];
    posts.push(newpost);
    id++
}

let newComment = function (PostId, UserName, Comment) {
    let index = findIndex(PostId);
    posts[index].comments.push({CommentId:Idcomment,username: UserName, comment: Comment });
    Idcomment++;
}

const renderPosts = function () {
    $(".posts").empty();
    for (let i = 0; i < posts.length; i++) {
        let $post = (`<div class="post"  data-id='${posts[i].Id}'>
            <button type="button" class="remove">REMOVE</button> 
        <div id="dialog"> ${posts[i].Text} </div>
            <form class="form">
        user name: <input class='userName' type='text'/> 
            comment: <input class='comment' type='text'/ >
            <button type='button' class='post-comment' id="dialog"> Post Comment </button>
            </form>
           <div id="dialog"> ${renderCommentsPost(posts[i].comments)} </div>
        </div>`);
        $(".posts").append($post);
    }
}
function renderCommentsPost(comments) {
    let AllComments = '<ul>';
    for (let j = 0; j < comments.length; j++) {
        AllComments += `<li class="comment" data-id='${comments[j].CommentId}'>
        <button type="button" class="removeComment">Remove Comment</button>
        ${comments[j].username} 
        ${comments[j].comment} 
        </li>`;
    }
    return AllComments + '</ul>';
};

function findIndex(ID) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].Id == ID) {
            return (i);
            break;
        }
    }
}

$('.posts').on('click', '.post-comment', function () {
    let currentPost = $(this).closest(".post");
    let UserName = currentPost.find('.userName').val();
    let Comment = currentPost.find('.comment').val();
    let PostId = currentPost.data().id;
    newComment(PostId, UserName , Comment);
    renderPosts();
})

$('.add-post').on("click", function () {
    newPost();
    renderPosts();
})

$('.posts').on('click', '.remove', function () {
    let relevantPost = $(this).closest(".post").data('id');
    let place = findIndex(relevantPost);
    posts.splice(place, 1);
    renderPosts();
})

$('.posts').on('click','.removeComment',function (){
    let relevantPost = $(this).closest(".post").data().id;
    let currentpost=posts[findIndex(relevantPost)];
    let currentcomment=$(this).closest("li").data().id;
    for(let i=0;i<currentpost.comments.length;i++){
        if(currentpost.comments[i].CommentId == currentcomment)
        currentpost.comments.splice(i,1)    
    }
    renderPosts();
})



