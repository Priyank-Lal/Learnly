import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Hero = React.memo(() => {
  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-6">
      <svg
        aria-hidden="true"
        className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 opacity-30 w-[120vw] h-[60vw] pointer-events-none"
        viewBox="0 0 1440 600"
        fill="none"
      >
        <path
          fill="url(#hero-gradient)"
          d="M0,160 C480,320 960,0 1440,160 L1440,600 L0,600 Z"
        />
        <defs>
          <linearGradient
            id="hero-gradient"
            x1="0"
            y1="0"
            x2="1440"
            y2="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#a21caf" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={childVariants}
          className="text-[28px] xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight"
        >
          Learnly – Unlock Your Potential with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            AI
          </span>
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="text-base xs:text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Learnly uses AI to turn big goals into manageable steps, helping you
          make steady progress and achieve more.
        </motion.p>
        <motion.div
          variants={childVariants}
          className="flex xs:flex-row gap-4 justify-center items-center mb-8"
        >
          <Button
            size="lg"
            className="shine-btn text-base xs:text-lg px-8 py-3 shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 relative overflow-hidden"
            asChild
            aria-label="Get Started Free"
          >
            <Link to="/signup" className="relative z-10 flex items-center">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base xs:text-lg px-8 py-3 border-gray-300"
            asChild
            aria-label="Try Demo"
          >
            <Link to="/demo">Try Demo</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Hero;
