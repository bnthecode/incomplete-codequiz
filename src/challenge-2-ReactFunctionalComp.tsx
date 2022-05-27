import axios from 'axios';
import { useEffect, useState } from 'react';

function FunctionalComp() {

  const [characters, setCharacters] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([])
  const [multiplier, setMultiplier] = useState(10);
  const [loader, setLoader] = useState(true);

  
  const fetchCharacters = async () => {
    try { 
      const { data : { results }} = await axios.get('https://swapi.dev/api/people/');
      setCharacters(results);
      setFilteredList(results);
    }
    catch (error) {
      alert('there was an error fetching characters')
    }
    setLoader(false);
  } 

  const handleFilter = (e: any) => {
    const { target : { value }  } = e;
    const newCharacterList = characters.filter(char => char.name.toLowerCase().includes(value));
    setFilteredList(newCharacterList);
  }

  useEffect(() => {
    fetchCharacters();
  }, [])
  

  return (
    <div id="functional-comp">
      <h2>React Functional Component</h2>
      Filter: <input onChange={handleFilter} placeholder="Filter by name" /> Multiplier:{" "}
      <input
        placeholder="Multiplier"
        type="number"
        min="1"
        max="20"
        defaultValue={multiplier.toString()}
        onChange={(event: any) => setMultiplier(event.target.value)}
      />{" "}
      Press "Escape" to reset fields
      { loader && <div className="loader">Loading...</div> }
      <table width="100%">
        <thead>
        <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Power</th>
            </tr>
        </thead>
        <tbody>
        { filteredList.map((char: any) => (
                  <tr>
            <td>{char.name}</td>
            <td>{char.height}</td>
            <td>{char.mass}</td>
            <td>{Number(multiplier) * char.height * char.mass}</td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
  );
}


//https://swapi.dev/api/people/

export default FunctionalComp;
