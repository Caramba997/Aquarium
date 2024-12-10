import { useState, useEffect } from 'react';
import Api from '../api.js';
import Events from '../events.js';
import './FishGrid.css';
import FishCard from './FishCard.js';

function FishGrid() {
  const [fish, setFish] = useState([]);
  const [allSpecies, setAllSpecies] = useState([]);
  const [sort, setSort] = useState('alphabetical');
  const [sortTitle, setSortTitle] = useState('A-Z');
  const [sortingVisible, setSortingVisible] = useState(false);
  const [filterSpecies, setFilterSpecies] = useState('none');
  const [filterSpeciesTitle, setFilterSpeciesTitle] = useState('Kein Filter');
  const [filterAlive, setFilterAlive] = useState('alive');
  const [filterAliveTitle, setFilterAliveTitle] = useState('Aktueller Bestand');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const api = new Api();

  useEffect(() => {
    (async () => {
      const fishData = await api.getFish();
      setFish(fishData);
      const speciesData = await api.getSpecies();
      setAllSpecies(speciesData.map(entry => entry.name));
    })();
    
    Events.subscribe('overlay:clicked', () => {
      setSortingVisible(false);
      setFiltersVisible(false);
    });
  }, []);

  const toggleSorting = () => {
    Events.publish(sortingVisible ? 'overlay:hide' : 'overlay:show');
    setSortingVisible(!sortingVisible);
  };

  const handleSortingChange = (e) => {
    setSort(e.target.value);
    setSortTitle(e.target.dataset.title);
    Events.publish('overlay:hide');
    setSortingVisible(false);
  };

  const toggleFilters = () => {
    Events.publish(filtersVisible ? 'overlay:hide' : 'overlay:show');
    setFiltersVisible(!filtersVisible);
  };

  const handleFilterChange = (e) => {
    if (e.target.name === 'filter_species') {
      setFilterSpecies(e.target.value);
      setFilterSpeciesTitle(e.target.dataset.title);
    }
    else if (e.target.name === 'filter_alive') {
      setFilterAlive(e.target.value);
      setFilterAliveTitle(e.target.dataset.title);
    }
    Events.publish('overlay:hide');
    setFiltersVisible(false);
  };

  const concatFilterTitles = () => {
    if (filterSpecies === 'none' && filterAlive === 'none') return filterSpeciesTitle;
    if (filterSpecies === 'none') return filterAliveTitle;
    if (filterAlive === 'none') return filterSpeciesTitle;
    return `${filterSpeciesTitle}, ${filterAliveTitle}`;
  }

  const filterAndSortFish = (allFish) => {
    let results = allFish;
    if (filterSpecies !== 'none') {
      results = results.filter(item => item.species === filterSpecies);
    }
    if (filterAlive !== 'none') {
      results = results.filter(item => filterAlive === 'dead' ? item.date_death : !item.date_death);
    }
    if (sort === 'alphabetical') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'since_up') {
      results.sort((a, b) => a.date_since === b.date_since ? a.name.localeCompare(b.name) : new Date(a.date_since).getTime() - new Date(b.date_since).getTime());
    } else if (sort === 'since_down') {
      results.sort((a, b) => a.date_since === b.date_since ? a.name.localeCompare(b.name) : new Date(b.date_since).getTime() - new Date(a.date_since).getTime());
    } else if (sort === 'species') {
      results.sort((a, b) => a.species === b.species ? a.name.localeCompare(b.name) : a.species.localeCompare(b.species));
    }
    return results;
  };

  return (
    <div className="FishGrid">
      <div className="FishGrid__Toolbar">
        <div className="FishGrid__ToolbarItem FishGrid__ToolbarItem--left">
          <button className="FishGrid__ToolbarButton" onClick={toggleFilters}>
            <div>Filter</div>
            <div className="FishGrid__ToolbarButtonSub">{concatFilterTitles()}</div>
          </button>
          <div className="FishGrid__ToolbarDropdown" aria-hidden={filtersVisible ? 'false' : 'true'}>
            <div className="FishGrid__ToolbarDropdownContent">
              <div>
                Art
              </div>
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="filter_species" value="none" checked={filterSpecies === 'none'} data-title="Kein Filter" onChange={handleFilterChange} />
                Kein Filter
              </label>
              {allSpecies.map(species => (
                <label className="FishGrid__ToolbarDropdownItem" key={species}>
                  <input type="radio" name="filter_species" value={species} checked={filterSpecies === species} data-title={species} onChange={handleFilterChange} />
                  {species}
                </label>
              ))}
              <div>
                Zustand
              </div>
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="filter_alive" value="none" checked={filterAlive === 'none'} data-title="Kein Filter" onChange={handleFilterChange} />
                Kein Filter
              </label>
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="filter_alive" value="alive" checked={filterAlive === 'alive'} data-title="Aktueller Bestand" onChange={handleFilterChange} />
                Aktueller Bestand
              </label>
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="filter_alive" value="dead" checked={filterAlive === 'dead'} data-title="Gestorben" onChange={handleFilterChange} />
                Gestorben
              </label>
            </div>
          </div>
        </div>
        <div className="FishGrid__ToolbarItem FishGrid__ToolbarItem--right">
          <button className="FishGrid__ToolbarButton" onClick={toggleSorting}>
            <div>Sortieren</div>
            <div className="FishGrid__ToolbarButtonSub">{sortTitle}</div>
          </button>
          <div className="FishGrid__ToolbarDropdown" aria-hidden={sortingVisible ? 'false' : 'true'}>
            <div className="FishGrid__ToolbarDropdownContent">
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="sort" value="alphabetical" checked={sort === 'alphabetical'} data-title="A-Z" onChange={handleSortingChange} />
                A-Z
              </label>
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="sort" value="since_up" checked={sort === 'since_up'} data-title="Seit aufsteigend" onChange={handleSortingChange} />
                Seit aufsteigend
              </label>
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="sort" value="since_down" checked={sort === 'since_down'} data-title="Seit absteigend" onChange={handleSortingChange} />
                Seit absteigend
              </label>
              <label className="FishGrid__ToolbarDropdownItem">
                <input type="radio" name="sort" value="species" checked={sort === 'species'} data-title="Art" onChange={handleSortingChange} />
                Art
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="FishGrid__Grid">
        {filterAndSortFish(fish).map(item => (<FishCard fish={item} key={item._id}/>))}
      </div>
    </div>
  );
}

export default FishGrid;
