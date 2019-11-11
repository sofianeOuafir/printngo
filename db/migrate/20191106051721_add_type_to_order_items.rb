class AddTypeToOrderItems < ActiveRecord::Migration[6.0]
  def change
    add_column :order_items, :type, :string
  end
end
