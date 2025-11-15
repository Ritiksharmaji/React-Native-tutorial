import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const ToggleShow = () => {
  const [show, setShow] = useState(false);

  const onToggle = () => {
    setShow(!show);
  };

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Toggle User Component
      </Text>

      <Button title="Toggle" onPress={onToggle} />

      {show && <User />}
    </View>
  );
};

const User = () => {
  return (
    <View>
      <Text style={{ fontSize: 16, marginTop: 20 }}>
        User Component Loaded now
      </Text>
    </View>
  );
};

export default ToggleShow;
