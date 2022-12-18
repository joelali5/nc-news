import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../contexts/User";
import { postComment } from "../utils/Api";

export default function AddComment({ setComments, comments }) {
  const [body, setBody] = useState("");
  const { user } = useContext(userContext);
  const [err, setErr] = useState(null);
  const username = user.username;

  const { article_id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || body === "") {
      alert("Please login or Add text to field");
    } else {
      postComment(username, body, article_id).then((commentsFromApi) => {
        setComments((currComments) => {
          const newComments = [...currComments];
          newComments.unshift(commentsFromApi);
          return newComments;
        });
        setBody("");
      });
      //Catch the err if something goes wrong
      postComment(username, body, article_id).catch((err, commentsFromApi) => {
        setComments(currComments => {
            const newComments = [...currComments];
            newComments.shift(commentsFromApi);
            return newComments;
        });
        setBody("");
        setErr("Something went wrong, please try again!")
      })
    }
  }

  return err ? (<p className="error-msg">{err}</p>) : (
    <form className="comment-group" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        className="comment-input"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button className="post-comment-btn">post</button>
    </form>
  );
}