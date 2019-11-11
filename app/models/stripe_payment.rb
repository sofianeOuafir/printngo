class StripePayment < Payment
  has_one :credit, class_name: 'Credit', foreign_key: 'payment_id'
end