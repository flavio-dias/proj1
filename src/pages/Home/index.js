import React, { useContext, useEffect, useState } from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {format, add, parse, isBefore} from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';

import { BG, ProfileDiv, Nome, SubTotal, ExitBtn, ValueDiv, AddBtn, AttDiv, List, AttDivLoad} from './styles';

import Header from '../../components/Header';
import AttLabelHome from '../../components/AttLabelHome';
import firebase from '../../services/firebaseConnection';
import {AuthContext} from '../../contexts/auth'

export default function Home() {

const [isloading, setloading] = useState(true);
const [attlist, setatt] = useState([]);
const{user, signOut} = useContext(AuthContext);
const [total, setTotal] = useState(0);
const navigation = useNavigation();

useEffect(()=>{
  async function loadSaldo(){
    await firebase.database().ref('users').child(user.uid).on('value', (snap) => {
      setTotal(snap.val().subtotal);
    })
  }
  loadSaldo();
  async function loadAtt(){
    setloading(true);
    let check = firebase.database().ref('historico')
    .child(user.uid)
    .orderByChild('date');
    await check.on('value', (snap) => {
      setatt([]);
      if(snap !== null)
      {
        snap.forEach((item)=>{
          let listitem = {
            key:item.key,
            nome:item.val().nome,
            tipo:item.val().tipo,
            valor:item.val().valor,
            data:item.val().date,
          };
          autoDeleteHistory(listitem);
        }
      )}
      setatt(list=>[...list].reverse());
      setloading(false);
    })
  }    
  loadAtt();  
},[]);

async function autoDeleteHistory(item){
  let itemdate = parse(item.data, 'dd/MM/yy', new Date());
  let today = new Date();
  let fivedaysbefore = add(today, {days: -5,});
  let isoutdated = isBefore(itemdate, fivedaysbefore);
  if(isoutdated){
    await firebase.database().ref('historico').child(user.uid).child(item.key).remove();
    return;
  }
  else{
    setatt(prevlist => [...prevlist, item]);
  }      
}

function logOut(){
  signOut();
}

 return (
   <BG>

     <Header />

     <ProfileDiv>
       <Nome> {user && user.nome} tem a receber: </Nome>
       <ValueDiv>
         {isloading ? <ActivityIndicator size="large" color='#6F58C9' /> : <SubTotal> R$ {total.toFixed(2)} </SubTotal>}
          <AddBtn onPress={()=> navigation.navigate('Add')} >
            <Icon name='user-plus'
                  color='white' 
                  size={30} />
          </AddBtn>
       </ValueDiv>         
     </ProfileDiv>

     <AttDiv>
       <Text style={{color:'#7E78D2', justifyContent: 'flex-start', paddingLeft: 10}}>Últimas atualizações</Text>
       {isloading ? 
       <AttDivLoad>
         <ActivityIndicator size="large" color='#6F58C9' />
       </AttDivLoad>:
       <List
       showsVerticalScrollIndicator={false}
       data={attlist} keyExtractor={item=>item.key}
       renderItem={({item})=> (<AttLabelHome data={item} />)}
       />
       }
     </AttDiv>

     <ExitBtn onPress={logOut} >
         <Text style={{fontSize: 18, color: 'black'}} >Encerrar Sessão</Text>
      </ExitBtn>
   </BG>
  );
}