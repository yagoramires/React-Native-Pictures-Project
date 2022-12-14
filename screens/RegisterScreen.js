import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  }, [auth]);

  const register = async () => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(user, { displayName: username });

      // navigation.navigate('Home');
      setLoading(false);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const registerHandler = async () => {
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('Preencha todos os campos');
      return;
    }

    register();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        /* Keyboard Avoiding view - Faz com que quando o telefone abrir o
        teclado não cubra os inputs*/
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* View é uma div */}

          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputsContainer}>
            {/* Input de texto */}
            <TextInput
              placeholder='Name'
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={[styles.input, styles.shadowProps, { shadowOpacity: 0.1 }]}
            />
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

            <TextInput
              placeholder='Confirm Password'
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              style={[styles.input, styles.shadowProps, { shadowOpacity: 0.1 }]}
              secureTextEntry
            />
          </View>

          {loading ? (
            <View
              style={[
                styles.registerButtonContainer,
                styles.shadowProps,
                {
                  width: '90%',
                  justifyContent: 'center',
                },
              ]}
            >
              <Text style={styles.registerButtonText}>Loading ...</Text>
            </View>
          ) : (
            <Pressable
              onPress={registerHandler}
              style={{
                width: '90%',
                justifyContent: 'center',
              }}
            >
              <View
                style={[styles.registerButtonContainer, styles.shadowProps]}
              >
                <Text style={styles.registerButtonText}>Sign Up</Text>
              </View>
            </Pressable>
          )}

          <View style={styles.loginButtonContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              <Text style={[styles.loginText, { color: '#FF6969' }]}>
                Log In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    height: 270,
  },

  input: {
    height: 60,
    borderRadius: 10,
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

  registerButtonContainer: {
    marginTop: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6969',
    borderRadius: 50,
    boxShadow: '0 0 10 0 rgba(0,0,0,0.3)',
  },
  registerButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  loginButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  loginButton: {},

  loginText: {
    color: '#515C6F',
    fontWeight: '700',
  },

  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
});
