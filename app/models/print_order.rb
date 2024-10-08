# frozen_string_literal: true

class PrintOrder < Order
  belongs_to :selected_partner, class_name: 'Partner', optional: true
  belongs_to :printer, class_name: 'Partner', optional: true
  has_many :print_order_items, class_name: 'PrintOrderItem', foreign_key: 'order_id'
  has_many :deliverables, class_name: 'Deliverable', foreign_key: 'order_id'
  has_many :printing_attempts, through: :deliverables
  has_many :documents, through: :print_order_items

  scope :archived, -> { where(archived: true) }
  scope :unarchived, -> { where(archived: false) }
  scope :not_printed, -> { where(printer_id: nil) }
  scope :searchable_by_partner, -> { paid.not_printed }

  before_save :set_secret_code

  def preparing?
    paid? &&
      (!deliverables.present? ||
        deliverables.map { |deliverable| deliverable.number_of_page.present? }.include?(false))
  end

  def printed?
    printer_id.present?
  end

  def awaiting_confirmation
    paid? &&
      !preparing? &&
      !deliverables.map(&:printing_attempted?).include?(false) &&
      !printed?
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:awaiting_confirmation] = awaiting_confirmation
    h[:preparing] = preparing?
    h[:printed] = printed?
    h
  end

  def as_json(options = {})
    h = super(options)
    h[:awaiting_confirmation] = awaiting_confirmation
    h[:preparing] = preparing?
    h[:printed] = printed?
    h
  end

  private

  def set_secret_code
    return unless user_id_changed? && user_id.present?

    secret_code = generate_secret_code
    while PrintOrder.find_by(secret_code: secret_code).present?
      secret_code = generate_secret_code
    end
    self.secret_code = secret_code
  end

  def generate_secret_code
    "#{user_id}#{(0...4).map { (65 + rand(26)).chr }.join}"
  end
end
