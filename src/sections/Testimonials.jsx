import { motion } from 'framer-motion';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';


const testimonials =[
  {
    name: "Prasun Bhowmick",
    role: "EMF Lead Engineer",
    review:"Working with Sanjay has been an excellent experience. He brings strong problem-solving skills, a deep understanding of Java and Spring Boot, and a disciplined approach toward architecture and best practices. His commitment to delivering robust systems stands out.",
    image: img1,
  },
  {
    name: "Bikash Kumar",
    role: "Deputy Manager",
    review:"Sanjay consistently delivers high-quality solutions with remarkable attention to detail. His ability to understand complex requirements, optimize performance, and maintain clean, scalable code makes him a valuable asset to any team.",
    image: img2,
  },
  {
    name: "Manohar Mandal",
    role: "Assistant Manager",
    review:"Sanjay is a dependable developer who takes ownership of his work and strives for excellence. He is quick in debugging, proactive in identifying improvements, and always ensures that the final product is efficient, secure, and maintainable.",
    image: img3,
  },
  {
    name: "Sarita Kumari",
    role: "Teacher",
    review:"Sanjay blends technical expertise with a collaborative attitude. He communicates clearly, meets deadlines consistently, and contributes solutions that enhance overall project quality.",    image: img4,
  }
]

export default function Testimonials() {
  return(
    <section id="Testimonials" className='relative min-h-screen bg-black text-white flex flex-col items-center justify-between px-6 py-20'>
    <motion.h2 className="text-2xl font-bold mb-16"
    initial={{opacity:0 , y:-50}}
    animate={{opacity:1 , y:0}}
    transition={{duration:0.6}}>
      What People Say
    </motion.h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full'>
      {testimonials.map((t, index) => (
        <motion.div
        key={t.name+1}
        initial={{opacity:0, y:50}}
        whileInView={{opacity:1, y:0}}
        transition={{duration:0.5, delay:index*0.2}}
        viewport={{once:true}}
        className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1'>
          <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
            loading='lazy'
          />
          <p className='text-gray-200 text-xs italic mb-4'>
            {t.review}
          </p>
          <h3 className='text-sm font-semibold'>
            {t.name}
          </h3>
          <p className='text-xs text-gray-400'>
            {t.role}
          </p>
        </motion.div>
      ))}
    </div>


    </section>
  )
}