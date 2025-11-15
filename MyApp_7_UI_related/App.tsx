import { StyleSheet, View } from "react-native"

const App = ()=>{
  return(
    // <View style = {{backgroundColor: 'white', flex: 1}}> 
    //   {/* <View style = {{backgroundColor: 'red', height: 100, width: 100}}></View> */}
    //   <View style={{flex:1, backgroundColor:"red"}}></View>
    //   <View style={{flex:1, backgroundColor:"green"}}></View>
    //   <View style={{flex:1, backgroundColor:"blue"}}></View>
    // </View>
    //----------------- other way for style is below --------------- 
      // <View style = {styles.main}> 
      //   <View style={styles.box1}></View>
      //   <View style={styles.box2}></View>
      //   <View style={styles.box3}></View>
      //   <View style={styles.box1}></View>
      // </View>
    
      // other one 

      <View style = {styles.main}> 
        <View style={styles.box1}>
          <View style={styles.InnerBox1}></View>
          <View style={styles.InnerBox2}></View>
          <View style={styles.InnerBox3}></View>
        </View>
        <View style={styles.box2}></View>
        <View style={styles.box3}></View>
        <View style={styles.box1}></View>
      </View>
  )
}

const styles = StyleSheet.create(
  {
    main:{
      flex:1,
    },
    box1:{
      flex:1, 
      backgroundColor:"red",
      flexDirection:"row",
    },
    box2:{
      flex:1, 
      backgroundColor:"green"
    },
    box3:{
      flex:1, 
      backgroundColor:"blue"
    },
    InnerBox1:{
      flex:1, 
      backgroundColor:"skyblue",
      margin:20,
    },
    InnerBox2:{
      flex:1, 
      backgroundColor:"white",
      margin:20,
    },
    InnerBox3:{
      flex:1, 
      backgroundColor:"pink",
      margin:20,
    },

  }
)

export  default App;