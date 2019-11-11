class AddNewBalanceToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :new_balance, :integer
  end
end
