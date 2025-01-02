import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import card1 from "../../assets/images/Card1.png";
import card2 from "../../assets/images/Card2.png";
import card3 from "../../assets/images/Card3.png";
import bg1 from "../../assets/images/bg5.jpg";
import bg2 from "../../assets/images/bg6.jpg";
import bg3 from "../../assets/images/bg7.jpg";

const gridContainerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const cardDivVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const SpecialOffers = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <>
      <h1 className="px-4 text-3xl font-bold">Special Offers</h1>
      <motion.section
        ref={ref}
        variants={gridContainerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 transition-all duration-500"
      >
        <motion.div
          variants={cardDivVariants}
          className="relative border-1 border-red-300"
        >
          <div
            className="absolute -z-10 w-56 h-full right-0 object-cover rounded-xl overflow-hidden"
          >
            <img src={bg1} alt="" className="w-full h-full rounded-xl" />
          </div>
          <img src={card1} alt="" className="h-full" />
        </motion.div>
        <motion.div
          variants={cardDivVariants}
          className="relative border-1 border-red-300"
        >
          <div
            className="absolute -z-10 w-60 h-full right-0 object-cover rounded-xl overflow-hidden"
          >
            <img src={bg2} alt="" className="w-full h-full rounded-xl" />
          </div>
          <img src={card2} alt="" className="h-full" />
        </motion.div>
        <motion.div
          variants={cardDivVariants}
          className="relative border-1 border-red-300"
        >
          <div
            className="absolute -z-10 w-56 h-full right-0 object-cover rounded-xl overflow-hidden"
          >
            <img src={bg3} alt="" className="w-full h-full rounded-xl" />
          </div>
          <img src={card3} alt="" className="h-full" />
        </motion.div>
      </motion.section>
    </>
  );
};

export default SpecialOffers;
