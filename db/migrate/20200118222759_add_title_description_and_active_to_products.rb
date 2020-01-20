class AddTitleDescriptionAndActiveToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :name, :string
    add_column :products, :description, :string
    add_column :products, :active, :boolean, default: false
    add_reference :products, :partner, null: true, foreign_key: true
  end
end
