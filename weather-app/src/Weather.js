import Days from './Days';


function Weather({ city, icon, tempC, windSpeed, windDegree, handleClickDay }) {


    return (
        <div className="row">
            <div className="col s12 m6 push-m3">
                <div className="weather card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{city}</span>
                        <p><img src={icon} /></p>
                        <span className="temperature">{tempC}°</span>
                        <div className="wind">Vent {windSpeed}km/h ({windDegree}°)</div>
                    </div>
                    <Days handleClickDay={handleClickDay} />
                </div>
            </div>
        </div>
    );
}

export default Weather;
