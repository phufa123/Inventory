import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View } from 'react-native';

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Categories</ThemedText>
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
