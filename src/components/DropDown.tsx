"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "antd";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Dropdown = ({ isOpen, route }: any) => {
  const menuAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dropdown-container">
      <div className="text-sm text-white ">
        <div
          onClick={toggleMenu}
          className={`flex items-center gap-3 py-4 px-3 hover:bg-amber-400/30  w-full hover:text-base duration-150`}
        >
          <AnimatePresence>
            {/* {isOpen && ( */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between w-full"
            >
              <Tooltip
                placement="right"
                title={route.name}
                className="flex items-center gap-3"
              >
                <div>{route.icon}</div>
                <div>{route.name}</div>
              </Tooltip>
              {isMenuOpen ? (
                <IoIosArrowUp className="" />
              ) : (
                <IoIosArrowDown className="" />
              )}
            </motion.div>
            {/* )} */}
          </AnimatePresence>
        </div>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            // initial={{ opacity: 0, y: -10 }}
            initial="hidden"
            // animate={{ opacity: 1, y: 0 }}
            animate="show"
            // exit={{ opacity: 0, y: -10 }}
            exit={"hidden"}
          >
            {route.subRoutes.map((subr: any) => (
              <div key={subr.id} className="pl-7">
                <NavLink
                  to={subr.path}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "rgb(251 191 36 / 0.3)" : "",
                    };
                  }}
                  className={`flex items-center gap-3 py-4 px-3 hover:bg-amber-400/30   w-full hover:text-base duration-150 `}
                >
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div

                      // className="flex items-center justify-between w-full"
                      >
                        <Tooltip
                          placement="right"
                          title={subr.name}
                          className="flex items-center gap-3"
                        >
                          <div>{subr.icon}</div>
                          {/* <div>{subr.link}</div> */}
                          <div>{subr.name}</div>
                        </Tooltip>
                        {/* <IoIosArrowDown className="" /> */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
