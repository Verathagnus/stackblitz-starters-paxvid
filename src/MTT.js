// MedicalTopicsTable.js
import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';

import { withStyles } from '@mui/styles';
import './style.css';
const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
};

class MedicalTopicsTable extends Component {
  state = {
    medicalData: [],
  };

  componentDidMount() {
    // Fetch data from the backend API
    fetch(
      'https://syllabus-marker-backend-production.up.railway.app/api/medical-topics'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ medicalData: data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  handleCheckboxChange = (subjectIndex, topicIndex) => {
    // Update the checkbox state in the frontend
    const updatedMedicalData = [...this.state.medicalData];
    updatedMedicalData[subjectIndex].topics[topicIndex].isChecked =
      !updatedMedicalData[subjectIndex].topics[topicIndex].isChecked;
    this.setState({ medicalData: updatedMedicalData });

    // Send a request to the backend to update the checkbox state
    const subjectId = updatedMedicalData[subjectIndex]._id; // Get the topic's ID
    const topicId = updatedMedicalData[subjectIndex].topics[topicIndex]._id; // Get the topic's ID

    const isChecked =
      updatedMedicalData[subjectIndex].topics[topicIndex].isChecked;

    fetch(
      `https://syllabus-marker-backend-production.up.railway.app/api/medical-topics/${subjectId}/${topicId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isChecked: isChecked,
        }),
      }
    )
      .then((response) => response.json())
      .then((updatedTopic) => {
        console.log('Updated topic:', updatedMedicalData[subjectIndex]);
        // You can handle the response from the backend if needed
      })
      .catch((error) => {
        console.error('Error updating checkbox state:', error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Medical Topics">
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Number of Questions</TableCell>
                <TableCell>Topics</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.medicalData.map((subjectData, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{subjectData.subject}</TableCell>
                    <TableCell>{subjectData.questions}</TableCell>
                    <TableCell>
                      <div className="s-header">{subjectData.subject}</div>
                    </TableCell>
                  </TableRow>

                  {subjectData.topics.map((topic, i) => (
                    <TableRow key={i}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      <TableCell>
                        <ul>
                          <li>
                            <Checkbox
                              checked={subjectData.topics[i].isChecked}
                              onChange={() =>
                                this.handleCheckboxChange(index, i)
                              }
                              color="primary"
                            />
                            {topic.name}
                          </li>
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(MedicalTopicsTable);
