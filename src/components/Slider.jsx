import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import gas from '../assets/catfe.png';

const Slider = (
  <AwesomeSlider
    media={[
      {
        source: gas,
      },
    ]}
  />
);

export default Slider;