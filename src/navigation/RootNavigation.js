import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from 'views/login';
import Stats from 'views/stats';

const RootStack = createStackNavigator({
  Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    },
    Stats: {
      screen: Stats,
      navigationOptions: {
        headerShown: false
      },
    }
  });

const App = createAppContainer(RootStack);

export default App;