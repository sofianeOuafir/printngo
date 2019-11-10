class CreditPayment < Payment
  has_one :debit, class_name: 'Debit', foreign_key: 'payment_id'
end
