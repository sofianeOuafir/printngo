class AddDescriptionToOrderItems < ActiveRecord::Migration[6.0]
  def change
    add_column :order_items, :description, :string
  end
end
