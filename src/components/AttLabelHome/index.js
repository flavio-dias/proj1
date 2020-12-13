import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Container, Nome, Valor, Line} from './styles'

export default function AttLabelHome({data}) {
 return (
     <Container tipo={data.tipo}>
            <Line>
                <Icon name={data.tipo === 'cred' ? 'trending-up' : 'shopping-bag'}
                color='white' 
                size={20} />
                <Nome>{data.nome}</Nome>  
            </Line>                 
         <Valor>R$ {data.valor}</Valor>
     </Container>
   
  );
}