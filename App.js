import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
import AppIntroScreen from "./components/screens/AppIntroScreen";
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./components/screens/LoginScreen";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RegisterScreen from "./components/screens/RegisterScreen";
import ChooseGenderScreen from "./components/screens/ChooseGenderScreen";
import RegistrationInfoScreen from "./components/screens/RegistrationInfoScreen";
import ChildRegistrationScreen from "./components/screens/ChildRegistrationScreen";
import UserAgreementScreen from "./components/screens/UserAgreementScreen";
import ReadTermAndConditionScreen from "./components/screens/ReadTermAndConditionScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import HomeScreen from "./components/screens/HomeScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import Toast from 'react-native-toast-message';
import NotificationScreen from "./components/screens/NotificationScreen";
import LearningActivitiesScreen from "./components/screens/LearningActivitiesScreen";
import SearchLearningMaterialScreen from "./components/screens/SearchLearningMaterialScreen";

export default function App() {
    const ForgotPasswordSwitch = createSwitchNavigator({
        ForgotPasswordScreen,
        ResetPasswordScreen
    }, {
        initialRouteName: "ForgotPasswordScreen",
        backBehavior: 'none'
    });

    const LoginStack = createStackNavigator({
            LoginScreen,
            RegisterScreen,
            ChooseGenderScreen,
            RegistrationInfoScreen,
            ChildRegistrationScreen,
            UserAgreementScreen,
            ReadTermAndConditionScreen,
            ForgotPasswordSwitch
        },
        {
            headerMode: "none",
            defaultNavigationOptions: {
                tabBarVisible: false
            },
            initialRouteName: "LoginScreen"
        }
    );

    const HomeStack = createStackNavigator({
            HomeScreen,
            ProfileScreen,
            NotificationScreen,
            LearningActivitiesScreen,
            SearchLearningMaterialScreen
        },
        {
            headerMode: "none",
            defaultNavigationOptions: {
                tabBarVisible: false
            },
            initialRouteName: "HomeScreen"
        }
    );

    const MainSwitch = createSwitchNavigator({
        AppIntroScreen,
        LoginStack,
        HomeStack
    }, {
        initialRouteName: "AppIntroScreen",
        backBehavior: 'none'
    });

    const AppContainer = createAppContainer(MainSwitch);

    Ionicons.loadFont();
    MaterialIcons.loadFont();
    Entypo.loadFont();
    Feather.loadFont();
    FontAwesome.loadFont();
    MaterialCommunityIcons.loadFont();

    return (
        <AppContainer/>
    )
}