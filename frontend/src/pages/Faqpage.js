import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

const faqsData = [
  {
    question: "How can I contact SnapJourney?",
    answer:
      "You can contact us via the Contact page by sending us a message through the form or email us directly at support@snapjourney.com.",
  },
  {
    question: "What kind of journeys does SnapJourney cover?",
    answer:
      "SnapJourney covers all kinds of travel experiences including road trips, adventure tours, cultural visits, and more.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Absolutely! We value your privacy and never share your personal data with third parties.",
  },
  {
    question: "Can I contribute my travel stories?",
    answer:
      "Yes! We welcome guest contributions. Please reach out via our Contact page to learn how to submit your story.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div
    className="border-b border-gray-300 dark:border-gray-700 py-4 cursor-pointer"
    onClick={onClick}
  >
    <motion.h3
      layout
      className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex justify-between items-center"
    >
      {faq.question}
      <span className="text-xl font-bold">{isOpen ? "−" : "+"}</span>
    </motion.h3>

    <AnimatePresence>
      {isOpen && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-gray-700 dark:text-gray-300"
        >
          {faq.answer}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const FaqsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1651046894888-f886e9258b6f?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Journey Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 min-h-screen py-16 px-4 flex flex-col"
      >
        <Navbar />

        <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8"
          >
            Frequently Asked Questions
          </motion.h1>

          {faqsData.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FaqsPage;
