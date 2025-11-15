import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";

const TogglageShowComponentWillUnmount = () => {
  const [show, setShow] = useState(true);

  return (
    <View>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>
        useEffect for ComponentWillUnmount
      </Text>

      <Button title="Toggle" onPress={() => setShow(!show)} />

      {show && <Student />}
    </View>
  );
};

const Student = () => {

    let timer = setInterval(() => {
        console.warn("Student Component is Running", Math.random());
    }, 1000);

  // ComponentWillUnmount
  useEffect(() => {
    return () => {
      alert("Student Component is Unmounting now");
      clearInterval(timer);
    };
  }, []);

  // ComponentDidMount
  useEffect(() => {
    alert("Student Component is Mounting now");
  }, []);

  return (
    <View>
      <Text style={{ color: "red", fontSize: 30, marginTop: 20 }}>
        Student Component Loaded
      </Text>
    </View>
  );
};

export default TogglageShowComponentWillUnmount;
