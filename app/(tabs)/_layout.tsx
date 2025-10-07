import { ThemedText } from '@/components/ThemedText';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: focused ? '#8B5CF6' : '#666666' }}>🏠</ThemedText>
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText style={{ color: focused ? '#8B5CF6' : '#666666', fontSize: 12 }}>
              Home
            </ThemedText>
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: focused ? '#8B5CF6' : '#666666' }}>📦</ThemedText>
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText style={{ color: focused ? '#8B5CF6' : '#666666', fontSize: 12 }}>
              Products
            </ThemedText>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: focused ? '#8B5CF6' : '#666666' }}>📑</ThemedText>
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText style={{ color: focused ? '#8B5CF6' : '#666666', fontSize: 12 }}>
              Categories
            </ThemedText>
          ),
        }}
      />
    </Tabs>
  );
}
