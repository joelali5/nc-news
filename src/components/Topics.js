import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getTopics } from "../utils/Api";
import { getArticleByTopic } from "../utils/Api";

export default function Topics() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topicArticles, setTopicArticles] = useState([]);
    const { topic } = useParams();

    useEffect(() => {
        getArticleByTopic(topic).then(articles => {
            setTopicArticles(articles);
        })
    }, [topic]);

    useEffect(() => {
        getTopics().then(topicsData => {
            setTopics(topicsData);
            setLoading(false);
        });
    }, []);

    return loading ? (<h2 className="loading">Loading...</h2>) : (
        <div>
            <ul className="topics">{
                topics.map(topic => {
                    return <Link to={`/topics/${topic.slug}`} key={topic.slug} className="topic"><li>
                        {topic.slug}
                    </li></Link>
                })}
            </ul> 
            <div className="articles-container">
                {
                    topicArticles.map(article => {
                        return <div key={article.article_id} className='article'>
                            <h2 className="article-title">Title: {article.title}</h2>
                            <h2 className="article-topic">{article.topic}</h2>
                            <h4 className="article-author">Author: {article.author}</h4>
                            <p className="article-body">{article.body}</p>
                            <div className="article-details">
                                <p className="article-detail created">created: {article.created_at}</p>
                        </div>
                        <p className="article-detail">comment-count: {article.comment_count}</p>
                        </div>
                    })
                }
            </div>
        </div>
        
        
    )
}