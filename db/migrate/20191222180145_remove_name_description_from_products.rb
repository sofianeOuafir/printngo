class RemoveNameDescriptionFromProducts < ActiveRecord::Migration[6.0]
  def change

    remove_column :products, :name, :string

    remove_column :products, :description, :string
  end
end
