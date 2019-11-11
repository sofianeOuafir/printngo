class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :payment
  has_one :order, through: :payment

  validates_presence_of :amount

  after_save :set_new_balance

  def serializable_hash(options = {})
    h = super(options)
    h[:type] = type
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:type] = type
    h
  end

  private

  def set_new_balance
    update_columns(new_balance: user.wallet_balance)
  end
end
