import axios from 'axios';

const news = axios.create({
    baseURL: 'https://dark-rose-cape-buffalo-cape.cyclic.app/'
});

export const getArticles = (sort_by) => {
    return news(`/api/articles?sort_by=${sort_by}`).then(({data}) => {
        return data.articles;
    });
};

export const getArticleById = (article_id) => {
    return news(`/api/articles/${article_id}`).then((res) => {
        return res.data.result;
    });
};

export const getComments = (article_id) => {
    return news(`/api/articles/${article_id}/comments`).then(res => {
        return res.data.comments;
    });
};

export const getUsers = () => {
    return news('/api/users').then(res => {
        return res.data.users
        
    });
};

export const getTopics = () => {
    return news('/api/topics').then(res => {
        return res.data.topics;
    });
};

export const patchIncVotes = (article_id) => {
    const path = `/api/articles/${article_id}`
    return news.patch(path, {inc_votes: + 1}).then(res => {
        return res.data.article.votes;
    });
}

export const patchDecVotes = (article_id) => {
    const path = `/api/articles/${article_id}`
    return news.patch(path, {inc_votes: - 1}).then(res => {
        return res.data.article.votes;
    });
}

export const postComment = (username, newComment, article_id) => {
    const postBody = {
        username: username,
        body: newComment
    };
    return news.post(`/api/articles/${article_id}/comments`, postBody).then((res) => {
        return res.data.comment;
    })
};

export const getArticleByTopic = (topic) => {
    return news(`api/articles?topic=${topic}`).then(res => {
        return res.data.articles;
    })
};

export const deleteCommentById = (comment_id) => {
    return news.delete(`/api/comments/${comment_id}`).then(res => {
        return res;
    })
};