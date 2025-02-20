/**
 * Login Screen, user login by just entering a username 
 * User is redirected to the home screen after login
 * Reset button to clear the database, due to use of the alert this button is not working on web, only tested on ios
 */

import { View, Button, TextInput, Alert, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, createUserAsync, resetDatabaseAsync, setError } from '../features/userSlice';
import { RootState, AppDispatch } from './store';
import { loginStyles } from "../styles/loginStyles";
import { router } from "expo-router";

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, username, error } = useSelector((state: RootState) => state.user);

  const handleSubmitUser = async () => {
    if (!username.trim()) {
      dispatch(setError('Please enter a username'));
    }
    else {
      // Create or get the user
      const user = await dispatch(createUserAsync(username)).unwrap();
      // Navigate to to the home screen
      router.push({
        pathname: '/home',
        params: { 
          username: user.name,
          userId: user.id
        }
      });
    }
  };

  return (
    <View style={loginStyles.container}>
      <TextInput 
        style={loginStyles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={(text) => dispatch(setUsername(text))}
        editable={!loading}
      />
      <Button 
        title={loading ? "Creating..." : "Login"}
        onPress={handleSubmitUser}
        disabled={loading}
      />
      {error && <Text style={loginStyles.errorText}>{error}</Text>}
      
      <TouchableOpacity 
        style={loginStyles.resetButton}
        onPress={() => handleResetDatabase(dispatch)}
      >
        <Text style={loginStyles.resetButtonText}>Reset DB</Text>
      </TouchableOpacity>
    </View>
  );
}

// Reset the database
const handleResetDatabase = (dispatch: AppDispatch) => {
  Alert.alert(
    'Reset Database',
    'Are you sure you want to reset the database? This will delete all data.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          try {
            await dispatch(resetDatabaseAsync());
            Alert.alert('Success', 'Database has been reset');
          } catch (error) {
            Alert.alert('Error', 'Failed to reset database');
          }
        },
      },
    ]
  );
};
