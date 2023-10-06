import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { BladeCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { StarsCanvas} from "./canvas";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const contentStyle = { background: '#fff0', borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', borderWidth: '2px'};
const overlayStyle = { background: 'rgba(0,0,0,0.4)' };

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const [sendSuccess, setSendSuccess] = useState(false);

  

  const isFormValid = () => {
    if (form.name.trim() === "" || form.email.trim() === "" || form.message.trim() === "") {
      return false;
    }

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(form.email.trim())) {
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [thankYouMessage, setThankYouMessage] = useState("Thank you for your message. I will get back to you within a few minutes.");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.init("mQV6y7wKOkRNbfR--")
    
    emailjs
      .send(
        "service_zg7ziui",
        "template_7ipq5ak",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Mohammed Qamar",
          to_email: "qamar@moqam.ca",
        },
      )
      .then(
        () => {
          setLoading(false);
          setSendSuccess(true);
          setPopupVisible(true);
          const submittedName = form.name;
          console.log(submittedName);

          setForm({
            name: "",
            email: "",
            message: "",
          });
          
          // Update the paragraph content with the submitted name
          setThankYouMessage(`Thank you for your message ${submittedName}. I will get back to you within a few minutes.`);
        },
        (error) => {
          setLoading(false);
          setSendSuccess(false);
          console.log(error);
          setPopupVisible(true);
        }
      );
  };

  const SendButton = () => (
    <Popup 
      trigger={
        <button
          type="submit"
          className={`bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary ${
            isFormValid() ? "opacity-90 hover:opacity-100 transition-opacity" : "opacity-50"
          }`}
          hover="green"
          disabled={!isFormValid() || loading}
          >
          {loading ? "Sending..." : "Send"}
        </button>

      } modal>

      <span> 
        Please fill out all fields and enter a valid email address.
      </span>

    </Popup>
  );

  const CloseButton = () => (
    <button 
      type="submit"
      onClick={() => setPopupVisible(false)}
      className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary opacity-90 hover:opacity-100 transition-opacity">
      Close
    </button>
  );

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <StarsCanvas />
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <SendButton />
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <BladeCanvas />
      </motion.div>
  
        <Popup
          open={popupVisible}
          modal
          closeOnDocumentClick
          onClose={() => setPopupVisible(false)}
          contentStyle = {contentStyle}
          overlayStyle = {overlayStyle}
        >
          <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl text-center shadow-2xl text-white font-medium animate-anvil">
            {sendSuccess ? (
              <div>
                <p id="thankYouMessage">{thankYouMessage}</p>
                <br/>
                <CloseButton />
              </div>
            ) : (
              <div>
                <p>Something went wrong. Please click
                  <a href="mailto:qamar@moqam.ca" className="pl-1 blue-text-gradient opacity-90 hover:opacity-100 transition-opacity"> 
                    here
                  </a> if this issue persists. 
                  <br/>
                  <br/>
                  <CloseButton />
                </p>
              </div>
            )}
          </div>
        </Popup>

    </div>
  );
};

export default SectionWrapper(Contact, "contact");
