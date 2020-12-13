import styled from 'styled-components/native';

export const Container = styled.View`
margin-bottom:15px;
margin-left:5px;
padding: 10px;
box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
background-color: ${ props => props.tipo === 'cred' ? '#7E78D2' : '#5FD3B4'} ;
width:70%;
border-radius:15px;
`;
export const Line = styled.View`
flex-direction:row;
justify-content: space-between;
`;
export const Nome = styled.Text`
flex:1;
margin-left:5px;
color: white;
text-align:left;
font-weight: bold;
font-size: 16;
`;
export const Valor = styled.Text`
font-weight: bold;
color:#222;
font-size:22;
padding-left:10px;
`;
