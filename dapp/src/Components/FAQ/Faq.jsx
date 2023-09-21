import styles from "./Faq.module.scss";
import Burger from "../Burger_menu/Burger";
export const Faq = () => {
  return (
    <>
      <div className={styles.back}>
        <Burger />
        <div className="w-full h-full flex justify-center">
          <div className={styles.newContract}>
            <h1 className="text-center pb-7 font-extrabold">FAQ</h1>
            <ul className={styles.faqList}>
              <li>
                <b>How this works?</b>
              </li>
              <p className="pl-7">
                A user has the ability to select an Arbiter, beneficiary, and
                specify a value in ETH. They can then create and deploy their
                own contract, which serves as an escrow for a particular
                transaction or deal. Here's how the process works:
              </p>
              <ul className="list-decimal list-inside pl-3">
                <li className="pl-7">
                  The user initiates the contract deployment.
                </li>

                <li className="pl-7">
                  The user funds the contract with a specific amount of ETH,
                  representing the price of the deal.
                </li>

                <li className="pl-7">
                  Once the work or transaction is completed, the approval of the
                  Arbiter is required to release the funds to the beneficiary.
                </li>
              </ul>
              <p className="pl-7">
                In summary, users can set up contracts, deposit ETH into them,
                and require Arbiter approval to finalize deals or transactions.{" "}
              </p>
              <hr className="border-black" />
              <li>
                <b>
                  How find previously deployed contract if localStorage is emty
                </b>
              </li>
              <p className="pl-7">
                All the information about previously deployed contracts is
                stored in localStorage of the browser
              </p>
              <p className="pl-7">
                If you happen to lose data stored in your localStorage, you can
                typically retrieve information about previously deployed
                contracts and their transactions by using a blockchain explorer.
                Blockchain explorers are web applications that allow users to
                search and view data on various blockchain networks.
              </p>
              <hr className="border-black" />
              <li>
                <b>What about security</b>
              </li>
              <p className="pl-7">
                This service is intended for smaller-scale use, but you're
                welcome to test it with your daily goals. The key feature of the
                contract is that it won't transfer its balance to the
                beneficiary until it has been approved by the arbiter. This
                mechanism ensures that the funds are securely held in escrow
                until all parties involved in the deal are satisfied with the
                terms and conditions being met. It adds an extra layer of trust
                and security to the transaction process.{" "}
              </p>
              <hr className="border-black" />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
