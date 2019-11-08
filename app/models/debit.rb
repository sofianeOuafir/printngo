class Debit < Transaction
  belongs_to :credit_payment, class_name: 'Payment', foreign_key: 'payment_id'
end
