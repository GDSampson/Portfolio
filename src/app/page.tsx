"use client";

import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      //setup emailjs
      const result = await emailjs.sendForm(
        'service_71pua2f', 
        'template_f2dxq0s',
        e.target,
        'hPHzICc0AW7UtydWk'
      );
      
      setSubmitStatus('success');
      e.target.reset();
      setTimeout(() => {
        setShowModal(false);
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="max-w-4xl text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">
          Hi, I'm <span className="text-emerald-400">Daniel</span>!
        </h1>
        <p className="text-2xl md:text-4xl lg:text-5xl font-light mb-12">
          A full stack web developer.
        </p>
        <button 
          onClick={() => setShowModal(true)}
          className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-full text-lg hover:bg-emerald-400 hover:text-black transition-all duration-300"
        >
          Contact Me
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] text-white rounded-lg p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-light mb-4 text-emerald-400">Get in Touch</h2>
            
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <p className="text-lg mb-2">Thank you for your message!</p>
                <p>I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    // rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-medium py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {submitStatus === 'error' && (
                  <p className="mt-3 text-red-400 text-sm">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}