import React, { FC } from 'react';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDarkMode from '../../hooks/useDarkMode';

const ThemeSwitch: FC = () => {

  const { isDarkMode, toggle } = useDarkMode(false);

  const icon = isDarkMode ? regular('sun') : solid('moon');

  return (
    <button
      className="inline-flex flex-col lg:flex-row items-center justify-center lg:w-7 lg:h-7 lg:mr-0 p-3 lg:p-0 border border-sky-400 rounded-md hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors"
      title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
      onClick={() => toggle()}
    >
      <FontAwesomeIcon icon={icon} className="w-5 lg:w-4 h-5 lg:h-4 text-sky-600" />
      <span className="lg:hidden text-sky-600 mt-2">
        Switch to {isDarkMode ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default ThemeSwitch;