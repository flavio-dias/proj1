import React, { useState, useContext } from 'react';
import { Text, Keyboard, Alert, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';
import SaleItem from '../../components/SaleItem';
import { BG, Input, InputArea, Button, BtnAdd, TitlePiece, PiecesArea, List, BtnArea, BtnCancel, InputName } from './styles';
import {AuthContext} from '../../contexts/auth';

export default function New() {

const nav = useNavigation();
const {newClient} = useContext(AuthContext);

const [adding, isadding] = useState(false);

const [nome, setnome] = useState('');
const [valor, setvalor] = useState(0);
const [tipo, setTipo] = useState('debt');
const [prodv, setprodv] = useState('');
const [prodn, setprodn] = useState('');
const [pieces, setpieces] = useState([]);


function archiveBtn(){
  Keyboard.dismiss();
  if(isNaN(parseFloat(valor)) || tipo === null || nome === ''){
    alert('Preencha todos os campos!');
    return;
  }
  Alert.alert(
    'Confirmação:',
    `Adicionar dívida de R$${valor} para ${nome}?`,
    [
      {
        text:'Cancelar',
        style:'cancel',
      },
      {
        text: 'Sim',
        onPress: () => archive()
      }
    ]
  )
} 
async function archive(){
  newClient(nome, valor, tipo, pieces);
  setvalor(0);
  setnome('');
  Keyboard.dismiss();
  nav.navigate('Home');
}
function removeKey(chav){
  let itemexcluido = pieces.filter((item)=> item.key === chav);
  let valorexcluido = itemexcluido[0].valor
  setvalor(valor-valorexcluido);
  let list = pieces.filter((item)=> item.key !== chav);
  setpieces(list);
}
function addProduct(){
  let obj = {
    key: pieces.length,
    nome: prodn,
    valor: parseFloat(prodv),
  }
  if (obj.nome !== '' && obj.valor !== null && obj.valor !== 0){
    setpieces(oldlist =>[...oldlist, obj]);
    let newitem = parseFloat(prodv);
    setvalor(valor+newitem);
    setprodn('');
    setprodv(null);
    Keyboard.dismiss();
  }else{
    alert('Valores inválidos de produto');
  }
  
}
function toggleAddBtn(){
  if(adding){
    addProduct();
  }
  if(nome !== ''){
    isadding(!adding);
  }else{alert('O nome do cliente nao pode ser vazio.')}
}
function addCancel(){
  setprodn('');
  setprodv('');
  isadding(!adding);
}

 return (

   <BG>
    <Header hasTitle={true} title="Nova Entrada"  />

     
      <InputArea>
        { adding ? 
          <InputArea>
            <InputName  
            editable={false}
            placeholder='Nome do cliente'
            returnKeyType='next'
            value={nome}
            onChangeText={(text)=>setnome(text)}
            />
            <Input
            placeholder='Nome do produto'
            returnKeyType='next'
            autoCapitalize='words'
            value={prodn}
            onChangeText={(text)=>setprodn(text)}
            />
            <Input
            placeholder='Valor'
            keyboardType='numeric'
            value={prodv}
            onChangeText={(text)=>setprodv(text)}
            /> 
          </InputArea>
          : 
          <Input
          placeholder='Nome do cliente'
          returnKeyType='next'
          value={nome}
          onChangeText={(text)=>setnome(text)}
          />
        }
        
      </InputArea>
     

      <PiecesArea>
        <TitlePiece>
        <Text style={{color:'#7E78D2', 
        justifyContent: 'flex-start', 
        paddingLeft: '5%',
        fontSize: 16}}>Produtos</Text>
          {adding ? 
            <BtnArea>
              <BtnCancel onPress={()=>addCancel()} >
                <Icon name='x'
                  color='white' 
                  size={30} />
              </BtnCancel> 
              <BtnAdd onPress={()=>toggleAddBtn()} >
                <Icon name={adding ? 'check' : 'plus'}
                  color='white' 
                  size={30} />
              </BtnAdd> 
            </BtnArea>            
            :
            <BtnAdd onPress={()=>toggleAddBtn()} >
              <Icon name={adding ? 'check' : 'plus'}
                color='white' 
                size={30} />
            </BtnAdd>
          }
          
        </TitlePiece>
        <List
        showsVerticalScrollIndicator={false}
        data={pieces} keyExtractor={item=>item.key}
        renderItem={({item})=> (<SaleItem data={item} btnDelete={removeKey} />) }
        />
      </PiecesArea>
      <Button onPress={()=>archiveBtn()}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Arquivar R${ valor.toFixed(2) } </Text>
      </Button>

   </BG>
  );
}