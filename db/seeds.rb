# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

PrintProduct.create(price: 20, name: 'A4 Black')
PrintProduct.create(price: 50, name: 'A4 Color')
TopUpProduct.create(price: 999,
                    name: '$9.99 Top up',
                    description: 'Get $11 of printing credit. Yes, An extra $1 for free!',
                    most_popular: false,
                    allocated_credit: 1100)
TopUpProduct.create(price: 1999,
                    name: '$19.99 Top up',
                    description: 'Get $23 of printing credit. Yes, An extra $3 for free!',
                    most_popular: true,
                    allocated_credit: 2300)
TopUpProduct.create(price: 2999,
                    name: '$29.99 Top up',
                    description: 'Get $36 of printing credit. Yes, An extra $6 for free!',
                    most_popular: false,
                    allocated_credit: 3600)


SellingPoint.create(description: 'Get an extra 1$ dollar for free (+10% free).',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'No minimum * amount per order.',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'Printing in black would cost a bit less than 0,23$ / document.',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'Printing in color would cost a bit less than 0,46$ / document.',
                    top_up_product: TopUpProduct.ten_dollars_top_up)
SellingPoint.create(description: 'Print even quicker by skipping the need of providing your credit card details each time.',
                    top_up_product: TopUpProduct.ten_dollars_top_up)


SellingPoint.create(description: 'You get an extra $3 of priting credit for free (+15% free).',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'No minimum * amount per order.',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'Printing in black would cost a bit less than 0,22$ / document.',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'Printing in color would cost a bit less than 0,44$ / document.',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)
SellingPoint.create(description: 'Print even quicker by skipping the need of providing your credit card details each time.',
                    top_up_product: TopUpProduct.twenty_dollars_top_up)

SellingPoint.create(description: 'You get an extra 6 dollars of priting credit for free (+20% free)',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'No minimum * amount per order.',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'Printing in black would cost a bit less than 0,21$ / document.',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'Printing in color would cost a bit less than 0,42$ / document.',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)
SellingPoint.create(description: 'Print even quicker by skipping the need of providing your credit card details each time.',
                    top_up_product: TopUpProduct.thirty_dollars_top_up)


                    

