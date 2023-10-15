import './PlaceBar.scss';
import { P } from '../../UI';
import { WaklIcon } from '../../UI/icons';
import { FC } from 'react';
import { useSelector } from '../../store/store';
import { selectBranches, selectIsShowAtm } from '../../store/slices/pointsSlise';

export interface IPlaceBarProps { }

export const PlaceBar: FC<IPlaceBarProps> = (props) => {
  const isShowAtm = useSelector(selectIsShowAtm);
  const branches = useSelector(selectBranches);

  return (
    <div className='place_bar'>
      {isShowAtm ? (
        <div className='place_bar-atm-content'>ATM Content</div>
      ) : (
        branches.length > 0 && (
          <div className='place_bar-list'>
            {branches.map((place, index) => (
              <div key={index} className='place_bar-place'>
                <h2>{place.salePointName}</h2>
                <p className='address'>{place.address}</p>
                <div className="distance">
                  <WaklIcon fill="gray" />
                  <P variant='sm'>{place.distance} км</P>
                </div>
                {/* <p className='time'>{place.}</p> */}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
