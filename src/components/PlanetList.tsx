import "./planetlist.css";

export default function PlanetList({planets = [] })
{
	return(
		<div className="planet-list">
			{planets.map(p => {
				return (
					<div className="planet" key={p.id}>
						<div className="planet-name">{p.planet}</div>
						<div className="planet-type">{p.type}</div>
					</div>
				);
			})}
		</div>
	);
}
