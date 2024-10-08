class TopUpOrder < Order
  has_many :top_up_order_items, class_name: 'TopUpOrderItem', foreign_key: 'order_id'
  has_one :stripe_payment, class_name: 'StripePayment', foreign_key: 'order_id'
end
