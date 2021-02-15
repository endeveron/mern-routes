export const useOrder = (travelList, setTravelList) => {

  const addOrder = (travelId, createdOrder) => {
    const travels = [...travelList];
    const travel = travels.find(t => t.id === travelId);
    if (travel) {
      travel.orders.push(createdOrder);
      travel.seatsReserved += createdOrder.seatsAmount;
      setTravelList(travels);
    }
  };

  const cancelOrder = (travelId, orderId, updSeatsReserved) => {
    const travels = [...travelList];
    const travel = travels.find(t => t.id === travelId);
    if (travel) {
      const updOrders = travel.orders.filter(o => o.id !== orderId);
      travel.orders = updOrders;
      travel.seatsReserved = updSeatsReserved;
      setTravelList(travels);
    }
  };

  return { addOrder, cancelOrder }
}