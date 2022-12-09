import { StatusBar, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDeviceOrientation } from "@react-native-community/hooks"

const screen = Dimensions.get("window");


const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins, secs };
}

// const getOrientation = () => {
//   let orientation = "black";
//   if (screen.width > screen.height) {
//     orientation == "Landscape";
//   } else {
//     orientation == "Portrait";
//   }
//   console.log(orientation);
//   // alert("Orientation Is", `${orientation}` );
// }

const App = () => {
  const [remaingingsecs, setReminingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  // const [isLandscape, setIsLandscape] = useState(true);
  const { mins, secs } = getRemaining(remaingingsecs);
  const { landscape } = useDeviceOrientation();

  toggle = () => {
    setIsActive(!isActive)
    // getOrientation()
  }

  reset = () => {
    setReminingSecs(0),
      setIsActive(false)
  }

  if (landscape) {
    toggle()
  } else {
    reset()
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
  }, [isActive, remaingingsecs, screen.width, screen.height])


  // useEffect(() => {
  //   let width = screen.width;
  //   let height = screen.height;

  //   if (width >= height) {
  //     setIsLandscape(true)
  //   } else {
  //     setIsLandscape(false)
  //   }
  // }, [])


return (
  <View style={[landscape ? styles.appLandscape : styles.app]}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
    <TouchableOpacity onPress={toggle} style={[landscape ? styles.buttonLandscape : styles.button]} >
      <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={reset} style={[styles.button, { borderColor: "#FF851B", marginTop: 10 }]}>
      <Text style={[styles.buttonText, { color: "#FF851B" },]}>Reset</Text>
    </TouchableOpacity>
  </View>
)
}

export default App

const styles = StyleSheet.create({
  appLandscape: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#07121B"
  },
  app: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
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
  buttonLandscape: {
    borderColor: "#b9aaff",
    borderWidth: 10,
    width: screen.height / 2,
    height: screen.height / 2,
    borderRadius: screen.height / 2,
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

