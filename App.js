import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={styles.app}>
      <Text style={{color: "#374983", fontSize: 20}}>Today's App...</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff"
  }
})