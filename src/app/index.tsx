import { CategoryButton } from "@/components/category";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-store";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, SectionList, Text, View } from "react-native";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const cartStore = useCartStore();

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleSelectCategory(categoryIndex: number) {
    setSelectedCategory(categoryIndex);
    sectionListRef.current?.scrollToLocation({
      sectionIndex: categoryIndex,
      itemIndex: 0,
    });
  }

  return (
    <View className="flex-1">
      <Header title="Cardápio" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <CategoryButton
            title={item}
            onPress={() => handleSelectCategory(index)}
            isSelected={index === selectedCategory}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
