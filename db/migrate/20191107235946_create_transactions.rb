class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :payment, null: true, foreign_key: true
      t.integer :amount
      t.string :type

      t.timestamps
    end
  end
end
