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
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import LearningMaterialDetailScreen from "./components/screens/LearningMaterialDetailScreen";
import LearningMaterialScreen from "./components/screens/LearningMaterialScreen";
import ReadPdfScreen from "./components/screens/ReadPdfScreen";
import MyOrderScreen from "./components/screens/MyOrderScreen";
import CartScreen from "./components/screens/CartScreen";
import AttendanceScreen from "./components/screens/AttendanceScreen";
import ReportScreen from "./components/screens/ReportScreen";
import ExamScreen from "./components/screens/ExamScreen";
import AgendaScreen from "./components/screens/AgendaScreen";
import AssignmentScreen from "./components/screens/AssignmentScreen";
import BehavioralRecordScreen from "./components/screens/BehavioralRecordScreen";
import WebViewScreen from "./components/screens/WebViewScreen";
import AudioPlayerScreen from "./components/screens/AudioPlayerScreen";
import ExamDetailScreen from './components/screens/ExamDetailScreen';
import AssignmentDetailScreen from './components/screens/AssignmentDetailScreen';
import ImageViewerScreen from './components/screens/ImageViewerScreen';
import AgendaDetailScreen from './components/screens/AgendaDetailScreen';

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
            SearchLearningMaterialScreen,
            LearningMaterialDetailScreen,
            LearningMaterialScreen,
            ReadPdfScreen,
            ForgotPasswordSwitch,
            MyOrderScreen,
            CartScreen,
            AttendanceScreen,
            ReportScreen,
            ExamScreen,
            AgendaScreen,
            AssignmentScreen,
            BehavioralRecordScreen,
            WebViewScreen,
            AudioPlayerScreen,
            ExamDetailScreen,
            AssignmentDetailScreen,
            ImageViewerScreen,
            AgendaDetailScreen
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
    Fontisto.loadFont();
    AntDesign.loadFont();

    return (
        <AppContainer/>
    )
}
