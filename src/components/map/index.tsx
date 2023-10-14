import React from 'react';
import { LatLng } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import CreateRoutingMachine from './Routing';
import { LocationMarker } from './locationMarker';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from './marker';

const BomonkaXY = [55.76576159446994, 37.68564981865584] as [number, number]; 
const HomeXY = [55.59014250668012,37.44804901630521] as [number, number];

const MapWidget: React.FC = () => {
    const [location, setLocation] = React.useState<LatLng | null>(null);
    const { instance, Router } = CreateRoutingMachine(
        location ? [location.lat, location.lng] : HomeXY,
    BomonkaXY,
    );

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
            <h2>Это Бомонка</h2>
            <MapContainer
                center={location ?? BomonkaXY}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: '800px', width: '1000px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapMarker type='default' position={BomonkaXY} />
                <MapMarker type='default' position={HomeXY} />
                <LocationMarker location={location} setLocation={setLocation} />
                <Router />

            </MapContainer>
        </div>
    );
};

export default MapWidget;
