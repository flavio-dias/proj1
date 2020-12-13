import React, {createContext, useState, useEffect} from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import {format} from 'date-fns';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);
    const [client, setclient] = useState(null);

    useEffect(()=>{
        async function loadUser(){
            const loggeduser = await AsyncStorage.getItem('Logged_user');
            if(loggeduser){
                setuser(JSON.parse(loggeduser));
                setloading(false);
            }
            setloading(false);
        }
        loadUser();
    }, []);

    async function signUp(email, senha, nome){
        setloading(true);
        await firebase.auth().createUserWithEmailAndPassword(email,senha)
        .then( async(value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                nome: nome,
                subtotal: 0,
                //lista de clientes é criada no primeiro add
            }).then(()=>{
                let info = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    subtotal: 0,
                };
                alert("Sucesso!")
                setuser(info); 
            }).catch((error)=>{
                        alert(error.code)       
                })
            
        }).catch((error)=>{
                    alert(error.code)
            })
        setloading(false);
    }

    async function login(email, senha){
        setloading(true);
        await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(async(value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    subtotal: snapshot.val().subtotal,
                    email: value.user.email,
                };

                setuser(data);
                saveUser(data);
                setloading(false);
            })
        }).catch((error)=>{
            setloading(false);
            alert(error.code);
        })
    }

    async function signOut(){
        setloading(true);
        await firebase.auth().signOut();
        await AsyncStorage.removeItem('Logged_user')
        .then( () => {
            setuser(null);
            setloading(false);
        })
        .catch((error)=>{
            setloading(false);
            alert(error.code);
        })
    }

    async function saveUser(info){
        await AsyncStorage.setItem('Logged_user', JSON.stringify(info));
    }

    async function historyAtt(nome, tipo, valor){
        //add no historico
        let key = await firebase.database().ref('historico').child(user.uid).push().key;
        await firebase.database().ref('historico').child(user.uid).child(key).set({
            tipo: tipo,
            nome: nome,
            valor: parseFloat(valor),
            date: format(new Date(), 'dd/MM/yy')
        });
        //atualiza o subtotal no add
        let usuario = firebase.database().ref('users').child(user.uid);
        await usuario.once('value').then((snapshot) =>{
            let saldo = parseFloat(snapshot.val().subtotal);
            tipo === 'cred' ? saldo -= parseFloat(valor) :
            saldo += parseFloat(valor);
            usuario.child('subtotal').set(saldo);
        });
    }

    async function createProductList(nome, list){
        var check = await firebase.database().ref('users').child(user.uid).child('clientes').orderByChild('nome').equalTo(nome);
            check.once('value').then(async(snap)=>{
                let key = Object.keys(snap.val())[0]; //pega a key do snapshot
                console.log(key);
            list.forEach(async (item) => {
                let newitem = await firebase.database().ref('users').child(user.uid).child('clientes').child(key).push().key;
                await firebase.database().ref('users').child(user.uid).child('clientes').child(key).child('produtos').child(newitem)
                .set({
                    nome: item.nome,
                    valor: item.valor,
                })
            });        
        });       
    }

    async function newClient(nome, total, tipo, produtos){
        setloading(true);
        var check = await firebase.database().ref('users').child(user.uid).child('clientes').orderByChild('nome').equalTo(nome);
        check.once('value').then(async(snap)=>{
            if(snap.val() === null){
                let newclient = await firebase.database().ref('users').child(user.uid).child('clientes').push().key; 
                await firebase.database().ref('users').child(user.uid).child('clientes').child(newclient)
                .set({
                    nome:nome,
                    total:total,
                });
                createProductList(nome, produtos);
                historyAtt(nome, tipo, total);   
            }else{
                alert('Cliente ja cadastrado, para editar acesse a aba Dividas');
                return; 
            }
        });
        setloading(false);
    }

    return(
        <AuthContext.Provider value={{signed: !!user , user, loading, client, setloading, setclient, signUp, login, signOut, historyAtt, newClient}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;