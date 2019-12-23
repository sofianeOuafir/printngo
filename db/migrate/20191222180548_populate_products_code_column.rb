class PopulateProductsCodeColumn < ActiveRecord::Migration[6.0]
  def change
    PrintProduct.find_by_price(25).update(code: 'printProduct1')
    PrintProduct.find_by_price(50).update(code: 'printProduct2')
    TopUpProduct.find_by_price(999).update(code: 'topUpProduct1')
    TopUpProduct.find_by_price(1999).update(code: 'topUpProduct2')
    TopUpProduct.find_by_price(2999).update(code: 'topUpProduct3')
  end
end
