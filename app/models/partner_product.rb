class PartnerProduct < Product
  belongs_to :partner
  validates_presence_of :name, if: :active?
  validates_length_of :name, maximum: 50
  validates_presence_of :description, if: :active?
  validates_length_of :description, maximum: 100
  validates_presence_of :price, if: :active?
  validates :link, url: { allow_blank: true }, if: :active?

  before_validation :strip_name
  before_validation :strip_description
  before_save :capitalize_name
  before_save :capitalize_description

  scope :active, -> { where(active: true) }

  private

  def strip_name
    self.name = name&.strip
  end

  def strip_description
    self.description = description&.strip
  end

  def capitalize_name
    self.name = name&.capitalize
  end

  def capitalize_description
    self.description = description&.capitalize
  end
end