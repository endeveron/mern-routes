import React from 'react';

import './OrderList.scss';

import OrderListItem from '../OrderListItem/OrderListItem';

const OrderList = props => {
  return (
    <ul className='travel-card__order-list'>
      { props.orderList.map((orderItem, index) => (
        <OrderListItem
          key={ orderItem.id || index }
          isLoading={ props.isLoading }
          delOrderId={ props.delOrderId }
          onDelete={ props.deleteOrder }
          { ...orderItem } />
      )) }
    </ul>
  );
};

export default React.memo(OrderList);