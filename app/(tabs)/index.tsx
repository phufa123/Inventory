import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface Keyboard {
  id: string;
  name: string;
  image: string;
  stock: string;
  category: string;
  location: string;
  status: 'Active' | 'Low in stock';
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Keyboard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = () => {
    fetch('http://nindam.sytes.net:3038/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      console.log('Deleting product with ID:', id);
      const response = await fetch(`http://nindam.sytes.net:3038/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        Alert.alert('สำเร็จ', 'ลบสินค้าเรียบร้อยแล้ว');
        fetchProducts(); // รีเฟรชรายการสินค้า
      } else {
        const errorData = await response.json();
        Alert.alert('ข้อผิดพลาด', errorData.message || 'ไม่สามารถลบสินค้าได้');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการลบสินค้า');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Gaming Keyboards</ThemedText>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add')}>
          <ThemedText style={styles.buttonText}>+ Add Keyboard</ThemedText>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="ค้นหาสินค้า..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#666"
      />

      <View style={styles.productList}>
        {filteredProducts.map((product) => (
          <ThemedView key={product.id} style={styles.productCard}>
            {product.image && (
              <Image source={{ uri: product.image }} style={styles.productImage} />
            )}
            <View style={styles.productInfo}>
              <View style={styles.titleRow}>
                <ThemedText type="subtitle">{product.name}</ThemedText>
                <TouchableOpacity 
                  onPress={() => handleDelete(product.id)}
                  style={styles.deleteBtn}
                >
                  <ThemedText style={styles.deleteBtnText}>ลบ</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.details}>
                                <ThemedText>Stock: {product.stock}</ThemedText>
                <ThemedText>Category: {product.category}</ThemedText>
                <ThemedText>Location: {product.location}</ThemedText>
                <View style={[styles.status, { backgroundColor: product.status === 'Active' ? '#8B5CF6' : '#EF4444' }]}>
                  <ThemedText style={styles.statusText}>{product.status}</ThemedText>
                </View>
              </View>
            </View>
          </ThemedView>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 60,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deleteBtn: {
    backgroundColor: '#ff4444',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteBtnText: {
    color: 'white',
    fontSize: 14,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  productList: {
    gap: 12,
  },
  productCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff10',
  },
  productInfo: {
    gap: 8,
  },
  details: {
    gap: 4,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
