import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate  } from "react-router-dom";
import useApi from '../api.js';
import Events from '../events.js';
import './Edit.css';
import './Create.css';
import { ReactComponent as MaleIcon } from '../icons/male.svg';
import { ReactComponent as FemaleIcon } from '../icons/female.svg';

function Edit() {
  const { id } = useParams();
  const [fish, setFish] = useState({
    name: '',
    species: '',
    description: '',
    colors: '',
    characteristics: '',
    image: '',
    date_since: '',
    date_death: '',
  });
  const [allSpecies, setAllSpecies] = useState([]);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [image, setImage] = useState('');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      Events.push('pageState', 'page:loading');
      let fishData = await api.getFish(id);
      if (fishData.colors) fishData.colors = fishData.colors.join(',');
      if (fishData.characteristics) fishData.characteristics = fishData.characteristics.join(',');
      fishData.date_since = fishData.date_since ? formatDate(fishData.date_since) : '';
      fishData.date_death = fishData.date_death ? formatDate(fishData.date_death) : '';
      fishData = { ...fish, ...fishData };
      setFish(fishData);
      const allFishData = await api.getFish();
      setAllSpecies([...new Set(allFishData.map(fish => fish.species))]);
      Events.push('pageState', 'page:ready');
    })();
  }, []);

  const handlePropertyChange = (e) => {
    if (['colors', 'characteristics'].includes(e.target.name)) {
      setFish({ ...fish, [e.target.name]: e.target.value.split(',').map(entry => entry.trim().toLowerCase()) });
    }
    else {
      setFish({ ...fish, [e.target.name]: e.target.value });
    }
  }

  const handleSpeciesSelect = (e) => {
    setFish({ ...fish, species: e.target.getAttribute('data-value') });
  };

  const showSpeciesSelect = () => {
    setIsSelectVisible(true);
  }

  const hideSpeciesSelect = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSelectVisible(false);
    }
  }

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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  
  const save = async () => {
    const form = document.querySelector('.Create__Form');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    const fixedFormData = new FormData();
    fixedFormData.append('id', id);
    formData.forEach((value, key) => {
      if (key === 'image') {
        if (!value.size) return;
        fixedFormData.append(key, value, `${handleize(formData.get('name'))}_${Date.now()}.${value.name.split('.').pop()}`);
      }
      else {
        fixedFormData.append(key, value);
      }
    });
    const response = await api.saveFish(fixedFormData);
    navigate(`/fish/${response._id}`);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
    Events.publish('overlay:hide');
  };

  const showDeleteDialog = () => {
    setDeleteDialogVisible(true);
    Events.publish('overlay:show');
  };

  const deleteFish = async () => {
    await api.deleteFish(id);
    hideDeleteDialog();
    navigate('/');
  };

  const deleteDialog = (
    <div className="Edit__Dialog" aria-hidden={deleteDialogVisible ? 'false' : 'true'}>
      <div>Wirklich löschen?</div>
      <div className="Create__ButtonRow Edit__ButtonRow--delete">
        <button type="button" className="Create__Button Edit__Button--delete" onClick={deleteFish}>Ja</button>
        <button type="button" className="Create__Button" onClick={hideDeleteDialog}>Nein</button>
      </div>
    </div>
  )

  return (
    <div className="Edit">
      <h1 className="PageTitle">{fish.name || 'Tier'} bearbeiten</h1>
      <form className="Create__Form">
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="name">Name</label>
          <input className="Create__InputText" type="text" name="name" value={fish.name} onChange={handlePropertyChange} required></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="species">Art</label>
          <div className="Create__SelectWrapper" onMouseDown={showSpeciesSelect} onBlur={hideSpeciesSelect} tabIndex="0">
            <input className="Create__InputText" type="text" name="species" value={fish.species} onChange={handlePropertyChange} required></input>
            <div className="Create__Select" data-select="species" aria-hidden={!isSelectVisible}>
              {allSpecies.map(entry => {
                if (!fish.species || entry.toLowerCase().includes(fish.species.toLowerCase())) return (<div className="Create__SelectOption" data-value={entry} onClick={handleSpeciesSelect} key={entry}>{entry}</div>);
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="sex">Geschlecht</label>
          <div className="Create__RadioGroup">
            <label className={`Create__RadioButton ${fish.sex === 'male' ? 'selected' : ''}`}>
              <input className="Create__InputRadio" type="radio" name="sex" value="male" checked={fish.sex === 'male'} onChange={handlePropertyChange} required></input>
              <MaleIcon className="Create__Icon" />
              Männlich
            </label>
            <label className={`Create__RadioButton ${fish.sex === 'female' ? 'selected' : ''}`}>
              <input className="Create__InputRadio" type="radio" name="sex" value="female" checked={fish.sex === 'female'} onChange={handlePropertyChange} required></input>
              <FemaleIcon className="Create__Icon" />
              Weiblich
            </label>
          </div>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="colors">Farben</label>
          <input className="Create__InputDate" type="string" name="colors" value={fish.colors} onChange={handlePropertyChange} required></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="date_since">Im Aquarium seit</label>
          <input className="Create__InputDate" type="date" name="date_since" value={fish.date_since} onChange={handlePropertyChange} required></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="date_death">Gestorben am</label>
          <input className="Create__InputDate" type="date" name="date_death" value={fish.date_death} onChange={handlePropertyChange}></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="colors">Eigenschaften (optional)</label>
          <input className="Create__InputDate" type="string" name="characteristics" value={fish.characteristics} onChange={handlePropertyChange}></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="description">Beschreibung (optional)</label>
          <input className="Create__InputText" type="text" name="description" value={fish.description} onChange={handlePropertyChange}></input>
        </div>
        <div className="Create__InputRow">
          <label className="Create__InputLabel" htmlFor="image">Bild (optional)</label>
          <div>
            <label className="Create__FileInputLabel">
              Bild auswählen
              <input name="image" type="file" onChange={showImage} accept="image/*" />
            </label>
            { image ? (<img className="Create__Image" src={image} alt="Bild des Tieres" />) : fish.image ? (<img className="Create__Image" src={ `${process.env.REACT_APP_CLOUDFRONT_URL}/${fish.image.name}` } alt="Bild des Tieres" />) : null }
          </div>
        </div>
      </form>
      <div className="Create__ButtonRow">
        <button type="button" className="Create__Button" onClick={save}>Speichern</button>
      </div>
      <div className="Create__ButtonRow Edit__ButtonRow--delete">
        <button type="button" className="Create__Button Edit__Button--delete" onClick={showDeleteDialog}>Löschen</button>
      </div>
      { deleteDialog }
    </div>
  );
}

export default Edit;
