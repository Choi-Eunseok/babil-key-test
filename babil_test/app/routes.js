import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AuthHome from './components/auth';
import Loading from './components/auth/loading';
import AuthForm from './components/auth/authForm';
import FindEmail from './components/auth/findAccount';
import TwoStep from './components/auth/twoStep';
import MainHome from './components/main';
import MainForm from './components/main/mainForm';
import EditVehicle from './components/main/editVehicle';
import SelectBrand from './components/main/AddVehicle';
import InfoHome from './components/settings/userInfo';
import AppSettings from './components/settings/appSettings';
import FAQ from './components/settings/qeustions';
import ServiceCenter from './components/settings/serviceCenter';
import ServiceTerms from './components/settings/policies/serviceTerms';
import PersonalInfoTerms from './components/settings/policies/personalInfoTerms';
import MyInfo from './components/settings/userInfo/myInfo';
import MyVehicle from './components/settings/userInfo/myVehicle';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const FindAccountTabs = createMaterialTopTabNavigator();
const MainStack = createStackNavigator();
const CompStack = createStackNavigator();
const InfoStack = createStackNavigator();
const PoliciesStack = createMaterialTopTabNavigator();
const AddVehicleStack = createStackNavigator();
const MainHomeDrawer = createDrawerNavigator();

const FindAccount = () => {
    return (
        <FindAccountTabs.Navigator>
            <FindAccountTabs.Screen name="FindEmail" component={FindEmail}/>
            <FindAccountTabs.Screen name="FindPassword" component={FindEmail}/>
        </FindAccountTabs.Navigator>
    )
}

const AuthComponent = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="AuthHome" component={AuthHome}/>
            <AuthStack.Screen name="AuthForm" component={AuthForm}/>
            <AuthStack.Screen name="FindAccount" component={FindAccount}/>
        </AuthStack.Navigator>
    )
}

const AddVehicle = () => {
    return (
        <AddVehicleStack.Navigator>
            <AddVehicleStack.Screen name="SelectBrand" component={SelectBrand}/>
        </AddVehicleStack.Navigator>
    )
}

const MainComponent = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="MainHome" component={MainHome}/>
            <MainStack.Screen name="MainForm" component={MainForm}
                options={({navigation})=>({
                    headerRight: ()=>(
                        <Button
                            title="편집"
                            onPress={()=>navigation.navigate("EditVehicle")}
                        />
                    )
                })}
            />
            <MainStack.Screen name="EditVehicle" component={EditVehicle}/>
            <MainStack.Screen name="AddVehicle" component={AddVehicle}/>
        </MainStack.Navigator>
    )
}

const MainHomeScreen = () => {
    return (
        <MainHomeDrawer.Navigator
            drawerContent={ ({navigation}) => {
                return (
                    <DrawerContentScrollView>
                        <DrawerItem
                            label="개인정보관리"
                            onPress={()=>navigation.getParent().navigate("UserInfoComponent")}
                        />
                        <DrawerItem
                            label="환경설정"
                            onPress={()=>navigation.getParent().navigate("AppSettings")}
                        />
                        <DrawerItem
                            label="고객센터"
                            onPress={()=>navigation.getParent().navigate("ServiceCenter")}
                        />
                        <DrawerItem
                            label="FAQ"
                            onPress={()=>navigation.getParent().navigate("FAQ")}
                        />
                        <DrawerItem
                            label="약관 및 정책"
                            onPress={()=>navigation.getParent().navigate("Policies")}
                        />
                    </DrawerContentScrollView>
                )}
            }
        >
            <MainHomeDrawer.Screen name="MainComponent" component={MainComponent}/>
        </MainHomeDrawer.Navigator>
    )
}

const UserInfoComponent = () => {
    return (
        <InfoStack.Navigator>
            <InfoStack.Screen name="InfoHome" component={InfoHome}/>
            <InfoStack.Screen name="MyInfo" component={MyInfo}/>
            <InfoStack.Screen name="MyVehicle" component={MyVehicle}/>
        </InfoStack.Navigator>
    )
}

const Policies = () => {
    return (
        <PoliciesStack.Navigator>
            <PoliciesStack.Screen name="ServiceTerms" component={ServiceTerms}/>
            <PoliciesStack.Screen name="PersonalInfoTerms" component={PersonalInfoTerms}/>
        </PoliciesStack.Navigator>
    )
}

const CompComponent = () => {
    return (
        <CompStack.Navigator>
            <CompStack.Screen name="MainHomeScreen" component={MainHomeScreen}/>
            <CompStack.Screen name="UserInfoComponent" component={UserInfoComponent}/>
            <CompStack.Screen name="AppSettings" component={AppSettings}/>
            <CompStack.Screen name="ServiceCenter" component={ServiceCenter}/>
            <CompStack.Screen name="FAQ" component={FAQ}/>
            <CompStack.Screen name="Policies" component={Policies}/>
        </CompStack.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Loading" component={Loading}/>
            <RootStack.Screen name="AuthComponent" component={AuthComponent}/>
            <RootStack.Screen name="TwoStep" component={TwoStep}/>
            <RootStack.Screen name="CompComponent" component={CompComponent}/>
        </RootStack.Navigator>
    )
}