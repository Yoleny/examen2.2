import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const PantallaLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    obtenerLogs();
  }, []);

  const obtenerLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/logs');
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Logs</Text>
      <FlatList
        data={logs}
        renderItem={({ item }) => (
          <View style={styles.log}>
            <Text style={styles.logText}>ID: {item.IdLog}</Text>
            <Text style={styles.logText}>Posición X: {item.postitionX}</Text>
            <Text style={styles.logText}>Posición Y: {item.positionY}</Text>
            <Text style={styles.logText}>Fecha: {item.fecha}</Text>
          </View>
        )}
        keyExtractor={(item) => item.IdLog.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
    },
    log: {
      backgroundColor: '#f0f0f0',
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
    logText: {
      fontSize: 18,
      marginBottom: 10,
    },
  });
  
  export default PantallaLogs;