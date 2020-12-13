import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {TitleBox} from './styles';

export default function Header({title, hasTitle=false, hasSideBtn=false, btnClick, btnIcon}) {

    const nav = useNavigation();

 return (
   <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={() => nav.toggleDrawer()}>
            <Icon name='menu' color='#6F58C9' size={30} />
        </TouchableOpacity>
        <TouchableWithoutFeedback style={styles.twfb} onPress={()=>Keyboard.dismiss()} >
            <TitleBox hasTitle={hasTitle} hasSideBtn={hasSideBtn} >
                <Text style={styles.titulo} >{title}</Text>
            </TitleBox>
        </TouchableWithoutFeedback>
        {hasSideBtn ? 
            <TouchableOpacity style={styles.btn} onPress={() => btnClick()}>
            <Icon name={btnIcon} color='#6F58C9' size={30} />
            </TouchableOpacity>
            :
            <View style={{display:"none"}}/>
        }
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft:15,
        paddingRight:15,
        width: '100%',
        height: 50,
        flexDirection: 'row',
    },
    twfb:{
        flex:1,
    },
    titulo:{
        fontSize:20,
        color:'#6F58C9', 
    },
    btn:{
        width: '12%',
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
    },
})