import React, { useEffect, useState, useContext } from "react";
import { Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import UserContext from "../../context/userContext";
import { toastInfo } from "../../utils/functions";
import { getOrder } from "../../service/customer/useOrder";
import { OrderNull } from "../../components/useComponent/notfound";
import OrderItem from "../../components/OrderItem";
export default () => {
    const state = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [toastObj, setToastObj] = useState(null);
    useEffect(() => {
        getOrder(state.token)
            .then((result) => {
                setOrders(result.data.data);
            })
            .catch((err) => {
                console.log('Захиаалгын дэлгэц: ', err.message);
                setToastObj({ type: "error", msg: "захиалгын дэлгэцэнд алдаа гарлаа" });
            });
        setToastObj(null);
    }, [state.Overread]);
    useEffect(() => {
        //Aldaanii MSG ognoo Toast baidlaar
        if (toastObj) {
            Toast.show(toastInfo(toastObj.type, toastObj.msg, 2000));
        }
        setToastObj(null);
    }, [toastObj]);

    return (
        <>
            {orders.length > 0 ? (
                <ScrollView>
                    <TouchableOpacity onPress={() => console.log('clicked')}>
                        <Text>Төлөх</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={orders}
                        numColumns={3}
                        renderItem={({ item }) => <OrderItem item={item} />}
                        keyExtractor={item => item.Book._id}
                        contentContainerStyle={{ paddingHorizontal: 10, flex: 1, alignSelf: 'center' }}
                    />
                </ScrollView>
            ) : (
                <OrderNull />
            )}
        </>
    );
};
