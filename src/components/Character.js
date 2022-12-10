import CharCSS from "./Character.module.css"

const Character = ({name, image, archetypes, difficulty, franchise, PGR, select}) => {
    return(
        <div className={CharCSS.character}>
            <div className="image">
                <img src={image} alt={name}/>
            </div>
            <div className="data">
                {/* <img src={image} alt=""></img> */}
                <h2>{name}</h2>
                <h4>Franchise: {franchise}</h4>
                <h4>Archetypes:</h4>
                <ul>
                    {archetypes.map(archetype => {
                        return <li key={archetype}><h5>-{archetype}</h5></li>
                    })}
                </ul>
                <h4>Learnability: {difficulty}</h4>
                <h4>Winshare: {PGR}%</h4>
                <button className={CharCSS.addCharacter} onClick={select}>Add Character</button>
            </div>
        </div>
    )
}

export default Character