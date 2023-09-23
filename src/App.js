import React from 'react';
import './style.css';
import MedicalTopicsTable from './MTT';
import syllabusData from '../public/syllabus.json';
export default function App() {
  return (
    <div>
      <MedicalTopicsTable medicalData={syllabusData} />
    </div>
  );
}
