class Order < ApplicationRecord
  belongs_to :user, optional: true
  # belongs_to :selected_partner, class_name: 'Partner', optional: true
  # belongs_to :printer, class_name: 'Partner', optional: true
  belongs_to :visit, optional: true
  has_many :order_items
  has_one :payment
  has_one :invoice, through: :payment
  # has_many :documents, through: :order_items
  # has_many :deliverables
  # has_many :printing_attempts, through: :deliverables

  # before_save :set_secret_code
  # before_save :set_printing_attempts_as_printed

  scope :paid, -> { where(paid: true) }
  scope :unpaid, -> { where(paid: false) }
  # scope :archived, -> { where(archived: true) }
  # scope :unarchived, -> { where(archived: false) }
  # scope :not_printed, -> { where(printer_id: nil) }
  # scope :searchable_by_partner, -> { paid.not_printed }

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
    h[:awaiting_confirmation] = awaiting_confirmation
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
    h[:awaiting_confirmation] = awaiting_confirmation
    h
  end

  # private

  # def set_printing_attempts_as_printed
  #   return unless printer_id_changed? && printer_id.present?
  #   printing_attempts.update_all(printed: true)
  # end

  # def set_secret_code
  #   return unless user_id_changed? && user_id.present?

  #   secret_code = generate_secret_code
  #   while Order.find_by(secret_code: secret_code).present?
  #     secret_code = generate_secret_code
  #   end
  #   self.secret_code = secret_code
  # end

  # def generate_secret_code
  #   "#{user_id}#{(0...4).map { (65 + rand(26)).chr }.join}"
  # end
end
