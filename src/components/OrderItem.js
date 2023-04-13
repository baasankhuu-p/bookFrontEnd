import React, { useContext, useState, useEffect } from 'react'
import { Alert, Text } from 'react-native'
import { Image, StyleSheet } from 'react-native'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomLight, HBColor } from '../Constants';
import { TouchableOpacity } from 'react-native';
import UserContext from '../context/userContext';
import { deletebookOrder } from '../service/customer/useOrder';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastInfo } from '../utils/functions';
import { useNavigation } from '@react-navigation/native';
export default ({ item }) => {
    const state = useContext(UserContext)
    const navigation = useNavigation()
    const [toastObj, setToastObj] = useState(null);
    const removeItemHandler = () => {
        Alert.alert(`Захиалга цуцлах уу`, `${item.Book.bookname}`, [
            { text: 'болих' }, { text: 'зөвшөөрөх', onPress: () => { deleteOrder(item.Book._id, state.token); } }
        ])
    }
    useEffect(() => {
        if (toastObj) {
            Toast.show(toastInfo(toastObj.type, toastObj.msg, 2000));
        }
        setToastObj(null);
    }, [toastObj]);
    const deleteOrder = (BookID, token) => {
        deletebookOrder(BookID, token).then(response => { setToastObj({ type: 'success', msg: `Устгагдлаа: "${response.data.order2Book.BookId.bookname}"` }); state.setOverread(!state.Overread) }).catch(err => { setToastObj({ type: 'error', msg: err.message }) })
    }
    const onPressHandlerBook = () => {
        navigation.navigate('Book', { book: item.Book })
    }
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            margin: 5
        }}>
            <TouchableOpacity onPress={onPressHandlerBook}>
                <Image style={css.image}
                    source={{
                        uri: `https://book.mn/timthumb.php?src=https://book.mn/uploads/products/${item.Book.photo}&w=400`
                    }}
                />
            </TouchableOpacity>
            <Text style={css.quantity}>{' '}{item.Quantity}{' '}</Text>
            <TouchableOpacity style={css.iconRemoveBtn} onPress={removeItemHandler}>
                <MaterialCommunityIcons style={css.iconRemove} name="cart-remove" size={16} color={HBColor} />
            </TouchableOpacity>
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
        width: 150
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 2
    },
    quantity: {
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: CustomLight,
        color: HBColor,
        borderColor: HBColor,
        borderWidth: 0.2,
        fontWeight: 'bold',
        paddingHorizontal: 2,
        borderRadius: 10,
    },
    iconRemoveBtn: {
        position: 'absolute',
        bottom: 4,
        right: 4,
    },
    iconRemove: {
        borderColor: 'red',
        borderWidth: 0.4,
        backgroundColor: CustomLight,
        color: 'red',
        fontWeight: 'bold',
        padding: 4,
        borderRadius: 15
    }
})