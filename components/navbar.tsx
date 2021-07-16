import Link from 'next/link';

import useDarkMode from 'use-dark-mode';

const Navbar = () => {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full max-w-4xl p-8 mx-auto my-0 text-gray-900 bg-white sticky-nav md:my-8 dark:bg-black dark:text-gray-100">
      <div>
        <Link href="#top">
          <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Home</a>
        </Link>
        <Link href="#about">
          <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">About</a>
        </Link>
        <Link href="#projects">
          <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">
            Projects
          </a>
        </Link>
      </div>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800"
        onClick={darkMode.toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="w-4 h-4 text-gray-800 dark:text-gray-200">
          {darkMode.value ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
