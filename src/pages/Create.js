import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import Api from '../api.js';
import './Create.css';
import { ReactComponent as MaleIcon } from '../icons/male.svg';
import { ReactComponent as FemaleIcon } from '../icons/female.svg';

function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateSince, setDateSince] = useState(new Date().toISOString().split('T')[0]);
  const [species, setSpecies] = useState('');
  const [colors, setColors] = useState('');
  const [characteristics, setCharacteristics] = useState('');
  const [sex, setSex] = useState('male');
  const [allSpecies, setAllSpecies] = useState([]);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [image, setImage] = useState('');

  const api = new Api();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const speciesData = await api.getSpecies();
      setAllSpecies(speciesData.map(entry => entry.name));
    })();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateSinceChange = (e) => {
    setDateSince(e.target.value);
  };

  const handleSpeciesSelect = (e) => {
    setSpecies(e.target.getAttribute('data-value'));
  };

  const showSpeciesSelect = () => {
    setIsSelectVisible(true);
  }

  const hideSpeciesSelect = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSelectVisible(false);
    }
  }

  const handleColorsChange = (e) => {
    setColors(e.target.value);
  };

  const handleCharacteristicsChange = (e) => {
    setCharacteristics(e.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleize = function (string) {
    if (!string || !typeof string === 'string' || !string instanceof String) {
      console.warn('Could not handleize parameter', string);
      return '';
    }
    let result = string.toLowerCase();
    result = result.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss');
    result = result.replace(/^[^a-zA-Z0-9]|[^a-zA-Z0-9]$/g, '');
    result = result.replace(/[^a-zA-Z0-9]+/g, '-');
    return result;
};

  const save = async () => {
    const form = document.querySelector('.Create__Form');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    const fixedFormData = new FormData();
    formData.forEach((value, key) => {
      if (['colors', 'characteristics'].includes(key)) {
        if (value) fixedFormData.append(key, value.split(',').map(entry => entry.trim().toLowerCase()));
      } else if (key === 'image') {
        fixedFormData.append(key, value, `${handleize(formData.get('name'))}_${Date.now()}.${value.name.split('.').pop()}`);
      } else {
        fixedFormData.append(key, value);
      }
    });
    const response = await api.saveFish(fixedFormData);
    navigate(`/fish/${response._id}`);
  };

  const showImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.onerror = (err) => {
        console.error("Error reading file:", err);
        alert("An error occurred while reading the file.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="Create">
      <h1 className="PageTitle">Neuen Fisch anlegen</h1>
      <form className="Create__Form">
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="name">Name</label>
          <input className="Create__InputText" type="text" name="name" value={name} onChange={handleNameChange} required></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="species">Art</label>
          <div className="Create__SelectWrapper" onMouseDown={showSpeciesSelect} onBlur={hideSpeciesSelect} tabIndex="0">
            <input className="Create__InputText" type="text" name="species" value={species} onChange={handleSpeciesChange} required></input>
            <div className="Create__Select" data-select="species" aria-hidden={!isSelectVisible}>
              {allSpecies.map(entry => {
                if (!species || entry.toLowerCase().includes(species.toLowerCase())) return (<div className="Create__SelectOption" data-value={entry} onClick={handleSpeciesSelect} key={entry}>{entry}</div>);
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="sex">Geschlecht</label>
          <div className="Create__RadioGroup">
            <label className={`Create__RadioButton ${sex === 'male' ? 'selected' : ''}`}>
              <input className="Create__InputRadio" type="radio" name="sex" value="male" checked={sex === 'male'} onChange={handleSexChange} required></input>
              <MaleIcon className="Create__Icon" />
              Männlich
            </label>
            <label className={`Create__RadioButton ${sex === 'female' ? 'selected' : ''}`}>
              <input className="Create__InputRadio" type="radio" name="sex" value="female" checked={sex === 'female'} onChange={handleSexChange} required></input>
              <FemaleIcon className="Create__Icon" />
              Weiblich
            </label>
          </div>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="date_since">Im Aquarium seit</label>
          <input className="Create__InputDate" type="date" name="date_since" value={dateSince} onChange={handleDateSinceChange} required></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="colors">Farben</label>
          <input className="Create__InputDate" type="string" name="colors" value={colors} onChange={handleColorsChange} required></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="colors">Eigenschaften (optional)</label>
          <input className="Create__InputDate" type="string" name="characteristics" value={characteristics} onChange={handleCharacteristicsChange}></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="description">Beschreibung (optional)</label>
          <input className="Create__InputText" type="text" name="description" value={description} onChange={handleDescriptionChange}></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="image">Bild (optional)</label>
          <div>
            <label className="Create__FileInputLabel">
              Bild auswählen
              <input name="image" type="file" onChange={showImage} accept="image/*" />
            </label>
            { image ? (<img className="Create__Image" src={ image } alt="Bild des Tieres" />) : null }
          </div>
        </div>
      </form>
      <div className="Create__ButtonRow">
        <button type="button" className="Create__Button" onClick={save}>Speichern</button>
      </div>
    </div>
  );
}

export default Home;
