import React, { FC } from 'react';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDarkMode from '../../hooks/useDarkMode';

const ThemeSwitch: FC = () => {
  const { isDarkMode, toggle } = useDarkMode(false);

  const icon = isDarkMode ? regular('sun') : solid('moon');

  return (
    <button
      className="inline-flex flex-col items-center justify-center rounded-md border border-sky-400 p-3 transition-colors hover:bg-sky-100 dark:hover:bg-sky-900 lg:mr-0 lg:h-7 lg:w-7 lg:flex-row lg:p-0"
      title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
      onClick={() => toggle()}
    >
      <FontAwesomeIcon
        icon={icon}
        className="h-5 w-5 text-sky-600 lg:h-4 lg:w-4"
      />
      <span className="mt-2 text-sky-600 lg:hidden">
        Switch to {isDarkMode ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default ThemeSwitch;
