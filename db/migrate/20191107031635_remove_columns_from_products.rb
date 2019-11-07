class RemoveColumnsFromProducts < ActiveRecord::Migration[6.0]
  def change

    remove_column :products, :format, :string

    remove_column :products, :color, :boolean
  end
end
