import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import background from "../../assets/images/b7.jpg";
import foreground from "../../assets/images/foreground.png";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const [showText, setShowText] = useState(false);

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 1.8]
  );

  const foregroundScale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 2.2]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      if (value >= 0.45 && !showText) {
        setShowText(true);
      } else if (value < 0.45 && showText) {
        setShowText(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, showText]);

  return (
    <div className="relative h-[200vh] ">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: backgroundScale }}
        >
          <img
            src={background}
            alt="Background"
            className="object-cover w-full h-full origin-center"
          />
          <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full md:h-full h-[92vh]"
          style={{ scale: foregroundScale }}
        >
          <img
            src={foreground}
            alt="Foreground"
            className="object-cover w-full h-full origin-center"
          />
        </motion.div>

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          {!showText ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
              >
                Welcome to Happy Hurry
              </motion.h1>
              <motion.p 
                className='text-white'
              >
                tour and travel
              </motion.p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
              >
                Journey Begins
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto drop-shadow-lg"
              >
                Explore the extraordinary
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 backdrop-blur-sm text-blue-900 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-white transition-colors shadow-lg"
              >
                Begin Adventure
              </motion.button>
            </div>
          )}
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          animate={{ 
            opacity: showText ? 0 : 1,
            y: showText ? 10 : [0, 10, 0] 
          }}
          transition={{ 
            duration: showText ? 0.3 : 1.5,
            repeat: showText ? 0 : Infinity 
          }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/80 drop-shadow-lg" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;