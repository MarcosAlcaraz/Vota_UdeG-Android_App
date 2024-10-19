import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_acuerdo: "",
            texto_boton_enviar: "Espera Porfavor",
            votos: "",
            counter: -1,
        };
    }

    // Se ejecuta cuando se inicia el componente "Admin"
    componentDidMount() {
        // Llama a consult por primera vez
        this.consult();

        // ejecuta consult cada 10 segundos para tener actualizados los votos
        const idIntervalo = setInterval(() => {
            this.consult();
        }, 10000);

        // Apaga el intervalo despues de 5 minutos para que el internet de CUCEI no se queje
        setTimeout(() => {
            Alert.alert("ALERTA", "Intervalo de 'ADMIN' Apagado para que 000webhost no me sansione.");
            clearInterval(idIntervalo);
        }, 300000);
    }

    // Consult actualiza el id_acuerdo con el primero en la BD y la cantidad de votos a ese determinado acuerdo
    consult() {
        _this = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (xhttp.responseText == "0") {
                    Alert.alert("Ya no hay Acuerdos para Votar");
                } else {
                    // se imprime el id_acuerdo antiguo
                    console.log("this.state.id_acuerdo:" + _this.state.id_acuerdo);

                    // se limpia el id_acuerdo y votos para posterormente ser llenados con los nuevos datos
                    _this.setState({ id_acuerdo: "" });
                    _this.setState({ votos: "" });

                    // se extraen y almacenan los 10 caractres correspondientes al NUEVO id_acuerdo
                    for (let i = 0; i < 10; i++) {
                        _this.setState({ id_acuerdo: _this.state.id_acuerdo + xhttp.responseText[i] });
                    }
                    // y se extraen y almacenan los ultimos 3 caracteres de la consulta al php que corresponden a los votos [0 = de acuerdo, 1 = en desacuerdo, 2 = se abstiene]
                    for (let i = 10; i < 13; i++) {
                        _this.setState({ votos: _this.state.votos + xhttp.responseText[i] });
                    }

                    // para hacer pruebas se muestran en terminal los nuevos valores y la respuesta del xhttp cruda
                    console.log("xhttp.responseText/id_acuerdo:" + _this.state.id_acuerdo + " xhttp.responseText/complete:" + xhttp.response + " xhttp.responseText/votos:" + _this.state.votos);

                    // se actualiza el valor del boton enviar
                    _this.setState({ texto_boton_enviar: "RESETEAR VOTOS" });
                }
            }
        };
        xhttp.open("GET", "https://moviles21.000webhostapp.com/pf/pf_resultados.php", true);
        xhttp.send();

        // para pruebas se contabilizan las consultas realizadas durante la ejecucion
        _this.setState({ counter: _this.state.counter + 1 });
        console.log(_this.state.counter);
    }

    render() {
        // se encarga de ejecutar el php que borra el acuerdo y sus determinados votos realizados
        const resetear_votos = () => {
            _this = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (xhttp.responseText == "0") {
                        Alert.alert("ERROR", "Algo salio mal. Intentalo de nuevo.");
                    } else {
                        // Le asigna valores a los votos a favor, en contra y a se abstiene
                        _this.setState({ id_acuerdo: "" });
                        _this.setState({ votos: "" });
                        Alert.alert("Reseteo de Acuerdo Exitoso");
                    }
                }
            };
            console.log(_this.state.id_acuerdo)
            xhttp.open("GET", "https://moviles21.000webhostapp.com/pf/pf_resetear.php", true);
            xhttp.send();
        }

        return (
            <View style={style.admins}>
                <View style={style.title}>
                    <Text style={{ fontSize: 20, alignSelf: 'center', margin: 10 }}> ADMIN {this.state.id_acuerdo} </Text>
                </View>
                


                <Text style={style.txt}>A favor:</Text>
                <Text style={style.txtbutton}> {this.state.votos[0]} </Text>

                <Text style={style.txt}>En Contra:</Text>
                <Text style={style.txtbutton}> {this.state.votos[1]} </Text>

                <Text style={style.txt}>Se Abstiene:</Text>
                <Text style={style.txtbutton}> {this.state.votos[2]} </Text>

                <TouchableOpacity style={{ marginTop: 50, borderWidth: 1, backgroundColor: '#FF4242', height: 25, width: 220, borderRadius: 10, alignSelf: 'center' }} onPress={resetear_votos}>
                    <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}> {this.state.texto_boton_enviar} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    txtbutton: {
        alignSelf: 'flex-end',
        color: 'black',
        marginTop: 5,
        fontSize: 50,
        textAlign: 'center',
    },

    txt: {
        fontSize: 20,
        margin: 5
    },

    admins: {
        marginTop: 40,
        alignSelf: 'center',
        width: '90%',
        height: '90%',
        borderWidth: 10,
        borderColor: "#9D20FF",
        backgroundColor: "#BD6CFC",
        borderRadius: 30,

    },

    title: {
        marginTop: 10,
        alignSelf: 'center',
        width: '80%',
        height: '12%',
        borderWidth: 15,
        borderColor: "#BC67FF",
        backgroundColor: "#9D20FF",
        borderRadius: 20,

    },
});