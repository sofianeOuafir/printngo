class CreateActivations < ActiveRecord::Migration[6.0]
  def change
    create_table :activations do |t|
      t.string :token
      t.boolean :activated, default: false
      t.references :partner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
