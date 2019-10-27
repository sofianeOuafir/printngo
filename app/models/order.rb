class Order < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :selected_partner, class_name: 'Partner', optional: true
  belongs_to :visit, optional: true
  has_many :order_items
  has_one :payment
  has_one :invoice, through: :payment

  before_save :set_secret_code

  scope :paid, -> { where(paid: true) }
  scope :unpaid, -> { where(paid: false) }
  scope :archived, -> { where(archived: true) }
  scope :unarchived, -> { where(archived: false) }

  def sub_total
    order_items.sum(&:sub_total)
  end

  def number_of_items
    order_items.sum(:quantity)
  end

  def tax_amount
    sub_total * 13 / 100
  end

  def total
    sub_total * 113 / 100
  end

  def total_paid
    payment.try(:amount) || 0
  end

  def total_due
    total - total_paid
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h[:total] = total
    h[:tax_amount] = tax_amount
    h[:number_of_items] = number_of_items
    h[:total_paid] = total_paid
    h[:total_due] = total_due
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:sub_total] = sub_total
    h[:total] = total
    h[:tax_amount] = tax_amount
    h[:number_of_items] = number_of_items
    h[:total_paid] = total_paid
    h[:total_due] = total_due
    h
  end

  private

  def set_secret_code
    return unless user_id_changed? && user_id.present?

    secret_code = generate_secret_code
    while Order.find_by(secret_code: secret_code).present?
      secret_code = generate_secret_code
    end
    self.secret_code = secret_code
  end

  def generate_secret_code
    "#{user_id}#{(0...4).map { (65 + rand(26)).chr }.join}"
  end
end
