
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";



const socials = [
  {Icon: FaLinkedinIn, label : "LinkedIn", href:"www.linkedin.com/in/sanjay-kumar-305a07387"},
  {Icon: FaGithub, label : "GitHub", href:"https://github.com/skstlenovo"},
  {Icon: SiLeetcode, label : "LeetCode", href:"https://leetcode.com/u/SanjayJavaDeveloper/"},
  {Icon: SiGeeksforgeeks, label : "GeeksForGeeks", href:"https://www.geeksforgeeks.org/user/sanjayjavadeveloper/"}
]

const glowVariants = {
  initial : {scale:1 , y:0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))"},
  hover : {
    scale : 1.2, y:-3,
    filter : "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
  },
  tap : {scale:0.95, y:0, transition: {duration : 0.08}}
}

const glows = [
    "top-1/2 -left-10 w-[80px] h-[80px] opacity-12 blur-[50px]",
    "bottom-0 right-10 w-[100px] h-[100px] opacity-12 blur-[100px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] opacity-12 blur-[50px] delay-500",
  ]

export default function Footer() {
  return (
    <footer className='relative overflow-hidden bg-black'>
    <div className="absolute inset-0 pointer-events-none">
        {glows.map((glow, index) => (
          <div key={index} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${glow}`}/>
        ))}
      </div>
    <motion.div className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
    initial={{opacity:0 , y:30}}
    whileInView={{opacity:1 , y:0}}
    transition={{duration:0.8}}>
      <h1 className="font-semibold leading-none text-white text-center select-none"
      style={{
        fontSize: "clamp(0.8rem, 3vw, 10rem)",
        letterSpacing: "0.02em",
        lineHeight: "0.9",
        padding:"0 3vm",
        whiteSpace:"nowrap",
        textShadow: "0 2px 18px rgba(0,0,0,0.45)"
      }}>Java Backend <span className="text-base text-cyan-400">by Sanjay Kumar</span></h1>
      
      <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400"/>
      <div className="flex gap-5 text-2xl md:text-3xl">
        {socials.map(({Icon, label, href}) => (
          <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="text-gray-300 transition-colors duration-200 inline-flex items-center justify-center">
            <Icon/>
          </motion.a>
        ))}
      </div>
      <div>
      <p className="text-gray-300 italic max-w-xl">
        "Well Done Is Better than Well Said"
      </p>
      <p className='text-sm text-white'>&copy; {new Date().getFullYear()} Sanjay Kumar, All rights reserved.</p>
      </div>
    </motion.div>
    </footer>
  )
}