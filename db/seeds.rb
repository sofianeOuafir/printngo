# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

PrintProduct.create(price: 30, code: 'printProduct1')
PrintProduct.create(price: 60, code: 'printProduct2')
TopUpProduct.create(price: 999,
                    code: 'topUpProduct1',
                    most_popular: false,
                    allocated_credit: 1100)
TopUpProduct.create(price: 1999,
                    code: 'topUpProduct2',
                    most_popular: true,
                    allocated_credit: 2300)
TopUpProduct.create(price: 2999,
                    code: 'topUpProduct3',
                    most_popular: false,
                    allocated_credit: 3600)

SellingPoint.create(description: 'topUpProduct1.sellingPoint1',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'topUpProduct1.sellingPoint2',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'topUpProduct1.sellingPoint3',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'topUpProduct1.sellingPoint4',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'topUpProduct1.sellingPoint5',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'topUpProduct1.sellingPoint6',
                    top_up_product: TopUpProduct.ten_dollars_top_up)


SellingPoint.create(description: 'topUpProduct2.sellingPoint1',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct2.sellingPoint2',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct2.sellingPoint3',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct2.sellingPoint4',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct2.sellingPoint5',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct2.sellingPoint6',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)

SellingPoint.create(description: 'topUpProduct3.sellingPoint1',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct3.sellingPoint2',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct3.sellingPoint3',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct3.sellingPoint4',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct3.sellingPoint5',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'topUpProduct3.sellingPoint6',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)

if Rails.env.development?
  Partner.create(
    name: 'Book Store',
    address: '914 Queen St E',
    city: 'Toronto',
    postcode: 'M4M 1J5',
    country: 'Canada',
    lat: '43.6500401',
    lng: '-79.4003591',
    opening_hours: '10 AM to 8 PM',
    firstname: 'Sofiane',
    lastname: 'Ouafir',
    email: 'sofiane.ouafir@live.fr',
    password: 'abc123'
  )
end
