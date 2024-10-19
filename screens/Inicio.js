import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            password: '',
        };
    }

    render() {
        const entrar = () => {
            _this = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if(xhttp.responseText === "0") {
                        Alert.alert("Datos Incorrectos");
                    } else {
                        //Muestra el ID de Usuario que recibe desde el PHP
                        console.log(xhttp.responseText);
                        _this.props.navigation.navigate("Voto", {id_usuario:xhttp.responseText});
                    }
                }
            };
            xhttp.open("GET", "https://moviles21.000webhostapp.com/pf/pf_verifica.php?&nombre=" + this.state.nombre + "&password=" + this.state.password, true);
            xhttp.send();
        }

        const entrar_Admin = () => {
            if(this.state.nombre == "Maria Dolores Hernandez Hernandez" && this.state.password == "21031997") {
                this.props.navigation.navigate("Admin");
            } else {
                Alert.alert("Datos Incorrectos");
            }
        }

        return (
            <View>
                <View style={style.login}>
                    <Text style={style.txt}>Nombre: </Text>
                    <TextInput onChangeText={(nombre) => this.setState({ nombre })} style={{borderWidth: 1, margin: 10, backgroundColor: 'white'}}></TextInput>
                    <Text style={style.txt}>Contraseña: </Text>
                    <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })} style={{borderWidth: 1, margin: 10, backgroundColor: 'white'}}></TextInput>
                    <TouchableOpacity style={{
                            borderWidth: 1,
                            backgroundColor: 'gray',
                            width: 100,
                            height: 35,
                            borderRadius: 30,
                            alignSelf: 'center',
                        }} onPress={entrar}>                            
                            <Text style={style.txtbutton}> Entrar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: 20,
                            borderWidth: 1,
                            backgroundColor: 'lightblue',
                            width: 100,
                            height: 35,
                            borderRadius: 30,
                            alignSelf: 'center',
                        }} onPress={entrar_Admin}>                            
                            <Text style={style.txtbutton}> ADMIN </Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({

    txtbutton: {
        color: 'black',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
    },

    login: {
        marginTop: 200,
        alignSelf: 'center',
        width: 320,
        height: 350,
        borderWidth: 2,
        borderColor: "#69B4FF",
        backgroundColor: "#69B4FF",
        borderRadius: 30,

    },

    btninc: {
        borderWidth: 2,
        width: 215,
        heidht: 50,
        marginLeft: 50,
        marginTop: 20,

    },    

    txt: {
        color: 'black',
        fontSize: 21,
        marginLeft: 20,
        marginTop: 10,
    },
});