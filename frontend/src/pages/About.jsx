import '../styles/About.css';
import MarcosPhoto from '../assets/marcos.jpg';
import CiroPhoto from '../assets/ciro.jpg';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <div className="about-content">
          <h1>Quem <span className="gold-text">Somos</span></h1>

          <div className="team-members">
            <div className="member-card">
              <div className="member-image">
                <div className="gold-frame">
                  <img
                    src={MarcosPhoto}
                    alt="Marcos Fernandes"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                </div>
              </div>
              <div className="member-info">
                <h2>Marcos Fernandes</h2>
                <p className="ra">RA: 220477</p>
                <p className="course">Análise e Desenvolvimento de Sistemas - UniSalesiano</p>
                <div className="member-skills">
                  <h3>Experiência De Aprendizado</h3>
                  <ul className="skills-list">
                    <li>Desenvolvimento Front-end (React)</li>
                    <li>PHP Orientado a Objetos</li>
                    <li>PHP Intregado Com API De (Terceiros)</li>
                    <li>Banco de Dados MySQL</li>
                    <li>Java Script Com API</li>
                    <li>Design Gráfico</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="member-card">
              <div className="member-image">
                <div className="gold-frame">
                  <img
                    src={CiroPhoto}
                    alt="Ciro Ramos"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                </div>
              </div>
              <div className="member-info">
                <h2>Ciro Ramos</h2>
                <p className="ra">RA: 220306</p>
                <p className="course">Análise e Desenvolvimento de Sistemas - UniSalesiano</p>
                <div className="member-skills">
                  <h3>Experiência De Aprendizado</h3>
                  <ul className="skills-list">
                    <li>Desenvolvimento Front-end (React)</li>
                    <li>PHP Orientado a Objetos</li>
                    <li>PHP Intregado Com API De (Terceiros)</li>
                    <li>Banco de Dados MySQL</li>
                    <li>Java Script Com API</li>
                    <li>Design Gráfico</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="team-description">
            <h2>Nossa Jornada Acadêmica</h2>
            <p>
              Como dupla no curso de Análise e Desenvolvimento de Sistemas na UniSalesiano,
              combinamos nossas habilidades complementares para desenvolver soluções
              tecnológicas inovadoras. Durante nossa trajetória, trabalhamos em diversos
              projetos integrados que nos permitiram consolidar o conhecimento teórico
              na prática.
            </p>
            <h3>Trabalho em Conjunto</h3>
            <ul className="team-skills">
              <li>Comunicação eficiente e divisão de tarefas</li>
              <li>Desenvolvimento ágil de projetos</li>
              <li>Resolução conjunta de problemas complexos</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
