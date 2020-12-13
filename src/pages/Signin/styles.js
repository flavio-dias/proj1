import styled from 'styled-components/native';

export const BG = styled.View`
flex:1;
background-color: #131313;

`;
export const Logo = styled.Image`
margin-bottom: 25px;
`;
export const Container = styled.KeyboardAvoidingView`
flex:1;
align-items:center;
justify-content:center;
`;
export const InputsContainer = styled.View`
flex-direction:row;
`;
export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255,255,255, 0.30)'
})`
background:rgba(0,0,0,0.2);
width: 90%;
font-size:19px;
color: white;
margin-bottom: 15px;
padding: 15px;
border-radius:10px;
`;
export const ButtonsContainer = styled.View`
flex-direction:row;
justify-content: space-between;
width: 90%;
margin-top:3px;
`;
export const Button = styled.TouchableOpacity`
align-items:center;
justify-content:center;
background-color: ${props => props.color};
width: 47%;
height:50px;
border-radius: 10px;
`;
export const ButtonFull = styled.TouchableOpacity`
align-items:center;
justify-content:center;
background-color: ${props => props.color};
width: 100%;
height:50px;
border-radius: 10px;
`;