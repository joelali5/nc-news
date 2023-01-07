import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/Api";
import { Link } from "react-router-dom";
import { patchIncVotes, patchDecVotes } from "../utils/Api";

export default function SingleArticle() {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
      setIsLoading(false)
    });
  }, [article_id]);

  const decVotes = () => {
    setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes - 1 };
    });
    setDownVote(true);
    //But in the case that axios throws an error
    patchDecVotes(article_id).catch(err => {
        setArticle(currArticle => {
            return {...currArticle, votes: currArticle.votes + 1}
        });
        setErr("Something went wrong, please try again.");
    })
  };

  const incVotes = () => {
    setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes + 1 };
    });
    setUpVote(true);
    //But in the case that axios throws an error
    patchIncVotes(article_id).catch(err => {
        setArticle(currArticle => {
            return {...currArticle, votes: currArticle.votes - 1};
        });
        setErr("Something went wrong, please try again.")
    });
  };

  return isLoading ? (
    <h2 className="loading">Loading...</h2>
  ) : err ? (<p className="error-msg">{err}</p>) : (
    <div className="article">
      <h2 className="article-title">Title: {article.title}</h2>
      <h2 className="article-topic">{article.topic}</h2>
      <h4 className="article-author">Author: {article.author}</h4>
      <p className="article-body">{article.body}</p>
      <div className="article-details">
        <p className="article-created">created: {article.created_at}</p>
        <div className="votes-btn">votes
            <button className="vote-btn btn-dec" onClick={!downVote ? decVotes : null}>👎🏼</button>
            <button className="vote-btn btn-inc" onClick={!upVote ? incVotes : null}>👍🏼</button>
            <span className="votes-count">{article.votes}</span>
        </div>
      </div>
      <p className="article-comment-count">comment-count: {article.comment_count}</p>
      <Link to={`/articles/${article_id}/comments`} className="comment-link">
        comments
      </Link>
    </div>
  );
}