class CreatePrintingAttempts < ActiveRecord::Migration[6.0]
  def change
    create_table :printing_attempts do |t|
      t.references :partner, null: false, foreign_key: true
      t.references :deliverable, null: false, foreign_key: true
      t.boolean :printed, default: false

      t.timestamps
    end
  end
end
