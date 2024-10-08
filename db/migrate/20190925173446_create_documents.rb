class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.string :name
      t.integer :number_of_page
      t.bigint :ahoy_visit_id
      t.references :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
