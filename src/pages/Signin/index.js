import React ,{useState, useContext} from 'react';
import {Text, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {BG, Container, Logo, Input, InputsContainer, Button, ButtonsContainer} from './styles';
import {AuthContext} from '../../contexts/auth';

export default function Signin() {

  const navigation = useNavigation();

  const [email, setemail] = useState('');
  const [senha, setsenha] = useState('');
  const {login} = useContext(AuthContext);

  function loginBtn(){
    login(email, senha);
  }

 return (
   <BG>
       <Container
       behaviour={Platform.os === 'ios' ? 'padding' : ''} enabled >
         <Logo source={require('../../assets/LogoN.png')} />

         <InputsContainer>
          <Input placeholder="Email" 
          autoCorrect={false} 
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setemail(text)} >
          </Input>
         </InputsContainer>
         <InputsContainer>
          <Input placeholder="Senha" 
          secureTextEntry={true}
          autoCorrect={false} 
          autoCapitalize="none"
          value={senha}
          onChangeText={(text) => setsenha(text)}>
          </Input>
         </InputsContainer>

         <ButtonsContainer>
           <Button color={'rgba(0,0,0,0.2)'}
           onPress={()=>navigation.navigate('Cadastrar')} >
             <Text style={{color: 'white', fontSize: 19}}>Cadastrar</Text>
           </Button>
           <Button color={'#6F58C9'} onPress={loginBtn}>
             <Text style={{color: 'black', fontSize: 19}}>Acessar</Text>
           </Button>
         </ButtonsContainer>

       </Container>
   </BG>
  );
}