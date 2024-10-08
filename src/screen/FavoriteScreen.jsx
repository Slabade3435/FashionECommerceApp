import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const FavoriteScreen = ({ favorites }) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.productId.toString()}
        renderItem={({ item }) => ( //for every item in the fav, render the item
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        numColumns={3} //sets the columns
        columnWrapperStyle={styles.row} //styling the cols
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  row: {
    justifyContent: 'space-evenly', // Space between items in a row
  },
});

export default FavoriteScreen;
