import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArticles } from '../utils/Api';


export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortValue, setSortValue] = useState("created_at");
    const [searchParams, setSearchParams] = useSearchParams();

    function handleChange(e) {
        setSortValue(e.target.value);
        setSearchParams({sort_by : sortValue});
    }

    useEffect(() => {
        getArticles(sortValue).then(articlesData => {
            setArticles(articlesData);
            setIsLoading(false);
        })
    }, [sortValue]);

    return isLoading ? (<h2 className='loading'>Loading...</h2>) : (
        <div>
            <form className="sort-values">
                <select className="sort-drop-down"
                    value={sortValue}
                    name="sortValue"
                    onChange={handleChange}
                >
                    <option value="created_at">--sort Article--</option>
                    <option value="comment_count">comment_count</option>
                    <option value="votes">votes</option>
                    <option value="title">title</option>
                    <option value="topic">topic</option>
                    <option value="author">author</option>
                </select>
            </form>
            <div className='articles-container'>
            {articles.map(article => {
            return <div key={article.article_id} className='article'><Link to={`/articles/${article.article_id}`} className="article-link">
                <h2 className="article-title">Title: {article.title}</h2>
                <h2 className="article-topic">{article.topic}</h2>
                <h4 className="article-author">Author: {article.author}</h4>
                <p className="article-body">{article.body}</p>
            </Link></div>
            })}
            </div>
        </div>
    )
};