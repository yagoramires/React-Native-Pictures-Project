import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    /* Keyboard Avoiding view - Faz com que quando o telefone abrir o teclado não cubra os inputs*/
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      {/* View é uma div */}

      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputsContainer}>
        {/* Input de texto */}
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, styles.shadowProps, { shadowOpacity: 0.1 }]}
        />

        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, styles.shadowProps, { shadowOpacity: 0.1 }]}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        onPress={loginHandler}
        style={{
          width: '90%',
          justifyContent: 'center',
        }}
      >
        <View style={[styles.loginButtonContainer, styles.shadowProps]}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.signInButtonContainer}>
        <Text style={styles.signInText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.signInButton}
        >
          <Text style={[styles.signInText, { color: '#FF6969' }]}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#515C6F',
    textTransform: 'capitalize',
    fontSize: 35,
    fontWeight: '800',
    marginBottom: 40,
  },
  inputsContainer: {
    width: '90%',
    justifyContent: 'space-between',
    height: 130,
  },

  input: {
    height: 60,
    borderRadius: '10%',
    color: '#515C6F',
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: 'rgb(235,235,235)',
  },

  registerContainer: {
    flexDirection: 'row',
  },

  loginButtonContainer: {
    marginTop: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6969',
    borderRadius: '50%',
    boxShadow: '0 0 10 0 rgba(0,0,0,0.3)',
  },
  loginButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  signInButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  signInButton: {},

  signInText: {
    color: '#515C6F',
    fontWeight: '700',
  },

  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
