import React ,{useState, useContext} from 'react';
import {Text, Platform} from 'react-native';
import {BG, Container, Input, InputsContainer, ButtonFull, ButtonsContainer} from '../Signin/styles';
import {AuthContext} from '../../contexts/auth';

export default function Signin() {

  const [email, setemail] = useState('');
  const [senha, setsenha] = useState('');
  const [nome, setnome] = useState('');
  const { signUp } = useContext(AuthContext);

  function signupBtn(){
    signUp(email, senha, nome);
  }

 return (
   <BG>
       <Container
       behaviour={Platform.os === 'ios' ? 'padding' : ''} enabled >

         <InputsContainer>
          <Input placeholder="Nome" 
          autoCorrect={false} 
          autoCapitalize="none"
          value={nome}
          onChangeText={(text) => setnome(text)}>
          </Input>
         </InputsContainer>
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
          autoCorrect={false} 
          autoCapitalize="none"
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setsenha(text)}>
          </Input>
         </InputsContainer>
         

         <ButtonsContainer>
           <ButtonFull color={'#6F58C9'} onPress={signupBtn}>
             <Text style={{color: 'black', fontSize: 19}}>Criar Usuário</Text>
           </ButtonFull>
         </ButtonsContainer>

       </Container>
   </BG>
  );
}