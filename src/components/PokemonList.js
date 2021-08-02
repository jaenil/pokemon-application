import React from 'react'

const PokemonList = (props) => {
    return (
        <div>
            {props.pokemon.map (p => (
                <div key={p}>
                    {p}
                </div>
            ))}
        </div>
    )
}

export default PokemonList
