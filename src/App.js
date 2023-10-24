
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmojiHeader from './component/emoji-header.js';
import EmojiApi from './component/emoji-api.js';
import SearchApi from './component/search-api.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmojiHeader />} />
          <Route path='/apiData' element={<EmojiApi />} />
          <Route path='/searchEmoji' element={<SearchApi/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
