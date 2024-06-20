// App.jsx
import React, { useState, useEffect } from 'react';
import { CredentialsContext } from './src/Components/CredentialsContext';
import RootStack from './src/navigation/RootStack';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

import OnBoard from './src/Components/OnBoard';

SplashScreen.preventAutoHideAsync()
  .catch(e => console.log(e));

export default function App() {
  const [storedCredentials, setStoredCredentials] = useState("");
  const [showed, setShowed] = useState(null);

  const checkCredentials = async () => {
    try {
      const credentials = await AsyncStorage.getItem('credentials');
      if(credentials) {
        setStoredCredentials("credentials");
      } else {
        setStoredCredentials(null);
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const hasShownOnBoard = await AsyncStorage.getItem('hasShownOnBoard');
        if (hasShownOnBoard) {
          setShowed(false);
        } else {
          setShowed(true);
        }

        await checkCredentials();
      } catch (error) {
        console.error('Error checking OnBoard status:', error);
      } finally {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 500);
      }
    };

    initializeApp();
  }, []);

  const handleOnBoardComplete = async () => {
    try {
      await AsyncStorage.setItem('hasShownOnBoard', 'true');
      setShowed(false);
    } catch (error) {
      console.error('Error setting OnBoard status:', error);
    }
  };

  if (showed === null) {
    return null; // Show nothing while loading
  }

  

  return (
    <>
      {showed ? (
        <OnBoard setShowed={handleOnBoardComplete} />
      ) : (
        <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
          <RootStack />
        </CredentialsContext.Provider>
      )}
    </>
  );
}