import { CategoryButton } from "@/components/CategoryButton/CategoryButton";
import { Header } from "@/components/Header/Header";
import React, { useRef, useState } from "react";
import { View, FlatList, SectionList, Text } from "react-native";

import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { Product } from "@/components/Product/Product";
import { Link } from "expo-router";
import { useCardStore } from "@/store/cardStore";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const cardStore = useCardStore();

  const cardQuantity = cardStore.products.reduce((total,produc) => total + produc.quantity,0)

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);

    if(sectionListRef.current){
      sectionListRef.current.scrollToLocation({
        animated:true,
        sectionIndex:sectionIndex,//index do item que foi clicado
        itemIndex:0//Index que quero que o scroll fique posicionado
      })
    }
    console.log({
      sectionIndex
    })
  }
  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cardQuantityItens={cardQuantity} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
      ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => <Link asChild href={`/product/${item.id}`}><Product data={item} /></Link>}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
      />
    </View>
  );
}
