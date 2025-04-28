const Footer = () => {
  return (
    // <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
    //   <div className="max-w-screen-xl w-full mx-auto px-4">
    //     <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
    //       © 2023{" "}
    //       <a href="https://flowbite.com/" className="hover:underline">
    //         Flowbite™
    //       </a>
    //       . All Rights Reserved.
    //     </span>
    //   </div>
    // </footer>

    <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Technical Test
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
