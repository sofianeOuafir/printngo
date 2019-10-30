class CreateDeliverables < ActiveRecord::Migration[6.0]
  def change
    create_table :deliverables do |t|
      t.integer :number_of_page
      t.references :product, null: false, foreign_key: true
      t.references :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
