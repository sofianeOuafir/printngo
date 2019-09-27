class Product < ApplicationRecord
  def self.a4_color
    Product.where(format: 'A4', color: true).first
  end

  def self.a4_black_and_white
    Product.where(format: 'A4', color: false).first
  end

  def as_json(options = {})
    h = super(options)
    color = color? ? 'Color' : 'Black & White'
    h[:name] = "#{format} - #{color}"
    h
  end
end
