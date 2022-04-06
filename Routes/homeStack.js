import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home.js";
import Route from "../screens/Route.js"
import Map from "../screens/Map.js";

const screens = {
    Home:{
        screen: Home
    },
    Route: {
        screen: Route,
    },
    Map: {
        screen: Map
    }
}

const homeStack = createStackNavigator(screens)

export default createAppContainer(homeStack)