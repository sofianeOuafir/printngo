class RemovePrintedFromPrintingAttempts < ActiveRecord::Migration[6.0]
  def change

    remove_column :printing_attempts, :printed, :boolean
  end
end
