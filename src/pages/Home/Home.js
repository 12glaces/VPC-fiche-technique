import React from "react";
import { motion } from "framer-motion";
import "./Home.styles.scss";


const Home = () => {
  return (
    <div className="pages-home">
      <motion.div
        className="intro"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <div>
          Test
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
