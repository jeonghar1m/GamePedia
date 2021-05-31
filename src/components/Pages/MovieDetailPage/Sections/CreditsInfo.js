import React from 'react'

function CreditsInfo(props) {
    const {credits} = props;
    const director = credits.crew.filter(crew => (crew.job === "Director"));
    
    return (
        <div>
            <div><b>감독: </b>{director.map((director, index) => (<span key={director.name}>{director.name}{index < director.length - 1 ? ',\u00A0' : ''}</span>))}</div>
            {/* <ul>
                {director.map(director => (
                    <li key="director">{director.name}</li>
                ))}
            </ul> */}
            <p>출연</p>
            <ul>
                {credits.cast.map(cast => (
                    <li key={cast.credit_id}>{cast.name} ({cast.character} 역)</li>
                ))}
            </ul>
        </div>
    )
}

export default CreditsInfo
