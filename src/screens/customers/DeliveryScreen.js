import React, { useContext, useEffect, useState } from "react";
import {
  DeliveryNull,
  NotSignIn,
} from "../../components/useComponent/notfound";
import UserContext from "../../context/userContext";
import { getConfirmDelivery } from "../../service/customer/useDelivery";
import Delivery from "./Delivery";
export default () => {
  const state = useContext(UserContext);
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    "";
    getConfirmDelivery(state.token)
      .then((result) => {
        setDeliveries(result.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <>
      {state.isLogin ? (
        deliveries.length > 0 ? (
          <Delivery deliveries={deliveries} />
        ) : (
          <DeliveryNull />
        )
      ) : (
        <NotSignIn />
      )}
    </>
  );
};
