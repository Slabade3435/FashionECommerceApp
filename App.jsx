import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from './src/screen/FavoriteScreen';
import SearchScreen from './src/screen/SearchScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import products from './database/dummydata';

const Tab = createBottomTabNavigator();

export default function App() {
  const initialFavs = products.filter(product => product.resell.interest); //check which products are already pre-liked for resell
  const [favorites, setFavorites] = useState(initialFavs); 
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'SEARCH') {
              iconName = 'search'; // Icon name for search
            } else if (route.name === 'FAVORITE') {
              iconName = 'heart'; // Icon name for favorite
            }

            // Return the icon component
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="SEARCH" > 
          {
            //sends favs as a param to searchScreen
          (props)=><SearchScreen {...props} favorites={favorites} setFavorites={setFavorites} />
          }
          </Tab.Screen>
        <Tab.Screen name="FAVORITE">
        {
          //sends favs as a param to favScreen
        (props)=><FavoriteScreen {...props} favorites={favorites}/>
        }
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}