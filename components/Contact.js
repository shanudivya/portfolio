import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import secrets from "../secrets";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isSending, setIsSending] = useState(false); // new state for tracking if email is being sent
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    // Get stored user data from localStorage
    const userData = JSON.parse(localStorage.getItem(formData.email)) || {
      count: 0,
      lastSubmit: null,
    };

    setSubmissionCount(userData.count);

    if (userData.lastSubmit) {
      const timeElapsed = Date.now() - userData.lastSubmit;
      const minute = 60 * 1000; // 1 minute in milliseconds

      // If less than 1 minute has passed, disable the submit button and show countdown
      if (timeElapsed < minute) {
        const remainingTime = Math.ceil((minute - timeElapsed) / 1000);
        setIsSubmitDisabled(true);
        setStatus(`You can try again after ${remainingTime} seconds.`);
      } else {
        setIsSubmitDisabled(false);
        setStatus(""); // Reset status if enough time has passed
      }
    }
  }, [formData.email]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If already sending, don't submit again
    if (isSending) return;

    setIsSending(true); // Mark as sending

    // Validate email format
    if (!isValidEmail(formData.email)) {
      setStatus("Please enter a valid email address.");
      setIsSending(false); // Allow re-submission after validation error
      return;
    }

    // Check if user has exceeded the limit of 3 submissions
    if (submissionCount >= 3) {
      setStatus("You have exceeded the maximum number of submissions (3).");
      setIsSending(false); // Allow re-submission after exceeding limit
      return;
    }

    // Send form data via emailjs
    emailjs
      .sendForm(
        secrets.serviceID, // Replace with your service ID
        secrets.templateID, // Replace with your template ID
        e.target, // The form element
        secrets.emailjsPublicKey // Replace with your public key
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", title: "", message: "" });

          // Update submission count and timestamp
          const userData = {
            count: submissionCount + 1,
            lastSubmit: Date.now(),
          };
          localStorage.setItem(formData.email, JSON.stringify(userData));

          setSubmissionCount(submissionCount + 1);
          setIsSubmitDisabled(true); // Disable submit button

          // Disable the submit button for 1 minute after submission
          setTimeout(() => {
            setIsSubmitDisabled(false);
            setStatus(""); // Reset status
          }, 60000); // Re-enable submit after 1 minute
        },
        (error) => {
          setStatus(
            "There was an error sending your message. Please try again."
          );
        }
      )
      .finally(() => {
        setIsSending(false); // Reset the sending flag when the email is sent or an error occurs
      });
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact Me</h2>
      <p>Let's collaborate on your next project!</p>
      <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
        <input type="hidden" name="time" value={new Date().toLocaleString()} />
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Subject</label>
        <input
          type="text"
          name="title"
          placeholder="Subject"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Message</label>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
        ></textarea>
        <button type="submit" disabled={isSubmitDisabled || isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
}

export default Contact;
