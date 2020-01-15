class AddLinkToPromotions < ActiveRecord::Migration[6.0]
  def change
    add_column :promotions, :link, :string
  end
end
