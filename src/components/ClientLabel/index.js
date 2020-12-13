import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Card, InfoArea, IconsArea, CardBtn} from './styles';

export default function ClientLabel({data, btnEdit}) {

 return (
   <Card>
       <InfoArea>
           <Text style={{fontSize:20 , color:'black'}} >{data.nome}</Text>
           <Text style={{fontSize:22, fontWeight:'bold', color:'black'}} >R${data.total.toFixed(2)}</Text>
       </InfoArea>
       <IconsArea>
            <CardBtn onPress={()=> btnEdit(data)} >
                <Icon name='edit-3' color='black' size={25} />
            </CardBtn>
       </IconsArea>
   </Card>
  );
}