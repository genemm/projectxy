import React, { useEffect, useContext } from "react";

import ChooseUsername from "../components/ChooseUsername";

import styles from "./HomeScreen.module.css";

const UsernameScreen = () => {



  return (
    <div className={styles.container}>
      <ChooseUsername />
    </div>
  );
};

export default UsernameScreen;
