import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

const HomeBanner = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../Images/banner.jpg")} // your image path
        style={styles.box}
        imageStyle={{ borderRadius: 15 }} // optional: makes the image corners rounded
      >
        <Text style={styles.text}>Weekly Challenge</Text>
        <Text style={styles.smallText}>Strengthen your core and sculpt your oblique's with this week's Plank with Hip Twist challenge.</Text>
        <Text style={styles.smallText}>Hold steady, twist with control, and feel your stability improve each day.</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
    width: 320,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#2CA0FF",
    fontWeight: "bold",
    fontSize: 18,
  },
  smallText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 7,
  }
})

export default HomeBanner;