class PartnerProduct < Product
  belongs_to :partner
  validates_presence_of :name, if: :active?
  validates_presence_of :price, if: :active?
end