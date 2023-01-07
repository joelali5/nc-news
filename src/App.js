import './App.css';
import Articles from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import Article from './components/Article'
import Comments from './components/Comments';
import Users from './components/Users';
import Nav from './components/Nav';
import Topics from './components/Topics';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Articles />} />
        <Route path='/articles/:article_id' element={<Article />} />
        <Route path='/articles/:article_id/comments' element={<Comments />} />
        <Route path='/users' element={<Users />} />
        <Route path='/topics/:topic' element={<Topics />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;