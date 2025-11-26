import { motion, useTransform } from "framer-motion";


const experience = [
  {
    role: "Developer",
    company: "NR Switch N Radio Services Ltd",
    duration: " May 2022 - December 2022",
    Experience: "6 Months",
    description: "I was responsible to develop new features and solve software bugs and maintain database on server using my Java skills.",
  },
  {
    role: "Software Developer",
    company: "ADILA IT Consultancy Pvt Ltd",
    duration: " Jan 2023 - December 2025",
    Experience: "3 Years",
    description: "Delivered and maintained Java-based applications using Spring Boot, SQL, and MongoDB, ensuring smooth performance through requirement handling, system upgrades, database management, and proactive bug resolution."
  }
]

function ExperienceItem({ exp , idx ,start ,end, scrollYProgress, layout})  {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1])
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [idx%2 === 0 ? 30 : -30, 0])
  const x = useTransform(scrollYProgress, [start, end], [-24, 0])

  if(layout === "desktop"){
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
      <motion.div className="z-10 w-7 h-7 rounded-full">

      </motion.div>

      </div>
    )
  }
}

export default function Experience() {
  return (
    <section id="experience" className="relative bg-black text-white">
    
    </section>
  )
}