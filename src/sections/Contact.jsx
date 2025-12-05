import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState } from "react";
import img5 from "../assets/img5.png";
import ParticlesBackground from "../components/ParticlesBackground";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;


export default function Contact(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    title: "",
  });
  const [errors , setErrors] = useState({});
  const [status , setStatus] = useState("");

  const handleChange = (e) => {
    const {name , value} = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
    if(errors[name]) setErrors((p) => ({
        ...p,
        [name]: "",
      }));
  }

  const validateForm = () => {
    const required = ["name" , "email" , "subject" , "message"];
    const errors = {};
    required.forEach((f) => {
      !formData[f].trim() && (errors[f] = `Fill this field.`);
    })
    setErrors(errors);
    return !Object.keys(errors).length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    setStatus("Sending");
    formData.title = formData.name;

    try{

      await emailjs.send(
        SERVICE_ID ,
        TEMPLATE_ID ,
        {...formData,
          from_name: formData.name,
          reply_to: formData.email
        },
        PUBLIC_KEY
      );
      setStatus("Success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }catch(error){
      console.error("EmailJS Error:" , error);
      setStatus("Error");
    }
  }
  return(
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      <ParticlesBackground/>
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div className="w-full md:w-1/2 flex justify-center"
        initial={{opacity:0 , x:-50}}
        whileInView={{opacity:1 , x:0}}
        transition={{duration:0.6}}
        >
        <motion.img src={img5} alt="image5"
        className="w-72 md:w-105 rounded-2xl shadow-lg object-cover"
        animate={{y: [0, -10, 0]}}
        transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}/>
        </motion.div>
        <motion.div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
        initial={{opacity:0 , x:50}}
        whileInView={{opacity:1 , x:0}}
        transition={{duration:0.6}}>
          <h2 className="text-3xl font-bold mb-6">
            Let's Connect
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <lable className="mb-1">Your Name<span className="text-red-500">*</span></lable>
              <input type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className="flex flex-col">
              <lable className="mb-1">Your Email<span className="text-red-500">*</span></lable>
              <input type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <lable className="mb-1">Subject<span className="text-red-500">*</span></lable>
              <input type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${errors.subject ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
              {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
            </div>
            <div className="flex flex-col">
              <lable className="mb-1">Message<span className="text-red-500">*</span></lable>
              <textarea
              name="message"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${errors.message ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
              {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
            </div>
            {status && (
              <p className={`text-sm ${status === "Success" ? "text-green-400" : status === "Error" ? "text-red-400" :"text-yellow-400"}`}>
              {status === "Sending" ? "Sending..." : status === "Success" ? "Message sent successfully ✅" : "Somthing went wrong ❌"}</p>
            )}
            <motion.button className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            disabled={status === "Sending"}
            type="submit">
              {status === "Sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
        
      </div>
    </section>
  )
}