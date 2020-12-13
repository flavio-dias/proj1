import React from 'react';
import{createStackNavigator} from '@react-navigation/stack';

import Debts from '../pages/Debts';
import Edit from '../pages/EditClient';

const AppStack = createStackNavigator();

function DebtRoutes(){
    return(
        <AppStack.Navigator headerMode={"none"} > 
            <AppStack.Screen name="Dividas" component={Debts} />
            <AppStack.Screen name='Edit' component={Edit} />
        </AppStack.Navigator>
            
    );
}

export default DebtRoutes;