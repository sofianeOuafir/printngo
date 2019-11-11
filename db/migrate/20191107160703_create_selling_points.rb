class CreateSellingPoints < ActiveRecord::Migration[6.0]
  def change
    create_table :selling_points do |t|
      t.string :description
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
