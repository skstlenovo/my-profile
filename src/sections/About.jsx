import { motion } from "framer-motion";
import Photo from "../assets/Sanjay_PP.jpg";

export default function About() {
  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-20 blur-[100px] delay-500",
  ]
  return (
    <section id = "about" 
      className = "min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((glow, index) => (
          <div key={index} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${glow}`}/>
        ))}
      </div>
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
        initial={{opacity:0 , y:24}}
        whileInView={{opacity:1 , y:0}}
        transition={{duration:0.6}}
        viewport={{once:true, amount:0.4}}>
          <motion.div className="relative w-[160px] h-[160px]">
            <img src={Photo} alt="Profile Photo" className="absolute inset-0"/>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}