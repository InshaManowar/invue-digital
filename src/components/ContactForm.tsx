import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  variant?: 'default' | 'dark';
}

export function ContactForm({ variant = 'default' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear any previous error when user starts typing
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        'service_7atc8wt', // Your EmailJS service ID
        'template_cjq3fah', // Your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
        }
      );

      if (result.status === 200) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('EmailJS error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={variant === 'dark' ? 'max-w-xl mx-auto' : 'max-w-2xl mx-auto'}>
      {/* Header - Only show for default variant */}
      {variant === 'default' && (
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-dash-black dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-dash">
            Send us a message and we'll get back to you soon.
          </p>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className={`mb-6 p-4 rounded-xl backdrop-blur-sm ${
          variant === 'dark' 
            ? 'bg-green-900/20 border border-green-500/30 text-green-400'
            : 'bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-500'
        }`}>
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
              variant === 'dark' ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            Message sent successfully! I'll get back to you soon.
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className={`mb-6 p-4 rounded-xl backdrop-blur-sm ${
          variant === 'dark' 
            ? 'bg-red-900/20 border border-red-500/30 text-red-400'
            : 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-500'
        }`}>
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
              variant === 'dark' ? 'bg-red-500' : 'bg-red-500'
            }`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            {error}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className={`${
        variant === 'dark'
          ? 'bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-700/50 relative overflow-hidden'
          : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-white/20 dark:border-gray-700'
      }`}>
        {/* Decorative elements - Only for dark variant */}
        {variant === 'dark' && (
          <>
            <div className="absolute top-0 right-0 w-32 h-32 bg-dash-purple/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dash-purple to-purple-400"></div>
          </>
        )}
        <div className="mb-6">
          <label htmlFor="name" className={`block text-sm font-medium mb-3 font-dash ${
            variant === 'dark' 
              ? 'text-gray-300 flex items-center' 
              : 'text-dash-black dark:text-gray-300'
          }`}>
            {variant === 'dark' && <div className="w-2 h-2 bg-dash-purple rounded-full mr-2"></div>}
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg font-dash transition-all duration-300 ${
              variant === 'dark'
                ? 'border-gray-600/50 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 focus:ring-2 focus:ring-dash-purple focus:border-dash-purple backdrop-blur-sm'
                : 'border-dash-beige-dark dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80 text-dash-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:border-yellow-400 dark:focus:border-yellow-500'
            }`}
            placeholder="Your name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className={`block text-sm font-medium mb-3 font-dash ${
            variant === 'dark' 
              ? 'text-gray-300 flex items-center' 
              : 'text-dash-black dark:text-gray-300'
          }`}>
            {variant === 'dark' && <div className="w-2 h-2 bg-dash-purple rounded-full mr-2"></div>}
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg font-dash transition-all duration-300 ${
              variant === 'dark'
                ? 'border-gray-600/50 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 focus:ring-2 focus:ring-dash-purple focus:border-dash-purple backdrop-blur-sm'
                : 'border-dash-beige-dark dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80 text-dash-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:border-yellow-400 dark:focus:border-yellow-500'
            }`}
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="message" className={`block text-sm font-medium mb-3 font-dash ${
            variant === 'dark' 
              ? 'text-gray-300 flex items-center' 
              : 'text-dash-black dark:text-gray-300'
          }`}>
            {variant === 'dark' && <div className="w-2 h-2 bg-dash-purple rounded-full mr-2"></div>}
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={variant === 'dark' ? 4 : 5}
            className={`w-full px-4 py-3 border rounded-lg font-dash transition-all duration-300 ${
              variant === 'dark'
                ? 'border-gray-600/50 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 focus:ring-2 focus:ring-dash-purple focus:border-dash-purple backdrop-blur-sm resize-none'
                : 'border-dash-beige-dark dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80 text-dash-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 focus:border-yellow-400 dark:focus:border-yellow-500'
            }`}
            placeholder={variant === 'dark' ? "Tell me about your project..." : "Your message..."}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-6 py-4 font-medium font-dash transition-all duration-300 ${
            variant === 'dark'
              ? 'bg-gradient-to-r from-dash-purple to-purple-600 hover:from-purple-600 hover:to-dash-purple disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-dash-purple/25 transform hover:scale-[1.02] disabled:transform-none'
              : 'bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 text-dash-black rounded-lg shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className={`w-4 h-4 border-2 rounded-full animate-spin mr-2 ${
                variant === 'dark' ? 'border-white/30 border-t-white' : 'border-black/30 border-t-black'
              }`}></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>

 
    </div>
  );
}