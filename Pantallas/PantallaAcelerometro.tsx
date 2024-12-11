import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const PantallaAcelerometro = () => {
  const [color, setColor] = useState('#000');
  const [position, setPosition] = useState({ x: Dimensions.get('window').width / 2 - 50, y: Dimensions.get('window').height / 2 - 50 });
  const [size, setSize] = useState(50); 
  const [movement, setMovement] = useState(false); 

  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      const x = data.x * 10; 
      const y = data.y * 10; 

      if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
        setMovement(true);
      } else {
        setMovement(false);
      }

      setPosition((prevPosition) => ({
        x: Math.min(Math.max(prevPosition.x + x, 0), Dimensions.get('window').width - size), 
        y: Math.min(Math.max(prevPosition.y - y, 0), Dimensions.get('window').height - size), 
      }));

      const newSize = Math.max(20, Math.min(100, size + Math.abs(x) + Math.abs(y))); 
      setSize(newSize);

      
      if (movement) {
        cambiarColorAleatorio();
      } else {
        setColor('#008000'); 
      }
    });

    Accelerometer.setUpdateInterval(100);

    return () => {
      subscription.remove();
    };
  }, [size, movement]);

  const cambiarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.objeto, { backgroundColor: color, width: size, height: size, borderRadius: size / 2, transform: [{ translateX: position.x }, { translateY: position.y }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  objeto: {
    position: 'absolute', 
  },
});

export default PantallaAcelerometro;