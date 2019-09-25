class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.integer :price
      t.string :format
      t.boolean :color

      t.timestamps
    end
  end
end
