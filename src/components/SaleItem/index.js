import React from 'react';
import { Text} from 'react-native';
import  Icon from 'react-native-vector-icons/Feather';
import { Container, InputArea, IconsArea, } from './styles';


export default function SaleItem( {btnDelete, data} ){
    return(
        <Container>
            <InputArea>
               <Text style={{fontSize:19}}>{data.nome} </Text>
               <Text style={{fontSize:21, fontWeight:'bold'}}>R$ {data.valor}</Text> 
            </InputArea>                 
            <IconsArea onPress={() => btnDelete(data.key)} >
                <Icon name='trash-2' color='black' size={20} />
            </IconsArea>
        </Container>
    );
}