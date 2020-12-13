import React from 'react';
import { Text} from 'react-native';
import  Icon from 'react-native-vector-icons/Feather';
import { Container, InputArea, IconsArea, } from './styles';


export default function SoldItem( {data} ){
    return(
        <Container>
            <IconsArea>
                <Icon name='tag' color='black' size={20} />
            </IconsArea>
            <InputArea>
               <Text style={{fontSize:19}}>{data.nome} </Text>
               <Text style={{fontSize:21, fontWeight:'bold'}}>R$ {data.valor}</Text> 
            </InputArea>                 

        </Container>
    );
}