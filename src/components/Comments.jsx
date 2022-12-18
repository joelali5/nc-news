import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../contexts/User";
import { deleteCommentById, getComments } from "../utils/Api";
import AddComment from "./AddComment";
// import { deleteCommentById } from "../utils/Api";

export default function Comments() {
    const [comments, setComments] = useState([]);
    const { article_id } = useParams();
    const [loading, SetLoading] = useState(true);
    const [commentID, setCommentID] = useState(null);

    const { user } = useContext(userContext);

    useEffect(() => {
        getComments(article_id).then(commentsData => {
            setComments(commentsData);
            SetLoading(false)
        })
    }, [article_id]);

    useEffect(() => {
        deleteCommentById(commentID).then(result => {
            return result;
        });
    }, [commentID]);


    function handleDelete(index, comment_id, commentAuthor) {
        const newComments = [...comments];
        if(!user.username) {
            alert("Unsuccessful! Please login to delete a comment.")
        } else if (user.username !== commentAuthor){
            alert("Stop! Can't delete this comment")
        } else {
            newComments.splice(index, 1);
            setComments(newComments);
            setCommentID(comment_id);
        }
    };

    return loading ? (<h2 className="loading">Loading</h2>) : (
       <div>
        <AddComment setComments={setComments} comments={comments}/>
        <ul className="comments">
            {
                comments.map((comment, index) => {
                    const commentId = comment.comment_id;
                    const commentAuthor = comment.author
                    return <li className="comment" key={comment.comment_id}>
                        <h3 className="comment-author">{comment.author}</h3>
                        <p className="comment-body">{comment.body}</p>
                        <div className="comment-details">
                            <p className="date-created">{comment.created_at}</p>
                            <div className="comment-votes">Votes: {comment.votes}</div>
                            <p className="delete-comment" onClick={() => handleDelete(index, commentId, commentAuthor)}>❌</p>
                        </div>
                    </li>
                })
            }
        </ul>
       </div>
    )
};