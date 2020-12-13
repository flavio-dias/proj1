import React from 'react';
import{createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../pages/Home';
import ClientRoutes from './clients.routes';
import New from '../pages/New';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator
        drawerStyle={{backgroundColor:'#171717' }}
        drawerContentOptions={{
            labelStyle:{
                fontWeight: 'bold'
            } ,
            activeTintColor: 'white',
            activeBackgroundColor: '#6F58C9',
            inactiveBackgroundColor: '#171717',
            inactiveTintColor: 'gray',
            itemStyle:{
                marginVertical: 5
            }
        }}
        >
            <AppDrawer.Screen name="Home" component={Home}/>
            <AppDrawer.Screen name="Dividas" component={ClientRoutes}/>
            <AppDrawer.Screen name="Add" component={New}/>
        </AppDrawer.Navigator>
    );
}

export default AppRoutes;