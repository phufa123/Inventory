import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View } from 'react-native';

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Products</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff10',
  },
});
