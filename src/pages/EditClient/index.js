import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../services/firebaseConnection';

import SaleItem from '../../components/SaleItem';
import Picker from '../../components/AppPicker';
import {AuthContext} from '../../contexts/auth';
import {BG, Header, NewSaleArea, InputVlr, ValueBtn, Content, ProducListArea, ProductList, HeaderBtn, ClientInfoArea, ValueArea, TypeChoseArea, Input, PgtoArea} from './styles';
import SoldItem from '../../components/SoldItem';

export default function EditClient() {

const nav = useNavigation();
const [isediting, setediting] = useState(false);
const {client, user, historyAtt} = useContext(AuthContext);
const [tipo, settipo] = useState('cred');
const [produtos, setprodutos] = useState([]);

const [novosprod, setnovosprod] = useState([]);
const [totalvenda, settotal] = useState(0);

const [inputValor, setvalor] = useState('');
const [inputNome, setnome] = useState('')

function toggleEdit(){
  if(isediting){
    setvalor('');
    setnome('');
  }
  setediting(!isediting);
}
function removeKey(chav){
  let itemexcluido = novosprod.filter((item)=> item.key === chav);
  let valorexcluido = itemexcluido[0].valor
  settotal(totalvenda-valorexcluido);
  let list = novosprod.filter((item)=> item.key !== chav);
  setnovosprod(list);
}
function addProduct(){
  let obj = {
    key: novosprod.length,
    nome: inputNome,
    valor: inputValor,
  }
  if (obj.nome !== '' && obj.valor !== null && obj.valor !== 0){
    setnovosprod(oldlist =>[...oldlist, obj]);
    let newitem = parseFloat(inputValor);
    settotal(totalvenda+newitem);
    setnome('');
    setvalor('');
    Keyboard.dismiss();
  }else{
    alert('Valores inválidos de produto');
  }
  
}
async function deleteClient(key, nome, valor){
  //remover o valor da divida do subtotal
  Alert.alert(
    'Confirmação:',
    `Voce tem certeza que deseja excluir ${nome}? \n O valor de sua divida será perdido.`,
    [
      {
        text:'Cancelar',
        style:'cancel',
      },
      {
        text: 'Sim',
        onPress: async() => {
          await firebase.database().ref('users').child(user.uid).child('subtotal')
          .once('value', async (snap) =>{
            let subtotal = snap.val();
            subtotal -= valor;
            await firebase.database().ref('users').child(user.uid)
            .update({subtotal: subtotal,})
          });
          let check = firebase.database().ref('users').child(user.uid).child('clientes').child(key);
          await check.remove().then(nav.goBack());
        }
      }
    ]
  )
}
function receberPagamento(valor){
  if(inputValor !== ''){
    Alert.alert(
      'Confirmação:',
      `Tem certeza que deseja realizar esta ação?`,
      [
        {
          text:'Cancelar',
          style:'cancel',
        },
        {
          text: 'Sim',
          onPress: async() => {
            await firebase.database().ref('users').child(user.uid).child('clientes').child(client.key).child('total')
          .once('value', async (snap) =>{
            let total = snap.val();
            total -= parseFloat(valor);
            await firebase.database().ref('users').child(user.uid).child('clientes').child(client.key)
            .update({total: total,})
          });
          client.total -= parseFloat(valor);
          historyAtt(client.nome, tipo, inputValor);
          setvalor('');
          Keyboard.dismiss();
          toggleEdit();
          }
        }
      ]
    )
  }
}
async function addNewProds(list){
  Alert.alert(
    'Confirmação:',
    `Tem certeza que deseja realizar esta ação?`,
    [
      {
        text:'Cancelar',
        style:'cancel',
      },
      {
        text: 'Sim',
        onPress: async() => {
          list.forEach(async(item)=>{
            let userproducts = firebase.database().ref('users').child(user.uid).child('clientes').child(client.key).child('produtos');
            await userproducts.child(userproducts.push().key).set({
              nome: item.nome,
              valor: parseFloat(item.valor),
            })
          })
          let novototal = client.total + totalvenda;
          let rootuser = firebase.database().ref('users').child(user.uid);
          await rootuser.child('clientes').child(client.key)
          .update({
            total: novototal,
          });
          client.total += totalvenda;
          historyAtt(client.nome, tipo, totalvenda);
          settotal(0);
          setnovosprod([]);
          toggleEdit();
        }
      }
    ]
  )
}

useEffect(()=>{
  async function getProdList(){
    let check = firebase.database().ref('users').child(user.uid).child('clientes').child(client.key).child('produtos');
    await check.on('value', snap=> {
      setprodutos([])
      if (snap !== null){
        snap.forEach((item)=>{
          let prod={
            nome: item.val().nome,
            valor: item.val().valor,
          }
          setprodutos(oldlist => [...oldlist, prod]);
        })
      }
      setprodutos(list=>[...list].reverse());
    })
  }
  getProdList();
},[])

 return (
   <BG>
     <Header>
       <HeaderBtn onPress={()=>nav.goBack()}>
         <Icon name='arrow-left' size={30} color='#6F58C9' />
       </HeaderBtn>
       <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
         <Text style={{fontSize:20, color: '#6F58C9', flex:1, marginLeft: 15}} > {client.nome} </Text> 
       </TouchableWithoutFeedback>   
       <HeaderBtn onPress={()=>deleteClient(client.key, client.nome, client.total)} >  
         <Icon name='trash-2' size={25} color='#B6B8D6' />
       </HeaderBtn>
     </Header>

     <Content>
        <ClientInfoArea>
          <Text 
          style={{color:'gray', fontSize:24, textAlign:'center'}}
          >
            Divida atual:
          </Text>
          <ValueArea>
            <Text 
            style={{color:'#8FE0CB', fontSize:28, textAlign:'center', fontWeight:'bold'}}
            >
              R${client.total.toFixed(2)}
            </Text>
            <ValueBtn onPress={()=>toggleEdit()} >
              <Icon name={isediting? 'x-square' : 'edit'} color={isediting? '#B6B8D6' : '#7E78D2'} size={isediting? 30 : 25}/>
            </ValueBtn>
          </ValueArea>
        </ClientInfoArea>
        {isediting ?
        <TypeChoseArea>
          <Picker
          tipo={tipo} onChange={settipo}
          />
          {tipo === 'cred' ?
          <PgtoArea>
            <InputVlr
            placeholder='Valor'
            keyboardType='numeric'
            value={inputValor}
            onChangeText={(text)=>setvalor(text)}
            />
            <ValueBtn onPress={()=>receberPagamento(inputValor)} color='#6F58C9'>
              <Icon name='check' size={30} color='white' />
            </ValueBtn>
          </PgtoArea>
          :
          <NewSaleArea>
            <Input
            placeholder='Nome do produto'
            value={inputNome}
            onChangeText={(text)=> setnome(text)}
            autoCapitalize='words'
            />
            <PgtoArea>
            <InputVlr
            placeholder='Valor'
            keyboardType='numeric'
            value={inputValor}
            onChangeText={(text)=>setvalor(text)}
            />
            <ValueBtn color='#6F58C9' onPress={()=>addProduct()} >
              <Icon name='plus' size={30} color='white' />
            </ValueBtn>
            <ValueBtn color='#6F58C9' onPress={()=>addNewProds(novosprod)} >
              <Icon name='check' size={30} color='#121212' />
            </ValueBtn>
          </PgtoArea>
          </NewSaleArea>
          }
        </TypeChoseArea>
        :
        null
        }
        <ProducListArea>
        <Text style={{color:'#7E78D2', justifyContent: 'flex-start', paddingLeft: 10, paddingBottom:10,}}>
          {isediting && tipo==='debt' ? 'Novas Compras: R$ '+totalvenda.toFixed(2) : 'Histórico de compra'}
        </Text>
        <ProductList
          showsVerticalScrollIndicator={false}
          data={isediting && tipo==='debt'? novosprod : produtos} keyExtractor={item=>item.key}
          renderItem={({item})=> (isediting && tipo==='debt' ? <SaleItem data={item} btnDelete={removeKey} /> : <SoldItem data={item}/> )}
          />
        </ProducListArea>
     </Content>
   </BG>
  );
}