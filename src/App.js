import {useState, useEffect} from 'react'
import './App.css'
import Character from './components/Character'
import characterData from './assets/characterData.json'


function App() {

  const pageLength = 10;
  let g_counter = 0;

  //functions
  const sortByPGR = (a, b) => {
    if (a != null && b!= null) {
      return a.PGR >= b.PGR ? -1 : 1
    }

    return 0
  }

  const sort = () => {
    if (!sorted) {
      setPresort([...characterData])
      setCharacters((prevData) => {
        let newData = [...prevData]
        return newData.sort(sortByPGR)
      })
    } else {
      setPresort([])
      setCharacters(characterData)
    }
    setSorted(!sorted)
  }

  const filterByGame = (array) => {
    let a = [...array]
    games.forEach(game => {
      a = a.filter(ele => ele.source_game === game)
    })
    return a
  }

  const filterByDifficulty = (array) => {
    let a = [...array]
    difficulties.forEach(difficulty => {
      a = a.filter(ele => ele.difficulty === difficulty)
    })
    return a
  }

  const filterByArchetype = (array) => {
    let a = [...array]
    archetypes.forEach(archetype => {
      console.log(archetype)
      a = a.filter(ele => ele.archetypes.includes(archetype))
    })
    return a
  }

  const filterBySelected = (array) => {
    let a = [...array]
    a = a.filter(ele => selected.includes(ele))
    return a
  }

  const filter = () => {
    let array = [...characterData]
    filters.forEach(filter => {
      if (filter === 'game' && games.length > 0) {
        array = filterByGame(array)
      } 
      else if (filter === 'difficulty' && difficulties.length > 0) {
        array = filterByDifficulty(array)
      }
      else if (filter === 'archetype' && archetypes.length > 0) {
        array = filterByArchetype(array)
      }
      else if (filter === 'selected' && selected.length > 0) {
        array = filterBySelected(array)
      }
    })

    setCharacters(array)
  }

  const addGame = (game) => {
    if (!games.includes(game)) {
      setGames([...games, game])
    } else {
      setGames(games.filter(ele => ele !== game))
    }
  }

  const addDifficulty = (difficulty) => {
    if (!difficulties.includes(difficulty)) {
      setDifficulties([...difficulties, difficulty])
    } else {
      setDifficulties(difficulties.filter(ele => ele !== difficulty))
    }
  }

  const addArchetype = (archetype) => {
    if (!archetypes.includes(archetype)) {
      setArchetypes([...archetypes, archetype])
    } else {
      setArchetypes(archetypes.filter(ele => ele !== archetype))
    }
  }

  const addSelected = (selected_item) => {
    if (!selected.includes(selected_item)) {
      setSelected([...selected, selected_item])
    } else {
      setSelected(selected.filter(ele => ele !== selected_item))
    }
  }

  const paginationFilter = (ele) => {
    let result = false
    console.log(pageMax)
    if (ele.id > (page * pageMax) && g_counter < pageMax) {
      result = true
      g_counter++
      // setCounter(counter + 1)
    }

    return result
    // return (ele.id >= pageMin && ele.id < pageMax)
  }

  const incrementPage = () => {
    // if (pageMax < 90) {
    //   setPageMin(pageMin + pageLength)
    //   setPageMax(pageMax + pageLength)
    // }

    if ((page + 1) * pageLength < 90) {
      setPage(page + 1)
      g_counter = 0
      // setCounter(0)
    }
  }

  const decrementPage = () => {
    // if (pageMin > 0) {
    //   setPageMin(pageMin - pageLength)
    //   setPageMax(pageMax - pageLength)
    // }

    if (page * pageLength > 0) {
      setPage(page - 1)
      g_counter = 0
      // setCounter(0)
    }
  }

  const reduce = (array) => {
    let total = 0;
    console.log(array[0])
    
    array.forEach(ele => {
      total += ele.PGR
    })
    return total.toFixed(2)
  }

  
  //state
  const[characters, setCharacters] = useState([...characterData])

      //for sorting
  const [presort, setPresort] = useState([])
  const [sorted, setSorted] = useState(false)

    //for filtering
  const [filters, setFilters] = useState(['game', 'difficulty', 'archetype'])
  const [games, setGames] = useState([])
  const [difficulties, setDifficulties] = useState("")    //gotta look up radio unselect
  const [archetypes, setArchetypes] = useState([])
  const [selected, setSelected] = useState([])

  //for pagination
  const [page, setPage] = useState(0)
  const [counter, setCounter] = useState(0)
  const [pageMin, setPageMin] = useState(0)
  const [pageMax, setPageMax] = useState(pageLength)

  //keep track of characters selected

  useEffect(()=> {            //this won't work when I add a dependency array grrrrr
    filter()
  }, [games, difficulties, archetypes, selected, filters, page])
  
  //render
  return (
    <div className="App">
      <header>
          <h1>Super Smash Bros Ultimate Character Picker</h1>
      </header>

      <div className='container'>

        <div className='sortsAndFilters'>

          <div className='sorters'>
            <h3>Sort Characters</h3>
            <form>
                <input type="checkbox" id="PGR" value="PGR" onClick={() => sort()}/>
                <label>PGR Winshare</label><br/>
            </form>
          </div> 

          <div className='filters'>
            <h3>Difficulty</h3>
            <input type="checkbox" id="easy" value="easy" onClick={() => {
              addDifficulty('easy')
              filter()
            }}/>
            <label>Easy</label><br/>
            <input type="checkbox" id="medium" value="medium" onClick={() => {
              addDifficulty('medium')
              filter()
            }}/>
            <label>Medium</label><br/>
            <input type="checkbox" id="hard" value="hard" onClick={() => {
              addDifficulty('hard')
              filter()
            }}/>
            <label>Hard</label><br/>

            <h3>Selected Characters</h3>
            <input type="checkbox" id="selected" value="selected" onClick={() => {
              if (!filters.includes('selected')) {
                setFilters([...filters, 'selected'])
              } else {
                setFilters([...filters].filter(ele => ele != 'selected'))
              }
              filter()
            }}/>
            <label>Selected Characters</label><br/>

            <h3>Source Game</h3>
            <input type="checkbox" id="SMB" value="Super Mario" onClick={() => {
              addGame('Super Mario')
              filter()
            }}/>
            <label>Super Mario Bros</label><br/>
            <input type="checkbox" id="pokemon" value="Pokemon" onClick={() => {
              addGame('Pokemon')
              filter()
            }}/>
            <label>Pokemon</label><br/>
            <input type="checkbox" id="minecraft" value="Minecraft" onClick={() => {
              addGame('Minecraft')
              filter()
            }}/>
            <label>Minecraft</label><br/>
            <input type="checkbox" id="zelda" value="Zelda" onClick={() => {
              addGame('The Legend of Zelda')
              filter()
            }}/>
            <label>Zelda</label><br/>
            <input type="checkbox" id="starfox" value="Starfox" onClick={() => {
              addGame('Star Fox')
              filter()
            }}/>
            <label>Star Fox</label><br/>
            <input type="checkbox" id="fire-emblem" value="Fire Emblem" onClick={() => {
              addGame('Fire Emblem')
              filter()
            }}/>
            <label>Fire Emblem</label><br/>
            <input type="checkbox" id="final-fantasy" value="Final Fantasy" onClick={() => {
              addGame('Final Fantasy')
              filter()
            }}/>
            <label>Final Fantasy</label><br/>
            <input type="checkbox" id="DK" value="Donkey Kong" onClick={() => {
              addGame('Donkey Kong')
              filter()
            }}/>
            <label>Donkey Kong</label><br/>
            <input type="checkbox" id="metroid" value="Metroid" onClick={() => {
              addGame('Metroid')
              filter()
            }}/>
            <label>Metroid</label><br/>
            <input type="checkbox" id="animal-crossing" value="Animal-Crossing" onClick={() => {
              addGame('Animal Crossing')
              filter()
            }}/>
            <label>Animal Crossing</label><br/>
            <input type="checkbox" id="kirby" value="Kirby" onClick={() => {
              addGame('Kirby')
              filter()
            }}/>
            <label>Kirby</label><br/>
            <input type="checkbox" id="kid-icarus" value="Kid Icarus" onClick={() => {
              addGame('Kid Icarus')
              filter()
            }}/>
            <label>Kid Icarus</label><br/>
            <input type="checkbox" id="streetfighter" value="Street Fighter" onClick={() => {
              addGame('Street Fighter')
              filter()
            }}/>
            <label>Streetfighter</label><br/>
            <input type="checkbox" id="tekken" value="Tekken" onClick={() => {
              addGame('Tekken')
              filter()
            }}/>
            <label>Tekken</label><br/>
            <input type="checkbox" id="xenoblade" value="Xenoblade Chronicles" onClick={() => {
              addGame('Xenoblade Chronicles')
              filter()
            }}/>
            <label>Xenoblade Chronicles</label><br/>
            <input type="checkbox" id="castlevania" value="Castlevania" onClick={() => {
              addGame('Castlevania')
              filter()
            }}/>
            <label>Castlevania</label><br/>
            <input type="checkbox" id="kingdom-hearts" value="Kingdom Hearts" onClick={() => {
              addGame('Kingdom Hearts')
              filter()
            }}/>
            <label>Kingdom Hearts</label><br/>

            <h3>Archetype</h3>
            <input type="checkbox" id="all-rounder" value="all-rounder" onClick={() => {
              addArchetype('all-rounder')
              filter()
            }}/>
            <label>All Around</label><br/>
            <input type="checkbox" id="swordie" value="swordie" onClick={() => {
              addArchetype('swordie')
              filter()
            }}/>
            <label>Sword Character</label><br/>
            <input type="checkbox" id="rushdown" value="rushdown" onClick={() => {
              addArchetype('rushdown')
              filter()
            }}/>
            <label>Rushdown</label><br/>
            <input type="checkbox" id="zoner" value="zoner" onClick={() => {
              addArchetype('zoner')
              filter()
            }}/>
            <label>Zoner</label><br/>
            <input type="checkbox" id="mix-up" value="mix-up" onClick={() => {
              addArchetype('mix-up')
              filter()
            }}/>
            <label>Mix-Up</label><br/>
            <input type="checkbox" id="footsie" value="footsie" onClick={() => {
              addArchetype('footsie')
              filter()
            }}/>
            <label>Footsie</label><br/>
            <input type="checkbox" id="FGC" value="fighting game character" onClick={() => {
              addArchetype('fighting game character')
              filter()
            }}/>
            <label>Fighting Game Character (FGC)</label><br/>
            <input type="checkbox" id="hit and run" value="hit and run" onClick={() => {
              addArchetype('hit and run')
              filter()
            }}/>
            <label>Hit and Run</label><br/>
            <input type="checkbox" id="bait and punish" value="bait and punish" onClick={() => {
              addArchetype('bait and punish')
              filter()
            }}/>
            <label>Bait and Punish</label><br/>
            <input type="checkbox" id="grappler" value="grappler" onClick={() => {
              addArchetype('grappler')
              filter()
            }}/>
            <label>Grappler</label><br/>
            <input type="checkbox" id="distance" value="distance" onClick={() => {
              addArchetype('distance')
              filter()
            }}/>
            <label>Distance</label><br/>
            <input type="checkbox" id="trapper" value="trapper" onClick={() => {
              addArchetype('trapper')
              filter()
            }}/>
            <label>Trapper</label><br/>
            <input type="checkbox" id="puppeter" value="puppeter" onClick={() => {
              addArchetype('puppeter')
              filter()
            }}/>
            <label>Puppeter</label><br/>
            <input type="checkbox" id="glass-cannon" value="glass cannon" onClick={() => {
              addArchetype('glass cannon')
              filter()
            }}/>
            <label>Glass Cannon</label><br/>
            <input type="checkbox" id="dynamic" value="dynamic" onClick={() => {
              addArchetype('dynamic')
              filter()
            }}/>
            <label>Dynamic</label><br/>
          </div> 

        </div>

        
        
        <div className='characters'>
          <div className='buttons'>
            <button onClick={() => decrementPage()}>prev</button>
            <button onClick={() => incrementPage()}>next</button>
          </div>
          {characters.filter((ele) => paginationFilter(ele)).map((character) => {
            return <Character
              key={character.id}
              name={character.name}
              image={character.image}
              franchise={character.source_game}
              archetypes={character.archetypes}
              difficulty={character.difficulty}
              PGR={character.PGR}
              select={()=> addSelected(character)}
            />
            })}
          <div className='buttons'>
            <button onClick={() => decrementPage()}>prev</button>
            <button onClick={() => incrementPage()}>next</button>
          </div>
          <div className='PGR'>
            <h2 className='total'>The total PGR winshare of your selected characters is: <pre>
              {reduce([...selected])}%</pre>
            </h2>
            <p>*To view the characters you chose, turn on the "Selected Characters" filter</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
