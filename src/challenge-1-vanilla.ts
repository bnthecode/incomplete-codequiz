// Note: The HTML for this challenge can be found in index.html
// Note: this function is run inside of src/main.tsx

let characterList: any = [];
let multiplier: number = 10;


const input = document.getElementById('multiplier');
input?.addEventListener('change', (e:any) => {
  multiplier = e.target.value;
  const tBody = document.getElementById('tbody') as HTMLTableElement;
  tBody.innerHTML = ''

  buildTable(characterList);
})



const fetchCharacters = (buildTableFunction: any, setCharacterList: any) => {
  fetch('https://swapi.dev/api/people/')
  .then(response => response.json())
  .then(data => [buildTableFunction(data.results.reverse()), setCharacterList(data.results)]);
}

const setCharacterList = (characters: any) => {
  characterList = characters;
}

const filterCharacters = (value: any,buildTableFunction: any ) => {
  const newCharacterList = characterList.filter((char: any) => char.name.toLowerCase().includes(value));
  buildTableFunction(newCharacterList);
}

const calculatePower = (height: number, mass: number) => multiplier * height * mass;  


  const buildTable = (characters: any) => {

    var table = document.getElementById("table") as HTMLTableElement;
    characters.map((char: any) => {
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = char.name;
      cell2.innerHTML = char.height;
      cell3.innerHTML = char.mass;
      cell4.innerHTML = calculatePower(char.height, char.mass).toString();
    })
  }

export function runVanillaApp() {
  // Start here
  fetchCharacters(buildTable, setCharacterList);
  
}
