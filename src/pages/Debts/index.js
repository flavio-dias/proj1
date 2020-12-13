import React, {useState, useContext, useEffect} from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../../services/firebaseConnection';

import Client from '../../components/ClientLabel';
import Header from '../../components/Header';
import {BG, SearchBarArea, SearchBar, ClientListArea, List, AttDivLoad} from './styles';
import {AuthContext} from '../../contexts/auth'

export default function Debts() {

const [isloading, setloading] = useState(true);
const nav = useNavigation();
const {user, setclient} = useContext(AuthContext);
const [clientes, setclientes] = useState([]);
const [search, setsearch] = useState('');

function goToAdd(){
  nav.navigate('Add');
}
function goToEdit(item){
  setclient(item);
  nav.navigate('Edit');
}
useEffect(()=>{
  async function getClientList(){
    setloading(true);
      let check = firebase.database().ref('users').child(user.uid).child('clientes');
      await check.orderByChild('nome').on('value', (snap)=>{
        setclientes([]);
        if(snap !== null){
          snap.forEach((item)=>{
            let client={
              key:item.key,
              nome:item.val().nome,
              total:item.val().total,
            };
            setclientes(prevlist => [...prevlist, client]);
          });
          setloading(false);
        }
      })
  }
  async function checkSearch(){
    if(search.length>=1){
      let check = firebase.database().ref('users').child(user.uid).child('clientes');
      await check.orderByChild('nome').startAt(search).endAt(search+'\uf8ff')
      .once('value', snap =>{
        setclientes([]);
        if(snap !== null){
          snap.forEach((item)=>{
            let client={
              key:item.key,
              nome:item.val().nome,
              total:item.val().total,
            };
            setclientes(prevlist => [...prevlist, client]);
          });
          setloading(false);
        }
      })
    }
    else{
      getClientList();
    }
  }
  checkSearch();
}, [search]);

 return (
   <BG>
     <Header hasTitle={true} title="Clientes" hasSideBtn={true} btnIcon='user-plus' btnClick={goToAdd} />

     <SearchBarArea>
      <Icon name='search' color='#7E78D2' size={22} />
      <SearchBar
      placeholder='Procurar cliente'
      returnKeyType='done'
      autoCapitalize='words'
      value={search}
      onChangeText={(text) => setsearch(text)}
      />
     </SearchBarArea>
     <ClientListArea>
       {isloading ? 
       <AttDivLoad>
         <ActivityIndicator size='large' color='#7E78D2'/>
       </AttDivLoad> 
       :
       <List
       showsVerticalScrollIndicator={false}
       data={clientes} keyExtractor={item=>item.key}
       renderItem={({item})=> ( <Client data={item} btnEdit={goToEdit} />) }
       />
       
       }
     </ClientListArea>
   </BG>
  );
}