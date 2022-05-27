import { Component } from "react";
import axios from 'axios';

interface CharacterInterface {
  name: string
  // saving time by not building out entire interface
}


interface StateInterface {
  characters: Array<CharacterInterface>,
  filteredList: Array<object>,
  loader: Boolean,
  multiplier: Number
}

class ClassComp extends Component<{}, StateInterface> {
  constructor(props: any) {
    super(props);
    this.state = {
      characters: [],
      filteredList: [],
      loader: true,
      multiplier: 10
    };
  }


  componentDidMount = () => {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    try { 
      const { data : { results }} = await axios.get('https://swapi.dev/api/people/');
      this.setState({ 
        characters: results,
        filteredList: results,
      })
    }
    catch (error) {
      alert('there was an error fetching characters')
    }
    this.setState({ 
      loader: false
    })
  } 

   handleFilter = (e: any) => {
    const { target : { value }  } = e;
    const { characters } = this.state;
    const newCharacterList = characters.filter(char => char.name.toLowerCase().includes(value));
    this.setState({
      filteredList: newCharacterList
    })
  }

  setMultiplier = (value: number) => {
    this.setState({ multiplier: value})
  }

  render() {

    const { filteredList, loader, multiplier } = this.state;
    return (
      <div id="class-comp">
        <h2>React Class Component</h2>
        Filter: <input onChange={this.handleFilter} placeholder="Filter by name" /> Multiplier:{" "}
        <input
          placeholder="Multiplier"
          type="number"
          min="1"
          max="20"
          defaultValue={multiplier.toString()}
          onChange={(event: any) => this.setMultiplier(event.target.value)}
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
}

export default ClassComp;
