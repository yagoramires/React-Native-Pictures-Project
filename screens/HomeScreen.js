import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const HomeScreen = ({ navigation }) => {
  const logout = () => {
    signOut(auth);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
