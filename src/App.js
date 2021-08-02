import './App.css';
import React,{ useState,useEffect } from 'react';
import PokemonList from './components/PokemonList';
import Pagination from './components/Pagination';
import axios from 'axios' ;

function App() {
  const [pokemon, setPokemon] = useState([]) ;
  
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon') ;
  const [nextPageUrl, setNextPageUrl] = useState() ;
  const [prevPageUrl, setPrevPageUrl] = useState() ;

  //important loading code
  const [loading, setLoading] = useState(true) ;

  useEffect(() => {
    setLoading(true)

    //to cancel previous data to avoid overriding
    let cancel  ;

    axios.get(currentPageUrl, {
      cancelToken : new axios.CancelToken(c => cancel = c)
    }).then(res =>{
      setLoading(false) 
      setNextPageUrl(res.data.next) 
      setPrevPageUrl(res.data.previous) 
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
    
  }, [currentPageUrl])

  //functions for pagination
  function gotoNextPage () {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage () {
    setCurrentPageUrl(prevPageUrl)
  } 
  
  //code for loading
  if (loading) return 'loading ..' ;
  return (
    < >
      <PokemonList pokemon={pokemon} />
        <Pagination 
        gotoNextPage = {nextPageUrl ? gotoNextPage : null}
        gotoPrevPage = {prevPageUrl? gotoPrevPage : null}
        />
    </>
  );
}

export default App;
