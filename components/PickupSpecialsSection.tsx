import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import SectionHeader from '@/components/SectionHeader';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import pb from '@/lib/pb';
import { getFileUrl } from '@/utils/data';
import { useSpecialOrderStore } from '@/stores/specialOrderStore';
import { OrderItem } from '@/types';

interface PickupSpecialCardProps {
  item: any;
  onPress: () => void;
}

const PickupSpecialCard: React.FC<PickupSpecialCardProps> = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} className="w-64 rounded-lg mr-4 overflow-hidden">
    <Image source={{ uri: getFileUrl('menuItems', item.id, item.image) }} className="w-full h-40 rounded-lg border border-background-accent1" resizeMode="cover" />
    <View className="p-4">
      <Text className="font-[RobotoMono500] text-lg">{item.title}</Text>
      <Text className="font-[RobotoMono400] text-accent1/20 mt-1">{item.description}</Text>
      <View className="flex-row items-center mt-2">
        {item.rrpPrice && item.rrpPrice !== item.price ? (
          <>
            <Text className="font-[RobotoMono400] text-lg text-accent1/20 line-through">
              {(item.rrpPrice / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Text>
            <View className='h-4 w-[1px] mx-2 bg-background-accent1'></View>
            <Text className="font-[RobotoMono400] text-lg text-accent1">
              {(item.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Text>
          </>
        ) : (
          <Text className="font-[RobotoMono400] text-lg text-accent1">
            {(item.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const fetchMenuItems = async () => {
  const records = await pb.collection('menuItems').getFullList({
    sort: '-created',
  });
  return records;
};

const PickupSpecialsSection = () => {
  const router = useRouter();
  const { setOrderItem, clearOrderItem } = useSpecialOrderStore();
  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems,
  });

  const handleCardPress = (item: any) => {
    const orderItem: OrderItem = {
      id: item.id,
      title: item.name,
      price: item.price,
      addOns: [],
      location: '',
      squareId: '',
      quantity: 1,
      image: item.image,
      customerId: pb.authStore.model?.squareId
    };
    clearOrderItem();
    setOrderItem(orderItem);
    router.push(`/dashboard/(tabs)/chat/${item.location}/${item.id}`);
  };

  return (
    <View className="">
      <SectionHeader
        title="PICKUP SPECIALS"
        actionText="more"
        onActionPress={() => router.push("/specials")}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <>
            <View className="w-64 h-40 rounded-lg mr-4 bg-gray-200" />
            <View className="w-64 h-40 rounded-lg mr-4 bg-gray-200" />
          </>
        ) : error ? (
          <Text>Error loading menu items</Text>
        ) : (
          menuItems && menuItems.filter(item => item.categories == '5nx8u154j4m1cff').map((item) => (
            <PickupSpecialCard
              key={item.id}
              item={item}
              onPress={() => handleCardPress(item)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default PickupSpecialsSection;