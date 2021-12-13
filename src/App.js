import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Form, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


function App() {
  const {
    transcript,
    finalTranscript,
    resetTranscript,
  } = useSpeechRecognition()
  const [speech, setSpeech] = useState("")
  const [sql, setSql] = useState("")
  const [results, setResults] = useState("")

  useEffect(() => {
    SpeechRecognition.startListening({continuous: true})
  }, [])

  useEffect(() => {
    if (transcript.includes("reset")) {
      resetTranscript()
    } else {
      setSpeech(transcript)
    }
  }, [transcript, finalTranscript, resetTranscript])

  useEffect(() => {
    axios.post('/convert_speech_to_sql', {"speech": finalTranscript}).then(res => {
      setSql(res["data"]["sql"])
    });
  }, [finalTranscript])

  useEffect(() => {
    axios.post('/convert_sql_to_results', {"sql": sql}).then(res => {
      setResults(res["data"]["results"])
    });
  }, [sql])

  return (
    <Container>
      <Row>
        <Col xs="2">
          <Form>
            <Form.Label style={{ height: '100px' }}>Speech</Form.Label>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Label>{speech}</Form.Label>
          </Form>
        </Col>
      </Row>
      <Row>
      <Col xs="2">
          <Form>
            <Form.Label style={{ height: '100px' }}>SQL</Form.Label>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Label>{sql}</Form.Label>
          </Form>
        </Col>
      </Row>
      <Row>
      <Col xs="2">
          <Form>
            <Form.Label style={{ height: '100px' }}>Results</Form.Label>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Label>{results}</Form.Label>
          </Form>
        </Col>
      </Row>
      
    </Container>
  );
}

export default App;
