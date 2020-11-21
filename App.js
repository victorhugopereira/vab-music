import React from 'react';
import {TouchableOpacity, View,Text } from 'react-native'
import { PlayerScreen } from './screens/Player';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import musica  from './music'

//========================================================================

//===============Screens====================
function HomeScreen({ navigation }) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
      <Text>
        Hi i'm your Home
        </Text>
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <TouchableOpacity
            key={item}
            onPress={() => {
              navigation.navigate('musica')
            }}
          >
            <Text>
              Podcast:{item}
            </Text>
          </TouchableOpacity>
        )
      })}

    </View>
  )
}

function DiscoverScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <Text>
              Hello word
            </Text>
    </View>
  )
}
//========================================================================
//=============== navigator ====================
const Tab = createBottomTabNavigator();

const PodcastStack = createStackNavigator();

function PodcastTabStack() {
  return (
    <PodcastStack.Navigator>
      <PodcastStack.Screen name="Home Screen" component={HomeScreen} />
      <PodcastStack.Screen name="musica" component={musica} />
    </PodcastStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home Screen" component={PodcastTabStack} />
      <Tab.Screen name="Discover Screen" component={DiscoverScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


//export default function App() {
//  return (
//    <music/>
//  );
//}