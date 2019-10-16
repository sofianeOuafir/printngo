class Product < ApplicationRecord
  def self.a4_color
    Product.where(format: 'A4', color: true).first
  end

  def self.a4_black_and_white
    Product.where(format: 'A4', color: false).first
  end

  def name
    color = color? ? 'Color' : 'Black & White'
    "#{format} - #{color}"
  end

  def as_json(options = {})
    h = super(options)
    h[:name] = name
    h
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:name] = name
    h
  end
end
