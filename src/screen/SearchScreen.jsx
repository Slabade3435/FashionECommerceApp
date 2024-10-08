import { View, TextInput, StyleSheet, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import products from '../../database/dummydata';


const SearchScreen = ({favorites, setFavorites}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setProducts] = useState(products);


    const filteredData = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleInterest = (productId) => {
        setProducts(prevProducts =>
          prevProducts.map(product => {
            if (product.productId === productId) {
              const newInterest = !product.resell.interest;
              if (newInterest) {
                setFavorites([...favorites, product]);
              } else {
                setFavorites(favorites.filter(fav => fav.productId !== productId));
              }
              return { ...product, resell: { ...product.resell, interest: newInterest } };
            }
            return product;
          })
        );
      };


    return (
        <View>
            <TextInput
                style={styles.searchBox}
                placeholder="Search.."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <FlatList
                data={filteredData} //based on the searchquery generates the list
                keyExtractor={item => item.productId.toString()} //extracting the images using productId
                renderItem={({ item }) => ( //for each item does the following
                    <View style={styles.item}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <TouchableOpacity onPress={() => toggleInterest(item.productId)} style={styles.heartIcon}>
                            <Icon
                                name={item.resell.interest ? "heart": "heart-o"}
                                size={24}
                                color={item.resell.interest ? "red" : "black"}
                            />
                        </TouchableOpacity>
                        <Text>{item.title}</Text>
                    </View>
                )}
                numColumns={3} //sets the columns
                columnWrapperStyle={styles.row} //styling the cols
            />

        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({

    searchBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 5,
        marginRight: 10,
    },
    row: {
        justifyContent: 'space-between', // Space between items in a row
    },
    heartIcon: {
        position: 'absolute', // Position the heart icon over the image
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
        borderRadius: 15, // Rounded corners
        padding: 5,
      },
    //   item: {
    //     flex: 1, // Take up equal space for each item
    //     margin: 8, // Margin between items
    //     alignItems: 'center', // Center the content
    //   },
})
