import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import {
  Button,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
  TextInput,
} from "react-native-paper";
import { auth } from "../config/firebase";
import { styles } from "../config/styles";

export const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });
  const [mostraErro, setMostraErro] = useState("");
  const { mensagem } = route.params || false;

  function onLoginPressed() {
    console.log("LoginIniciado");
    if (email.value === "" || password.value === "") {
      setEmail({ ...email, error: "Entre com um e-mail válido" });
      setPassword({ ...password, error: "Entre com uma senha" });
      return;
    }
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("HomeNavigation");
      })
      .catch((error) => {
        lidarComErro(error.code);
      });
  }

  function lidarComErro(erro) {
    if (erro == "auth/wrong-password") {
      setMostraErro("Senha errada 😕");
      return;
    }
    if (erro == "auth/user-not-found") {
      setMostraErro("Usuário não encontrado 😕");
      return;
    }
    if (erro == "auth/invalid-email") {
      setMostraErro("E-mail inválido 😕");
      return;
    }
    setMostraErro(erro);
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: require("../../assets/icon-login.png") }}
        style={{ width: 300, height: 300, marginBottom: 20 }}
        resizeMode="contain"
      />
      {mensagem && <HelperText type="info">{mensagem}</HelperText>}
      <HelperText type="error">{mostraErro}</HelperText>
      <TextInput 
        label="E-mail"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        style={styles.input}
        /* não essenciais  */
        returnKeyType="next"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <HelperText visible={!!email.error}>{email.error}</HelperText>
      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.esqueceuSenha}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Não possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};