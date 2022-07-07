import {saveNextTrip} from './js/app';
import {updateUiWithRecentData} from './js/updateUi';

import './styles/typography.scss';
import './styles/base.scss';
import './styles/content.scss';

document.addEventListener('DOMContentLoaded', () =>
    updateUiWithRecentData());

export {saveNextTrip, updateUiWithRecentData};