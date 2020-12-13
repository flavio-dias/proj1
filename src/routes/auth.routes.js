import React from 'react';
import{createStackNavigator} from '@react-navigation/stack';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Signin" 
            component={Signin} 
            options={{headerShown: false}} />
            <AuthStack.Screen name="Cadastrar" 
            component={Signup}
            options={{
                headerStyle:{
                    backgroundColor: '#131313',
                    borderBottomWidth: 2,
                    borderBottomColor: '#6F58C9',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerBackTitleVisible: false
            }} />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;