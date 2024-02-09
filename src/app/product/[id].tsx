import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import {
  Redirect,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Image, Text, View } from "react-native";
import colors from "tailwindcss/colors";

export default function Product() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.filter((item) => item.id === id)[0];

  function handleAddProductToCart() {
    if (product) {
      cartStore.add(product);
      navigation.goBack();
    }
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{ animation: "slide_from_bottom", animationDuration: 10 }}
      />

      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 flex-1">
        <Text className="text-white text-xl font-heading">{product.title}</Text>

        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => {
          return (
            <Text
              key={ingredient}
              className="text-slate-400 font-body text-base leading-6"
            >
              {"\u2022"} {ingredient}
            </Text>
          );
        })}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddProductToCart}>
          <Button.Icon>
            <Feather name="plus-circle" color={colors.black} size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
