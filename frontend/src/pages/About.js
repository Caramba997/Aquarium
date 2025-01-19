import './About.css';
import { VERSION } from '../version.js';
import { ReactComponent as ReactLogo } from '../logos/react.svg';
import { ReactComponent as NodeJSLogo } from '../logos/nodejs.svg';
import { ReactComponent as ExpressLogo } from '../logos/express.svg';
import { ReactComponent as MongoDBLogo } from '../logos/mongodb.svg';
import { ReactComponent as AWSLogo } from '../logos/aws.svg';

function About() {

  return (
    <div className="About">
      <div className="About__Section">
        <div className="About__T">Für T ❤</div>
      </div>
      <div className="About__Section">
        <h2>Projekt</h2>
        <div>
          Buildnummer: <span className="About__Value">{VERSION.build}</span>
        </div>
        <div>
          Builddatum: <span className="About__Value">{new Date(VERSION.date).toLocaleString()}</span>
        </div>
        <div>
          Zeitraum: <span className="About__Value">2024 - {new Date(VERSION.date).getFullYear()}</span>
        </div>
      </div>
      <div className="About__Section">
        <h2>Frontend</h2>
        <div>
          <span className="About__Value">v{VERSION.frontend}</span>
        </div>
        <div class="About__Logos">
          <ReactLogo className="About__Logo" />
        </div>
      </div>
      <div className="About__Section">
        <h2>Backend</h2>
        <div>
          <span className="About__Value">v{VERSION.backend}</span>
        </div>
        <div class="About__Logos">
          <NodeJSLogo className="About__Logo" />
          <ExpressLogo className="About__Logo" />
          <MongoDBLogo className="About__Logo" />
          <AWSLogo className="About__Logo" />
        </div>
      </div>
    </div>
  );
}

export default About;
