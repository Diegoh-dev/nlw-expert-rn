import { Button } from "@/components/Button/Button";
import { Header } from "@/components/Header/Header";
import { Input } from "@/components/Input/input";
import { LinkButton } from "@/components/LInkButton/LinkButton";
import { Product } from "@/components/Product/Product";
import { ProductCardProps, useCardStore } from "@/store/cardStore";
import { formatCurrency } from "@/utils/data/functions/formatCurrency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "5598985449062"

export default function Cart() {
  const cardStore = useCardStore();
  const navigation = useNavigation();

  const [address,setAddress] = useState('');

  const total = formatCurrency(
    cardStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product:ProductCardProps){
    Alert.alert("Remover",`Deseja remover ${product.title} do carrinho?`,[
        {
            text:'Cancelar',
        },
        {
            text:'Remover',
            onPress:() => cardStore.remove(product.id)
        }
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const produtos = cardStore.products.map((product) =>`\n ${product.quantity} ${product.title}`).join("");

    const message = `
   🍔 NOVO PEDIDO 
    \n Entregar em: ${address}

    ${produtos}

    \n Valor total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
    cardStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cardStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cardStore.products.map((product) => (
                  <Product 
                  key={product.id}
                   data={product} 
                   onPress={() => handleProductRemove(product)}
                   />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>

              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input 
            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." 
            onChangeText={setAddress}
            blurOnSubmit={true}
            onSubmitEditing={handleOrder}
            returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar Pedido</Button.Text>

          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
