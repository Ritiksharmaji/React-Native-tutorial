import { Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native"

const App = ()=>{
  return(
    
      // other one 

      // <View>
      //   <Text>
      //    Running on: {Platform.OS}
      // </Text>
      // <Text>
      //   {Platform.OS === "ios" ? <Text>iOS UI</Text> : <Text>Android UI</Text>}

      // </Text>
      // </View>

      // this all for platfor detils
      <View style={styles.container}>

      {/* Platform Based UI */}
      {Platform.OS === "ios" && (
        <Text style={styles.appleStyle}>iOS Login</Text>
      )}

      {Platform.OS === "ios" && (
        <Text style={styles.appleStyle}>iOS Login</Text>
      )}
      {Platform.OS === "ios" && (
        <Text style={styles.appleStyle}>iOS Login</Text>
      )}

      {Platform.OS === "android" && (
        <Text style={styles.androidStyle}>Android Login</Text>
      )}

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },

  appleStyle: {
    fontSize: 24,
    color: "blue",
    fontWeight: "700",
  },

  androidStyle: {
    fontSize: 24,
    color: "green",
    fontWeight: "700",
  },
});

export  default App;