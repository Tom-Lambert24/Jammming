import logo from './logo.svg';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';

function App() {
  return (
    <>
      <header>
        <h1>Jammming</h1>
      </header>
      <body>
        <SearchBar />
        <SearchResults />
      </body>
    </>
  );
}

export default App;
