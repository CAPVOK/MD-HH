import React from 'react';
import { LatLng, map } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import CreateRoutingMachine from './Routing';
import { LocationMarker } from './locationMarker';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from './marker';
import './main.scss';
import { selectBranches, selectAtms, selectIsShowAtm } from '../../store/slices/pointsSlise';
import { useSelector } from '../../store/store';

const mark1 = [55.773763, 37.675002] as [number, number];

export interface IMapwindowProps {

}

const MapWidget: React.FC<IMapwindowProps> = () => {
    const [location, setLocation] = React.useState<LatLng | null>(null);

    const branches = useSelector(selectBranches);
    const atms = useSelector(selectAtms);
    const flag = useSelector(selectIsShowAtm);
    const { instance, Router } = CreateRoutingMachine(
        location ? [location.lat, location.lng] : mark1,
        mark1,
        'car'
    );

    instance.on('routesfound', (e) => {
        const routes = e.routes;
        if (routes.length > 0) {
            const route = routes[0]; // Возьмем первый маршрут, но может быть несколько вариантов.
            const totalTime = route.summary.totalTime; // Получение времени маршрута в секундах.
            console.log(`Время маршрута: ${totalTime} секунд`);
        }
    });

    React.useEffect(() => {
        const label = document.querySelector(
            '.leaflet-control-attribution.leaflet-control',
        );
        if (label) {
            label.innerHTML = 'Powered by MD&HH';
        }
    }, [location]);

    return (
        <div className='map-window'>
            <MapContainer
                center={location ?? [55.75399399999374,37.62209300000001]}
                zoom={16}
                scrollWheelZoom={true}
                className='map-window-style'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {flag? (<>
                    {
                        atms.length > 0 && atms?.map((data, key) => (<MapMarker key={key + 1} type='atm' position={[data?.latitude, data?.longitude]} />))
                    }
                </>

                ) : (<>
                    {
                        branches.length > 0 && branches?.map((data, key) => (<MapMarker key={key + 1} type='bank' position={[data?.latitude, data?.longitude]} />))
                    }
                </>

                )}


                <LocationMarker location={location} setLocation={setLocation} />
                <MapMarker type='atm' position={mark1} />
                
                <Router />

            </MapContainer>
        </div>
    );
};

export default MapWidget;
