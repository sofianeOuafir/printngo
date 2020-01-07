class ChangePricesOfPrintProducts < ActiveRecord::Migration[6.0]
  def change
    PrintProduct.find_by(price: 25).update(price: 30)
    PrintProduct.find_by(price: 50).update(price: 60)
  end
end
