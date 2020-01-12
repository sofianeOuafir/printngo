class CreatePromotions < ActiveRecord::Migration[6.0]
  def change
    create_table :promotions do |t|
      t.string :text
      t.references :partner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
