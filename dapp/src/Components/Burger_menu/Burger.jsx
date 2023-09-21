import { useState } from "react";
import icon from "../../../src/assets/1.png";
import close from "../../../src/assets/close.png";
import styles from "./burger.module.scss";
import { Link } from "react-router-dom";

function Burger() {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const menuClassName = menuOpened ? "invisible " : "w-16 h-12 top-0";
  const menuIsOpened = menuOpened
    ? "-translate-x-8 opacity-1 transition-all duration-500 transition-opacity "
    : "-translate-x-full opacity-0 ";
  return (
    <>
      <div
        onClick={toggleMenu}
        className={`${styles.toggleMenu} ${menuClassName}`}
      >
        <img src={icon} className={styles.icon} />
      </div>
      <div className={`${styles.menuOpened} ${menuIsOpened}   `}>
        <img src={close} onClick={toggleMenu} className={styles.close}></img>
        <div className="flex flex-col items-stretch relative -z-0">
          <Link
            to="/"
            className="mt-14 text-center py-2 rounded-r-lg hover:translate-x-2 duration-150 bg-blue-700 "
          >
            Home
          </Link>
          <Link
            to="/faq"
            className="my-2 text-center py-2 rounded-r-lg hover:translate-x-2 duration-150 bg-blue-700 "
          >
            FAQ
          </Link>
          <Link
            to="/about"
            className="text-center py-2 rounded-r-lg hover:translate-x-2 duration-150 bg-blue-700 "
          >
            About
          </Link>
        </div>
      </div>
    </>
  );
}

export default Burger;
