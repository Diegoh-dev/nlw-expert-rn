import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/data/functions/formatCurrency";
import { Button } from "@/components/Button/Button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/LInkButton/LinkButton";
import { useCardStore } from "@/store/cardStore";

export default function Product() {
  const { id } = useLocalSearchParams();
  const cardStore = useCardStore();
  const navigation = useNavigation();
  const produtos = PRODUCTS.filter((item) => item.id === id)[0];

  console.log(cardStore.products);

  function handleAddToCard(){
    console.log('chamou')
    cardStore.add(produtos)
    navigation.goBack();
  }

  //51

  return (
    <View className="flex-1">
      <Image
        source={produtos.cover}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-5 mt-8 flex-1">
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(produtos.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {produtos.description}
        </Text>

        {produtos.ingredients.map((ingredientes) => (
          <Text
            key={ingredientes}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022"} {ingredientes}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={() => handleAddToCard()}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
