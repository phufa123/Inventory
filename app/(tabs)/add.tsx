import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function AddProductScreen() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    location: '',
    status: 1,
    image: ''
  });
  
  const [imageUri, setImageUri] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://nindam.sytes.net:3038/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          stock: parseInt(formData.stock) || 0
        })
      });

      if (response.ok) {
        Alert.alert('Success', 'Product added successfully');
        // Reset form
        setFormData({
          name: '',
          category: '',
          stock: '',
          location: '',
          status: 1,
          image: ''
        });
      } else {
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error('Error adding product:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText style={styles.title}>Add Product</ThemedText>

        <ThemedText style={styles.label}>Name *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Description</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={4}
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Price *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={formData.price}
          onChangeText={(text) => setFormData({ ...formData, price: text })}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Stock</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter stock quantity"
          value={formData.stock}
          onChangeText={(text) => setFormData({ ...formData, stock: text })}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Category</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter category"
          value={formData.category}
          onChangeText={(text) => setFormData({ ...formData, category: text })}
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Brand</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter brand"
          value={formData.brand}
          onChangeText={(text) => setFormData({ ...formData, brand: text })}
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Location</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Image URL</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter image URL"
          value={formData.image}
          onChangeText={(text) => setFormData({ ...formData, image: text })}
          placeholderTextColor="#666"
        />

        <ThemedText style={styles.label}>Sizes</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter sizes (e.g., S,M,L)"
          value={formData.sizes}
          onChangeText={(text) => setFormData({ ...formData, sizes: text })}
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>Add Product</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#8B5CF6',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
