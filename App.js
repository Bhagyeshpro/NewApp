import { StatusBar, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const screen = Dimensions.get("window");

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins, secs };
}

const App = () => {
  const [remaingingsecs, setReminingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false)
  const { mins, secs } = getRemaining(remaingingsecs);

  toggle = () => {
    setIsActive(!isActive)
  }

  reset = () => {
    setReminingSecs(0),
    setIsActive(false)
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setReminingSecs(remaingingsecs => remaingingsecs + 1);
      }, 1000);
    } else if (!isActive && remaingingsecs !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval)

  }, [isActive, remaingingsecs])


  return (
    <View style={styles.app}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button} >
        <Text style={styles.buttonText}>{isActive ? 'Start' : 'Pause'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={[styles.button, {borderColor: "#FF851B", marginTop: 10}]}>
        <Text style={ [ styles.buttonText, {color: "#FF851B"},] }>Reset</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
    flexDirection:"column",
    justifyContent: "center",
    backgroundColor: "#07121B"
  },
  button: {
    borderColor: "#b9aaff",
    borderWidth: 10,
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 45,
    color: "#B9AAFF"
  },
  timerText: {
    fontSize: 75,
    marginBottom: 10,

  }
})