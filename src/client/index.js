import {saveNextTrip} from './js/app';

// import './styles/reset.scss';
import './styles/typography.scss';
import './styles/base.scss';
import './styles/content.scss';

document.getElementById('saveTravelData').addEventListener('submit', saveNextTrip);

export {saveNextTrip};