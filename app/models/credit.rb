class Credit < Transaction
  belongs_to :stripe_payment, class_name: 'Payment', foreign_key: 'payment_id', optional: true
end
