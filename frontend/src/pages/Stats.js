import { useState, useEffect } from 'react';
import Api from '../api.js';
import { useNavigate  } from "react-router-dom";
import './Stats.css';

function Stats() {
  const [fish, setFish] = useState({});
  const [countResults, setCountResults] = useState([]);
  const [countGroup, setCountGroup] = useState('alive');

  const onlyAliveGroups = ['species', 'sex', 'colors', 'characteristics'];

  const api = new Api();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const fishData = await api.getFish();
      setFish(fishData);
      calcCountResults('alive', fishData);
    })();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const handleCountGroupChange = (e) => {
    setCountGroup(e.target.value);
    calcCountResults(e.target.value);
  };

  const calcCountResults = (group, allFish) => {
    allFish = allFish || fish;
    if (onlyAliveGroups.includes(group)) allFish = allFish.filter(f => !f.date_death);
    let results = [];
    if (group === 'alive') {
      const aliveFish = allFish.filter(f => !f.date_death);
      const deadFish = allFish.filter(f => f.date_death);
      results = [
        { name: 'Aktueller Bestand', value: aliveFish.length },
        { name: 'Gestorben', value: deadFish.length }
      ];
    }
    else if (['colors', 'characteristics'].includes(group)) {
      const groups = {};
      allFish.forEach(f => {
        if (f[group]) {
          f[group].forEach(g => {
            if (!groups[g]) {
              groups[g] = 0;
            }
            groups[g]++;
          });
        }
      });
      results = Object.keys(groups).map(key => {
        return { name: key, value: groups[key] };
      });
    }
    else {
      const groups = {};
      allFish.forEach(f => {
        if (f[group]) {
          if (!groups[f[group]]) {
            groups[f[group]] = 0;
          }
          groups[f[group]]++;
        }
      });
      const translateKey = (key) => {
        if (group.includes('date')) {
          return formatDate(key);
        }
        else if (key === 'male') {
          return 'Männlich';
        }
        else if (key === 'female') {
          return 'Weiblich';
        }
        else return key;
      };
      results = Object.keys(groups).map(key => {
        return { name: translateKey(key), value: groups[key] };
      });
    }
    setCountResults(results.sort((a, b) => b.value - a.value));
  };

  return (
    <div className="Stats">
      <div className="Stats__Block">
        <div className="Stats__BlockHeader">
            <h2 className="Stats__BlockTitle">Anzahl Tiere{ onlyAliveGroups.includes(countGroup) && <span className="Stats__BlockSubTitle">(Aktueller Bestand)</span> }</h2>
            
          <div className="Stats__BlockHeaderRow">
            <label className="Stats__Label">Gruppieren nach: </label>
            <select className="Stats__Select" name="count_group" value={countGroup} onChange={handleCountGroupChange}>
              <option value="species">Art</option>
              <option value="sex">Geschlecht</option>
              <option value="alive">Zustand</option>
              <option value="date_since">Seit</option>
              <option value="date_death">Todestag</option>
              <option value="colors">Farben</option>
              <option value="characteristics">Eigenschaften</option>
            </select>
          </div>
        </div>
        <div className="Stats__BlockContent">
          {
            countResults.map(result => {
              return (
                <div className="Stats__ResultRow" key={result.name + result.value}>
                  <div className="Stats__ResultName">{result.name}</div>
                  <div className="Stats__ResultValue">{result.value}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Stats;
