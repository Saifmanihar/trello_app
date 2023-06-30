require('events').EventEmitter.defaultMaxListeners = 15;
import React, { useState, useEffect } from 'react';
import { Table, Input, Select } from 'antd';
import './CharacterList.css';
import axios from 'axios'; // Import axios package

const { Option } = Select;

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Fetch characters from the Rick and Morty API
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const data = response.data.results;
        setCharacters(data);
        setFilteredCharacters(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, []);

  // Apply filters when any filter value changes
  useEffect(() => {
    const filtered = characters.filter((character) => {
      const nameMatch = character.name.toLowerCase().includes(nameFilter.toLowerCase());
      const statusMatch = !statusFilter || character.status === statusFilter;
      const genderMatch = !genderFilter || character.gender === genderFilter;
      return nameMatch && statusMatch && genderMatch;
    });

    setFilteredCharacters(filtered);
  }, [characters, nameFilter, statusFilter, genderFilter]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
  ];

  return (
    <div className="character-list-container">
      <div className="filter-container">
        <Input
          className="filter-input"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <Select
          className="filter-select"
          placeholder="Select status"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="">All</Option>
          <Option value="Alive">Alive</Option>
          <Option value="Dead">Dead</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
        <Select
          className="filter-select"
          placeholder="Select gender"
          value={genderFilter}
          onChange={(value) => setGenderFilter(value)}
        >
          <Option value="">All</Option>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Genderless">Genderless</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
      </div>
      <Table columns={columns} dataSource={filteredCharacters} />
    </div>
  );
};

export default CharacterList;
