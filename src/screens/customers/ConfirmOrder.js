import { useState, useContext, useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { OrderNull } from "../../components/useComponent/notfound"
import { getConfirmOrder } from "../../service/customer/useOrder";
import UserContext from "../../context/userContext";
import { toastInfo } from "../../utils/functions";
import { View } from "react-native";
import { Text } from "react-native";

export default () => {
    const state = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [toastObj, setToastObj] = useState(null);
    useEffect(() => {
        getConfirmOrder(state.token)
            .then((result) => {
                setOrders(result.data.data)
            })
            .catch((err) => {
                setToastObj({ type: "error", msg: "Баталгаажуулах дэлгэцэнд алдаа гарлаа" });
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
    console.log('data=>', orders)
    return (
        <>
            {orders.length > 0 ? (<>
                {orders.map((el) => {
                    return (<View>
                        <Text>=={el.OrderID}</Text>
                    </View>)
                })}
            </>) : (<OrderNull />)}
        </>
    )
}