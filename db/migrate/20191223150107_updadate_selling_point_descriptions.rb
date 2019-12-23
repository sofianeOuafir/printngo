class UpdadateSellingPointDescriptions < ActiveRecord::Migration[6.0]
  def change
    TopUpProduct.all.each do |product|
      product.selling_points.order(id: :asc).each_with_index do |selling_point, index|
        selling_point.update(description: "#{product.code}.sellingPoint#{index + 1}")
      end
    end
  end
end
