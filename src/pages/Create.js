import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import Api from '../api';
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
  const [sex, setSex] = useState('');
  const [allSpecies, setAllSpecies] = useState([]);
  const [isSelectVisible, setIsSelectVisible] = useState(false);

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

  const save = async (e) => {
    const form = e.target.closest('form');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    const fish = {};
    formData.forEach((value, key) => {
      if (['colors', 'characteristics'].includes(key)) {
        if (value) fish[key] = value.split(',').map(entry => entry.trim().toLowerCase());
      } else if (key === 'date_since') {
        fish[key] = new Date(value);
      } else {
        fish[key] = value;
      }
    });
    console.log(fish);
    const response = await api.saveFish(fish);
    console.log(response);
    navigate(`/fish/${response._id}`);
  };

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
        <div className="Create__ButtonRow">
          <button type="button" className="Create__Button" onClick={save}>Speichern</button>
        </div>
      </form>
    </div>
  );
}

export default Home;
