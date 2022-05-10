import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home.js";
import Map from "../screens/Map.js";
import Advice from "../screens/Advice.js"

const screens = {
    Home:{
        screen: Home
    },
    Map: {
        screen: Map
    },
    Advice: {
        screen: Advice
    }
}

const homeStack = createStackNavigator(screens)

export default createAppContainer(homeStack)