class AddColumnsToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :description, :string
    add_column :products, :allocated_credit, :integer
    add_column :products, :most_popular, :boolean
  end
end
