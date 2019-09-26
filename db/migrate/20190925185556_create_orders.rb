class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.bigint :ahoy_visit_id
      t.references :user, null: true, foreign_key: true
      t.references :partner, null: true, foreign_key: true

      t.timestamps
    end
  end
end
