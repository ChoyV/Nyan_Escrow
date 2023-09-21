import styles from "./About.module.scss";
import Burger from "../Burger_menu/Burger";
export const About = () => {
  return (
    <>
      <div className={styles.back}>
        <Burger />
        <div className="w-full h-full flex justify-center">
          <div className={styles.newContract}>
            <h1 className="text-center pb-7 font-extrabold">About</h1>
            <p className="pl-7">
              This project has been developed by vlasUSDT as a personal pet
              project, aimed at learning and exploring React and frontend
              development within the realm of WEB3. It's a hands-on endeavor to
              gain experience and expertise in building web applications that
              interact with blockchain technologies and smart contracts.
            </p>
            <p className="pl-7">
              Additionally, if you're interested in contributing to this
              project, your contributions are more than welcome. Your input and
              assistance would be greatly appreciated as we work together to
              enhance and expand this project further.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
