import { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <section className="contact-section">
        <h1>Entre em <span className="gold-text">Contato</span></h1>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Informações</h2>
            <p>
              <i className="fas fa-envelope"></i>
              <span>fernandezmvsf@gmail.com</span>
            </p>
            <p>
              <i className="fas fa-phone"></i>
              <span>(18) 99639-7127</span>
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              <span>UniSalesiano, Araçatuba - SP</span>
            </p>

            <div className="social-links">
              <a href="https://www.linkedin.com/" className="social-icon"><i className="fab fa-linkedin"></i></a>
              <a href="https://github.com/" className="social-icon"><i className="fab fa-github"></i></a>
              <a href="https://www.instagram.com/" className="social-icon"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="contact-form">
            <h2>Envie uma Mensagem</h2>
            {isSubmitted ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <p>Obrigado! Sua mensagem foi enviada com sucesso.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Enviar Mensagem</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
