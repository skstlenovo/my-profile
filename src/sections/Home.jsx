import ParticlesBackground from "../components/ParticlesBackground";

export default function Home(){
  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden">
      <ParticlesBackground />
      <div className="absolut inset-0">
        <div className="absolut -top-32 -left-32
        w-[70vm] sm:w-[z-500vm] md:w-[40vm]
        h-[70vm] sm:h-[50vm] md: h-[40vm]
        max-w-[500px] max-h-[500px]
        rounded-full
        bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-30 sm: opacity-20 md: opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse"></div>
        <div> </div>
      </div>
    </section>
  )
}