/*
  FlowingMenu component with 4-column vertical layout and image hover effects
*/

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import StarBorder from "./StarBorder";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
  clickable?: boolean; // New prop to control clickability
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [], clickable = true }) => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 h-full gap-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} index={idx} clickable={clickable} />
        ))}
      </div>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps & { index: number; clickable: boolean }> = ({
  link,
  text,
  image,
  index,
  clickable = true
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);

  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0
    }
  };

  const containerTransition = {
    duration: 0.6,
    delay: index * 0.1,
    ease: [0.25, 0.46, 0.45, 0.94] as const
  };

  const imageVariants = {
    normal: {
      opacity: 1,
      scale: 1,
      filter: "brightness(0.8)"
    },
    hovered: {
      opacity: 0.3,
      scale: 1.05,
      filter: "brightness(0.4)"
    }
  };

  const textVariants = {
    normal: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    hovered: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const isActive = isHovered || isTouched;

  return (
    <motion.div
      className={`relative h-full min-h-[200px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-[450px] xl:min-h-[550px] overflow-hidden group ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={containerTransition}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
    >
      {clickable ? (
        <Link href={link} className="block w-full h-full relative">
          <MenuContent
            image={image}
            text={text}
            isActive={isActive}
            clickable={clickable}
          />
        </Link>
      ) : (
        <div className="block w-full h-full relative">
          <MenuContent
            image={image}
            text={text}
            isActive={isActive}
            clickable={clickable}
          />
        </div>
      )}
    </motion.div>
  );
};

// Extract the content into a separate component to avoid duplication
const MenuContent: React.FC<{
  image: string;
  text: string;
  isActive: boolean;
  clickable: boolean;
}> = ({ image, text, isActive, clickable }) => {
  const imageVariants = {
    normal: { scale: 1 },
    hovered: { scale: 1.1 }
  };

  const textVariants = {
    normal: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    hovered: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <>
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
        variants={imageVariants}
        animate={isActive ? "hovered" : "normal"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isActive ? 0.9 : 0.7 }}
        transition={{ duration: 0.4 }}
      />

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="text-center px-2 sm:px-4 md:px-6"
          variants={textVariants}
          animate={isActive ? "hovered" : "normal"}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h3
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-serif text-white font-bold drop-shadow-lg leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isActive ? 0.1 : 0 }}
          >
            {text}
          </motion.h3>

          {clickable && (
            <motion.div
              className="mt-3 sm:mt-4 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8
              }}
              transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
            >
              <StarBorder
                as="span"
                className="inline-block"
                color="#ffd700"
                speed="3s"
              >
                <span className="inline-flex items-center text-xs sm:text-sm font-bold">
                  Explore More
                  <svg
                    className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </StarBorder>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Subtle Border Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent"
        animate={{
          borderColor: isActive ? "rgba(188, 156, 34, 0.5)" : "transparent"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner Label (Always Visible) */}
      <motion.div
        className="absolute top-1 left-1 sm:top-2 sm:left-2 md:top-3 md:left-3 lg:top-4 lg:left-4 z-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30 drop-shadow-sm">
          {text}
        </span>
      </motion.div>
    </>
  );
};

export default FlowingMenu;
